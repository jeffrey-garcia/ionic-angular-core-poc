import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ConfigFactory, SystemCountry } from './system-config.model'

export function createTranslateLoader(http: HttpClient) {
    console.log(`initializing translation for country code: ${ConfigFactory.getCountryCode()}`);
    return new TranslateHttpLoader(http, './assets/i18n/' + ConfigFactory.getCountryCode() + '/', '.json');
}

// ISO 639-1 Language Code
export enum SystemLocale {
    ZH_HANS = 'zh_Hans',
    ZH_HANT = 'zh_Hant',
    EN = 'en',
    FR = 'fr',
    JA = 'ja',
    VI = 'vi',
    KM = 'km',
}

export interface LocaleConfig {
    supportedLocales:Array<SystemLocale>,
    defaultLocale:SystemLocale
}

export function getDefaultLocaleByCountryCode(countryCode?:SystemCountry, localeConfig?:LocaleConfig): SystemLocale {
    if (countryCode == null) {
        throw new Error(`country code is not defined in environment!`);
    }

    if (localeConfig == null) {
        throw new Error(`locale config is not defined in environment!`);
    }

    if (localeConfig.defaultLocale == null) {
        throw new Error(`default locale is not defined for: ${countryCode} in environment!`);
    } else {
        console.log(`default locale: ${localeConfig.defaultLocale}`);
        return localeConfig.defaultLocale
    }
}

export function getSupportedLocaleByCountryCode(countryCode:SystemCountry, localeConfig?:LocaleConfig): Array<SystemLocale> {
    if (countryCode == null) {
        throw new Error(`country code is not defined in environment!`);
    }

    if (localeConfig == null) {
        throw new Error(`locale config is not defined in environment!`);
    }

    if (localeConfig.supportedLocales == null) {
        throw new Error(`supported locale is not defined for: ${countryCode} in environment!`);
    } else {
        console.log(`supported locales: ${localeConfig.supportedLocales.values}`);
        return localeConfig.supportedLocales
    }
}
