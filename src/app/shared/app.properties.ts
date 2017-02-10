export class AppProperties {
  static API_COINS_ENDPOINT = 'https://sjcoins-testing.softjourn.if.ua/coins/api/v1';
  // static API_COINS_ENDPOINT = 'http://localhost:8080/api/v1';
  static AUTH_SERVER = 'https://sjcoins-testing.softjourn.if.ua/auth';
  static AUTH_ENDPOINT = AppProperties.AUTH_SERVER + '/oauth/token';
  // static ERIS_COMPILER = 'http://kraytsman.eris.compiler/compile';
  static ERIS_COMPILER = 'http://46.101.203.71/compile';
  static AUTH_API = AppProperties.AUTH_SERVER + '/api/v1';
  static CLIENT_AUTH_HASH = 'dXNlcl9jcmVkOnN1cGVyc2VjcmV0';
  static NOTIFICATION_OPTIONS = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true
  };
}
