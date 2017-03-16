export var ContractUnit = (function () {
    function ContractUnit() {
    }
    ContractUnit.getPropertiesNameByType = function (type) {
        if (type == "event")
            return ["name", "type", "anonymous", "inputs"];
        if (type == "function")
            return ["name", "constant", "type", "inputs", "outputs"];
        if (type == "constructor")
            return ["type", "inputs"];
    };
    Object.defineProperty(ContractUnit.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContractUnit.prototype, "constant", {
        get: function () {
            return this._constant;
        },
        set: function (value) {
            this._constant = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContractUnit.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContractUnit.prototype, "anonymous", {
        get: function () {
            return this._anonymous;
        },
        set: function (value) {
            this._anonymous = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContractUnit.prototype, "inputs", {
        get: function () {
            return this._inputs;
        },
        set: function (value) {
            this._inputs = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContractUnit.prototype, "outputs", {
        get: function () {
            return this._outputs;
        },
        set: function (value) {
            this._outputs = value;
        },
        enumerable: true,
        configurable: true
    });
    return ContractUnit;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/entity/contract-unit.js.map