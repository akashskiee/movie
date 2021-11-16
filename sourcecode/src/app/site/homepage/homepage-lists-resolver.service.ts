import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {catchError, finalize, mergeMap} from 'rxjs/operators';
import {GlobalLoaderService} from '../global-loader.service';
import {HomepageService} from './homepage.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {List} from '../../models/list';

@Injectable({
    providedIn: 'root',
})
export class HomepageListsResolverService implements Resolve<{lists: List[]}> {
    constructor(
        private homepage: HomepageService,
        private globalLoaderService: GlobalLoaderService
    ) {}

    resolve(route: ActivatedRouteSnapshot): BackendResponse<{lists: List[]}> {
        this.globalLoaderService.active$.next(true);

        return this.homepage.getLists()
            .pipe(
                finalize(() => this.globalLoaderService.active$.next(false)),
                catchError(() => {
                    return EMPTY;
                }),
                mergeMap(response => {
                    if (response) {
                        return of(response);
                    } else {
                        return EMPTY;
                    }
                })
            );
    }
}
