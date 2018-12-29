(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, scripts, private, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"cems-spa","version":"0.0.0","scripts":{"ng":"ng","start":"ng serve","build":"ng build","test":"ng test","lint":"ng lint","e2e":"ng e2e"},"private":true,"dependencies":{"@angular/animations":"^7.1.1","@angular/common":"^7.1.1","@angular/compiler":"^7.1.1","@angular/core":"^7.1.1","@angular/forms":"^7.1.1","@angular/http":"^7.1.1","@angular/platform-browser":"^7.1.1","@angular/platform-browser-dynamic":"^7.1.1","@angular/router":"^7.1.1","@auth0/angular-jwt":"^2.0.0","@bbellovic/cems-logger-js":"^1.6.0","alertifyjs":"^1.11.2","bootstrap":"^4.1.3","bootswatch":"^4.1.3","convert-source-map":"^1.6.0","core-js":"^2.6.0","font-awesome":"^4.7.0","highlight.js":"^9.13.1","ngx-bootstrap":"^3.1.2","rxjs":"^6.3.3","stacktrace-js":"^2.0.0","zone.js":"~0.8.26"},"devDependencies":{"@angular-devkit/build-angular":"^0.10.7","@angular/cli":"^7.0.7","@angular/compiler-cli":"^7.1.1","@angular/language-service":"^7.1.1","@types/jasmine":"^2.8.12","@types/jasminewd2":"^2.0.5","@types/node":"^8.10.37","@types/stacktrace-js":"0.0.32","codelyzer":"~4.2.1","jasmine-core":"~2.99.1","jasmine-spec-reporter":"~4.2.1","karma":"~1.7.1","karma-chrome-launcher":"~2.2.0","karma-coverage-istanbul-reporter":"^2.0.4","karma-jasmine":"~1.1.1","karma-jasmine-html-reporter":"^0.2.2","protractor":"^5.4.1","ts-node":"~5.0.1","tslint":"~5.9.1","typescript":"^3.1.6"}};

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/GlobalErrorHandler.ts":
/*!***************************************!*\
  !*** ./src/app/GlobalErrorHandler.ts ***!
  \***************************************/
/*! exports provided: GlobalErrorHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalErrorHandler", function() { return GlobalErrorHandler; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _bbellovic_cems_logger_js_dist_es2015_CemsLogger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bbellovic/cems-logger-js/dist/es2015/CemsLogger */ "./node_modules/@bbellovic/cems-logger-js/dist/es2015/CemsLogger.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


// import { CemsLogger } from '../../../../cems-logger-javascript2/src/CemsLogger';
const { name: name } = __webpack_require__(/*! ../../package.json */ "./package.json");

let GlobalErrorHandler = class GlobalErrorHandler {
    constructor() {
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + 'log/browserError';
        this.logger = null;
        this.logger = _bbellovic_cems_logger_js_dist_es2015_CemsLogger__WEBPACK_IMPORTED_MODULE_1__["CemsLogger"].initLogger({
            endPointUrl: _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].cemsLoggerURL,
            apiKey: _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].cemsLoggerApiKey,
            appName: name,
            email: 'b.bellovic@gmail.com'
        });
    }
    handleError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.error(error);
            yield this.logger.sendLog(error);
            // throw error;
        });
    }
};
GlobalErrorHandler = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
    __metadata("design:paramtypes", [])
], GlobalErrorHandler);



/***/ }),

/***/ "./src/app/_directives/hasRole.directive.ts":
/*!**************************************************!*\
  !*** ./src/app/_directives/hasRole.directive.ts ***!
  \**************************************************/
/*! exports provided: HasRoleDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HasRoleDirective", function() { return HasRoleDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let HasRoleDirective = class HasRoleDirective {
    constructor(viewContainerRef, templateRef, authService) {
        this.viewContainerRef = viewContainerRef;
        this.templateRef = templateRef;
        this.authService = authService;
        this.isVisible = false;
    }
    ngOnInit() {
        const userRoles = this.authService.decodedToken.role;
        if (!userRoles) {
            this.viewContainerRef.clear();
        }
        if (this.authService.roleMatch(this.appHasRole)) {
            if (!this.isVisible) {
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
            else {
                this.isVisible = false;
                this.viewContainerRef.clear();
            }
        }
    }
};
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Array)
], HasRoleDirective.prototype, "appHasRole", void 0);
HasRoleDirective = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
        selector: '[appHasRole]'
    }),
    __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"],
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
], HasRoleDirective);



/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let AuthGuard = class AuthGuard {
    constructor(authService, router, alertify) {
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
    }
    canActivate(route, state) {
        // const roles = route.data.roles as Array<string>;
        const roles = route.firstChild.data['roles'];
        if (roles) {
            const match = this.authService.roleMatch(roles);
            if (match) {
                return true;
            }
            else {
                this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
                this.alertify.warning('You are not authorized to access this area');
            }
        }
        if (this.authService.loggedIn()) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
};
AuthGuard = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
], AuthGuard);



/***/ }),

/***/ "./src/app/_models/Pagination.ts":
/*!***************************************!*\
  !*** ./src/app/_models/Pagination.ts ***!
  \***************************************/
/*! exports provided: PaginationResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaginationResult", function() { return PaginationResult; });
class PaginationResult {
}


/***/ }),

/***/ "./src/app/_models/Role.ts":
/*!*********************************!*\
  !*** ./src/app/_models/Role.ts ***!
  \*********************************/
/*! exports provided: Role */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Role", function() { return Role; });
class Role {
    constructor(name) {
        this.name = name;
    }
}


/***/ }),

/***/ "./src/app/_models/user.ts":
/*!*********************************!*\
  !*** ./src/app/_models/user.ts ***!
  \*********************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
class User {
}


/***/ }),

/***/ "./src/app/_models/webApiKey.ts":
/*!**************************************!*\
  !*** ./src/app/_models/webApiKey.ts ***!
  \**************************************/
/*! exports provided: WebApiKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebApiKey", function() { return WebApiKey; });
class WebApiKey {
}


/***/ }),

/***/ "./src/app/_resolvers/logs-list.resolver.ts":
/*!**************************************************!*\
  !*** ./src/app/_resolvers/logs-list.resolver.ts ***!
  \**************************************************/
/*! exports provided: LogsListResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsListResolver", function() { return LogsListResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_services/log.service */ "./src/app/_services/log.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let LogsListResolver = class LogsListResolver {
    constructor(router, alertify, logService) {
        this.router = router;
        this.alertify = alertify;
        this.logService = logService;
    }
    resolve(route) {
        return this.logService.getLogs().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(err => {
            this.alertify.error('Problem retrieving data');
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
        }));
    }
};
LogsListResolver = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"], _services_log_service__WEBPACK_IMPORTED_MODULE_5__["LogService"]])
], LogsListResolver);



/***/ }),

/***/ "./src/app/_resolvers/user-edit.resolver.ts":
/*!**************************************************!*\
  !*** ./src/app/_resolvers/user-edit.resolver.ts ***!
  \**************************************************/
/*! exports provided: MemberEditResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemberEditResolver", function() { return MemberEditResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let MemberEditResolver = class MemberEditResolver {
    constructor(userService, router, authService) {
        this.userService = userService;
        this.router = router;
        this.authService = authService;
    }
    resolve(route) {
        return this.userService.getById(this.authService.decodedToken.nameid).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(error => {
            this.router.navigate(['/dashboard']);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
        }));
    }
};
MemberEditResolver = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
    __metadata("design:paramtypes", [_services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
], MemberEditResolver);



/***/ }),

/***/ "./src/app/_services/admin.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/admin.service.ts ***!
  \********************************************/
/*! exports provided: AdminService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminService", function() { return AdminService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AdminService = class AdminService {
    constructor(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl;
    }
    getUsersWithRoles() {
        return this.http.get(this.baseUrl + 'admin/user/usersWithRoles');
    }
    updateUserRoles(user, roles) {
        return this.http.put(this.baseUrl + 'admin/user/' + user.username, roles);
    }
    deleteUser(username) {
        return this.http.delete(this.baseUrl + 'admin/user/delete/' + username);
    }
    getRoles() {
        return this.http.get(this.baseUrl + 'admin/role');
    }
    deleteRole(id) {
        return this.http.delete(this.baseUrl + 'admin/role/' + id);
    }
    addRole(roleToAdd) {
        return this.http.post(this.baseUrl + 'admin/role', { roleNames: [roleToAdd] });
    }
};
AdminService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], AdminService);



/***/ }),

/***/ "./src/app/_services/alertify.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/alertify.service.ts ***!
  \***********************************************/
/*! exports provided: AlertifyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertifyService", function() { return AlertifyService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AlertifyService = class AlertifyService {
    constructor() { }
    confirm(message, okCallback) {
        alertify.confirm(message, function (e) {
            if (e) {
                okCallback();
            }
            else {
            }
        });
    }
    success(message) {
        alertify.success(message);
    }
    error(message) {
        alertify.error(message);
    }
    warning(message) {
        alertify.warning(message);
    }
    message(message) {
        alertify.message(message);
    }
};
AlertifyService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], AlertifyService);



/***/ }),

