
export const domainInfo = {
  domain: 'SAVVATO-SKILLS-MATRIX-API-IP',
  port: 'SAVVATO-SKILLS-MATRIX-API-PORT'
};

export const domainPort = domainInfo.domain + ':' + domainInfo.port;

export const environment = {
  production: true,
  domainPort: domainPort,
  apiUrl: 'http://' + domainPort
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
