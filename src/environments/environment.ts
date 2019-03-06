import { SystemLocale } from "../assets/genie-core/system/config/locale-config.model";
import { SystemCountry } from "../assets/genie-core/system/config/system-config.model";
import { SystemCurrency } from "../assets/genie-core/system/config/currency-config.model";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  envName: 'dev-core',
  countryCode: SystemCountry.CORE,
  languages: [`${SystemLocale.EN}-us'`, `${SystemLocale.ZH_HANT}-${SystemCountry.CORE}`],
  language_def: SystemLocale.ZH_HANT,
  currencies: [
    SystemCurrency.HKD, SystemCurrency.USD
  ],

  salesforce: {
    userinfo: 'https://vncmpsit-manulife-vietnam.cs72.force.com/services/apexrest/userinfo',
    login: 'https://localhost/pages/action/login',
    logout: 'https://localhost/pages/action/logout',
    registerPush: 'https://vncmpsit-manulife-vietnam.cs72.force.com/cmp/services/apexrest/push-proxy/v1/registration'
  },

  mobile: {
    openAddressBook:  'https://localhost/services/apexrest/openAddressBook',
    pushDeviceInfo: 'https://localhost/services/apexrest/pushDeviceInfo',
    fetchNotifications:  'https://localhost/services/apexrest/fetchNotifications',
    appInfo: 'https://localhost/services/apexrest/AppInfo',
    exportLog: 'https://localhost/services/apexrest/exportLog',
    clearUserSession: 'https://localhost/services/apexrest/clearUserSession',
    call: 'https://localhost/services/apexrest/call'
  },
};
