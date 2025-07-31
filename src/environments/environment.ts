// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4215';
// const apiUrl = 'http://auditapi.pwdsoft.org';
const apiUrl = 'https://localhost:44345';
const issuerUrl = 'https://auth.mis1pwd.com';
//const issuerUrl = 'https://localhost:44380';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'Audit',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: issuerUrl,
    redirectUri: baseUrl,
    clientId: 'Audit_App',
    responseType: 'code',
    scope: 'address openid profile role email phone Audit',
  },
  apis: {
    default: {
      url: apiUrl, //'https://localhost:44329',
      rootNamespace: 'PWD.Audit',
    },
  },

} as Environment;
