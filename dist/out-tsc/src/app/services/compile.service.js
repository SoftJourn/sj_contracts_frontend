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
export var CompileService = (function () {
    function CompileService(http) {
        this.http = http;
    }
    CompileService.prototype.getUrl = function () {
        return "" + AppProperties.ERIS_COMPILER;
    };
    CompileService.prototype.compile = function (compileRequestObject) {
        return this.http.post(this.getUrl(), compileRequestObject).map(function (response) { return response.json(); });
    };
    CompileService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [HttpService])
    ], CompileService);
    return CompileService;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/services/compile.service.js.map