/***/ "./src/app/_services/auth.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/auth.service.ts ***!
  \*******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var _models_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_models/user */ "./src/app/_models/user.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _models_webApiKey__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_models/webApiKey */ "./src/app/_models/webApiKey.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + 'auth/';
        this.jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"]();
    }
    // public get currentUserValue(): User {
    //   return this.currentUserSubject.value;
    // }
    login(username, password) {
        return this.http.post(this.baseUrl + 'login', { username, password })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(response => {
            if (response && response.token) {
                if (response.user) {
                    const userToSave = this.userFromToken(response.user);
                    localStorage.setItem('currentUser', JSON.stringify(userToSave));
                    this.currentUser = userToSave;
                }
                localStorage.setItem('token', response.token);
                this.decodedToken = this.jwtHelper.decodeToken(response.token);
            }
            return response;
        }));
    }
    userFromToken(userFromToken) {
        const user = new _models_user__WEBPACK_IMPORTED_MODULE_4__["User"]();
        user.id = userFromToken.id;
        user.username = userFromToken.username;
        const webApiKey = new _models_webApiKey__WEBPACK_IMPORTED_MODULE_6__["WebApiKey"]();
        webApiKey.apiKey = userFromToken.webApiKey;
        user.webApiKey = webApiKey;
        user.token = userFromToken.token;
        return user;
    }
    register(model) {
        return this.http.post(this.baseUrl + 'register', model);
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.decodedToken = null;
        this.currentUser = null;
    }
    loggedIn() {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
    roleMatch(allowedRoles) {
        let isMatch = false;
        const userRoles = this.decodedToken.role;
        allowedRoles.forEach(element => {
            if (userRoles.includes(element)) {
                isMatch = true;
                return;
            }
        });
        return isMatch;
    }
};
AuthService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
], AuthService);



/***/ }),

/***/ "./src/app/_services/error.interceptor.ts":
/*!************************************************!*\
  !*** ./src/app/_services/error.interceptor.ts ***!
  \************************************************/
/*! exports provided: ErrorInterceptor, ErrorInterceptorProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptor", function() { return ErrorInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorInterceptorProvider", function() { return ErrorInterceptorProvider; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




let ErrorInterceptor = class ErrorInterceptor {
    intercept(req, next) {
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(error => {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpErrorResponse"]) {
                if (error.status === 401) {
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error.statusText);
                }
                const applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    console.error(applicationError);
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(applicationError);
                }
                const serverError = error.error;
                let modalStateErrors = '';
                if (serverError && typeof serverError === 'object') {
                    for (const key in serverError) {
                        if (serverError[key]) {
                            modalStateErrors += serverError[key] + '\n';
                        }
                    }
                }
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(modalStateErrors || serverError || 'Server Error');
            }
        }));
    }
};
ErrorInterceptor = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
], ErrorInterceptor);

const ErrorInterceptorProvider = {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"],
    useClass: ErrorInterceptor,
    multi: true
};


/***/ }),

/***/ "./src/app/_services/log.service.ts":
/*!******************************************!*\
  !*** ./src/app/_services/log.service.ts ***!
  \******************************************/
/*! exports provided: LogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogService", function() { return LogService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _models_Pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_models/Pagination */ "./src/app/_models/Pagination.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let LogService = class LogService {
    constructor(http) {
        this.http = http;
        this.baseUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl + 'userLog/';
    }
    getLogs(page, itemsPerPage, userParams) {
        const paginatedResult = new _models_Pagination__WEBPACK_IMPORTED_MODULE_4__["PaginationResult"]();
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        if (userParams != null) {
            params = params.append('timeUnits', userParams.timeUnits);
            params = params.append('timeValue', userParams.timeValue);
            params = params.append('orderBy', userParams.orderBy);
        }
        return this.http.get(this.baseUrl, { observe: 'response', params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(response => {
            paginatedResult.result = response.body;
            if (response.headers.get('Pagination') != null) {
                paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginatedResult;
        }));
    }
    getLog(id) {
        return this.http.get(`${this.baseUrl}${id}`).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(log => {
            if (log.hasOwnProperty('progLanguage')) {
                const _log = log;
                _log.headers = JSON.parse(_log.headers);
                _log.sessionInfo = JSON.parse(_log.sessionInfo);
                _log.stackTrace = JSON.parse(_log.stackTrace);
                // _log.stacktrace = JSON.parse(_log.stacktrace);
                return log;
            }
            else {
                return log;
            }
        }));
    }
};
LogService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], LogService);



/***/ }),

/***/ "./src/app/_services/user.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/user.service.ts ***!
  \*******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].apiUrl;
    }
    getAll() {
        return this.http.get(`${this.baseUrl}users`);
    }
    getById(id) {
        return this.http.get(`${this.baseUrl}users/${id}`);
    }
    update(user) {
        return this.http.put(`${this.baseUrl}users/${user.id}`, user);
    }
    delete(id) {
        return this.http.delete(`${this.baseUrl}users/${id}`);
    }
    updateTrustedHosts(id, trustedHosts) {
        return this.http.post(this.baseUrl + 'user/update/' + id, trustedHosts);
    }
};
UserService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], UserService);



/***/ }),

/***/ "./src/app/admin/admin-panel/admin-panel.component.css":
/*!*************************************************************!*\
  !*** ./src/app/admin/admin-panel/admin-panel.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLXBhbmVsL2FkbWluLXBhbmVsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/admin/admin-panel/admin-panel.component.html":
/*!**************************************************************!*\
  !*** ./src/app/admin/admin-panel/admin-panel.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n    <h2>Admin Panel</h2>\n    <div class=\"tab-panel\">\n        <tabset class=\"member-tabset\">\n            <tab heading=\"User Management\" *appHasRole=\"['Admin']\">\n                <div class=\"container\">\n                    <app-user-management></app-user-management>\n                </div>\n            </tab>\n            <tab heading=\"Roles Management\" *appHasRole=\"['Admin']\">\n                <app-roles-management></app-roles-management>\n            </tab>\n        </tabset>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/admin/admin-panel/admin-panel.component.ts":
/*!************************************************************!*\
  !*** ./src/app/admin/admin-panel/admin-panel.component.ts ***!
  \************************************************************/
/*! exports provided: AdminPanelComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminPanelComponent", function() { return AdminPanelComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let AdminPanelComponent = class AdminPanelComponent {
    constructor() { }
    ngOnInit() {
    }
};
AdminPanelComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-admin-panel',
        template: __webpack_require__(/*! ./admin-panel.component.html */ "./src/app/admin/admin-panel/admin-panel.component.html"),
        styles: [__webpack_require__(/*! ./admin-panel.component.css */ "./src/app/admin/admin-panel/admin-panel.component.css")]
    }),
    __metadata("design:paramtypes", [])
], AdminPanelComponent);



/***/ }),

/***/ "./src/app/admin/roles-management/roles-management.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/admin/roles-management/roles-management.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3JvbGVzLW1hbmFnZW1lbnQvcm9sZXMtbWFuYWdlbWVudC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/admin/roles-management/roles-management.component.html":
/*!************************************************************************!*\
  !*** ./src/app/admin/roles-management/roles-management.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <table class=\"table border text-center\">\n        <thead>\n        <tr>\n            <th scope=\"col\">#</th>\n            <th scope=\"col\">Name</th>\n            <th scope=\"col\">Action</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let role of (roles$ | async)\">\n            <td>{{role.id}}</td>\n            <td>{{role.name}}</td>\n            <td>\n                <button [disabled]=\"canDeleteRole(role.name)\" class=\"btn btn-danger\"\n                        (click)=\"deleteRole(role.id, role.name)\">Delete\n                </button>\n            </td>\n        </tr>\n        <tr>\n            <td colspan=\"2\">\n                <form id=\"addRoleForm\" #addRoleForm=\"ngForm\" (ngSubmit)=\"addRole()\">\n                    <div class=\"form-group\">\n                        <input type=\"text\" class=\"form-control\" required name=\"roleName\" [(ngModel)]=\"roleToAdd\"\n                               placeholder=\"Role name\">\n                    </div>\n                </form>\n            </td>\n            <td>\n                <button class=\"btn btn-success mr-2\" form=\"addRoleForm\" type=\"submit\">Add</button>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n</div>\n<div class=\"row\">\n\n\n</div>"

/***/ }),

/***/ "./src/app/admin/roles-management/roles-management.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/admin/roles-management/roles-management.component.ts ***!
  \**********************************************************************/
/*! exports provided: RolesManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesManagementComponent", function() { return RolesManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _models_Role__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_models/Role */ "./src/app/_models/Role.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/bundles/ngx-bootstrap.es2015.js");
/* harmony import */ var _confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../confirm-modal/confirm-modal.component */ "./src/app/confirm-modal/confirm-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let RolesManagementComponent = class RolesManagementComponent {
    constructor(adminService, cdr, modalService) {
        this.adminService = adminService;
        this.cdr = cdr;
        this.modalService = modalService;
        this.roleToAdd = '';
    }
    canDeleteRole(name) {
        const _name = name.toLowerCase();
        return (_name === 'admin' || _name === 'user');
    }
    ngOnInit() {
        this.roles$ = this.adminService.getRoles();
    }
    deleteRole(id, roleName) {
        this.showConfirmationModal(id, roleName);
    }
    addRole() {
        this.adminService.addRole(this.roleToAdd).subscribe(result => {
            console.log('Role added successfully');
            const role = new _models_Role__WEBPACK_IMPORTED_MODULE_1__["Role"](this.roleToAdd);
            this.roleToAdd = '';
            const newRoles = this.roles$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["scan"])(acc => acc.concat(role)));
            this.roles$ = null;
            this.roles$ = newRoles;
            this.roles$.subscribe(value => console.log(value));
            this.cdr.detectChanges();
        }, error1 => console.log('Role added unsuccessfully'));
    }
    cancel() {
        console.log('canceled');
        this.roleToAdd = '';
        this.cdr.detectChanges();
    }
    showConfirmationModal(id, roleName) {
        const modal = this.modalService.show(_confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_5__["ConfirmModalComponent"]);
        modal.content.showConfirmationModal('Delete role confirmation', `Are you sure you want delete ${roleName} role?`);
        modal.content.onClose.subscribe(result => {
            if (result === true) {
                this.adminService.deleteRole(id).subscribe(res => {
                    this.roles$ = this.roles$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])((roles, index) => roles[index].id !== id));
                    this.cdr.detectChanges();
                }, error1 => console.log('Role delete failed'));
            }
            else if (result === false) {
                // when pressed No
            }
            else {
                // When closing the modal without no or yes
            }
        });
    }
};
RolesManagementComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-roles-management',
        template: __webpack_require__(/*! ./roles-management.component.html */ "./src/app/admin/roles-management/roles-management.component.html"),
        styles: [__webpack_require__(/*! ./roles-management.component.css */ "./src/app/admin/roles-management/roles-management.component.css")]
    }),
    __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_2__["AdminService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"], ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsModalService"]])
], RolesManagementComponent);



