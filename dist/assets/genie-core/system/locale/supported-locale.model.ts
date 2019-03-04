import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../../../../../src/environments/environment';

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

    let defaultLocale = systemLocale.countryCode.vn.defaultLocale
    console.log(`default locale: ${defaultLocale}`)
    return defaultLocale
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/' + environment.countryCode + '/', '.json');
}