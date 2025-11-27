// lib/apiClient.js

export async function fetchGoldPrice(apiKey) {
    // 1. 変数名を "res" に統一
    const res = await fetch(`https://eodhd.com/api/real-time/XAU.FOREX?api_token=${apiKey}&fmt=json`);
    const data = await res.json(); // 修正: goldRes -> res, date -> data

    // 2. タイポ修正: colose -> close
    let price = data.close; 

    if (price === 'NA') {
        console.log("金価格が利用不可のため仮の価格を表示します。");
        price = 2650; 
    }
    return price;
}

export async function fetchUsdJpyRate(apiKey) {
    // 1. 変数名を "res" に統一
    const res = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`);
    const data = await res.json(); // 修正: usdjpyRes -> res, date -> data

    return data.rates.JPY / data.rates.USD;
}