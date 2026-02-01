"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- データの定義 ---
// ここが正しく閉じられていないとエラーになります
const WORDS = [
  { 
    id: 0, 
    isCover: true, 
    image: "/coverV0.png" // Minimal版の表紙画像
  },
  { id: 1, mainEn: "All encounters and events exist to lead you to happiness.", subJp: "すべての出逢いも出来事も 幸せのためにやってくる", noteEn: "Every experience—hardships, joys, and challenges—is a seed of happiness. Believe that everything you face today is paving the path to a brighter future.", noteJp: "苦しいことも嬉しいことも、すべては幸せの素。今の経験が必ず未来の幸せに繋がると、自分を信じてあげてください。" },
  { id: 2, mainEn: "No Judgement", subJp: "自分を裁かない", noteEn: "Stop judging yourself first. Embrace your mistakes and use that energy to enrich your life.", noteJp: "大切なのは、まずは自分自身をジャッジしないということです。失敗した自分を認め、抱きしめてあげてください。その心を、どうか心豊かになる時間に惜しみなく使ってください。" },
  { id: 3, mainEn: "Simply being alive right now is a tremendous achievement.", subJp: "今を生きているだけで大成功です", noteEn: "You were born with a promise to be happy. Just being alive in this moment is a miracle and a great success.", noteJp: "あなたは幸せになるために生まれてきました。今、この瞬間を生きているだけで、あなたはすでに大成功なのです。" },
  { id: 4, mainEn: "Life is an accumulation of moments.", subJp: "一生とは一瞬一瞬の積み重ね", noteEn: "We make 35,000 choices every day. Instead of suppressing yourself, choose what truly fulfills your heart.", noteJp: "人は一日に3万5000回もの選択をしています。我慢する選択ではなく、自分が満たされる選択を意識してみましょう。その積み重ねが一生を作っていくのです。" },
  { id: 5, mainEn: "SMILE", subJp: "笑顔は連鎖し、めぐり還ってくる", noteEn: "Smiles are contagious. When you smile, it spreads to others and eventually returns to you.", noteJp: "笑顔は連鎖します。あなたが笑顔でいれば、それは周りに広がり、巡り巡ってあなたの元に還ってきます。" },
  { id: 6, mainEn: "If you can't fly, then run.", subJp: "飛べなきゃ走る", noteEn: "Don't worry about what others can do. Just focus on what you can do and what you love. If you can’t fly, then run!", noteJp: "ダチョウは鳥だけど飛べません。でも走る速さは超一流。周りと比べる必要はありません。あなたが今できること、好きなことを全力でやりましょう。" },
  { id: 7, mainEn: "Even a half-step forward is a giant leap.", subJp: "たとえ半歩の歩みでも、それは大きな一歩。", noteEn: "Even if it feels small or shaky, that step is paving the way to your future.", noteJp: "最初の一歩は怖いものです。たとえ震えながらの半歩だったとしても、それは未来へ続く確かな一歩。踏み出した自分を、心から誇りに思ってください。" },
  { id: 8, mainEn: "Everything is a stepping stone.", subJp: "すべて通過点。", noteEn: "Failure and success are both just points on your journey. Don't stop there. Believe in yourself and keep walking.", noteJp: "失敗も成功も、すべては道の途中。そこで終わらず、自分を信じて歩き続けましょう。今日も大切な通過点です。" },
  { id: 9, mainEn: "Keisei Saimin: Enriching the World.", subJp: "経世済民（けいせいさいみん）", noteEn: "The true meaning of 'Economy' is to govern and provide for the people.", noteJp: "経済とは、世を治め、民を救うこと。お金を払う時、それは誰かの助けになり社会を豊かにする活動でもあります。富が巡る豊かな世界を共に作りましょう。" },
  { id: 10, mainEn: "When in doubt, choose with love.", subJp: "迷った時こそ愛の選択", noteEn: "Don't just choose based on gain and loss. Feel the love within you. A choice made with love will always lead to true fulfillment.", noteJp: "損得や効率だけで選ぶのではなく、あなたの内側にある「愛」を基準に選んでみてください。愛を持って下した決断は、必ずあなたの心を豊かに満たしてくれます。" },
  { id: 11, mainEn: "Cherish yourself first.", subJp: "自分を大切に生きること", noteEn: "To protect what you love, you must first value yourself. When you are fulfilled, your kindness will naturally overflow.", noteJp: "あなたにとって大切なものは何ですか？ それを本当に守るためには、まず自分自身を大切にしてください。あなたが満たされてこそ、穏やかな心で大切な人を愛せるようになります。" },
  { id: 12, mainEn: "\"Later is fine\" is the start of \"It's too late.\"", subJp: "「まあいいや」は「もういいや」のはじまり", noteEn: "Don’t let a small \"oh well\" turn into a frozen mountain later. If you can do it now, do it with love.", noteJp: "小さな「まあいいや」が、後で凍った雪山のように重くのしかかります。未来の自分が困らないよう、今できることを大切に。" },
  { id: 13, mainEn: "Common sense is often a matter of convenience.", subJp: "常識は大体、誰かの都合。", noteEn: "Standards change with time and place. Don't let someone else’s convenience define your worth.", noteJp: "常識は時代や場所で変わる曖昧なもの。誰かの都合で決められた「普通」に縛られなくていい。心の満たされる生き方を選んでください。" },
  { id: 14, mainEn: "The direction you are facing is \"forward.\"", subJp: "真っ暗で何も見えなくても", noteEn: "Even in total darkness, a light will appear. Whichever way you face is the path forward.", noteJp: "お先真っ暗でも、必ず光は見えてきます。どっちへ行けばいいか分からない時は、自分が向いた方を「前」だと信じて。あなたなら、大丈夫。" },
  { id: 15, mainEn: "I feel a little embarrassed, but I want to tell you that I love you.", subJp: "ちょっと照れくさいけど", noteEn: "Saying \"I love you\" might be awkward, but don't keep it hidden. If it's too much, a simple \"Thank you\" is enough.", noteJp: "照れくさくても、大切な人には言葉で伝えましょう。「愛してる」が難しければ「ありがとう」でもいい。あなたの想いを、声に乗せてみて。" },
  { id: 16, mainEn: "Take three steps forward, then take two more with vigor", subJp: "三歩すすんで二歩すすむ", noteEn: "Even if you stumble, it's a sign of progress. Only those who keep moving get to enjoy the beautiful scenery ahead.", noteJp: "自分を信じて、未来へ突き進みましょう。転ぶのは前に進もうとしている証拠です。歩き続けた人にしか見えない景色を、楽しんでください。" },
  { id: 17, mainEn: "I'll always give you a push from behind", subJp: "いつでも背中を押してやる", noteEn: "Don’t blame yourself for being afraid. I am always here to support you. Everything will be all right!", noteJp: "踏み出せない自分を責めないで。私はいつでも、この言葉を通してあなたの味方です。その先に失敗があっても、最後には幸せが待っています。" },
  { id: 18, mainEn: "Tears Know No Age", subJp: "大人だって泣いていいんだよ", noteEn: "Tears are meant to be shed. Let your emotions flow. The warmth of those tears will surely comfort your life.", noteJp: "泣きたい時は泣けばいいのです。嬉しい時も悲しい時も、たくさん泣いていい。その涙の温もりが、あなたの人生を温めてくれます。" },
  { id: 19, mainEn: "Even when eight direction are blocked, search for the ninth direction", subJp: "八方塞がっても九方目を探せ", noteEn: "When all ways seem blocked, look for a new path—above, below, or by asking for help. Don’t give up just yet.", noteJp: "行き止まりに思えても、上や下、あるいは誰かの助けなど、別の道が必ずあります。諦めずに「九方目」を探しましょう。" },
  { id: 20, mainEn: "Although it's painful, frustrating, and lonely, it's Heno Kappa", subJp: "苦しいけれど悔しいけれど寂しいけれど", noteEn: "It's okay to admit when things are tough. Embracing those feelings is what makes your kindness real.", noteJp: "どんな時も明るく。けれど、苦しい時に「苦しい」と感じる自分も否定しないで。その素直な心が、あなたの人生を豊かにしてくれます。" },
  { id: 21, mainEn: "It's okay, the sun is always watching over you!", subJp: "大丈夫いつだってお天道さんが見ているよ", noteEn: "Even if no one notices your hard work, the sun is always watching. You know your own effort, and that is enough.", noteJp: "誰にも気づかれなくても、お天道さんはあなたの頑張りを見ています。あなた自身が自分の努力を知っている、それだけで十分なのです。" },
  { id: 22, mainEn: "We are all connected!", subJp: "ボクらはつながっているよ", noteEn: "Whether it is sunny or rainy, the same sky connects us all. If you ever feel lonely, just look up.", noteJp: "晴れの日も雨の日も、私たちは同じ空の下で繋がっています。孤独を感じた時は、空を見上げてみてください。あなたは決して一人ではありません。" },
  { id: 23, mainEn: "There's someone tracing your footsteps", subJp: "君の足あとを辿る人がいる", noteEn: "Your footprints will become a guide for those who follow. Trust your journey.", noteJp: "道なき道を進むあなたの勇気が、いつか誰かの道しるべになります。あなたの一歩一歩が重なり、やがて多くの人を幸せへと導く道になる。" },
  { id: 24, mainEn: "If you look back, even headwinds become tailwinds", subJp: "風", noteEn: "By shifting your mindset, resistance becomes energy. Sometimes, a moment of reflection is all you need.", noteJp: "向かい風に抗うのではなく、視点を変えてみましょう。考え方ひとつで、困難はあなたを前へ運ぶ追い風に変わります。" },
  { id: 25, mainEn: "Letter to the Future", subJp: "未来への手紙", noteEn: "Your life is a blank sheet of paper. You have the freedom to draw whatever makes you smile. The future is always open.", noteJp: "人生は真っ白な紙と同じ。あなたが笑顔になれるものなら、何を描いても自由です。未来はいつだって、あなた次第で描き変えられます。" },
  { id: 26, mainEn: "I am grateful to have met you from the bottom of my heart", subJp: "あなたに出逢えて良かった", noteEn: "Meeting special people is an attraction. Live true to yourself, and you will find those you were meant to encounter.", noteJp: "かけがえのない出逢いは引き寄せ合うもの。自分らしく生きていれば、運命の出逢いにきっとたくさん気づけるはずです。" },
  { id: 27, mainEn: "Too ◯◯ is your charm", subJp: "◯◯過ぎなところ", noteEn: "Your \"too much\" qualities are actually your greatest strengths. Accept them as your unique individuality.", noteJp: "「〇〇過ぎ」なところは、抑えられないほど溢れるあなたの才能です。自分を肯定できたとき、その魅力はさらに輝き出します。" },
  { id: 28, mainEn: "Wakuwaku Dokidoki Ukiuki", subJp: "ワクワク　ドキドキ　ウキウキ", noteEn: "Living with your \"likes\" keeps your heart and body youthful. Start by cherishing what you love.", noteJp: "自分の「好き」を大切に生きる人は、細胞レベルで輝き、心も体も健康的になります。そこから毎日のワクワクが始まります。" },
  { id: 29, mainEn: "Cherished Gems of Our Past Experiences", subJp: "ぜんぶぜんぶ宝もの", noteEn: "Your joy, pain, and regrets have shaped you. Not a single step was a mistake.", noteJp: "どんな選択も、今のあなたに繋がっています。喜びも悲しみも、何一つ間違いではありませんでした。すべては大切な宝ものなのです。" },
  { id: 30, mainEn: "The future is wide open and full of possibilities!", subJp: "未来は自由自在なんだ", noteEn: "Like a blank canvas, you have the power to paint whatever you desire. Just start by dreaming freely.", noteJp: "描く未来に制限はいりません。真っ白なキャンバスに好きな絵を描くように、自由に未来を想像してみてください。" },
  { id: 31, mainEn: "There's no need to hold back in your own life", subJp: "自分の人生に遠慮は要らん", noteEn: "To bring happiness to others, you must first be happy yourself. It’s your life—shine without hesitation.", noteJp: "周りの人を幸せにするためにも、まずは自分を幸せにしましょう。遠慮せず、一度きりの人生、あなたの「幸せ」を最優先に生きてください。" }
];

