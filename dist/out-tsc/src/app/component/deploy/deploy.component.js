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
import { ContractService } from "../../services/contract.service";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { FormValidationStyles } from "../../shared/form-validation-styles";
import { ContractUnitService } from "../../services/contract-unit.service";
import { ContractDeployDto } from "../../entity/contract-deploy-dto";
import { NotificationsService } from "angular2-notifications";
export var DeployComponent = (function () {
    function DeployComponent(contractService, contractUnitService, notificationService) {
        this.contractService = contractService;
        this.contractUnitService = contractUnitService;
        this.notificationService = notificationService;
    }
    DeployComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.buildDeployForm();
        this.contractService.getTypes().subscribe(function (types) {
            _this.types = types;
            _this.deployForm.get('type').patchValue(types[0]);
        });
    };
    DeployComponent.prototype.buildDeployForm = function () {
        var _this = this;
        this.deployForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            type: new FormControl('', Validators.required),
            code: new FormControl('', [Validators.required, Validators.pattern('^[a-fA-F0-9]+$')]),
            abi: new FormControl('', [Validators.required, this.contractUnitService.allFieldsMatcher()]),
            parameters: new FormArray([])
        });
        this.deployForm.get('abi').valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(function (change) {
            if (_this.deployForm.get('abi').valid) {
                var units = _this.contractUnitService.getContractUnit(change);
                var unit = units.filter(function (unit) { return unit.type == 'constructor'; });
                if (unit.length == 1) {
                    var parameters = _this.deployForm.get('parameters');
                    var constructor = unit[0];
                    for (var _i = 0, _a = constructor.inputs; _i < _a.length; _i++) {
                        var variable = _a[_i];
                        parameters.push(_this.contractUnitService.formGroupDependsOnType(variable));
                    }
                }
            }
            else {
                var parameters = _this.deployForm.get('parameters');
                var length_1 = parameters.controls.length;
                for (var i = 0; i < length_1; i++) {
                    parameters.removeAt(0);
                }
            }
        });
        this.formStyles = new FormValidationStyles(this.deployForm);
    };
    DeployComponent.prototype.onSubmit = function () {
        var _this = this;
        this.contractService.deployContract(new ContractDeployDto(this.deployForm.get('name').value, this.deployForm.get('code').value, this.deployForm.get('abi').value, this.deployForm.get('type').value.type, this.contractUnitService.collectParameters(this.deployForm.value['parameters'])))
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
    DeployComponent = __decorate([
        Component({
            selector: 'app-deploy',
            templateUrl: 'deploy.component.html',
            styleUrls: ['deploy.component.css']
        }), 
        __metadata('design:paramtypes', [ContractService, ContractUnitService, NotificationsService])
    ], DeployComponent);
    return DeployComponent;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/component/deploy/deploy.component.js.map