/***/ }),

/***/ "./src/app/admin/roles-modal/roles-modal.component.css":
/*!*************************************************************!*\
  !*** ./src/app/admin/roles-modal/roles-modal.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3JvbGVzLW1vZGFsL3JvbGVzLW1vZGFsLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/admin/roles-modal/roles-modal.component.html":
/*!**************************************************************!*\
  !*** ./src/app/admin/roles-modal/roles-modal.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <h4 class=\"modal-title pull-left\">Edit roles for {{user.username}}</h4>\n  <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"bsModalRef.hide()\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\">\n  <form #rolesForm=\"ngForm\" id=\"rolesForm\">\n    <div class=\"form-check\" *ngFor=\"let role of roles\">\n      <input type=\"checkbox\" class=\"form-check-input\" value=\"{{role.name}}\" [checked]=\"role.checked\" (change)=\"role.checked = !role.checked\"\n        [disabled]=\"role.name === 'Admin' && user.username === 'Admin'\">\n      <label>{{role.name}}</label>\n    </div>\n  </form>\n</div>\n<div class=\"modal-footer\">\n  <button type=\"button\" class=\"btn btn-default\" (click)=\"bsModalRef.hide()\">Cancel</button>\n  <button type=\"button\" class=\"btn btn-success\" (click)=\"updateRoles()\" form=\"rolesForm\">Submit</button>\n</div>"

/***/ }),

/***/ "./src/app/admin/roles-modal/roles-modal.component.ts":
/*!************************************************************!*\
  !*** ./src/app/admin/roles-modal/roles-modal.component.ts ***!
  \************************************************************/
/*! exports provided: RolesModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RolesModalComponent", function() { return RolesModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/bundles/ngx-bootstrap.es2015.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


let RolesModalComponent = class RolesModalComponent {
    constructor(bsModalRef) {
        this.bsModalRef = bsModalRef;
        this.updateSelectedRoles = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() { }
    updateRoles() {
        this.updateSelectedRoles.emit(this.roles);
        this.bsModalRef.hide();
    }
};
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
    __metadata("design:type", Object)
], RolesModalComponent.prototype, "updateSelectedRoles", void 0);
RolesModalComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-roles-modal',
        template: __webpack_require__(/*! ./roles-modal.component.html */ "./src/app/admin/roles-modal/roles-modal.component.html"),
        styles: [__webpack_require__(/*! ./roles-modal.component.css */ "./src/app/admin/roles-modal/roles-modal.component.css")]
    }),
    __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]])
], RolesModalComponent);



/***/ }),

/***/ "./src/app/admin/user-management/user-management.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/admin/user-management/user-management.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3VzZXItbWFuYWdlbWVudC91c2VyLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/admin/user-management/user-management.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/admin/user-management/user-management.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <table class=\"table border\">\n        <tr>\n            <th style=\"width: 10%\">User ID</th>\n            <th style=\"width: 30%\">Username</th>\n            <th style=\"width: 40%\">Active Roles</th>\n            <th style=\"width: 20%\"></th>\n        </tr>\n        <tr *ngFor=\"let user of users\">\n            <td>{{user.id}}</td>\n            <td>{{user.username}}</td>\n            <td>{{user.roles}}</td>\n            <td>\n                <button class=\"btn btn-info m-1\" (click)=\"editRolesModal(user)\">Edit Roles</button>\n                <button class=\"btn btn-danger m-1\" [disabled]=\"user.username == 'Admin'\" (click)=\"deleteUser(user.username)\">Delete</button>\n            </td>\n        </tr>\n    </table>\n    <div class=\" col float-right\">\n        <button class=\"btn btn-success float-right\">Add</button>\n    </div>\n\n\n</div>"

/***/ }),

/***/ "./src/app/admin/user-management/user-management.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/user-management/user-management.component.ts ***!
  \********************************************************************/
/*! exports provided: UserManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserManagementComponent", function() { return UserManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/bundles/ngx-bootstrap.es2015.js");
/* harmony import */ var _roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../roles-modal/roles-modal.component */ "./src/app/admin/roles-modal/roles-modal.component.ts");
/* harmony import */ var _confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../confirm-modal/confirm-modal.component */ "./src/app/confirm-modal/confirm-modal.component.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let UserManagementComponent = class UserManagementComponent {
    constructor(adminService, changeDetectorRef, modalService, alertify) {
        this.adminService = adminService;
        this.changeDetectorRef = changeDetectorRef;
        this.modalService = modalService;
        this.alertify = alertify;
    }
    ngOnInit() {
        this.getUsersWithRoles();
        this.getAvailableRoles();
    }
    deleteUser(username) {
        this.showConfirmationModal(username);
    }
    getUsersWithRoles() {
        this.adminService.getUsersWithRoles().subscribe((users) => {
            this.users = users;
            this.changeDetectorRef.detectChanges();
        }, err => {
            this.alertify.error(err);
        });
    }
    getAvailableRoles() {
        this.adminService.getRoles().subscribe((roles) => {
            this.availableRoles = roles;
        });
    }
    editRolesModal(user) {
        const initialState = {
            user,
            roles: this.getRolesArray(user)
        };
        this.bsModalRef = this.modalService.show(_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_3__["RolesModalComponent"], {
            initialState
        });
        this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
            const rolesToUpdate = {
                roleNames: values.filter(el => el.checked === true).map(el => el.name)
            };
            if (rolesToUpdate) {
                this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
                    this.getUsersWithRoles();
                    this.changeDetectorRef.detectChanges();
                    this.alertify.success('Roles updated successfully');
                }, err => {
                    this.alertify.error(err);
                });
            }
        });
    }
    getRolesArray(user) {
        const roles = [];
        const userRoles = user.roles;
        for (let i = 0; i < this.availableRoles.length; i++) {
            let isMatch = false;
            for (let j = 0; j < userRoles.length; j++) {
                if (this.availableRoles[i].name === userRoles[j]) {
                    isMatch = true;
                    this.availableRoles[i].checked = true;
                    roles.push(this.availableRoles[i]);
                    break;
                }
            }
            if (!isMatch) {
                this.availableRoles[i].checked = false;
                roles.push(this.availableRoles[i]);
            }
        }
        return roles;
    }
    showConfirmationModal(username) {
        const modal = this.modalService.show(_confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_4__["ConfirmModalComponent"]);
        modal.content.showConfirmationModal('Delete user confirmation', `Are you sure you want delete user "${username}"?`);
        modal.content.onClose.subscribe(result => {
            if (result === true) {
                this.adminService.deleteUser(username).subscribe(response => {
                    this.users = this.users.filter(u => u.username !== username);
                    this.changeDetectorRef.detectChanges();
                    this.alertify.success('User removed successfully');
                }, err => {
                    this.alertify.error(err);
                });
            }
            else if (result === false) {
                // when pressed No
            }
            else {
                // When closing the modal without no or yes
            }
        });
    }
};
UserManagementComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-user-management',
        template: __webpack_require__(/*! ./user-management.component.html */ "./src/app/admin/user-management/user-management.component.html"),
        styles: [__webpack_require__(/*! ./user-management.component.css */ "./src/app/admin/user-management/user-management.component.css")]
    }),
    __metadata("design:paramtypes", [_services_admin_service__WEBPACK_IMPORTED_MODULE_1__["AdminService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
        ngx_bootstrap__WEBPACK_IMPORTED_MODULE_2__["BsModalService"],
        _services_alertify_service__WEBPACK_IMPORTED_MODULE_5__["AlertifyService"]])
], UserManagementComponent);



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\r\n    position: absolute;\r\n    left: 0;\r\n    right: 0;\r\n    bottom: 0;\r\n    top: 0;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxtQkFBbUI7SUFDbkIsUUFBUTtJQUNSLFNBQVM7SUFDVCxVQUFVO0lBQ1YsT0FBTztDQUNWIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICBib3R0b206IDA7XHJcbiAgICB0b3A6IDA7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-nav></app-nav>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let AppComponent = class AppComponent {
    constructor(authService) {
        this.authService = authService;
        this.title = 'cems-SPA';
        this.jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_2__["JwtHelperService"]();
    }
    ngOnInit() {
        const token = localStorage.getItem('token');
        if (token) {
            this.authService.decodedToken = this.jwtHelper.decodeToken(token);
        }
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            this.authService.currentUser = user;
        }
    }
};
AppComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: tokenGetter, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenGetter", function() { return tokenGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/bundles/ngx-bootstrap.es2015.js");
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/tabs */ "./node_modules/ngx-bootstrap/tabs/fesm2015/ngx-bootstrap-tabs.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/nav/nav.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_error_interceptor__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./_services/error.interceptor */ "./src/app/_services/error.interceptor.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./routes */ "./src/app/routes.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
/* harmony import */ var _dashboard_log_list_log_list_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./dashboard/log-list/log-list.component */ "./src/app/dashboard/log-list/log-list.component.ts");
/* harmony import */ var _dashboard_log_detail_log_detail_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./dashboard/log-detail/log-detail.component */ "./src/app/dashboard/log-detail/log-detail.component.ts");
/* harmony import */ var _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./admin/admin-panel/admin-panel.component */ "./src/app/admin/admin-panel/admin-panel.component.ts");
/* harmony import */ var _directives_hasRole_directive__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./_directives/hasRole.directive */ "./src/app/_directives/hasRole.directive.ts");
/* harmony import */ var _admin_user_management_user_management_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./admin/user-management/user-management.component */ "./src/app/admin/user-management/user-management.component.ts");
/* harmony import */ var _services_admin_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./_services/admin.service */ "./src/app/_services/admin.service.ts");
/* harmony import */ var _admin_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./admin/roles-modal/roles-modal.component */ "./src/app/admin/roles-modal/roles-modal.component.ts");
/* harmony import */ var _users_users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./users/users-edit/users-edit.component */ "./src/app/users/users-edit/users-edit.component.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _resolvers_user_edit_resolver__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./_resolvers/user-edit.resolver */ "./src/app/_resolvers/user-edit.resolver.ts");
/* harmony import */ var _GlobalErrorHandler__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./GlobalErrorHandler */ "./src/app/GlobalErrorHandler.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _admin_roles_management_roles_management_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./admin/roles-management/roles-management.component */ "./src/app/admin/roles-management/roles-management.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./confirm-modal/confirm-modal.component */ "./src/app/confirm-modal/confirm-modal.component.ts");
/* harmony import */ var _error_throw_error_throw_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./error-throw/error-throw.component */ "./src/app/error-throw/error-throw.component.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _resolvers_logs_list_resolver__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./_resolvers/logs-list.resolver */ "./src/app/_resolvers/logs-list.resolver.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



































