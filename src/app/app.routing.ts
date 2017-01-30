import {
  Routes,
  RouterModule
} from "@angular/router";
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./component/login/";
import {MainInfoComponent} from "./component/main-info/";
import {ModuleWithProviders} from "@angular/core";
import {ContractsComponent} from "./component/contracts/contracts.component";
import {DeployComponent} from "./component/deploy/deploy.component";
import {ContractComponent} from "./component/contract/contract.component";
import {InstanceComponent} from "./component/instance/instance.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'contracts'},
  {
    path: 'contracts', component: MainInfoComponent, children: [
    {path: '', component: ContractsComponent, canActivate: [AuthGuard]},
    {path: 'deploy', component: DeployComponent, canActivate: [AuthGuard]},
    {path: ':id', component: ContractComponent, canActivate: [AuthGuard]},
    {path: 'instance/:id', component: InstanceComponent, canActivate: [AuthGuard]}
  ]
  },
  {path: 'login', component: LoginComponent}
];

export const appRoutingProviders: any[] = [
  AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
