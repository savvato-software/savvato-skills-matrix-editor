
export const domainInfo = {
  domain: 'localhost',
  port: '8081'
};

export const domainPort = domainInfo.domain + ':' + domainInfo.port;

export const environment = {
  production: false,
  domainPort: domainPort,
  apiUrl: 'http://' + domainPort,
  skillsMatrixApiUrl: 'http://' + domainPort
};
