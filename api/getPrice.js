import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    try {

        const goldKey = process.env.GOLD_API_KEY; // 金価格APIキー
        const exchangeKey = process.env.EXCHANGE_API_KEY; // 為替APIキー

        // 1. データ取得
        const goldRes = await fetch(`https://eodhd.com/api/real-time/XAU.FOREX?api_token=${goldKey}&fmt=json`);
        const goldData = await goldRes.json();
        console.log("Gold Data:", goldData);

        const usdjpyRes = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${exchangeKey}`);
        const usdjpyData = await usdjpyRes.json();
        console.log("USDJPY Data:", usdjpyData);

        // 2. 金価格のクリーニング        
        let goldPriceUSD = goldData.close;
        if (goldPriceUSD === 'NA') {
            console.log("金価格が利用不可のため仮の価格を表示します。");
            goldPriceUSD = 2000; // 仮の価格
        }

        // 3. 計算
        let usdToJpy = usdjpyData.rates.JPY / usdjpyData.rates.USD; // USDからJPYへの為替レート取得
        let glamPiceJPY = (goldPriceUSD / 31.1035) * usdToJpy // グラム単位に変換
        let goldTaxPriceJPY = glamPiceJPY * 1.1; // 10%の消費税を加算
        let finalPrice = Math.floor(goldTaxPriceJPY); // 最終価格を四捨五入

        await kv.set('latestPrice', finalPrice);
        return res.status(200).json({ price: finalPrice });

    } catch (error) {
        console.error("エラー発生！:", error);
        return res.status(500).json({ error: error.message });
    }
}