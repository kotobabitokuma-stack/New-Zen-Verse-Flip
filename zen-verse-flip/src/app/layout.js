// app/layout.js の中身
import Script from "next/script"; // 👈 これをインポート

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        {/* 👇 これが「最新の読み込み方」よ！ */}
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}