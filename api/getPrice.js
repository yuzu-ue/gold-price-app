import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    try {

        const goldKey = process.env.GOLD_API_KEY; // 金価格APIキー
        const exchangeKey = process.env.EXCHANGE_API_KEY; // 為替APIキー

        const goldRes = await fetch(`https://eodhd.com/api/real-time/XAU.FOREX?api_token=${goldKey}&fmt=json`);

        const goldData = await goldRes.json();
        console.log("Gold Data:", goldData);

        const usdjpyRes = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${exchangeKey}`);
        const usdjpyData = await usdjpyRes.json();
        console.log("USDJPY Data:", usdjpyData);
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
}