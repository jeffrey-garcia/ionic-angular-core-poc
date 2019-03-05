export enum Locale {
    en = 'en',
    vi = 'vi'
}

export interface LocaleConfig {
    countryCode:string,
    supportedLocales:Array<string>,
    defaultLocale:string
}

export const SystemLocaleConfig:Array<LocaleConfig> = [
    {
        countryCode: 'vn',
        supportedLocales: ['en', 'vi'],
        defaultLocale: 'vi'
    },
    {
        countryCode: 'kh',
        supportedLocales: ['en', 'km'],
        defaultLocale: 'en'
    }
]

export function getDefaultLocaleByCountryCode(countryCode?:string): string {
    if (countryCode == null) {
        throw new Error(`country code is undefined!`);
    }

    let localeConfig = SystemLocaleConfig.find(e => e.countryCode==countryCode);
    if (localeConfig == null) {
        throw new Error(`country code: ${countryCode} not defined in environment!`);
    } else {
        return localeConfig.defaultLocale
    }
}

export function getSupportedLocaleByCountryCode(countryCode:string): Array<string> {
    if (countryCode == null) {
        throw new Error(`country code is undefined!`);
    }

    let localeConfig = SystemLocaleConfig.find(e => e.countryCode==countryCode);
    if (localeConfig == null) {
        throw new Error(`country code: ${countryCode} not defined in environment!`);
    } else {
        return localeConfig.supportedLocales
    }
}