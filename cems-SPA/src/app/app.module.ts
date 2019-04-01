import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule, BsDropdownModule, ButtonsModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { LogDetailComponent } from './dashboard/log-detail/log-detail.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminService } from './_services/admin.service';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UserService } from './_services/user.service';
import { MemberEditResolver } from './_resolvers/user-edit.resolver';
import { GlobalErrorHandler } from './GlobalErrorHandler';
import { from } from 'rxjs';
import { AlertifyService } from './_services/alertify.service';
import { RolesManagementComponent } from './admin/roles-management/roles-management.component';
import { LoginComponent } from './login/login.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ErrorThrowComponent } from './error-throw/error-throw.component';
import { environment } from '../environments/environment';
import { LogsListResolver } from './_resolvers/logs-list.resolver';
import { HighlightModule } from 'ngx-highlightjs';

import javascript from 'node_modules/highlight.js/lib/languages/javascript.js';
import { StacktraceComponent } from './dashboard/stacktrace/stacktrace.component';
import { StackFrameComponent } from './dashboard/stack-frame/stack-frame.component';
import { MinifiedStackFrameComponent } from './dashboard/minified-stack-frame/minified-stack-frame.component';
import { LogEndpointService } from './_services/logEndpoint.service';
import { BrowserEventComponent } from './dashboard/browser-event/browser-event.component';
import { CsharpLogResolver } from './dashboard/csharp/csharp-log-detail/csharp-log.resolver';
import { CsharpLogDetailComponent } from './dashboard/csharp/csharp-log-detail/csharp-log-detail.component';
import { CsharpStackFrameComponent } from './dashboard/csharp/csharp-stack-frame/csharp-stack-frame.component';

export function hljsLanguages() {
  return [{ name: 'typescript', func: javascript }];
}

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    RegisterComponent,
    DashboardComponent,
    LogDetailComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    RolesModalComponent,
    UsersEditComponent,
    RolesManagementComponent,
    LoginComponent,
    ConfirmModalComponent,
    ErrorThrowComponent,
    StacktraceComponent,
    StackFrameComponent,
    MinifiedStackFrameComponent,
    BrowserEventComponent,
    CsharpLogDetailComponent,
    CsharpStackFrameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.whitelistedDomain],
        blacklistedRoutes: [environment.blacklistedRoute]
      }
    }),
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    CollapseModule.forRoot()
  ],
  entryComponents: [RolesModalComponent, ConfirmModalComponent],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AuthGuard,
    AdminService,
    UserService,
    MemberEditResolver,
    LogsListResolver,
    AlertifyService,
    CsharpLogResolver,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    LogEndpointService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
