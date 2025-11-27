export async function fetchGoldPrice(apiKey) {
    const res = await fetch(`https://eodhd.com/api/real-time/XAU.FOREX?api_token=${apiKey}&fmt=json`);
    const data = await res.json(); 
    let price = data.close; 

    // NA対策
    if (price === 'NA') {
        console.log("⚠️ 金価格が利用不可のため仮の価格を使用します。");
        price = 2650; 
    }
    return price;
}

export async function fetchUsdJpyRate(apiKey) {
    const res = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`);
    const data = await res.json(); 

    return data.rates.JPY / data.rates.USD;
}