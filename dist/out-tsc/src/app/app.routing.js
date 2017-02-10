import { RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./component/login/";
import { MainInfoComponent } from "./component/main-info/";
import { ContractsComponent } from "./component/contracts/contracts.component";
import { DeployComponent } from "./component/deploy/deploy.component";
import { ContractComponent } from "./component/contract/contract.component";
import { InstanceComponent } from "./component/instance/instance.component";
import { CompileComponent } from "./component/compile/compile.component";
var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'contracts' },
    {
        path: 'contracts', component: MainInfoComponent, children: [
            { path: '', component: ContractsComponent, canActivate: [AuthGuard] },
            { path: 'compile', component: CompileComponent, canActivate: [AuthGuard] },
            { path: 'deploy', component: DeployComponent, canActivate: [AuthGuard] },
            { path: ':id', component: ContractComponent, canActivate: [AuthGuard] },
            { path: 'instance/:id', component: InstanceComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: 'login', component: LoginComponent }
];
export var appRoutingProviders = [
    AuthGuard
];
export var routing = RouterModule.forRoot(routes);
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/app.routing.js.map