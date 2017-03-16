/* tslint:disable:no-unused-variable */
import { MainInfoComponent } from './main-info.component';
import { AccountService } from "../services/account.service";
import { inject } from "@angular/core/testing";
describe('Component: MainInfo', function () {
    it('should create an instance', inject([AccountService], function (account, taskService) {
        var component = new MainInfoComponent(account, taskService);
        expect(component).toBeTruthy();
    }));
});
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/component/main-info/main-info.component.spec.js.map