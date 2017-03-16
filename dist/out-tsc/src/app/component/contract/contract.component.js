var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ContractService } from "../../services/contract.service";
import { ContractUnitService } from "../../services/contract-unit.service";
export var ContractComponent = (function () {
    function ContractComponent(route, contractService, contractUnitService) {
        this.route = route;
        this.contractService = contractService;
        this.contractUnitService = contractUnitService;
        this.isCollapsed1 = true;
        this.isCollapsed2 = false;
    }
    ContractComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contractId = parseInt(this.route.snapshot.params['id']);
        this.contractService.getContract(this.contractId).subscribe(function (contract) {
            _this.contract = contract;
            _this.units = _this.contractUnitService.getContractUnit(_this.contract['abi']);
            _this.units.sort(function (a, b) {
                var typeA = a.type.toUpperCase();
                var typeB = b.type.toUpperCase();
                if (typeA > typeB)
                    return 1;
                else
                    return -1;
            });
            for (var _i = 0, _a = _this.units; _i < _a.length; _i++) {
                var unit = _a[_i];
                if (unit.type == 'constructor') {
                    unit.name = 'Constructor';
                }
            }
            _this.unitToShow = _this.units[0];
        });
    };
    ContractComponent.prototype.openDescription = function (index) {
        this.unitToShow = this.units[index];
        typeof this.unitToShow.anonymous != 'undefined' ? this.showAnonymous = true : this.showAnonymous = false;
        typeof this.unitToShow.constant != 'undefined' ? this.showConstant = true : this.showConstant = false;
    };
    ContractComponent = __decorate([
        Component({
            selector: 'app-contract',
            templateUrl: 'contract.component.html',
            styleUrls: ['contract.component.scss']
        }), 
        __metadata('design:paramtypes', [ActivatedRoute, ContractService, ContractUnitService])
    ], ContractComponent);
    return ContractComponent;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/component/contract/contract.component.js.map