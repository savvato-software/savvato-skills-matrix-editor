
export const domainInfo = {
  domain: 'localhost',
  port: '8080'
};

export const skillsMatrixApiInfo = {
    domain: 'localhost',
    port: '8081'
}

export const domainPort = domainInfo.domain + ':' + domainInfo.port;
export const skillsMatrixApiDomainPort = skillsMatrixApiInfo.domain + ':' + skillsMatrixApiInfo.port;

export const environment = {
  production: false,
  domainPort: domainPort,
  apiUrl: 'http://' + domainPort,
  skillsMatrixApiUrl: 'http://' + skillsMatrixApiDomainPort
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
