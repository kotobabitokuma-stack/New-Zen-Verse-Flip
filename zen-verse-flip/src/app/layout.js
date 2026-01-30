import { Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // 1. Script コンポーネントをインポート

const notoSerif = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: 'swap',
});

export const metadata = {
  title: "Zen Verse Flip",
  description: "Words by kotobabito",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={notoSerif.className}>
        {children}
        
        {/* 2. bodyの最後に Pi SDK を読み込む設定を追加 */}
        {/* strategy="afterInteractive" にすることで、アプリの表示を邪魔せずに読み込めるわよ */}
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}