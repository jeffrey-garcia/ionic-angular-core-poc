
// ISO 4217 Currency Code
export const SystemCurrency = {
    HKD: {
        alphaCode: 'HKD',
        mnemonic: '$',
        exponent: -2
    },
    USD: {
        alphaCode: 'USD',
        mnemonic: '$',
        exponent: -2
    },
    CAD: {
        alphaCode: 'CAD',
        mnemonic: '$',
        exponent: -2
    },
    JPY: {
        alphaCode: 'JPY',
        mnemonic: '¥',
        exponent: 0
    },
    VND: {
        alphaCode: 'VND',
        mnemonic: '$',
        exponent: -2
    },
    KHR: {
        alphaCode: 'KHR',
        mnemonic: '៛',
        exponent: -2
    }
}

export interface Currency {
    alphaCode:string,
    mnemonic:string,
    exponent:number
}

export interface CurrencyConfig {
    supportedCurrencies:Array<Currency>,
}
