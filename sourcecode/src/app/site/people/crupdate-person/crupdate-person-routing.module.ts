import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CrupdatePersonPageComponent} from './crupdate-person-page.component';

const routes: Routes = [
    {
        path: '',
        component: CrupdatePersonPageComponent,
        data: {permissions: ['people.update']}
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrupdatePersonRoutingModule { }
