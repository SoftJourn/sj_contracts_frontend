var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { routing, appRoutingProviders } from "./app.routing";
import { MdInputModule } from "@angular/material/input";
import { MdButtonModule } from "@angular/material/button";
import { MdIconModule } from "@angular/material/icon";
import { OverlayModule } from "@angular/material/core";
import { MainInfoComponent } from "./component/main-info/main-info.component";
import { LoginComponent } from "./component/login/login.component";
import { TopNavComponent } from "./component/top-nav/top-nav.component";
import { TokenService } from "./services/token.service";
import { AccountService } from "./services/account.service";
import { HttpService } from "./services/http.service";
import { MdCardModule } from "@angular/material/card";
import { SimpleNotificationsModule } from "angular2-notifications";
import { GlobalErrorHandler } from "./shared/global-error-handler";
import { ContractsComponent } from "./component/contracts/contracts.component";
import { ContractService } from "./services/contract.service";
import { DeployComponent } from "./component/deploy/deploy.component";
import { ParameterComponent } from "./component/parameter/parameter.component";
import { MaterialModule } from "@angular/material";
import { ContractUnitService } from "./services/contract-unit.service";
import { ContractComponent } from './component/contract/contract.component';
import { DescriberComponent } from './component/describer/describer.component';
import { InstanceComponent } from './component/instance/instance.component';
import { CompileComponent } from './component/compile/compile.component';
import { CompileService } from "./services/compile.service";
import { AceEditorComponent } from 'ng2-ace-editor';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                MainInfoComponent,
                LoginComponent,
                TopNavComponent,
                ContractsComponent,
                DeployComponent,
                ParameterComponent,
                ContractComponent,
                DescriberComponent,
                InstanceComponent,
                CompileComponent,
                AceEditorComponent
            ],
            imports: [
                BrowserModule,
                CommonModule,
                ReactiveFormsModule,
                routing,
                MdInputModule,
                MdButtonModule,
                MdIconModule,
                MdCardModule,
                OverlayModule,
                HttpModule,
                SimpleNotificationsModule,
                FormsModule,
                MaterialModule.forRoot()
            ],
            providers: [
                TokenService,
                HttpService,
                AccountService,
                appRoutingProviders,
                ContractService,
                ContractUnitService,
                CompileService,
                { provide: ErrorHandler, useClass: GlobalErrorHandler },
                { provide: LocationStrategy, useClass: HashLocationStrategy }
            ],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/app.module.js.map