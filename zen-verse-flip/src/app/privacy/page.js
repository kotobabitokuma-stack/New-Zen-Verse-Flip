import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-8 font-sans max-w-2xl mx-auto">
      <Link href="/" className="text-blue-500 text-sm mb-4 inline-block">← Back</Link>
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      
      {/* English */}
      <section className="mb-10 text-sm space-y-4">
        <p>This Privacy Policy describes how <strong>kotobabito</strong> handles user information for "Kotonoha Bright Key".</p>
        <p><strong>1. Information We Collect:</strong> We collect minimal information through the Pi Network SDK: Username, Unique ID (UID), and Wallet Address (only for future specific features).</p>
        <p><strong>2. Purpose:</strong> For identification, KBK utility, and safety.</p>
        <p><strong>3. Protection:</strong> Managed strictly. Contact: <strong>kotobabito.kuma@gmail.com</strong></p>
      </section>

      <hr className="my-8" />

      {/* 日本語 */}
      <section className="text-sm space-y-4">
        <h2 className="text-xl font-bold">プライバシーポリシー</h2>
        <p>作者：<strong>kotobabito</strong>が提供する「Kotonoha Bright Key」における情報の取り扱いを定めます。</p>
        <p><strong>第1条：</strong>ユーザーネーム、UID、および将来的な連携時のウォレットアドレスを必要最小限に取得します。</p>
        <p><strong>第2条：</strong>パイオニアの識別、KBKユーティリティ提供のために使用します。</p>
        <p><strong>第3条：</strong>管理窓口：<strong>kotobabito.kuma@gmail.com</strong></p>
      </section>
    </div>
  );
}