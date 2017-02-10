var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { ContractUnit } from "../../entity/contract-unit";
export var DescriberComponent = (function () {
    function DescriberComponent() {
    }
    DescriberComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input('unit'), 
        __metadata('design:type', ContractUnit)
    ], DescriberComponent.prototype, "unit", void 0);
    __decorate([
        Input('showAnonymous'), 
        __metadata('design:type', Boolean)
    ], DescriberComponent.prototype, "showAnonymous", void 0);
    __decorate([
        Input('showConstant'), 
        __metadata('design:type', Boolean)
    ], DescriberComponent.prototype, "showConstant", void 0);
    DescriberComponent = __decorate([
        Component({
            selector: 'app-describer',
            templateUrl: 'describer.component.html',
            styleUrls: ['describer.component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DescriberComponent);
    return DescriberComponent;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/component/describer/describer.component.js.map