import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import {catchError, mergeMap} from 'rxjs/operators';
import {EMPTY, Observable, of} from 'rxjs';
import {Store} from '@ngxs/store';
import {TitlesService} from '../../titles.service';
import {CurrentUser} from '../../../../../common/auth/current-user';

@Injectable({
    providedIn: 'root'
})
export class CrupdateTitleResolverService implements Resolve<Observable<any>> {
    constructor(
        private router: Router,
        private store: Store,
        private titles: TitlesService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const query = {fullCredits: true, keywords: true, countries: true, seasons: true, skipUpdating: true, allVideos: true},
            titleId = route.params.titleId;

        if ( ! titleId) {
            return of(null);
        }

        return this.titles.get(route.params.titleId, query).pipe(
            catchError(() => {
                this.router.navigate(this.fallbackUri(state));
                return EMPTY;
            }),
            mergeMap(response => {
                if (response) {
                    return of(response);
                } else {
                    this.router.navigate(this.fallbackUri(state));
                    return EMPTY;
                }
            })
        );
    }

    private fallbackUri(state: RouterStateSnapshot) {
        return state.url.includes('admin') ? ['/admin/titles'] : [state.url.replace('/edit', '')];
    }
}

