import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 font-sans max-w-2xl mx-auto">
      <Link href="/" className="text-blue-500 text-sm mb-4 inline-block">← Back</Link>
      <h1 className="text-2xl font-bold mb-6">Terms of Service</h1>

      {/* English */}
      <section className="mb-10 text-sm space-y-4">
        <p><strong>The 3 Rules:</strong> 1. Cherish your "likes". 2. Respect others' "likes". 3. Create a peaceful place together.</p>
        <p><strong>Intellectual Property:</strong> Designs and world-view belong to the author. User-posted content rights remain with the user.</p>
        <p><strong>Independent Project:</strong> This app is unaffiliated with Pi Network official.</p>
        <p><strong>Governing Law:</strong> Laws of Japan (Tokyo District Court).</p>
      </section>

      <hr className="my-8" />

      {/* 日本語 */}
      <section className="text-sm space-y-4">
        <h2 className="text-xl font-bold">利用規約</h2>
        <p><strong>3大原則：</strong>1. 自分の「好き」を大切にする。 2. 他人の「好き」を尊重する。 3. みんなで平和な場所を作る。</p>
        <p><strong>著作権：</strong>デザインや世界観は作者に帰属します。ユーザー投稿の権利は本人に帰属します。</p>
        <p><strong>独立性：</strong>本アプリはPi Network公式とは無関係の独立したプロジェクトです。</p>
      </section>
    </div>
  );
}