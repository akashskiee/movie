import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GlobalLoaderService {
    public active$ = new BehaviorSubject(false);
}
