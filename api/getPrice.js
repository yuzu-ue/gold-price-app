import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    try {
        const price = await kv.get('latestPrice');

        if (price === null) {

        // 404 (Not Found) エラーをJSONで返す
            return res.status(404).json({ error: 'まだ価格がありません' });
        }

        // 4c. 条件分岐（もし価格がちゃんと取れたら）
        // 200 (OK) 成功をJSONで返す
   
        return res.status(200).json({ latestPrice: price });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'サーバーエラーが発生しました' });
    }
}