import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { MemberEditResolver } from './users/users-edit/user-edit.resolver';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorThrowComponent } from './error-throw/error-throw.component';
import { LogsListResolver } from './dashboard/log-list/logs-list.resolver';
import { CsharpLogDetailComponent } from './dashboard/csharp/csharp-log-detail/csharp-log-detail.component';
import { CsharpLogResolver } from './dashboard/csharp/csharp-log-detail/csharp-log.resolver';
import { JsLogDetailComponent } from './dashboard/javascript/js-log-detail/js-log-detail.component';
import { JsLogResolver } from './dashboard/javascript/js-log-detail/js-log.resolver';
import { GroupDetailComponent } from './dashboard/group-detail/group-detail.component';
import { GroupDetailResolver } from './dashboard/group-detail/group-detail.resolver';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, resolve: { logs: LogsListResolver } },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'throwError', component: ErrorThrowComponent },
      {
        path: 'user/edit',
        component: UsersEditComponent,
        resolve: { user: MemberEditResolver }
      },
      {
        path: 'admin',
        component: AdminPanelComponent,
        data: { roles: ['Admin'] }
      },
      {
        path: 'jsLogDetail/:id',
        component: JsLogDetailComponent,
        resolve: { log: JsLogResolver }
      },
      {
        path: 'csharpLogDetail/:id',
        component: CsharpLogDetailComponent,
        resolve: { log: CsharpLogResolver }
      },
      {
        path: 'groupDetail/:id',
        component: GroupDetailComponent,
        resolve: { group: GroupDetailResolver }
      }
      // next routes
    ]
  },
  { path: '**', redirectTo: '' }
];
