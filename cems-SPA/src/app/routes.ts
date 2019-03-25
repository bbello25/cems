import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { MemberEditResolver } from './_resolvers/user-edit.resolver';
import { LogDetailComponent } from './dashboard/log-detail/log-detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorThrowComponent } from './error-throw/error-throw.component';
import { LogsListResolver } from './_resolvers/logs-list.resolver';
import { CsharpLogDetailComponent } from './dashboard/csharp/csharp-log-detail/csharp-log-detail.component';
import { CsharpLogResolver } from './dashboard/csharp/csharp-log-detail/csharp-log.resolver';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, resolve: { logs: LogsListResolver } },
      { path: 'dashboard', component: DashboardComponent, resolve: { logs: LogsListResolver } },
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
        path: 'logDetails/:id',
        component: LogDetailComponent
      },
      {
        path: 'csharpLogDetail/:id',
        component: CsharpLogDetailComponent,
        resolve: { log: CsharpLogResolver }
      }
      // next routes
    ]
  },
  { path: '**', redirectTo: '' }
];