function tokenGetter() {
    return localStorage.getItem('token');
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"],
            _home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"],
            _nav_nav_component__WEBPACK_IMPORTED_MODULE_9__["NavComponent"],
            _register_register_component__WEBPACK_IMPORTED_MODULE_10__["RegisterComponent"],
            _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_13__["DashboardComponent"],
            _dashboard_log_list_log_list_component__WEBPACK_IMPORTED_MODULE_17__["LogListComponent"],
            _dashboard_log_detail_log_detail_component__WEBPACK_IMPORTED_MODULE_18__["LogDetailComponent"],
            _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_19__["AdminPanelComponent"],
            _directives_hasRole_directive__WEBPACK_IMPORTED_MODULE_20__["HasRoleDirective"],
            _admin_user_management_user_management_component__WEBPACK_IMPORTED_MODULE_21__["UserManagementComponent"],
            _admin_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_23__["RolesModalComponent"],
            _users_users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_24__["UsersEditComponent"],
            _admin_roles_management_roles_management_component__WEBPACK_IMPORTED_MODULE_29__["RolesManagementComponent"],
            _login_login_component__WEBPACK_IMPORTED_MODULE_30__["LoginComponent"],
            _confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_31__["ConfirmModalComponent"],
            _error_throw_error_throw_component__WEBPACK_IMPORTED_MODULE_32__["ErrorThrowComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["BsDropdownModule"].forRoot(),
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["PaginationModule"].forRoot(),
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ButtonsModule"].forRoot(),
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_5__["TabsModule"].forRoot(),
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forRoot(_routes__WEBPACK_IMPORTED_MODULE_14__["appRoutes"]),
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ModalModule"].forRoot(),
            _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_16__["JwtModule"].forRoot({
                config: {
                    tokenGetter: tokenGetter,
                    whitelistedDomains: [_environments_environment__WEBPACK_IMPORTED_MODULE_33__["environment"].whitelistedDomain],
                    blacklistedRoutes: [_environments_environment__WEBPACK_IMPORTED_MODULE_33__["environment"].blacklistedRoute]
                }
            })
        ],
        entryComponents: [_admin_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_23__["RolesModalComponent"], _confirm_modal_confirm_modal_component__WEBPACK_IMPORTED_MODULE_31__["ConfirmModalComponent"]],
        providers: [
            _services_auth_service__WEBPACK_IMPORTED_MODULE_11__["AuthService"],
            _services_error_interceptor__WEBPACK_IMPORTED_MODULE_12__["ErrorInterceptorProvider"],
            _guards_auth_guard__WEBPACK_IMPORTED_MODULE_15__["AuthGuard"],
            _services_admin_service__WEBPACK_IMPORTED_MODULE_22__["AdminService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_25__["UserService"],
            _resolvers_user_edit_resolver__WEBPACK_IMPORTED_MODULE_26__["MemberEditResolver"],
            _resolvers_logs_list_resolver__WEBPACK_IMPORTED_MODULE_34__["LogsListResolver"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_28__["AlertifyService"],
            {
                provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ErrorHandler"],
                useClass: _GlobalErrorHandler__WEBPACK_IMPORTED_MODULE_27__["GlobalErrorHandler"]
            }
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/confirm-modal/confirm-modal.component.css":
/*!***********************************************************!*\
  !*** ./src/app/confirm-modal/confirm-modal.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbmZpcm0tbW9kYWwvY29uZmlybS1tb2RhbC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/confirm-modal/confirm-modal.component.html":
/*!************************************************************!*\
  !*** ./src/app/confirm-modal/confirm-modal.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onConfirm()\" *ngIf=\"active\">\n    <div class=\"modal-header\">\n        <h4 class=\"modal-title pull-left\">\n            {{title}}\n        </h4>\n        <button type=\"button\" class=\"close pull-right\" (click)=\"hideConfirmationModal()\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <p>{{body}}</p>\n    </div>\n    <div class=\"modal-footer\">\n        <div class=\"text-right\">\n            <button type=\"submit\" class=\"btn btn-success\">\n                Yes\n            </button>\n            <button type=\"button\" class=\"btn btn-default ml-2\" (click)=\"onCancel()\">\n                cancel\n            </button>\n        </div>\n    </div>\n</form>"

/***/ }),

/***/ "./src/app/confirm-modal/confirm-modal.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/confirm-modal/confirm-modal.component.ts ***!
  \**********************************************************/
/*! exports provided: ConfirmModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmModalComponent", function() { return ConfirmModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/bundles/ngx-bootstrap.es2015.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let ConfirmModalComponent = class ConfirmModalComponent {
    constructor(_bsModalRef) {
        this._bsModalRef = _bsModalRef;
        this.active = false;
    }
    ngOnInit() {
        this.onClose = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    showConfirmationModal(title, body) {
        this.title = title;
        this.body = body;
        this.active = true;
    }
    onConfirm() {
        this.active = false;
        this.onClose.next(true);
        this._bsModalRef.hide();
    }
    onCancel() {
        this.active = false;
        this.onClose.next(false);
        this._bsModalRef.hide();
    }
    hideConfirmationModal() {
        this.active = false;
        this.onClose.next(null);
        this._bsModalRef.hide();
    }
};
ConfirmModalComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-confirm-modal',
        template: __webpack_require__(/*! ./confirm-modal.component.html */ "./src/app/confirm-modal/confirm-modal.component.html"),
        styles: [__webpack_require__(/*! ./confirm-modal.component.css */ "./src/app/confirm-modal/confirm-modal.component.css")]
    }),
    __metadata("design:paramtypes", [ngx_bootstrap__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]])
], ConfirmModalComponent);



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/*!***************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".thActive {\r\n    color: #007bff !important;\r\n    cursor: pointer;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksMEJBQTBCO0lBQzFCLGdCQUFnQjtDQUNuQiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi50aEFjdGl2ZSB7XHJcbiAgICBjb2xvcjogIzAwN2JmZiAhaW1wb3J0YW50O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/*!****************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container p-3 text-center\">\n    <!--\n      <div class=\"row\">\n          <div class=\"col\">\n              <app-log-list [logs]=\"logs\"></app-log-list>\n          </div>\n      </div>\n    -->\n    <form class=\"form-inline justify-content-end\" #form=\"ngForm\" (ngSubmit)=\"loadLogs()\" novalidate>\n        <div class=\"form-group\">\n            <label for=\"timeValue\">Last </label>\n            <input type=\"number\" class=\"form-control ml-1\" style=\"width:70px\" id=\"timeValue\" name=\"timeValue\"\n                   [(ngModel)]=\"userParams.timeValue\"/>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"timeUnits\"></label>\n            <select class=\"form-control ml-1\" style=\"width: 110px;\" id=\"timeUnits\" name=\"timeUnits\"\n                    [(ngModel)]=\"userParams.timeUnits\">\n                <option *ngFor=\"let unit of timeUnits\" [value]=\"unit.value\">\n                    {{unit.display}}\n                </option>\n            </select>\n            <button type=\"submit\" class=\"btn btn-primary\" style=\"margin-left: 10px\">Apply Filters</button>\n            <button type=\"button\" class=\"btn btn-info\" (click)=\"resetFilters()\" style=\"margin-left: 10px\">Reset\n                Filters\n            </button>\n\n        </div>\n    </form>\n    <br>\n\n    <table class=\"table table-stripped table-hover table-bordered\">\n        <thead class=\"thead-light\">\n        <tr>\n            <th [class]=\"currentOrderBy == 'id' ? 'thActive' : '' \" (click)=\"sort('id')\">Id</th>\n            <th>Message</th>\n            <th [class]=\"currentOrderBy == 'source' ? 'thActive' : '' \" (click)=\"sort('source')\"> Source</th>\n            <th [class]=\"currentOrderBy == 'timestamp' ? 'thActive' : '' \" (click)=\"sort('timestamp')\">Timestamp</th>\n            <th [class]=\"currentOrderBy == 'progLng' ? 'thActive' : '' \" (click)=\"sort('progLng')\">Programming language\n            </th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let log of logs\" [routerLink]=\"['/logDetails', log.id]\">\n            <td>{{ log.id }}</td>\n            <td>{{ log.message }}</td>\n            <td>{{ log.source }}</td>\n            <td>{{ log.timestamp | date: 'medium' }}</td>\n            <td>{{ log.progLanguage }}</td>\n        </tr>\n        </tbody>\n    </table>\n</div>\n\n<div class=\"d-flex justify-content-center\">\n    <pagination [boundaryLinks]=\"true\"\n                [totalItems]=\"pagination.totalItems\"\n                [(ngModel)]=\"pagination.currentPage\"\n                [itemsPerPage]=\"pagination.itemsPerPage\"\n                (pageChanged)=\"pageChanged($event)\"\n                previousText=\"&lsaquo;\" nextText=\"&rsaquo;\" firstText=\"&laquo;\"\n                lastText=\"&raquo;\">\n    </pagination>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/*!**************************************************!*\
  !*** ./src/app/dashboard/dashboard.component.ts ***!
  \**************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_log_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/log.service */ "./src/app/_services/log.service.ts");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let DashboardComponent = class DashboardComponent {
    constructor(logService, authService, route, alertify, ref) {
        this.logService = logService;
        this.authService = authService;
        this.route = route;
        this.alertify = alertify;
        this.ref = ref;
        this.timeUnits = [
            { value: 'min', display: 'minutes' },
            { value: 'h', display: 'hours' },
            { value: 'd', display: 'days' }
            // { value: 'm', display: 'months' }
        ];
        this.userParams = {};
    }
    ngOnInit() {
        this.route.data.subscribe(data => {
            this.logs = data['logs'].result;
            this.pagination = data['logs'].pagination;
        });
        this.userParams.timeValue = 1;
        this.userParams.timeUnits = 'd';
        this.userParams.orderBy = 'timestamp';
    }
    resetFilters() {
        this.userParams.timeValue = 1;
        this.userParams.timeUnits = 'd';
        this.loadLogs();
    }
    sort(orderBy) {
        this.userParams.orderBy = orderBy;
        this.currentOrderBy = orderBy;
        this.loadLogs();
    }
    pageChanged(event) {
        this.pagination.currentPage = event.page;
        console.log(event.page);
        this.loadLogs();
    }
    loadLogs() {
        this.logService.getLogs(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
            .subscribe((res) => {
            this.logs = res.result;
            this.pagination = res.pagination;
            this.ref.detectChanges();
        }, error1 => {
            this.alertify.error(error1);
        });
    }
};
DashboardComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/dashboard/dashboard.component.html"),
        styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/dashboard/dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [_services_log_service__WEBPACK_IMPORTED_MODULE_1__["LogService"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
        _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
], DashboardComponent);



/***/ }),

