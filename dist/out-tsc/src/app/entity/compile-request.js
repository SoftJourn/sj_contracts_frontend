export var CompileRequest = (function () {
    function CompileRequest(name, language, includes, libraries, optimize, replacement) {
        this.name = name;
        this.language = language;
        this.includes = includes;
        this.libraries = libraries;
        this.optimize = optimize;
        this.replacement = replacement;
    }
    return CompileRequest;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/entity/compile-request.js.map