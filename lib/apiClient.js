export async function fetchGoldPrice(apiKey) {
    
    const res = await fetch(`https://eodhd.com/api/real-time/XAU.FOREX?api_token=${apiKey}&fmt=json`);
    const date = await goldRes.json();

    let price = date.close;
    if (price === 'NA') {
        console.log("金価格が利用不可のため仮の価格を表示します。");
        price = 2650; // 仮の価格
    }
    return price;
}

export async function fetchUsdJpyRate(apiKey) {
    const res = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`);
    const date = await usdjpyRes.json();

    return date.rates.JPY / date.rates.USD;
}
