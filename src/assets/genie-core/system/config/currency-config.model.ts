// ISO 4217 Currency Code
export const SystemCurrency = function() {
    const HKD:Currency = {
        alphaCode: 'HKD',
        symbol: '$',
        exponent: -2
    }
    const USD:Currency = {
        alphaCode: 'USD',
        symbol: '$',
        exponent: -2
    }
    const CAD:Currency = {
        alphaCode: 'CAD',
        symbol: '$',
        exponent: -2
    }
    const JPY:Currency = {
        alphaCode: 'JPY',
        symbol: '¥',
        exponent: 0
    }
    const VND:Currency = {
        alphaCode: 'VND',
        symbol: '$',
        exponent: -2
    }
    const KHR:Currency = {
        alphaCode: 'KHR',
        symbol: '៛',
        exponent: -2
    }
    return {
        HKD: function() {
            return HKD
        },
        USD: function() {
            return USD
        },
        CAD: function() {
            return CAD
        },
        JPY: function() {
            return JPY
        },
        VND: function() {
            return VND
        },
        KHR: function() {
            return KHR
        }
    }
}();

export interface Currency {
    alphaCode:string,
    symbol:string,
    exponent:number
}

export interface CurrencyConfig {
    supportedCurrencies:Array<Currency>,
}
