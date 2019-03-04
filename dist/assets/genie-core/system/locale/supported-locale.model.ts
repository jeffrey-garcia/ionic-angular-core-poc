import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export enum Locale {
    en = 'en',
    vi = 'vi'
}

export function getDefaultLocale():Locale {
    let systemLocale = (function() {
        return {
            countryCode: {
                vn: {
                    defaultLocale: Locale.vi,
                    supportedLocales: [ Locale.vi, Locale.en ]
                }
            }
        }
    })();
    return systemLocale.countryCode.vn.defaultLocale
}

export function createTranslateLoader(http: HttpClient) {
    // return new TranslateHttpLoader(http, './assets/i18n/' + environment.countryCode + '/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/' + getDefaultLocale() + '/', '.json');
}