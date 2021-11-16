import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {
    AttachItem,
    CreateOrUpdateList,
    DeleteList,
    DetachItem,
    ReloadList,
    ReorderList,
    ResetState,
    UpdateDetails
} from './list-actions';
import {List} from '../../../models/list';
import {ListsService} from '../lists.service';
import {finalize, tap} from 'rxjs/operators';
import {ListItem} from '../types/list-item';
import {MESSAGES} from '../../../toast-messages';
import {ListQueryParams} from '../types/list-query-params';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {PaginationResponse} from '@common/core/types/pagination/pagination-response';
import {Toast} from '@common/core/ui/toast.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {Router} from '@angular/router';
import {Injectable, NgZone} from '@angular/core';
import {UserLibraryService} from '../../user-library.service';

interface ListStateModel {
    loading: boolean;
    list: Partial<List>;
    items: ListItem[];
    pagination: Partial<PaginationResponse<ListItem>>;
    params: ListQueryParams;
}

@State<ListStateModel>({
    name: 'list',
    defaults: {
        loading: false,
        list: {},
        items: [],
        pagination: {},
        params: {
            sortBy: 'pivot.order',
            sortDir: 'asc',
        }
    }
})
@Injectable()
export class ListState {
    @Selector()
    static items(state: ListStateModel) {
        return state.items;
    }

    @Selector()
    static updating(state: ListStateModel) {
        return !!state.list.id;
    }

    @Selector()
    static list(state: ListStateModel) {
        return state.list;
    }

    @Selector()
    static system(state: ListStateModel) {
        return state.list.system;
    }

    @Selector()
    static public(state: ListStateModel) {
        return !state.list.system && state.list.public;
    }

    @Selector()
    static loading(state: ListStateModel) {
        return state.loading;
    }

    @Selector()
    static params(state: ListStateModel) {
        return state.params;
    }

    @Selector()
    static totalCount(state: ListStateModel) {
        return state.pagination.total || 0;
    }

    @Selector()
    static currentCount(state: ListStateModel) {
        return state.items.length;
    }

    constructor(
        private lists: ListsService,
        private store: Store,
        private toast: Toast,
        private router: Router,
        private userLibrary: UserLibraryService,
        private zone: NgZone,
    ) {}

    @Action(AttachItem)
    attachItem(ctx: StateContext<ListStateModel>, action: AttachItem) {
        const listId = ctx.getState().list.id;
        const newItem = action.item;
        const alreadyContains = ctx.getState().items
            .find(item => item.id === newItem.id && item.model_type === newItem.model_type);

        if (alreadyContains) return;

        // list is not created yet
        if ( ! ctx.getState().list.id) {
            return this.addItem(ctx, action.item);
        }

        ctx.patchState({loading: true});
        return this.lists.addItem(listId, action.item).pipe(
            tap(() => {
                this.toast.open(MESSAGES.LIST_ITEM_ADD_SUCCESS);
                this.addItem(ctx, action.item);
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(DetachItem)
    detachItem(ctx: StateContext<ListStateModel>, action: DetachItem) {
        const listId = ctx.getState().list.id;

        // list is not created yet
        if ( ! listId) {
            return this.removeItem(ctx, action.item);
        }

        ctx.patchState({loading: true});
        return this.lists.removeItem(listId, action.item).pipe(
            tap(() => {
                this.toast.open(MESSAGES.LIST_ITEM_REMOVE_SUCCESS);
                this.removeItem(ctx, action.item);
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(UpdateDetails)
    updateDetails(ctx: StateContext<ListStateModel>, action: UpdateDetails) {
        ctx.patchState({
            list: {...ctx.getState().list, ...action.details},
        });
    }

    @Action(CreateOrUpdateList)
    createOrUpdateList(ctx: StateContext<ListStateModel>) {
        ctx.patchState({loading: true});
        const payload = this.getPayload(ctx);
        let request: BackendResponse<{list: List}>;

        if (ctx.getState().list.id) {
            request = this.lists.update(ctx.getState().list.id, payload);
        } else {
            request = this.lists.create(payload);
        }

        return request.pipe(
            tap(response => {
                const msg = ctx.getState().list.id ? MESSAGES.LIST_UPDATE_SUCCESS : MESSAGES.LIST_CREATE_SUCCESS;
                ctx.patchState({list: response.list});
                this.userLibrary.lists$.next([]);
                this.router.navigate(this.getListRoute());
                this.toast.open(msg);
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(ReloadList)
    reloadList(ctx: StateContext<ListStateModel>, action: ReloadList) {
        if ( ! action.id) return;
        ctx.patchState({loading: true});

        if (action.params) {
            ctx.patchState({params: {...ctx.getState().params, ...action.params}});
        }

        return this.lists.get(action.id, ctx.getState().params).pipe(
            tap(response => {
                ctx.patchState({
                    list: response.list,
                    items: response.items.data,
                    pagination: {...response.items, data: []},
                });
            }, () => {
                this.zone.run(() => {
                    this.router.navigate(['/lists'], {replaceUrl: true});
                });
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(ReorderList)
    reorderList(ctx: StateContext<ListStateModel>, action: ReorderList) {
        const items = [...ctx.getState().items];
        moveItemInArray(items, action.currentIndex, action.newIndex);
        ctx.patchState({items});

        // list is not created yet
        if ( ! ctx.getState().list.id) return;

        const order = {};
        items.forEach((item, index) => {
            order[index] = item.pivot.id;
        });

        ctx.patchState({loading: true});
        return this.lists.reorder(ctx.getState().list.id, order).pipe(
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(DeleteList)
    deleteList(ctx: StateContext<ListStateModel>, action: DeleteList) {
        ctx.patchState({loading: true});
        return this.lists.delete([action.id]).pipe(
            tap(() => {
                this.userLibrary.lists$.next([]);
                this.store.dispatch(new ResetState());
            }),
            finalize(() => ctx.patchState({loading: false}))
        );
    }

    @Action(ResetState)
    resetState(ctx: StateContext<ListStateModel>) {
        ctx.patchState({
            loading: false,
            list: {},
            items: [],
            pagination: {},
            params: {
                sortBy: 'pivot.order',
                sortDir: 'asc',
            }
        });
    }

    private addItem(ctx: StateContext<ListStateModel>, item: ListItem) {
        ctx.patchState({
            items: [...ctx.getState().items, item]
        });
    }

    private removeItem(ctx: StateContext<ListStateModel>, item: ListItem) {
        const newItems = ctx.getState().items.filter(curr => {
            return curr.id !== item.id;
        });

        ctx.patchState({items: newItems});
    }

    private getPayload(ctx: StateContext<ListStateModel>) {
        return {
            details: ctx.getState().list,
            items: ctx.getState().items.map(item => {
                return {
                    id: item.id,
                    type: item.model_type
                };
            })
        };
    }

    private getListRoute(): (string|number)[] {
        const listId = this.store.selectSnapshot(ListState.list).id,
            watchlistId = this.userLibrary.watchlist?.id;
        if (listId === watchlistId) {
            return ['/watchlist'];
        } else {
            return ['/lists', listId];
        }
    }
}
