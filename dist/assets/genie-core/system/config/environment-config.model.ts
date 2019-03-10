import { SystemCountry } from "./system-config.model";
import { SystemLocale } from "./locale-config.model";
import { Currency } from "./currency-config.model";

export interface EnvironmentConfig {
    production: boolean,

    envName: string,
    countryCode: SystemCountry,
    languages: Array<string>,
    language_def: SystemLocale,
    currencies: Array<Currency>,
  
    API_BASE_PATH: string,

    salesforce: {
        userinfo: string,
        login: string,
        logout: string,
        registerPush: string 
    },
  
    mobile: {
        openAddressBook: string,
        pushDeviceInfo: string,
        fetchNotifications: string,
        appInfo: string,
        exportLog: string,
        clearUserSession: string,
        call: string
    }

    digitalLeads: {
        actionTimeoutWarningInSec: number,
        actionTimeoutInSec: number,
        countdownPeriodInMs: number 
    },

    activity: {
        backDateDays: number
    },

    goal: {
        weeklyGoalSettingThreshold: number
    },
}
  
