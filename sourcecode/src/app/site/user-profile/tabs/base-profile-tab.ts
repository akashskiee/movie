import {Directive, NgZone, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaginationResponse} from '@common/core/types/pagination/pagination-response';
import {UserProfileService} from '../user-profile.service';
import {finalize} from 'rxjs/operators';
import {InfiniteScroll} from '@common/core/ui/infinite-scroll/infinite.scroll';
import {PaginationParams} from '@common/core/types/pagination/pagination-params';
import {PaginatedBackendResponse} from '@common/core/types/pagination/paginated-backend-response';
import {UrlGeneratorService} from '@common/core/services/url-generator.service';

@Directive()
export abstract class BaseProfileTab<T>
    extends InfiniteScroll
    implements OnInit
{
    skeletonCount = new Array(10);
    pagination$ = new BehaviorSubject<PaginationResponse<T>>({data: []});
    loading$ = new BehaviorSubject<boolean>(false);
    constructor(
        public profile: UserProfileService,
        protected zone: NgZone,
        public url: UrlGeneratorService
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadMoreItems();
    }

    protected canLoadMore(): boolean {
        return (
            this.pagination$.value?.last_page >=
            this.pagination$.value?.current_page
        );
    }

    protected isLoading(): boolean {
        return this.loading$.value;
    }

    protected loadMoreItems() {
        this.loading$.next(true);
        this.fetchData(this.profile.userId, {page: this.currentPage() + 1})
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                this.pagination$.next({
                    ...response.pagination,
                    data: [...this.currentData(), ...response.pagination.data],
                });
            });
    }

    protected abstract fetchData(
        userId: number,
        params: PaginationParams
    ): PaginatedBackendResponse<T>;

    currentPage(): number {
        return this.pagination$.value?.current_page ?? 0;
    }

    currentData(): T[] {
        return this.pagination$.value?.data ?? [];
    }
}
