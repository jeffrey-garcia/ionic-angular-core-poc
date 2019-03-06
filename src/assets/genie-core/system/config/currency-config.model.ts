
// ISO 4217 Currency Code
export const SystemCurrency = {
    HKD: {
        alphaCode: 'HKD',
        symbol: '$',
        exponent: -2
    },
    USD: {
        alphaCode: 'USD',
        symbol: '$',
        exponent: -2
    },
    CAD: {
        alphaCode: 'CAD',
        symbol: '$',
        exponent: -2
    },
    JPY: {
        alphaCode: 'JPY',
        symbol: '¥',
        exponent: 0
    },
    VND: {
        alphaCode: 'VND',
        symbol: '$',
        exponent: -2
    },
    KHR: {
        alphaCode: 'KHR',
        symbol: '៛',
        exponent: -2
    }
}

export interface Currency {
    alphaCode:string,
    symbol:string,
    exponent:number
}

export interface CurrencyConfig {
    supportedCurrencies:Array<Currency>,
}
