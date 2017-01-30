var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormValidationStyles } from "../../shared/form-validation-styles";
import { ContractUnitService } from "../../services/contract-unit.service";
import { Variable } from "../../entity/variable";
export var ParameterComponent = (function () {
    function ParameterComponent(contractUnitService) {
        this.contractUnitService = contractUnitService;
        this.bool = false;
        this.number = false;
        this.address = false;
        this.array = false;
    }
    ParameterComponent.prototype.ngOnInit = function () {
        if (this.form.get('type').value == 'bool') {
            this.bool = true;
        }
        else if (this.form.get('type').value.includes('uint')) {
            this.number = true;
        }
        else if (this.form.get('type').value == 'address') {
            this.address = true;
        }
        else if (this.form.get('type').value.includes('[]')) {
            this.array = true;
        }
        this.formStyles = new FormValidationStyles(this.form);
    };
    ParameterComponent.prototype.onAdd = function () {
        var controls = this.form.controls['value'];
        controls.push(this.contractUnitService.formGroupDependsOnType(new Variable('', controls.at(0).get('type').value)));
    };
    ParameterComponent.prototype.onRemove = function () {
        var controls = this.form.controls['value'].parent.parent;
        controls.removeAt(this.index);
    };
    __decorate([
        Input('form'), 
        __metadata('design:type', FormGroup)
    ], ParameterComponent.prototype, "form", void 0);
    __decorate([
        Input('index'), 
        __metadata('design:type', Number)
    ], ParameterComponent.prototype, "index", void 0);
    __decorate([
        Input('showName'), 
        __metadata('design:type', Boolean)
    ], ParameterComponent.prototype, "showName", void 0);
    __decorate([
        Input('showType'), 
        __metadata('design:type', Boolean)
    ], ParameterComponent.prototype, "showType", void 0);
    ParameterComponent = __decorate([
        Component({
            selector: 'app-parameter',
            templateUrl: 'parameter.component.html',
            styleUrls: ['parameter.component.scss']
        }), 
        __metadata('design:paramtypes', [ContractUnitService])
    ], ParameterComponent);
    return ParameterComponent;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/component/parameter/parameter.component.js.map