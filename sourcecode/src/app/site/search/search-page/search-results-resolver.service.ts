import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {GlobalLoaderService} from '../../global-loader.service';
import {finalize} from 'rxjs/operators';
import {SearchResponse, SearchService} from '../search.service';
import {BackendResponse} from '@common/core/types/backend-response';

@Injectable({
    providedIn: 'root',
})
export class SearchResultsResolverService implements Resolve<any> {
    constructor(
        private router: Router,
        private globalLoader: GlobalLoaderService,
        private search: SearchService,
    ) {}

    resolve(route: ActivatedRouteSnapshot): BackendResponse<SearchResponse>|Promise<boolean> {
        if (route.queryParams.query) {
            this.globalLoader.active$.next(true);
            return this.search.everything(route.queryParams.query, {limit: 20})
                .pipe(finalize(() => this.globalLoader.active$.next(false)));
        } else {
            return this.router.navigate(['/']);
        }
    }
}
