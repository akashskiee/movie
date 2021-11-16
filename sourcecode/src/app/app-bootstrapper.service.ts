import {Injectable} from '@angular/core';
import {Bootstrapper} from '@common/core/bootstrapper.service';
import {UserLibraryService} from './site/user-library.service';
import {createMap} from '@common/core/utils/create-map';
import {Review} from './models/review';

@Injectable()
export class AppBootstrapperService extends Bootstrapper {

    /**
     * Handle specified bootstrap data.
     */
    protected handleData(encodedData: string) {
        const data = super.handleData(encodedData);

        // set user watchlist
        this.injector.get(UserLibraryService).watchlist = data['watchlist'];

        // set user ratings
        this.injector.get(UserLibraryService).ratings = createMap(data['ratings'] as Review[]);

        return data;
    }
}
