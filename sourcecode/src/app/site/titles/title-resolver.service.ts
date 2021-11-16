import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {catchError, finalize, mergeMap} from 'rxjs/operators';
import {GetTitleQueryParams, GetTitleResponse, TitlesService} from './titles.service';
import {BackendResponse} from '@common/core/types/backend-response';
import {TitlePageService} from './title-page-container/title-page.service';
import {GlobalLoaderService} from '../global-loader.service';

@Injectable({
    providedIn: 'root',
})
export class TitleResolverService implements Resolve<GetTitleResponse> {
    constructor(
        private titles: TitlesService,
        private titlePage: TitlePageService,
        private router: Router,
        private globalLoader: GlobalLoaderService,
    ) {}

    resolve(route: ActivatedRouteSnapshot): BackendResponse<GetTitleResponse> {
        const params = {...route.params} as GetTitleQueryParams;
        if (route.data.fullCredits) params.fullCredits = true;

        this.globalLoader.active$.next(true);

        return this.titles.get(params.titleId, params)
            .pipe(
                finalize(() => {
                    this.globalLoader.active$.next(false);
                }),
                catchError(() => {
                    this.router.navigateByUrl('/browse');
                    return EMPTY;
                }),
                mergeMap(response => {
                    if (response) {
                        this.titlePage.setTitleResponse(response, params);
                        return of(response);
                    } else {
                        this.router.navigate(['/browse']);
                        return EMPTY;
                    }
                })
            );
    }
}
