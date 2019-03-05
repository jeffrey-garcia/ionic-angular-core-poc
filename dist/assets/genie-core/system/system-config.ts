import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export interface Config {
    environmentName?: string,
    countryCode?: string,
    defaultLocale?: string,
    supportedLocale?: Array<string>,
    salesforceApi?: any
    mobileApi?: any
}

export const ConfigFactory = function() {
    var config:Config = {}
    console.log(`initialize Genie system config: ${JSON.stringify(config)}`);

    return {
        setEnvironmentName: function(_environmentName:string) {
            config.environmentName = _environmentName;
            console.log(`environment name configured: ${config.environmentName}`);
        },
        getEnvironmentName: function() {
            return config.environmentName;
        },
        setCountryCode: function(_countryCode:string) {
            config.countryCode = _countryCode;
            console.log(`country code configured: ${config.countryCode}`);
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