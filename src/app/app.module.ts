import {BrowserModule} from "@angular/platform-browser";
import {
  NgModule,
  ErrorHandler
} from "@angular/core";
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from "@angular/common";
import {
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {
  routing,
  appRoutingProviders
} from "./app.routing";
import {MdInputModule} from "@angular/material/input";
import {MdButtonModule} from "@angular/material/button";
import {MdIconModule} from "@angular/material/icon";
import {OverlayModule} from "@angular/material/core";
import {MainInfoComponent} from "./component/main-info/main-info.component";
import {LoginComponent} from "./component/login/login.component";
import {TopNavComponent} from "./component/top-nav/top-nav.component";
import {TokenService} from "./services/token.service";
import {AccountService} from "./services/account.service";
import {HttpService} from "./services/http.service";
import {MdCardModule} from "@angular/material/card";
import {SimpleNotificationsModule} from "angular2-notifications";
import {GlobalErrorHandler} from "./shared/global-error-handler";
import {ContractsComponent} from "./component/contracts/contracts.component";
import {ContractService} from "./services/contract.service";
import {DeployComponent} from "./component/deploy/deploy.component";
import {ParameterComponent} from "./component/parameter/parameter.component";
import {MaterialModule} from "@angular/material";
import {ContractUnitService} from "./services/contract-unit.service";
import { ContractComponent } from './component/contract/contract.component';
import { DescriberComponent } from './component/describer/describer.component';
import { InstanceComponent } from './component/instance/instance.component';

@NgModule({
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
    InstanceComponent
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
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