/***/ "./src/app/dashboard/log-detail/log-detail.component.css":
/*!***************************************************************!*\
  !*** ./src/app/dashboard/log-detail/log-detail.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9sb2ctZGV0YWlsL2xvZy1kZXRhaWwuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/dashboard/log-detail/log-detail.component.html":
/*!****************************************************************!*\
  !*** ./src/app/dashboard/log-detail/log-detail.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"log$ | async as log\">\n    <div class=\"container\">\n\n        <tabset>\n            <tab heading=\"Info\" id=\"tab1\">\n                <div *ngIf=\"!isNullOrEmpty(log.stackTrace)\" class=\"card my-3 \">\n                    <div class=\"card-header\">\n                        Basic Info\n                    </div>\n                    <div class=\"card-body\">\n                        <div class=\"px-2\">\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    <div class=\"h2\"><code> {{log.name}}</code></div>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col\">\n                                    {{ log.timestamp | date: 'medium' }}\n                                </div>\n                            </div>\n                            <div class=\"card mt-3\">\n                                <div class=\"card-header\">\n                                    Message\n                                </div>\n                                <div class=\"card-body \">\n                                    <div class=\"\"><code>{{log.message}}</code></div>\n                                </div>\n                            </div>\n                            <div class=\"card mt-3\">\n                                <div class=\"card-header\">\n                                    Stacktrace\n                                </div>\n                                <div class=\"card-body\">\n                                    <div class=\"row  p-0\" *ngFor=\"let obj of log.stackTrace\">\n                                        <div class=\"col\">\n                                            <code class=\"js\">{{obj.fileName}}:{{obj.lineNumber}}:{{obj.columnNumber}}</code>\n                                            in\n                                            function\n                                            <code class=\"js\">{{obj.functionName}}</code>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n\n                        </div>\n                    </div>\n                </div>\n            </tab>\n            <tab heading=\"User\">\n                <div *ngIf=\"!isNullOrEmpty(log.ip)\" class=\"card  my-3\">\n                    <div class=\"card-header\">\n                        Client public ip address\n                    </div>\n                    <div class=\"card-body\">\n                        {{log.ip}}\n                    </div>\n                </div>\n            </tab>\n            <tab heading=\"Headers\">\n                <div *ngIf=\"log.headers\" class=\"card my-3\">\n                    <div class=\"card-header\">\n                        Headers\n                    </div>\n                    <div class=\"card-body p-0\">\n                        <table class=\"table m-0 table-sm\">\n                            <tbody>\n                            <tr *ngFor=\"let obj of log.headers\">\n                                <td class=\"border-right pl-3\">{{obj.Key}}</td>\n                                <td>{{obj.Value}}</td>\n                            </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </tab>\n            <tab heading=\"Screen\">\n                <div *ngIf=\"log.sessionInfo.screenProperties\" class=\"card mb-5 mt-3 w-50\">\n                    <div class=\"card-header\">\n                        Screen Properties\n                    </div>\n                    <div class=\"card-body p-0\">\n                        <table class=\"table m-0 table-sm\">\n                            <tbody *ngIf=\"log.sessionInfo.screenProperties as props\">\n                            <tr>\n                                <td class=\"border-right  pl-3\">Screen width</td>\n                                <td>{{props.screenScreenW}} px</td>\n                            </tr>\n                            <tr>\n                                <td class=\"border-right  pl-3 \">Screen height</td>\n                                <td>{{props.screenScreenH}} px</td>\n                            </tr>\n                            <tr>\n                                <td class=\"border-right  pl-3 \">Screen available width</td>\n                                <td>{{props.screenAvailW}} px</td>\n                            </tr>\n                            <tr>\n                                <td class=\"border-right  pl-3 \">Screen available height</td>\n                                <td>{{props.screenAvailH}} px</td>\n                            </tr>\n                            <tr>\n                                <td class=\"border-right  pl-3 \">Screen inner width</td>\n                                <td>{{props.sizeInnerW}} px</td>\n                            </tr>\n                            <tr>\n                                <td class=\"border-right  pl-3 \">Screen inner height</td>\n                                <td>{{props.sizeInnerH}} px</td>\n                            </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                </div>\n            </tab>\n            <tab heading=\"Session\">\n                <div *ngIf=\"log.sessionInfo\" class=\"card mb-5 mt-3 w-50\">\n                    <div class=\"card-header\">\n                        Session\n                    </div>\n                    <div class=\"card-body \">\n                        <div *ngIf=\"log.sessionInfo.sessionDuration\" class=\"row\">\n                            <div class=\"col\">\n                                <strong>Session duration: </strong> {{log.sessionInfo.sessionDuration}} seconds\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col\">TODO: Events</div>\n                        </div>\n                    </div>\n                </div>\n            </tab>\n        </tabset>\n\n        <!--<div class=\"row\">-->\n        <!--<div class=\"col col-2\">-->\n        <!--<h1>{{log.name}}</h1>-->\n        <!--</div>-->\n        <!--</div>-->\n\n        <!--<div *ngIf=\"!isNullOrEmpty(log.timestamp)\" class=\"row\">-->\n        <!--<div class=\"col p-2 m-2\">{{ log.timestamp | date: 'medium' }}</div>-->\n        <!--</div>-->\n\n        <!--<div *ngIf=\"!isNullOrEmpty(log.ip)\" class=\"card  my-3\">-->\n        <!--<div class=\"card-header\">-->\n        <!--Client public ip address-->\n        <!--</div>-->\n        <!--<div class=\"card-body\">-->\n        <!--{{log.ip}}-->\n        <!--</div>-->\n        <!--</div>-->\n\n        <!--<div *ngIf=\"!isNullOrEmpty(log.message)\" class=\"card  my-3\">-->\n        <!--<div class=\"card-header\">-->\n        <!--Message-->\n        <!--</div>-->\n        <!--<div class=\"card-body\">-->\n        <!--{{log.message}}-->\n        <!--</div>-->\n        <!--</div>-->\n\n        <!--<div *ngIf=\"!isNullOrEmpty(log.stackTrace)\" class=\"card my-3\">-->\n        <!--<div class=\"card-header\">-->\n        <!--StackTrace-->\n        <!--</div>-->\n        <!--<div class=\"card-body\">-->\n\n        <!--<div class=\"row\" *ngFor=\"let obj of log.stackTrace\">-->\n        <!--<div class=\"col\">-->\n        <!--<code class=\"js\">{{obj.fileName}}:{{obj.lineNumber}}:{{obj.columnNumber}}</code> in function-->\n        <!--<code class=\"js\">{{obj.functionName}}</code>-->\n        <!--</div>-->\n        <!--</div>-->\n        <!--</div>-->\n        <!--</div>-->\n\n        <!--<div *ngIf=\"log.headers\" class=\"card\">-->\n        <!--<div class=\"card-header\">-->\n        <!--Headers-->\n        <!--</div>-->\n        <!--<div class=\"card-body p-0\">-->\n        <!--<table class=\"table m-0 table-sm\">-->\n        <!--<tbody>-->\n        <!--<tr *ngFor=\"let obj of log.headers\">-->\n        <!--<td class=\"border-right pl-3\">{{obj.Key}}</td>-->\n        <!--<td>{{obj.Value}}</td>-->\n        <!--</tr>-->\n        <!--</tbody>-->\n        <!--</table>-->\n        <!--</div>-->\n        <!--</div>-->\n\n        <!--<div *ngIf=\"log.sessionInfo.screenProperties\" class=\"card mb-5 mt-3 w-50\">-->\n        <!--<div class=\"card-header\">-->\n        <!--Screen Properties-->\n        <!--</div>-->\n        <!--<div class=\"card-body p-0\">-->\n        <!--<table class=\"table m-0 table-sm\">-->\n        <!--<tbody *ngIf=\"log.sessionInfo.screenProperties as props\">-->\n        <!--<tr>-->\n        <!--<td class=\"border-right  pl-3\">Screen width</td>-->\n        <!--<td>{{props.screenScreenW}} px</td>-->\n        <!--</tr>-->\n        <!--<tr>-->\n        <!--<td class=\"border-right  pl-3 \">Screen height</td>-->\n        <!--<td>{{props.screenScreenH}} px</td>-->\n        <!--</tr>-->\n        <!--<tr>-->\n        <!--<td class=\"border-right  pl-3 \">Screen available width</td>-->\n        <!--<td>{{props.screenAvailW}} px</td>-->\n        <!--</tr>-->\n        <!--<tr>-->\n        <!--<td class=\"border-right  pl-3 \">Screen available height</td>-->\n        <!--<td>{{props.screenAvailH}} px</td>-->\n        <!--</tr>-->\n        <!--<tr>-->\n        <!--<td class=\"border-right  pl-3 \">Screen inner width</td>-->\n        <!--<td>{{props.sizeInnerW}} px</td>-->\n        <!--</tr>-->\n        <!--<tr>-->\n        <!--<td class=\"border-right  pl-3 \">Screen inner height</td>-->\n        <!--<td>{{props.sizeInnerH}} px</td>-->\n        <!--</tr>-->\n        <!--</tbody>-->\n        <!--</table>-->\n\n        <!--</div>-->\n        <!--</div>-->\n\n        <!--<div *ngIf=\"!isNullOrEmpty([log.userAgent, log.referer, log.origin])\" class=\"card my-3\">-->\n        <!--<div class=\"card-header\">-->\n        <!--Headers-->\n        <!--</div>-->\n        <!--<div class=\"card-body\">-->\n        <!--<table class=\"table\">-->\n        <!--<tbody>-->\n        <!--<tr *ngIf=\"!isNullOrEmpty(log.userAgent)\">-->\n        <!--<td>User-Agent</td>-->\n        <!--<td>{{log.userAgent}}</td>-->\n        <!--</tr>-->\n        <!--<tr *ngIf=\"!isNullOrEmpty(log.referer)\">-->\n        <!--<td>Referer</td>-->\n        <!--<td>{{log.referer}}</td>-->\n        <!--</tr>-->\n        <!--<tr *ngIf=\"!isNullOrEmpty(log.origin)\">-->\n        <!--<td>Origin</td>-->\n        <!--<td>{{log.origin}}</td>-->\n        <!--</tr>-->\n        <!--</tbody>-->\n        <!--</table>-->\n        <!--</div>-->\n        <!--</div>-->\n\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/dashboard/log-detail/log-detail.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/dashboard/log-detail/log-detail.component.ts ***!
  \**************************************************************/
