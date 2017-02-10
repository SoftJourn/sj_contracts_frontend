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
import { AppProperties } from "../shared/app.properties";
import { HttpService } from "./http.service";
export var ContractService = (function () {
    function ContractService(httpService) {
        this.httpService = httpService;
    }
    ContractService.prototype.getUrl = function () {
        return AppProperties.API_COINS_ENDPOINT + "/contracts";
    };
    ContractService.prototype.getContracts = function () {
        return this.httpService.get(this.getUrl()).map(function (response) { return response.json(); });
    };
    ContractService.prototype.getContract = function (id) {
        return this.httpService.get(this.getUrl() + '/' + id).map(function (response) { return response.json(); });
    };
    ContractService.prototype.getTypes = function () {
        return this.httpService.get(this.getUrl() + '/types').map(function (response) { return response.json(); });
    };
    ContractService.prototype.getContractsByType = function (type) {
        return this.httpService.get(this.getUrl() + '/types/' + type).map(function (response) { return response.json(); });
    };
    ContractService.prototype.deployContract = function (contract) {
        return this.httpService.post(this.getUrl(), contract).map(function (response) { return response.json(); });
    };
    ContractService.prototype.deployContractInstance = function (instance) {
        return this.httpService.post(this.getUrl() + '/instances', instance).map(function (response) { return response.json(); });
    };
    ContractService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [HttpService])
    ], ContractService);
    return ContractService;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/services/contract.service.js.map