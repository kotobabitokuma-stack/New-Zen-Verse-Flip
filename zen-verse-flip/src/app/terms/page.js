import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 font-sans max-w-3xl mx-auto leading-relaxed">
      <Link href="/" className="text-blue-500 text-sm mb-6 inline-block hover:underline">← Back to App</Link>
      
      {/* English Section */}
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="text-sm mb-6 italic text-gray-600">These Terms apply to the use of "Kotonoha Bright Key" (the "App"), an independent project utilizing the Pi Network open ecosystem. By using this App, all users (hereinafter "Pioneers") agree to these Terms and the "3 Rules of Peace" below.</p>
      
      <div className="space-y-6 text-sm mb-12">
        <p><strong>Section 1: The 3 Core Rules (Fundamental Principles)</strong>
          <br />1. Cherish your "likes".
          <br />2. Respect others' "likes".
          <br />3. Create a peaceful place together.
        </p>
        
        <p><strong>Section 2: Intellectual Property and Content</strong>
          <br />1. Copyrights for the design, images, and content constituting the overall world-view of the App belong to the author (kotobabito).
          <br />2. Pioneers shall enjoy the content within a personal scope based on the project's philosophy.
          <br />3. If a Pioneer posts content, the rights belong to the Pioneer, but they grant us a royalty-free license to use it within the scope necessary to provide services within the App.
        </p>
        
        <p><strong>Section 3: Prohibited Conduct</strong>
          <br />Any actions that violate the "Rules of Peace" (slander, aggressive behavior, or unauthorized use) are prohibited. We reserve the right to suspend access at our discretion without prior notice in case of violation.
        </p>
        
        <p><strong>Section 4: Future Development and Disclaimer</strong>
          <br />1. This is an evolving project; future features (metaverse construction, marketplace, digital art display, etc.) are subject to change without notice.
          <br />2. This App uses the Pi Network SDK but is an independent project unaffiliated with Pi Network official. Pioneers must also comply with Pi Network's terms.
          <br />3. Tokens or NFTs within this project are intended for utility within the ecosystem, not for speculation.
        </p>
        
        <p><strong>Section 5: Amendments:</strong> Continued use of the App after notification constitutes agreement to the updated Terms.</p>
        <p><strong>Section 6: Governing Law:</strong> These Terms are governed by the laws of Japan. Any disputes shall be subject to the exclusive jurisdiction of the Tokyo District Court.</p>
      </div>

      <hr className="my-10" />

      {/* 日本語セクション */}
      <h1 className="text-2xl font-bold mb-4 mt-10">利用規約</h1>
      <p className="text-sm mb-6 italic text-gray-600">本規約は、当方が提供する「Kotonoha Bright Key」（以下「本アプリ」）の利用に適用されます。本アプリはPi Networkのオープンエコシステムを活用した独立プロジェクトです。本アプリを利用するすべての方（以下「パイオニア」）は、本規約および以下の「3つの平和のルール」に同意したものとみなされます。</p>

      <div className="space-y-6 text-sm">
        <p><strong>第1条（KBK経済圏の3大原則）：</strong> 本アプリは、以下のルールを運営の根幹とします。
          <br />1. 自分の「好き」を大切にする。
          <br />2. 他人の「好き」を尊重する。
          <br />3. みんなで平和な場所を作る。
        </p>
        
        <p><strong>第2条（知的財産権とコンテンツ）：</strong>
          <br />1. 本アプリ内で提供されるデザイン、画像、および全体的な世界観を構成するコンテンツの著作権は、作者（kotobabito）に帰属します。
          <br />2. パイオニアは、本プロジェクトの理念に基づき、提供されるコンテンツを個人の範囲で楽しむものとします。
          <br />3. パイオニアが投稿したコンテンツがある場合、その権利は本人に帰属しますが、本アプリ内でのサービス提供に必要な範囲において、当方が無償で利用することを許諾するものとします。
        </p>
        
        <p><strong>第3条（禁止事項と利用制限）：</strong> 第1条の「平和のルール」に反する行為（誹謗中傷、攻撃的な言動、不正利用）を禁止します。これに違反した場合、当方の裁量により、事前の通知なく利用停止措置を講じることができるものとします。</p>
        
        <p><strong>第4条（未来のサービス展開と免責）：</strong>
          <br />1. 本アプリは進化し続けるプロジェクトであり、開発中の機能（メタバース建築、マーケットプレイス、デジタルアートの展示機能等）は予告なく仕様が変更される場合があります。
          <br />2. 本アプリはPi NetworkのSDKを使用していますが、Pi Network公式とは無関係の独立したプロジェクトです。パイオニアはPi Networkの利用規約も併せて遵守するものとします。
          <br />3. 本プロジェクトにおけるトークンやNFTは、投機を目的としたものではなく、エコシステム内での実用性（ユーティリティ）を目的としています。
        </p>
        
        <p><strong>第5条（規約の変更）：</strong> 本規約およびプライバシーポリシーは、必要に応じて変更される場合があります。継続利用をもって同意とみなします。</p>
        
        <p><strong>第6条（準拠法・管轄裁判所）：</strong> 本規約は日本法に準拠し、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
      </div>
    </div>
  );
}