import { LocaleConfig, SystemLocale } from "./locale-config.model";
import { CurrencyConfig, Currency } from "./currency-config.model";
import { EnvironmentConfig } from "./environment-config.model";

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
    environment?: EnvironmentConfig,
    countryCode?: SystemCountry,
    locale?: LocaleConfig,
    currency?: CurrencyConfig,
}

export const ConfigFactory = function() {
    let countryConfig:CountryConfig = {};
    console.log(`initialize Genie system config: ${JSON.stringify(countryConfig)}`);

    let setEnvironment = function(_environment:EnvironmentConfig) {
        countryConfig.environment = _environment;
        console.log(`environment configured: ${countryConfig.environment.envName}`);
    }

    let setCountryCode = function(_countryCode:SystemCountry) {
        countryConfig.countryCode = _countryCode;
        console.log(`country code configured: ${countryConfig.countryCode}`);
    }

    let setLocale = function(_supportedLocales:Array<string>, _defaultLocale:SystemLocale) {
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

    return {
        setEnvironment: function(this:any, _environment:EnvironmentConfig) {
            setEnvironment(_environment);
            setCountryCode(_environment.countryCode);
            setLocale(_environment.languages, _environment.language_def);
            setCurrency(_environment.currencies);
        },
        getEnvironment: function():EnvironmentConfig {
            if (countryConfig.environment == null) {
                throw new Error(`environment is not configured`);
            }
            return countryConfig.environment;
        },
        getCountryCode: function():SystemCountry {
            if (countryConfig.countryCode == null) {
                throw new Error(`country code is not configured`);
            }
            return countryConfig.countryCode;
        },
        getLocale: function():LocaleConfig {
            if (countryConfig.locale == null) {
                throw new Error(`locale is not configured`);
            }
            return countryConfig.locale;
        },
        getCurrency: function():CurrencyConfig {
            if (countryConfig.currency == null) {
                throw new Error(`currency is not configured`);
            }
            return countryConfig.currency;
        }
    }
}();

