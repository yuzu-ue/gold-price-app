import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    try {
        console.log("🚀 API開始！"); // まず叫ぶ

        const goldKey = process.env.GOLD_API_KEY;
        const exchangeKey = process.env.EXCHANGE_API_KEY;

        // 鍵の中身は見せちゃダメだけど、「あるかないか」だけ確認する
        console.log("🔑 金の鍵はある？:", goldKey ? "ある！" : "ない...");
        console.log("🔑 為替の鍵はある？:", exchangeKey ? "ある！" : "ない...");

        // ここからAPI呼び出し
        console.log("📡 金のデータを取得中...");
        const goldRes = await fetch(`https://eodhd.com/api/real-time/XAU.FOREX?api_token=${goldKey}&fmt=json`);
        const goldData = await goldRes.json();
        console.log("💰 Gold Data:", JSON.stringify(goldData)); // 中身を強制的に文字列にする

        console.log("📡 為替データを取得中...");
        const usdjpyRes = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${exchangeKey}`);
        const usdjpyData = await usdjpyRes.json();
        console.log("💱 USDJPY Data:", JSON.stringify(usdjpyData));

        // 最後にとりあえずレスポンスを返す（画面のグルグルを止めるため）
        return res.status(200).json({ message: "ログを見てね！" });
       
    } catch (error) {
        console.error("🔥 エラー発生！:", error);
        return res.status(500).json({ error: error.message });
    }
}