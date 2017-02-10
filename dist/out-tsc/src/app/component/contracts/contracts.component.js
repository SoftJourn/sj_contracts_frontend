var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ContractService } from "../../services/contract.service";
import { Router } from "@angular/router";
export var ContractsComponent = (function () {
    function ContractsComponent(contractService, router) {
        this.contractService = contractService;
        this.router = router;
    }
    ContractsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contractService.getTypes().subscribe(function (types) {
            _this.types = types;
        });
        this.contractService.getContracts().subscribe(function (contracts) {
            _this.contracts = contracts;
        });
    };
    ContractsComponent.prototype.typeChange = function (event) {
        var _this = this;
        if (event == 'All') {
            this.contractService.getContracts().subscribe(function (contracts) {
                _this.contracts = contracts;
            });
        }
        else {
            this.contractService.getContractsByType(event).subscribe(function (contracts) {
                _this.contracts = contracts;
            });
        }
    };
    ContractsComponent.prototype.openContract = function (index) {
        this.router.navigate(['/contracts/' + index]);
    };
    ContractsComponent = __decorate([
        Component({
            selector: 'app-contracts',
            templateUrl: 'contracts.component.html',
            styleUrls: ['contracts.component.scss']
        }), 
        __metadata('design:paramtypes', [ContractService, Router])
    ], ContractsComponent);
    return ContractsComponent;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/component/contracts/contracts.component.js.map