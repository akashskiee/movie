import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CrupdateTitleComponent} from './crupdate-title/crupdate-title.component';
import {CrupdateTitleResolverService} from './crupdate-title/crupdate-title-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: CrupdateTitleComponent,
        resolve: {api: CrupdateTitleResolverService},
        data: {permissions: ['titles.update']}
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CrupdateTitleRoutingModule {
}