// ... (上のWORDSデータなどはそのまま) ...

export default function Home() {
  // 💰 決済の命令（これを呼ぶとPiの支払い画面が開くわ）
const handlePayment = async () => {
    if (!window.Pi) return;
    try {
      await window.Pi.createPayment({
        amount: 0.1,
        memo: "KBKテスト決済",
        metadata: { productId: "test_001" },
      }, {
   // 💰 修正：ただログを出すだけでなく、サーバーの承認窓口を呼び出すわ！
        onReadyForServerApproval: async (paymentId) => {
          console.log("サーバー承認リクエスト送信中...", paymentId);
          try {
            await fetch("/api/payment/approve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            });
          } catch (error) {
            console.error("承認リクエスト失敗:", error);
          }
        },
        // 💰 ここが重要！決済が完了したら自前APIに報告する
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log("決済完了！サーバーに報告中...", paymentId);
          await fetch("/api/payment/complete", {
            method: "POST",
            body: JSON.stringify({ paymentId, txid }),
          });
        },
        onCancel: (paymentId) => { console.log("キャンセル:", paymentId); },
        onError: (error) => { console.error("エラー:", error); },
      });
    } catch (err) {
      alert("エラー: " + err.message);
    }
  };
  const [index, setIndex] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- Pi SDK 状態管理 ---
  const [user, setUser] = useState(null); // ログインしたユーザー情報
  const [isPiReady, setIsPiReady] = useState(false); // SDKが準備できたか

  useEffect(() => {
    // 1. ローディングタイマー
    const timer = setTimeout(() => setIsLoading(false), 2500);

    // 2. SDKの初期化チェック
    if (typeof window !== "undefined" && window.Pi) {
      setIsPiReady(true);
      window.Pi.init({ version: "2.0", sandbox: false });
    }

    return () => clearTimeout(timer);
  }, []);

// --- 未完了決済の処理（これがないとエラーになっちゃうわ） ---
  const onIncompletePaymentFound = (payment) => {
    console.log("未完了の決済を見つけたわ:", payment);
    // 本来はここでサーバーに報告するけれど、今はログに出すだけでOKよ
  };

  // --- ログイン処理 ---
 const handleLogin = async () => {
    console.log("Button clicked");
    if (!window.Pi) {
      alert("SDKが読み込まれていないわ！Pi Browserで開いているか確認してね。");
      return;
    }
    alert("Pi SDKと通信を開始するわよ！"); 
    try {
      const scopes = ["username", "payments"];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(auth.user);
      alert("ログイン成功！: " + auth.user.username);
    } catch (err) {
      alert("エラーが発生したわ: " + err.message);
    }
  };

  // --- スワイプ関数などはそのまま ---
  const nextCard = () => { setIndex((prev) => (prev + 1) % WORDS.length); setShowNote(false); };
  const prevCard = () => { setIndex((prev) => (prev - 1 + WORDS.length) % WORDS.length); setShowNote(false); };

  return (
    <div className="fixed inset-0 bg-white overflow-hidden text-black font-sans flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" className="flex h-screen flex-col items-center bg-white" exit={{ opacity: 0 }}>
            <div className="h-[15vh]" />
            <img src="/Loading.png" alt="Loading" className="w-full max-w-[280px]" />
          </motion.div>
        ) : (
          <motion.main key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center bg-white">
            
            {/* 1. コンテンツエリア（表紙・カード） */}
            <div className="flex-1 w-full max-w-sm flex items-center justify-center px-6">
               {/* 以前のスワイプ・カード表示ロジックをここに */}
               {index === 0 && <img src={WORDS[0].image} className="w-full h-auto" alt="Cover" />}
            </div>

            {/* 2. 【新設】Pi ログインボタン・スペース */}
            <div className="w-full max-w-[280px] py-4">
              {!user ? (
                <button
                  onClick={handleLogin}
                  disabled={!isPiReady}
                  className="w-full py-3 bg-[#8A2BE2] text-white rounded-full font-bold shadow-lg active:scale-95 transition-transform disabled:opacity-50"
                >
                  {isPiReady ? "Piでログインして始める" : "Pi SDK 読み込み中..."}
                </button>
              ) : (
<div className="text-center space-y-4">
  <div className="py-2 bg-gray-50 rounded-full border border-gray-200">
    <p className="text-sm font-bold text-gray-700">ようこそ、{user.username} くん！</p>
  </div>
  
  {/* 👇 ここにチェックリスト10用のボタンを追加したわ！ */}
  <button
    onClick={handlePayment}
    className="w-full py-3 bg-green-500 text-white rounded-full font-bold shadow-lg active:scale-95 transition-transform"
  >
    テスト決済 (0.1 Pi) を実行する
  </button>
</div>
              )}
            </div>

            {/* 3. フッターエリア */}
            <footer className="w-full text-center pb-8 shrink-0">
              <div className="min-h-[40px] mb-2">
                {index !== 0 && (
                  <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Swipe to flip</p>
                )}
              </div>
              <div className="pt-2 border-t border-gray-100 mx-10">
                <p className="text-sm text-gray-600 tracking-widest uppercase font-bold">kotobabito</p>
                <p className="text-[10px] text-gray-500 italic mt-0.5">Zen Verse Flip (Minimal)</p>
              </div>
            </footer>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}