/*! exports provided: LogDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogDetailComponent", function() { return LogDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_log_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/log.service */ "./src/app/_services/log.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



let LogDetailComponent = class LogDetailComponent {
    constructor(logService, route) {
        this.logService = logService;
        this.route = route;
    }
    isBrowserError() {
        return true;
        /*let _isBrowserError: boolean = false;
        this.log$.subscribe(res => _isBrowserError = (res instanceof BrowserErrorLog));
        return _isBrowserError;*/
    }
    isNullOrEmpty(field) {
        if (field instanceof Array) {
            for (let i = 0; i < field.length; i++) {
                if (field[i] === undefined || field[i] === '') {
                    return true;
                }
            }
            return false;
        }
        else {
            return (field === undefined || field === '');
        }
    }
    test(obj) {
        console.log(obj);
    }
    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.log$ = this.logService.getLog(this.id);
        // this.log$.pipe().subscribe(log => console.log(log));
    }
};
LogDetailComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-log-detail',
        template: __webpack_require__(/*! ./log-detail.component.html */ "./src/app/dashboard/log-detail/log-detail.component.html"),
        styles: [__webpack_require__(/*! ./log-detail.component.css */ "./src/app/dashboard/log-detail/log-detail.component.css")],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [src_app_services_log_service__WEBPACK_IMPORTED_MODULE_2__["LogService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
], LogDetailComponent);

// map((val: BrowserErrorLogFromServer) => {
//   const headers = JSON.parse(val.headers);
//   val.headers = headers;
//   return val as BrowserErrorLog;
// })


/***/ }),

/***/ "./src/app/dashboard/log-list/log-list.component.css":
/*!***********************************************************!*\
  !*** ./src/app/dashboard/log-list/log-list.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Rhc2hib2FyZC9sb2ctbGlzdC9sb2ctbGlzdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/dashboard/log-list/log-list.component.html":
/*!************************************************************!*\
  !*** ./src/app/dashboard/log-list/log-list.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table class=\"table table-stripped table-hover table-bordered\">\n  <thead class=\"thead-light\">\n    <tr>\n      <th>Id</th>\n      <th>Message</th>\n      <th>Source</th>\n      <th>Timestamp</th>\n      <th>Programming language</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let log of logs\" [routerLink]=\"['/logDetails', log.id]\">\n      <td>{{log.id}}</td>\n      <td>{{log.message}}</td>\n      <td>{{log.source}}</td>\n      <td>{{log.timestamp | date:'medium'}}</td>\n      <td>{{log.progLanguage}}</td>\n    </tr>\n  </tbody>\n</table>"

/***/ }),

/***/ "./src/app/dashboard/log-list/log-list.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/dashboard/log-list/log-list.component.ts ***!
  \**********************************************************/
/*! exports provided: LogListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogListComponent", function() { return LogListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let LogListComponent = class LogListComponent {
    constructor() { }
    ngOnInit() { }
};
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Array)
], LogListComponent.prototype, "logs", void 0);
LogListComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-log-list',
        template: __webpack_require__(/*! ./log-list.component.html */ "./src/app/dashboard/log-list/log-list.component.html"),
        styles: [__webpack_require__(/*! ./log-list.component.css */ "./src/app/dashboard/log-list/log-list.component.css")],
        changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [])
], LogListComponent);



/***/ }),

/***/ "./src/app/error-throw/error-throw.component.css":
/*!*******************************************************!*\
  !*** ./src/app/error-throw/error-throw.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Vycm9yLXRocm93L2Vycm9yLXRocm93LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/error-throw/error-throw.component.html":
/*!********************************************************!*\
  !*** ./src/app/error-throw/error-throw.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  error-throw works!\n</p>\n"

/***/ }),

/***/ "./src/app/error-throw/error-throw.component.ts":
/*!******************************************************!*\
  !*** ./src/app/error-throw/error-throw.component.ts ***!
  \******************************************************/
