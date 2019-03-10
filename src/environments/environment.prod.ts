import { SystemLocale } from "../assets/genie-core/system/config/locale-config.model";
import { SystemCountry } from "../assets/genie-core/system/config/system-config.model";
import { SystemCurrency } from "../assets/genie-core/system/config/currency-config.model";
import { EnvironmentConfig } from "../assets/genie-core/system/config/environment-config.model";

export const environment = function() {
  const _env:EnvironmentConfig = {
    production: true,

    envName: 'prod-core',
    countryCode: SystemCountry.CORE,
    languages: [`${SystemLocale.EN}-us'`, `${SystemLocale.ZH_HANT}-${SystemCountry.CORE}`],
    language_def: SystemLocale.ZH_HANT,
    currencies: [
      SystemCurrency.HKD, SystemCurrency.USD
    ],
  
    API_BASE_PATH: 'https://vncmpd1-manulife-vietnam.cs57.force.com/cmp/services/apexrest',

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

    digitalLeads: {
      actionTimeoutWarningInSec: 15,
      actionTimeoutInSec: 45,
      countdownPeriodInMs: 1000 // debug countdown for dev environment 
    },    

    activity: {
      backDateDays: 0
    },

    goal: {
      weeklyGoalSettingThreshold: 2
    },
  } 
  return _env
}();
