import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageListsResolverService} from './site/homepage/homepage-lists-resolver.service';
import {ContactComponent} from '@common/contact/contact.component';
import {AuthGuard} from '@common/guards/auth-guard.service';
import {HomepageHostComponent} from './site/homepage/homepage-host/homepage-host.component';
import {CheckPermissionsGuard} from '@common/guards/check-permissions-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [CheckPermissionsGuard],
        component: HomepageHostComponent,
        resolve: {api: HomepageListsResolverService},
        data: {name: 'homepage'},
    },
    {
        path: 'admin',
        loadChildren: () =>
            import('src/app/admin/app-admin.module').then(
                m => m.AppAdminModule
            ),
        canLoad: [AuthGuard],
    },
    {
        path: 'billing',
        loadChildren: () =>
            import('@common/billing/billing.module').then(m => m.BillingModule),
    },
    {
        path: 'notifications',
        loadChildren: () =>
            import('@common/notifications/notifications.module').then(
                m => m.NotificationsModule
            ),
    },
    {
        path: 'api-docs',
        loadChildren: () =>
            import('@common/api-docs/api-docs.module').then(
                m => m.ApiDocsModule
            ),
    },
    {path: 'contact', component: ContactComponent},
    {path: 'pricing', redirectTo: 'billing/pricing'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