/*! exports provided: ErrorThrowComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorThrowComponent", function() { return ErrorThrowComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let ErrorThrowComponent = class ErrorThrowComponent {
    constructor() { }
    ngOnInit() {
        throw new Error(' test error');
    }
};
ErrorThrowComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-error-throw',
        template: __webpack_require__(/*! ./error-throw.component.html */ "./src/app/error-throw/error-throw.component.html"),
        styles: [__webpack_require__(/*! ./error-throw.component.css */ "./src/app/error-throw/error-throw.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ErrorThrowComponent);



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-5\">\n  <div *ngIf=\"!registerMode\" style=\"text-align: center\">\n    <div class=\"text-center\">\n      <button class=\"btn btn-primary btn-lg mr-2\" (click)=\"registerToggle()\">Register</button>\n    </div>\n  </div>\n\n  <div *ngIf=\"registerMode\" class=\"container\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-4\">\n        <app-register (cancelRegister)=\"cancelRegisterMode($event)\"></app-register>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

let HomeComponent = class HomeComponent {
    constructor() {
        this.registerMode = false;
    }
    ngOnInit() { }
    registerToggle() {
        this.registerMode = !this.registerMode;
    }
    cancelRegisterMode(registerMode) {
        this.registerMode = registerMode;
    }
};
HomeComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
        styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);



/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container h-100 d-flex justify-content-center\">\n    <div class=\"my-auto p-2 bg-light border\">\n        <h2 class=\"justify-content-center m-2\">Login</h2>\n        <form class=\"p-3\" [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n            <div class=\"form-group\">\n                <label for=\"username\">Username</label>\n                <input type=\"text\" formControlName=\"username\" class=\"form-control\"\n                       [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\"/>\n                <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.username.errors.required\">Username is required</div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password\">Password</label>\n                <input type=\"password\" formControlName=\"password\" class=\"form-control\"\n                       [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\"/>\n                <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <button [disabled]=\"loading\" class=\"btn btn-primary\">Login</button>\n                <img *ngIf=\"loading\" class=\"pl-3\"\n                     src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"/>\n                <a routerLink=\"/register\" class=\"btn btn-link\">Register</a>\n            </div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






let LoginComponent = class LoginComponent {
    constructor(formBuilder, route, router, authenticationService, alertService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.loading = false;
        this.submitted = false;
        // if (this.authenticationService.currentUserValue) {
        //   this.router.navigate(['/']);
        // }
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])())
            .subscribe(data => {
            this.router.navigate([this.returnUrl]);
        }, error => {
            this.alertService.error(error);
            this.loading = false;
        });
    }
};
LoginComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
        styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
        _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"]])
], LoginComponent);



/***/ }),

/***/ "./src/app/nav/nav.component.css":
/*!***************************************!*\
  !*** ./src/app/nav/nav.component.css ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dropdown-toggle, .dropdown-item {\n    cursor:pointer;\n}\n.navbar-light .navbar-nav .nav-link {\n    color: white;\n}\n.navbar-brand {\n    color: white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2L25hdi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtDQUNsQjtBQUNEO0lBQ0ksYUFBYTtDQUNoQjtBQUVEO0lBQ0ksYUFBYTtDQUNoQiIsImZpbGUiOiJzcmMvYXBwL25hdi9uYXYuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kcm9wZG93bi10b2dnbGUsIC5kcm9wZG93bi1pdGVtIHtcbiAgICBjdXJzb3I6cG9pbnRlcjtcbn1cbi5uYXZiYXItbGlnaHQgLm5hdmJhci1uYXYgLm5hdi1saW5rIHtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbi5uYXZiYXItYnJhbmQge1xuICAgIGNvbG9yOiB3aGl0ZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/nav/nav.component.html":
/*!****************************************!*\
  !*** ./src/app/nav/nav.component.html ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md navbar-light bg-primary\">\n    <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\"\n            data-target=\"#navbarNavAltMarkup\" aria-controls=\"navbarNavAltMarkup\" aria-expanded=\"false\"\n            aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n    </button>\n    <div class=\"container\">\n        <div class=\"navbar-brand\"  routerLinkActive=\"active\" [routerLink]=\"['/']\">CEMS</div>\n        <div *ngIf=\"loggedIn()\" class=\"collapse navbar-collapse\" id=\"navbarNavAltMarkup\">\n            <div class=\"navbar-nav \">\n                <a class=\"nav-item nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\">Dashboard</a>\n                <a *appHasRole=\"['Admin']\" class=\"nav-item nav-link\" routerLinkActive=\"active\"\n                   [routerLink]=\"['/admin']\">Admin</a>\n            </div>\n        </div>\n\n        <div *ngIf=\"loggedIn() \" class=\"dropdown \" dropdown>\n            <a class=\"dropdown-toggle text-light \" dropdownToggle>\n                Welcome {{authService.decodedToken.unique_name | titlecase}}\n            </a>\n\n            <div class=\"dropdown-menu mt-3 \" *dropdownMenu>\n                <a class=\"dropdown-item\" routerLinkActive=\"active\" [routerLink]=\"['user/edit']\">\n                    <i class=\"fa fa-user \"></i> Edit Profile</a>\n                <div class=\"dropdown-divider \"></div>\n                <a class=\"dropdown-item \" (click)=\"logout() \">\n                    <i class=\"fa fa-sign-out \"></i>Logout</a>\n            </div>\n        </div>\n\n        <!--<form *ngIf=\"!loggedIn()\" #loginForm=\"ngForm\" class=\"form-inline my-2 my-lg-0\" (ngSubmit)=\"login()\">-->\n        <!--<input class=\"form-control mr-sm-2\" type=\"text\" name=\"username\" placeholder=\"Username\" required [(ngModel)]=\"model.username\">-->\n        <!--<input class=\"form-control mr-sm-2\" type=\"password\" name=\"password\" placeholder=\"Password\" required [(ngModel)]=\"model.password\">-->\n        <!--<button [disabled]=\"!loginForm.valid\" class=\"btn btn-success my-2 my-sm-0\" type=\"submit\">Login</button>-->\n        <!--</form>-->\n    </div>\n</nav>"

/***/ }),

/***/ "./src/app/nav/nav.component.ts":
/*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




let NavComponent = class NavComponent {
    constructor(authService, router, alertify) {
        this.authService = authService;
        this.router = router;
        this.alertify = alertify;
    }
    ngOnInit() {
    }
    loggedIn() {
        return this.authService.loggedIn();
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
};
NavComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-nav',
        template: __webpack_require__(/*! ./nav.component.html */ "./src/app/nav/nav.component.html"),
        styles: [__webpack_require__(/*! ./nav.component.css */ "./src/app/nav/nav.component.css")]
    }),
    __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
], NavComponent);



/***/ }),

/***/ "./src/app/register/register.component.css":
/*!*************************************************!*\
  !*** ./src/app/register/register.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/register/register.component.html":
/*!**************************************************!*\
  !*** ./src/app/register/register.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container h-100 d-flex justify-content-center\">\n    <div class=\"my-auto p-2 bg-light border\">\n        <h2 class=\"justify-content-center m-2\">Register</h2>\n        <form class=\"p-3\" [formGroup]=\"registerForm\" (ngSubmit)=\"onSubmit()\">\n            \n            <div class=\"form-group\">\n                <label for=\"firstName\">First Name</label>\n                <input type=\"text\" formControlName=\"firstName\" class=\"form-control\"\n                       [ngClass]=\"{ 'is-invalid': submitted && f.firstName.errors }\"/>\n                <div *ngIf=\"submitted && f.firstName.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.firstName.errors.required\">First Name is required</div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"lastName\">Last Name</label>\n                <input type=\"text\" formControlName=\"lastName\" class=\"form-control\"\n                       [ngClass]=\"{ 'is-invalid': submitted && f.lastName.errors }\"/>\n                <div *ngIf=\"submitted && f.lastName.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.lastName.errors.required\">Last Name is required</div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"username\">Username</label>\n                <input type=\"text\" formControlName=\"username\" class=\"form-control\"\n                       [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\"/>\n                <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.username.errors.required\">Username is required</div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password\">Password</label>\n                <input type=\"password\" formControlName=\"password\" class=\"form-control\"\n                       [ngClass]=\"{ 'is-invalid': submitted && f.password.errors }\"/>\n                <div *ngIf=\"submitted && f.password.errors\" class=\"invalid-feedback\">\n                    <div *ngIf=\"f.password.errors.required\">Password is required</div>\n                    <div *ngIf=\"f.password.errors.minlength\">Password must be at least 6 characters</div>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <button [disabled]=\"loading\" class=\"btn btn-primary\">Register</button>\n                <img *ngIf=\"loading\" class=\"pl-3\"\n                     src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"/>\n                <a routerLink=\"/login\" class=\"btn btn-link\">Cancel</a>\n            </div>\n        </form>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







let RegisterComponent = class RegisterComponent {
    constructor(formBuilder, authService, router, userService, alertify) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.router = router;
        this.userService = userService;
        this.alertify = alertify;
        this.loading = false;
        this.submitted = false;
        if (this.authService.currentUser) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].minLength(6), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$')]]
        });
    }
    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.authService.register(this.registerForm.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["first"])())
            .subscribe(data => {
            this.alertify.success('Registration successful');
            this.router.navigate(['/login']);
        }, error => {
            this.alertify.error(error);
            this.loading = false;
        });
    }
};
RegisterComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-register',
        template: __webpack_require__(/*! ./register.component.html */ "./src/app/register/register.component.html"),
        styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/register/register.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _services_user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"],
        _services_alertify_service__WEBPACK_IMPORTED_MODULE_3__["AlertifyService"]])
], RegisterComponent);



/***/ }),

/***/ "./src/app/routes.ts":
/*!***************************!*\
  !*** ./src/app/routes.ts ***!
  \***************************/
