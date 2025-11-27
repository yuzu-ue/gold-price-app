import { kv } from "@vercel/kv";
import { fetchGoldPrice , fetchUsdJytRate } from "../lib/apiClient.js";
import { calculateJpyPrice } from "../lib/calculator.js";

export default async function handler(req, res) {
    try {

        // APIキーの取得
        const goldKey = process.env.GOLD_API_KEY; // 金価格APIキー
        const exchangeKey = process.env.EXCHANGE_API_KEY; // 為替APIキー

        // 並行してAPIからデータを取得
        const [goldPriceUSD, usdToJpy] = await Promise.all([
            fetchGoldPrice(goldKey),
            fetchUsdJptRate(exchangeKey)
        ]);
        
        console.log(`金価格($): ${goldPriceUSD}, ドル円: ${usdToJpy}`);

        // 円での最終価格を計算
        const finalPrice = calculateJpyPrice(goldPriceUSD, usdToJpy); 
        console.log(`計算結果(円): ${finalPrice}`);

        // 結果をキャッシュに保存
        await kv.set('latestPrice', finalPrice);

        return res.status(200).json({
            message: "価格更新成功",
            price: finalPrice
        });

    } catch (error) {
        console.error("エラー発生！:", error);
        return res.status(500).json({ error: error.message });
    }
}