import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export interface Config {
    countryCode?: string,
    defaultLocale?: string,
    supportedLocale?: Array<string>,
    salesforceApi?: any
    mobileApi?: any
}

export const ConfigFactory = function() {
    var config:Config = {}
    console.log(`initialize system config: ${JSON.stringify(config)}`);

    return {
        setCountryCode: function(_countryCode:string) {
            config.countryCode = _countryCode;
            console.log(`system country code configured: ${config.countryCode}`);
        },
        getCountryCode: function() {
            return config.countryCode;
        },
        setSalesforceApi: function(_salesforceApi:any) {
            config.salesforceApi = _salesforceApi;
            console.log(`salesforce api configured: ${JSON.stringify(config.salesforceApi)}`);
        },
        getSalesforceApi: function() {
            return config.salesforceApi;
        },
        setMobileApi: function(_mobileApi:any) {
            config.mobileApi = _mobileApi;
            console.log(`mobile api configured: ${JSON.stringify(config.mobileApi)}`);
        },
        getMobileApi: function() {
            return config.mobileApi;
        }
    }
}();

export function createTranslateLoader(http: HttpClient) {
    console.log(`initializing translation for country code: ${ConfigFactory.getCountryCode()}`);
    return new TranslateHttpLoader(http, './assets/i18n/' + ConfigFactory.getCountryCode() + '/', '.json');
}