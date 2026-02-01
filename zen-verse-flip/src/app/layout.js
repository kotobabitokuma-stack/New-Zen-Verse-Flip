import "./globals.css"; // 👈 これがデザインを当てる魔法の一行！
import Script from "next/script";

// 👇 これが「画面をスマホサイズに収める」ための命令よ！
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <Script 
          src="https://sdk.minepi.com/pi-sdk.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body className="antialiased">
        {children} {/* 👈 これが超重要！これがないと中身が表示されないわ */}
      </body>
    </html>
  );
}