/*! exports provided: appRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appRoutes", function() { return appRoutes; });
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin/admin-panel/admin-panel.component */ "./src/app/admin/admin-panel/admin-panel.component.ts");
/* harmony import */ var _users_users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./users/users-edit/users-edit.component */ "./src/app/users/users-edit/users-edit.component.ts");
/* harmony import */ var _resolvers_user_edit_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_resolvers/user-edit.resolver */ "./src/app/_resolvers/user-edit.resolver.ts");
/* harmony import */ var _dashboard_log_detail_log_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard/log-detail/log-detail.component */ "./src/app/dashboard/log-detail/log-detail.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./register/register.component */ "./src/app/register/register.component.ts");
/* harmony import */ var _error_throw_error_throw_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./error-throw/error-throw.component */ "./src/app/error-throw/error-throw.component.ts");
/* harmony import */ var _resolvers_logs_list_resolver__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_resolvers/logs-list.resolver */ "./src/app/_resolvers/logs-list.resolver.ts");










const appRoutes = [
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"] },
    { path: 'register', component: _register_register_component__WEBPACK_IMPORTED_MODULE_7__["RegisterComponent"] },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__["AuthGuard"]],
        children: [
            { path: '', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"], resolve: { logs: _resolvers_logs_list_resolver__WEBPACK_IMPORTED_MODULE_9__["LogsListResolver"] } },
            { path: 'dashboard', component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_0__["DashboardComponent"], resolve: { logs: _resolvers_logs_list_resolver__WEBPACK_IMPORTED_MODULE_9__["LogsListResolver"] } },
            { path: 'throwError', component: _error_throw_error_throw_component__WEBPACK_IMPORTED_MODULE_8__["ErrorThrowComponent"] },
            {
                path: 'user/edit',
                component: _users_users_edit_users_edit_component__WEBPACK_IMPORTED_MODULE_3__["UsersEditComponent"],
                resolve: { user: _resolvers_user_edit_resolver__WEBPACK_IMPORTED_MODULE_4__["MemberEditResolver"] }
            },
            {
                path: 'admin',
                component: _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_2__["AdminPanelComponent"],
                data: { roles: ['Admin'] }
            },
            {
                path: 'logDetails/:id',
                component: _dashboard_log_detail_log_detail_component__WEBPACK_IMPORTED_MODULE_5__["LogDetailComponent"]
            }
            // next routes
        ]
    },
    { path: '**', redirectTo: '' }
];


/***/ }),

/***/ "./src/app/users/users-edit/users-edit.component.css":
/*!***********************************************************!*\
  !*** ./src/app/users/users-edit/users-edit.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL3VzZXJzLWVkaXQvdXNlcnMtZWRpdC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/users/users-edit/users-edit.component.html":
/*!************************************************************!*\
  !*** ./src/app/users/users-edit/users-edit.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container mt-4\">\n    <div class=\"row\">\n        <div class=\"col-sm-\">\n            <h1>Your Profile</h1>\n        </div>\n        <div class=\"col-sm-8\">\n            <!-- <div *ngIf=\"editForm.dirty\" class=\"alert alert-info\">\n              <strong>Information:</strong> You have made changes.  Any unsaved changes will be lost!\n            </div> -->\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-4 text-center\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <h4>Api Key</h4>\n                </div>\n                <div class=\"card-body\">\n                    <div>\n                        <p>{{user.webApiKey.apiKey}}</p>\n                    </div>\n\n                </div>\n                <!-- <div class=\"card-footer\">\n                  <button [disabled]=\"!editForm.dirty\" form=\"editForm\" class=\"btn btn-success btn-block\">Save Changes</button>\n                </div> -->\n            </div>\n        </div>\n        <div class=\"col-sm-8 text-center\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <h3>Trusted Host</h3>(Not Working)\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"row\">\n                        <div class=\"col-sm-10\">\n                            <form #trustedHosts=\"ngForm\">\n                                <input type=\"text\" class=\"w-75\" [(ngModel)]=\"hostToAdd.host\" name=\"hostToAdd\"\n                                       placeholder=\"Host\">\n                            </form>\n                        </div>\n                        <div class=\"col-sm-2\">\n                            <button class=\"btn btn-success\" (click)=\"AddHost()\" form=\"trustedHosts\" type=\"submit\">Add\n                            </button>\n                        </div>\n\n                    </div>\n                    <div *ngFor=\"let host of user.webApiKey.trustedHosts\" class=\"row p-1 m-1\">\n                        <div class=\"col-sm-10\"><input type=\"text\" name=\"host\" disabled value=\"{{host.host}}\"></div>\n                        <div class=\"col-sm-2\">\n                            <button class=\"btn btn-danger\" (click)=\"AddHost()\" type=\"submit\">Remove</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class=\"row m-2 justify-content-end\">\n        <div class=\"col-6 \">\n            <form [formGroup]=\"userForm\" #f=\"ngForm\" (submit)=\"updateUser(userForm)\">\n                <div class=\"form-group\">\n                    <label for=\"username\">username</label>\n                    <input readonly id=\"username\" type=\"text\" formControlName=\"username\"\n                           class=\"form-control\"\n                           [ngClass]=\"{ 'is-invalid': submitted && f.username.errors }\"/>\n                    <div *ngIf=\"submitted && f.username.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.username.errors.required\">Username is required</div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"firstName\">First Name</label>\n                    <input [readonly]=\"!editMode\" type=\"text\" formControlName=\"firstName\" class=\"form-control\"/>\n                    <div *ngIf=\"submitted && f.firstName.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.firstName.errors.required\">First Name is required</div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"lastName\">Last Name</label>\n                    <input [readonly]=\"!editMode\" id=\"lastName\" type=\"text\" formControlName=\"lastName\"\n                           class=\"form-control\"/>\n                    <div *ngIf=\"submitted && f.lastName.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.lastName.errors.required\">Last Name is required</div>\n                    </div>\n                </div>\n\n\n                <div class=\"form-group\">\n                    <label for=\"email\">Email</label>\n                    <input [readonly]=\"!editMode\" id=\"email\" type=\"email\" formControlName=\"email\" class=\"form-control\"\n                           [ngClass]=\"{ 'is-invalid': submitted && f.email.errors }\"/>\n                    <div *ngIf=\"submitted && f.email.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.email.errors.required\">Email is required</div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"phoneNumber\">Phone number</label>\n                    <input [readonly]=\"!editMode\" id=\"phoneNumber\" type=\"email\" formControlName=\"phoneNumber\"\n                           class=\"form-control\"\n                           [ngClass]=\"{ 'is-invalid': submitted && f.phoneNumber.errors }\"/>\n                    <div *ngIf=\"submitted && f.phoneNumber.errors\" class=\"invalid-feedback\">\n                        <div *ngIf=\"f.phoneNumber.errors.required\">Phone number is required</div>\n                    </div>\n                </div>\n\n                <div class=\"col\">\n                    <button *ngIf=\"editMode\" class=\"btn btn-success  m-2 float-right\" type=\"submit\">Submit</button>\n                    <button type=\"button\" (click)=\"toggleEditMode()\"\n                            [className]=\"!editMode ? 'btn float-right btn-warning' : 'btn  m-2 float-right btn-danger'\"\n                    >{{!editMode ? 'Edit' : 'Cancel' }}\n                    </button>\n                </div>\n            </form>\n        </div>\n    </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/users/users-edit/users-edit.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/users/users-edit/users-edit.component.ts ***!
  \**********************************************************/
/*! exports provided: UsersEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsersEditComponent", function() { return UsersEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/alertify.service */ "./src/app/_services/alertify.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





let UsersEditComponent = class UsersEditComponent {
    constructor(route, userService, formBuilder, alertify, cdr) {
        this.route = route;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.alertify = alertify;
        this.cdr = cdr;
        this.editMode = false;
        this.submitted = false;
        this.hostToAdd = {};
    }
    ngOnInit() {
        this.route.data.subscribe(data => {
            this.user = data['user'];
            this.userForm = this.initUserForm();
        });
    }
    initUserForm() {
        return this.formBuilder.group({
            firstName: [this.user.firstName, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            lastName: [this.user.lastName, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            username: [{ value: this.user.username, disabled: false }],
            phoneNumber: this.user.phone,
            email: this.user.email
        });
    }
    toggleEditMode() {
        this.editMode = !this.editMode;
    }
    updateUser({ value, valid }) {
        if (!valid) {
            this.alertify.warning('Form is invalid');
            return false;
        }
        this.user.username = value.username;
        this.user.firstName = value.firstName;
        this.user.lastName = value.lastName;
        this.user.email = value.email;
        this.user.phone = value.phone;
        this.userService.update(this.user).subscribe(result => {
            this.alertify.success('Successfully updated');
            this.toggleEditMode();
            this.cdr.detectChanges();
        }, error1 => this.alertify.error(error1));
        return true;
    }
    AddHost() {
        const trustedHostsObj = {
            trustedHost: [this.hostToAdd.host]
        };
        console.log(trustedHostsObj);
        this.userService
            .updateTrustedHosts(this.user.id, trustedHostsObj)
            .subscribe(response => {
            this.user.webApiKey.trustedHosts = [
                ...this.user.webApiKey.trustedHosts,
                this.hostToAdd
            ];
        });
    }
};
UsersEditComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-users-edit',
        template: __webpack_require__(/*! ./users-edit.component.html */ "./src/app/users/users-edit/users-edit.component.html"),
        styles: [__webpack_require__(/*! ./users-edit.component.css */ "./src/app/users/users-edit/users-edit.component.css")]
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
        _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
        _services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"],
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
], UsersEditComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api/',
    whitelistedDomain: 'localhost:5000',
    blacklistedRoute: 'localhost:5000/api/auth',
    cemsLoggerURL: 'http://localhost:5000/',
    cemsLoggerApiKey: 'daawsojiy51e5cc44xxrdff8d606k8'
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.log(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Projects\cems\cems-SPA\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map