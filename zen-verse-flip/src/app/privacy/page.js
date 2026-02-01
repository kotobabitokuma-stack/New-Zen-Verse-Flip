import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 font-sans max-w-3xl mx-auto leading-relaxed">
      <Link href="/" className="text-blue-500 text-sm mb-6 inline-block hover:underline">← Back to App</Link>
      
      {/* English Section */}
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm mb-6 italic text-gray-600">This policy is effective as of February 2026 and may be updated. Please check for the latest version.</p>
      
      <div className="space-y-6 text-sm mb-12">
        <p>This Privacy Policy describes how <strong>kotobabito</strong> ("we," "us," or "our") handles user information for the "Kotonoha Bright Key" project (the "App").</p>
        
        <p><strong>1. Information We Collect:</strong> We collect minimal information through the Pi Network SDK: Pi Network Username, Unique ID (UID), and Wallet Address (Only if the Pioneer explicitly uses payment or blockchain integration features in the future).</p>
        
        <p><strong>2. Purpose of Use:</strong> Collected information is used for the following utilities:
          <br />1. Identifying Pioneers and providing a personalized experience.
          <br />2. Facilitating future KBK token distributions and NFT ownership verification (as utility functions).
          <br />3. Preventing unauthorized use to maintain a safe and peaceful community.
        </p>
        
        <p><strong>3. Future Blockchain Integration:</strong> This project may integrate blockchain technology (KBK tokens, NFTs, etc.) in the future. In such cases, and only with the Pioneer's explicit consent, we may refer to public wallet information to reflect services such as NFT displays or marketplace functions. We will never provide your information to third parties without consent.</p>
        
        <p><strong>4. Data Protection and Rights:</strong> We strictly manage collected information and take appropriate measures to prevent leaks. Pioneers may request to view, correct, or delete their information by contacting: <strong>kotobabito.kuma@gmail.com</strong></p>
      </div>

      <hr className="my-10" />

      {/* 日本語セクション */}
      <h1 className="text-2xl font-bold mb-4 mt-10">プライバシーポリシー</h1>
      <p className="text-sm mb-6 italic text-gray-600">本ポリシーは、作者：kotobabito（以下「当方」）が提供するプロジェクト「Kotonoha Bright Key」（以下「本アプリ」）における、利用者情報の取り扱いを定めるものです。本ポリシーは随時更新される可能性があります。最新版をご確認ください。</p>

      <div className="space-y-6 text-sm">
        <p><strong>第1条（取得する情報）：</strong> 本アプリでは、Pi Network SDKを通じて、必要最小限の以下の情報を取得します。
          <br />・Pi Network ユーザーネーム
          <br />・ユニークID（UID）
          <br />・ウォレットアドレス（将来的に決済機能、またはブロックチェーン連携機能をパイオニアが明示的に利用した場合のみ）
        </p>
        
        <p><strong>第2条（利用目的）：</strong> 取得した情報は、以下のユーティリティ提供のために使用します。
          <br />1. パイオニアの識別およびパーソナライズされた体験の提供。
          <br />2. 今後展開予定のKBKトークン付与、およびNFT所有権の確認（ユーティリティとしての活用）。
          <br />3. 安全で平和なコミュニティ維持のための不正利用防止。
        </p>
        
        <p><strong>第3条（将来的なデータの連携）：</strong> 本プロジェクトは将来的にブロックチェーン技術（KBKトークン、NFT等）を統合する可能性があります。その際、パイオニアが明示的に同意した場合に限り、公開されているウォレット情報を参照し、サービス（NFTの展示、マーケットプレイス機能等）に反映させる場合があります。取得した情報を本人の同意なく第三者に提供することはありません。</p>
        
        <p><strong>第4条（データの保護と権利）：</strong> 当方は、取得した情報を厳格に管理し、漏洩防止のための適切な措置を講じます。パイオニアは、自身の情報の確認・訂正・削除を請求することができます。これらの請求は、本アプリ公式の連絡窓口（kotobabito.kuma@gmail.com）にて受け付けます。</p>
      </div>
    </div>
  );
}