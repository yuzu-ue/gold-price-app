export async function fetchGoldPrice(apiKey) {
    
    const res = await fetch(`https://eodhd.com/api/real-time/XAU.FOREX?api_token=${goldKey}&fmt=json`);
    const date = await goldRes.json();

    let price = date.colose;
    if (price === 'NA') {
        console.log("金価格が利用不可のため仮の価格を表示します。");
        price = 2650; // 仮の価格
    }
    return price;
}

export async function fetchUsdJptRate(apiKey) {
    const res = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${exchangeKey}`);
    const date = await usdjpyRes.json();

    return date.rates.JPY / date.rates.USD;
}
