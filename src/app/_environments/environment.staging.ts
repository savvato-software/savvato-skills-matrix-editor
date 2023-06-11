
export const domainInfo = {
  domain: 'skills-matrix-api.staging.savvato.com',
  port: '8443'
};

export const domainPort = domainInfo.domain + ':' + domainInfo.port;

export const environment = {
  production: false,
  domainPort: domainPort,
  apiUrl: 'https://' + domainPort,
  skillsMatrixApiUrl: 'https://' + domainPort
};
