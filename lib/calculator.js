export function calculateJpyPrice(goldPriceUSD, usdToJpyRate) {
    // グラム単位に変換
    const glamPiceUSD = (goldPriceUSD / 31.1035) 
    
    // USDからJPYへの換算
    const goldPriceJPY = glamPiceUSD * usdToJpyRate ;
    
    // 10%の消費税を加算
    const taxPrice = goldPriceJPY * 1.10; 
    // 最終価格を四捨五入
    return Math.floor(taxPrice);
}