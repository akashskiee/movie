import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {Observable, of} from 'rxjs';
import {LoadPerson} from './state/person-state-actions';
import {catchError, finalize, mergeMap} from 'rxjs/operators';
import {PersonStateModel} from './state/person-state';
import {MetaTag} from '@common/core/meta/meta-tags.service';
import {GlobalLoaderService} from '../global-loader.service';

@Injectable({
    providedIn: 'root',
})
export class PersonResolverService implements Resolve<{seo: MetaTag[]}> {
    constructor(
        private store: Store,
        private router: Router,
        private globalLoader: GlobalLoaderService,
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<{seo: MetaTag[]}> {
        this.globalLoader.active$.next(true);
        return this.store.dispatch(new LoadPerson(route.params.id))
            .pipe(
                finalize(() => this.globalLoader.active$.next(false)),
                catchError(() => {
                    this.router.navigateByUrl('/');
                    return of(null);
                }),
                mergeMap((store: {person: PersonStateModel}) => {
                    return of({seo: store.person.metaTags});
                })
            );
    }
}
