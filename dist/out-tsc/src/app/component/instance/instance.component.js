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
import { ActivatedRoute } from "@angular/router";
import { ContractService } from "../../services/contract.service";
import { ContractUnitService } from "../../services/contract-unit.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { FormValidationStyles } from "../../shared/form-validation-styles";
import { InstanceDeployDto } from "../../entity/instance-deploy-dto";
import { NotificationsService } from "angular2-notifications";
export var InstanceComponent = (function () {
    function InstanceComponent(route, contractService, contractUnitService, notificationService) {
        this.route = route;
        this.contractService = contractService;
        this.contractUnitService = contractUnitService;
        this.notificationService = notificationService;
    }
    InstanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.buildDeployForm();
        this.contractId = parseInt(this.route.snapshot.params['id']);
        this.contractService.getContract(this.contractId).subscribe(function (contract) {
            _this.contract = contract;
            _this.units = _this.contractUnitService.getContractUnit(_this.contract['abi']);
            var unit = _this.units.filter(function (unit) { return unit.type == 'constructor'; });
            if (unit.length == 1) {
                var parameters = _this.deployForm.get('parameters');
                var constructor = unit[0];
                for (var _i = 0, _a = constructor.inputs; _i < _a.length; _i++) {
                    var variable = _a[_i];
                    parameters.push(_this.contractUnitService.formGroupDependsOnType(variable));
                }
            }
            console.log(_this.deployForm);
        });
    };
    InstanceComponent.prototype.buildDeployForm = function () {
        this.deployForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            parameters: new FormArray([])
        });
        this.formStyles = new FormValidationStyles(this.deployForm);
    };
    InstanceComponent.prototype.onSubmit = function () {
        var _this = this;
        this.contractService.deployContractInstance(new InstanceDeployDto(this.contractId, this.deployForm.get('name').value, this.contractUnitService.collectParameters(this.deployForm.value['parameters'])))
            .subscribe(function (response) {
            console.log(response);
            _this.notificationService.success('Success', 'Contract has been deployed successfully!');
        }, function (error) {
            try {
                var errorDetail = error.json();
                if (!errorDetail.detail)
                    //noinspection ExceptionCaughtLocallyJS
                    throw errorDetail;
                _this.notificationService.error('Error', errorDetail.detail);
            }
            catch (err) {
                console.log(err);
                _this.notificationService.error('Error', 'Error appeared, watch logs!');
            }
        });
    };
    InstanceComponent = __decorate([
        Component({
            selector: 'app-instance',
            templateUrl: 'instance.component.html',
            styleUrls: ['instance.component.css']
        }), 
        __metadata('design:paramtypes', [ActivatedRoute, ContractService, ContractUnitService, NotificationsService])
    ], InstanceComponent);
    return InstanceComponent;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/component/instance/instance.component.js.map