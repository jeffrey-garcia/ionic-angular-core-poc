import { LocaleConfig } from "./locale-config.model";
import { CurrencyConfig, Currency } from "./currency-config.model";

// ISO 3166-1 Alpha 2 Country Code
export enum SystemCountry {
    CORE = 'hk', // set HK as dummy core environment
    US = 'us',
    CA = 'ca',
    JP = 'jp',
    VN = 'vn',
    KH = 'kh'
}

export interface CountryConfig {
    environmentName?: string,
    countryCode?: string,
    locale?: LocaleConfig,
    currency?: CurrencyConfig,
    salesforceApi?: any
    mobileApi?: any
}

export const ConfigFactory = function() {
    let countryConfig:CountryConfig = {};
    console.log(`initialize Genie system config: ${JSON.stringify(countryConfig)}`);

    let setEnvironmentName = function(_environmentName:string) {
        countryConfig.environmentName = _environmentName;
        console.log(`environment name configured: ${countryConfig.environmentName}`);
    }

    let setCountryCode = function(_countryCode:string) {
        countryConfig.countryCode = _countryCode;
        console.log(`country code configured: ${countryConfig.countryCode}`);
    }

    let setLocale = function(_supportedLocales:Array<string>, _defaultLocale:string) {
        countryConfig.locale = {
            supportedLocales: _supportedLocales,
            defaultLocale: _defaultLocale
        };
        console.log(`locale configured: ${JSON.stringify(countryConfig.locale)}`);
    }

    let setCurrency = function(_supportedCurrencies:Array<Currency>) {
        countryConfig.currency = {
            supportedCurrencies: _supportedCurrencies
        }
        console.log(`currency configured: ${JSON.stringify(countryConfig.currency)}`);
    }

    let setSalesforceApi = function(_salesforceApi:any) {
        countryConfig.salesforceApi = _salesforceApi;
        console.log(`salesforce api configured: ${JSON.stringify(countryConfig.salesforceApi)}`);
    }

    let setMobileApi = function(_mobileApi:any) {
        countryConfig.mobileApi = _mobileApi;
        console.log(`mobile api configured: ${JSON.stringify(countryConfig.mobileApi)}`);
    }

    return {
        setEnvironment: function(this:any, _environment:any) {
            setEnvironmentName(_environment["envName"]);
            setCountryCode(_environment["countryCode"]);
            setLocale(_environment["languages"], _environment["language_def"]);
            setCurrency(_environment["currencies"]);
            setSalesforceApi(_environment["salesforce"]);
            setMobileApi(_environment["mobile"]);
        },
        getEnvironmentName: function() {
            return countryConfig.environmentName;
        },
        getCountryCode: function() {
            return countryConfig.countryCode;
        },
        getLocale: function() {
            return countryConfig.locale;
        },
        getSalesforceApi: function() {
            return countryConfig.salesforceApi;
        },
        getMobileApi: function() {
            return countryConfig.mobileApi;
        }
    }
}();

