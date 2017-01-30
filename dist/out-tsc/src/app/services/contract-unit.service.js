var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { ContractUnit } from "../entity/contract-unit";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Variable } from "../entity/variable";
export var ContractUnitService = (function () {
    function ContractUnitService() {
    }
    ContractUnitService.prototype.isJson = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (error) {
            throw new Error('Entered string is not a json!');
        }
    };
    ContractUnitService.prototype.isJsonArray = function (value) {
        var array = this.isJson(value);
        if (Array.isArray(array)) {
            return array;
        }
        else {
            throw new Error('Entered string is not a json array!');
        }
    };
    ContractUnitService.prototype.isJsonArrayEmpty = function (values) {
        if (values.length == 0) {
            throw new Error('Entered json array is empty!');
        }
    };
    ContractUnitService.prototype.isContractUnit = function (value) {
        var unit = new ContractUnit();
        if (value.hasOwnProperty('type')) {
            for (var _i = 0, _a = ContractUnit.getPropertiesNameByType(value['type']); _i < _a.length; _i++) {
                var property = _a[_i];
                if (value.hasOwnProperty(property)) {
                    unit[property] = value[property];
                }
                else {
                    throw new Error('Entered objects is not contracts units!');
                }
            }
        }
        else {
            throw new Error('Entered objects is not contracts units!');
        }
        return unit;
    };
    ContractUnitService.prototype.getContractUnit = function (values) {
        var units = new Array();
        var arrays = this.isJsonArray(values);
        this.isJsonArrayEmpty(arrays);
        for (var _i = 0, arrays_1 = arrays; _i < arrays_1.length; _i++) {
            var value = arrays_1[_i];
            units.push(this.isContractUnit(value));
        }
        return units;
    };
    ContractUnitService.prototype.allFieldsMatcher = function () {
        var _this = this;
        return function (control) {
            try {
                _this.getContractUnit(control.value);
            }
            catch (error) {
                return { 'error': error.message };
            }
        };
    };
    ContractUnitService.prototype.formGroupDependsOnType = function (variable) {
        var controls = {
            name: new FormControl(variable.name),
            type: new FormControl(variable.type)
        };
        if (variable.type == 'bool') {
            controls['value'] = new FormControl('', [Validators.required]);
        }
        else if (variable.type.includes('uint')) {
            controls['value'] = new FormControl('', [Validators.required, Validators.pattern('^[0-9]\\d*$')]);
        }
        else if (variable.type == 'address') {
            controls['value'] = new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(20)]);
        }
        else if (variable.type.includes('[]')) {
            controls['value'] = new FormArray([this.formGroupDependsOnType(new Variable('', variable.type.substring(0, variable.type.length - 2)))]);
        }
        return new FormGroup(controls);
    };
    ContractUnitService.prototype.collectParameters = function (values) {
        var parameters = new Array();
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (value.type.includes('[]')) {
                parameters.push(this.collectParameters(value['value']));
            }
            else {
                parameters.push(value['value']);
            }
        }
        return parameters;
    };
    ContractUnitService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], ContractUnitService);
    return ContractUnitService;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/services/contract-unit.service.js.map