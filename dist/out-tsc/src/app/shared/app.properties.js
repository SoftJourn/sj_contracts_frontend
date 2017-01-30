export var AppProperties = (function () {
    function AppProperties() {
    }
    AppProperties.API_COINS_ENDPOINT = 'https://sjcoins-testing.softjourn.if.ua/coins/api/v1';
    // static API_COINS_ENDPOINT = 'http://localhost:8080/api/v1';
    AppProperties.AUTH_SERVER = 'https://sjcoins-testing.softjourn.if.ua/auth';
    AppProperties.AUTH_ENDPOINT = AppProperties.AUTH_SERVER + '/oauth/token';
    AppProperties.AUTH_API = AppProperties.AUTH_SERVER + '/api/v1';
    AppProperties.CLIENT_AUTH_HASH = 'dXNlcl9jcmVkOnN1cGVyc2VjcmV0';
    AppProperties.NOTIFICATION_OPTIONS = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: true
    };
    return AppProperties;
}());
//# sourceMappingURL=/home/kraytsman/workspace/softjourn/sj_contracts_frontend/src/src/app/shared/app.properties.js.map