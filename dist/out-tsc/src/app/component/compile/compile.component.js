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
import { FormValidationStyles } from "../../shared/form-validation-styles";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { CompileObject } from "../../entity/compile-object";
import { CompileRequest } from "../../entity/compile-request";
import { CompileService } from "../../services/compile.service";
import { NotificationsService } from "angular2-notifications";
export var CompileComponent = (function () {
    function CompileComponent(compileService, notificationService) {
        this.compileService = compileService;
        this.notificationService = notificationService;
    }
    CompileComponent.prototype.ngOnInit = function () {
        this.buildForm();
    };
    CompileComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var editor = ace.edit("code");
        editor.setTheme("ace/theme/ambiance");
        editor.$blockScrolling = Infinity;
        editor.getSession().setMode("ace/mode/solidity");
        editor.getSession().on('change', function (e) {
            _this.code = editor.getValue();
        });
        editor.setOptions({
            showGutter: true,
            showInvisibles: false,
            highlightActiveLine: true,
            highlightGutterLine: true,
            fontSize: 15
        });
    };
    CompileComponent.prototype.buildForm = function () {
        this.compileForm = new FormGroup({
            optimize: new FormControl(false)
        });
        this.formStyles = new FormValidationStyles(this.compileForm);
    };
    CompileComponent.prototype.onCompile = function () {
        var _this = this;
        try {
            var optimize = this.compileForm.get('optimize').value;
            var objectNames = this.getObjectNames(this.code);
            var compileObject = new CompileObject(objectNames, this.prepareCode(this.code));
            var compileRequestObject = new CompileRequest("", "sol", { "object.sol": compileObject }, "", optimize, { "object.sol": "object.sol" });
            this.compileService.compile(compileRequestObject).subscribe(function (response) {
                _this.prepareResultForm(response);
            }, function (error) {
                _this.notificationService.error('Error', 'Something went wrong watch logs!');
            });
        }
        catch (error) {
            this.notificationService.error('Error', error.message);
        }
    };
    // converts string code into bytes array and then into base64
    CompileComponent.prototype.prepareCode = function (code) {
        // code to byte array
        var bufView = this.stringToByteArray(code);
        // byte array to string
        var binstr = Array.prototype.map.call(bufView, function (ch) {
            return String.fromCharCode(ch);
        }).join('');
        return btoa(binstr);
    };
    // gets contracts names from code
    CompileComponent.prototype.getObjectNames = function (code) {
        var names = new Array();
        var pattern = /(?:contract)\s(\w+)/g;
        var matches = code.match(pattern);
        if (matches == null) {
            throw new Error("Contract name was not found!");
        }
        else {
            matches.forEach(function (match, index, array) {
                names.push(match.split(" ")[1]);
            });
            return names;
        }
    };
    CompileComponent.prototype.prepareResultForm = function (response) {
        this.compilationResultsForm = new FormGroup({
            objects: new FormArray([]),
            errors: new FormControl()
        });
        if (response['error']) {
            this.compilationResultsForm.get('errors').patchValue(response['error']);
        }
        else {
            var objects = this.compilationResultsForm.get('objects');
            var compiledObjects = response['objects'];
            for (var _i = 0, compiledObjects_1 = compiledObjects; _i < compiledObjects_1.length; _i++) {
                var object = compiledObjects_1[_i];
                objects.push(new FormGroup({
                    objectsName: new FormControl(object['objectname']),
                    abi: new FormControl(object['abi']),
                    bytecode: new FormControl(object['bytecode'])
                }));
            }
        }
    };
    CompileComponent.prototype.onDownload = function (download) {
        var name = download.get('objectsName').value;
        var bytecode = download.get('bytecode').value;
        var abi = download.get('abi').value;
        this.download(bytecode, name + "_bytecode");
        this.download(abi, name + "_abi.json");
    };
    CompileComponent.prototype.download = function (content, name) {
        var reader = new FileReader();
        var blob = new Blob([this.stringToByteArray(content)]);
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.href = reader.result;
            a.target = '_blank';
            a.download = name;
            a.click();
            document.body.removeChild(a);
        };
    };
    CompileComponent.prototype.stringToByteArray = function (content) {
        var buf = new ArrayBuffer(content.length * 2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = content.length; i < strLen; i++) {
            bufView[i] = content.charCodeAt(i);
        }
        return bufView;
    };
    CompileComponent = __decorate([
        Component({
            selector: 'app-compile',
            templateUrl: './compile.component.html',
            styleUrls: ['./compile.component.scss']
        }), 
        __metadata('design:paramtypes', [CompileService, NotificationsService])
    ], CompileComponent);
    return CompileComponent;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/component/compile/compile.component.js.map