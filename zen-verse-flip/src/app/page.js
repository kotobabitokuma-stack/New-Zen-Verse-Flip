"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- WORDSデータ（全31日分 ＋ カバー） ---
const WORDS = [
  { id: 0, isCover: true, image: "/coverV0.png" },
  { id: 1, mainEn: "All encounters and events exist to lead you to happiness.", subJp: "すべての出逢いも出来事も 幸せのためにやってくる", noteEn: "Every experience—hardships, joys, and challenges—is a seed of happiness. Believe that everything you face today is paving the path to a brighter future.", noteJp: "苦しいことも嬉しいことも、すべては幸せの素。今の経験が必ず未来の幸せに繋がると、自分を信じてあげてください。" },
  { id: 2, mainEn: "No Judgement", subJp: "自分を裁かない", noteEn: "Stop judging yourself first. Embrace your mistakes and use that energy to enrich your life.", noteJp: "大切なのは、まずは自分自身をジャッジしないということです。失敗した自分を認め、抱きしめてあげてください。その心を、どうか心豊かになる時間に惜しみなく使ってください。" },
  { id: 3, mainEn: "Simply being alive right now is a tremendous achievement.", subJp: "今を生きているだけで大成功です", noteEn: "You were born with a promise to be happy. Just being alive in this moment is a miracle and a great success.", noteJp: "あなたは幸せになるために生まれてきました。今、この瞬間を生きているだけで、あなたはすでに大成功なのです。" },
  { id: 4, mainEn: "Life is an accumulation of moments.", subJp: "一生とは一瞬一瞬の積み重ね", noteEn: "We make 35,000 choices every day. Instead of suppressing yourself, choose what truly fulfills your heart.", noteJp: "人は一日に3万5000回もの選択をしています。我慢する選択ではなく、自分が満たされる選択を意識してみましょう。その積み重ねが一生を作っていくのです。" },
  { id: 5, mainEn: "SMILE", subJp: "笑顔は連鎖し、めぐり還ってくる", noteEn: "Smiles are contagious. When you smile, it spreads to others and eventually returns to you.", noteJp: "笑顔は連鎖します。あなたが笑顔でいれば、それは周りに広がり、巡り巡ってあなたの元に還ってきます。" },
  { id: 6, mainEn: "If you can't fly, then run.", subJp: "飛べなきゃ走る", noteEn: "Don't worry about what others can do. Just focus on what you can do and what you love. If you can’t fly, then run!", noteJp: "ダチョウは鳥だけど飛べません。走る速さは超一流。周りと比べる必要はありません。あなたが今できること、好きなことを全力でやりましょう。" },
  { id: 7, mainEn: "Even a half-step forward is a giant leap.", subJp: "たとえ半歩の歩みでも、それは大きな一歩。", noteEn: "Even if it feels small or shaky, that step is paving the way to your future.", noteJp: "最初の一歩は怖いものです。たとえ震えながらの半歩だったとしても、それは未来へ続く確かな一歩。踏み出した自分を、心から誇りに思ってください。" },
  { id: 8, mainEn: "Everything is a stepping stone.", subJp: "すべて通過点。", noteEn: "Failure and success are both just points on your journey. Don't stop there. Believe in yourself and keep walking.", noteJp: "失敗も成功も、すべては道の途中。そこで終わらず、自分を信じて歩き続けましょう。" },
  { id: 9, mainEn: "Keisei Saimin: Enriching the World.", subJp: "経世済民（けいせいさいみん）", noteEn: "The true meaning of 'Economy' is to govern and provide for the people.", noteJp: "経済とは、世を治め、民を救うこと。富が巡る豊かな世界を共に作りましょう。" },
  { id: 10, mainEn: "When in doubt, choose with love.", subJp: "迷った時こそ愛の選択", noteEn: "A choice made with love will always lead to true fulfillment.", noteJp: "あなたの内側にある「愛」を基準に選んでみてください。" },
  { id: 11, mainEn: "Cherish yourself first.", subJp: "自分を大切に生きること", noteEn: "To protect what you love, you must first value yourself.", noteJp: "あなたが満たされてこそ、穏やかな心で大切な人を愛せるようになります。" },
  { id: 12, mainEn: "\"Later is fine\" is the start of \"It's too late.\"", subJp: "「まあいいや」は「もういいや」のはじまり", noteEn: "Don’t let a small \"oh well\" turn into a frozen mountain later.", noteJp: "未来の自分が困らないよう、今できることを大切に。" },
  { id: 13, mainEn: "Common sense is often a matter of convenience.", subJp: "常識は大体、誰かの都合。", noteEn: "Don't let someone else’s convenience define your worth.", noteJp: "誰かの都合で決められた「普通」に縛られなくていい。" },
  { id: 14, mainEn: "The direction you are facing is \"forward.\"", subJp: "真っ暗で何も見えなくても", noteEn: "Whichever way you face is the path forward.", noteJp: "自分が向いた方を「前」だと信じて。あなたなら、大丈夫。" },
  { id: 15, mainEn: "I feel a little embarrassed, but I want to tell you that I love you.", subJp: "ちょっと照れくさいけど", noteEn: "Don't keep it hidden. If it's too much, a simple \"Thank you\" is enough.", noteJp: "照れくさくても、大切な人には言葉で伝えましょう。" },
  { id: 16, mainEn: "Take three steps forward, then take two more with vigor", subJp: "三歩すすんで二歩すすむ", noteEn: "Only those who keep moving get to enjoy the scenery.", noteJp: "自分を信じて、未来へ突き進みましょう。" },
  { id: 17, mainEn: "I'll always give you a push from behind", subJp: "いつでも背中を押してやる", noteEn: "I am always here to support you. Everything will be all right!", noteJp: "私はいつでも、この言葉を通してあなたの味方です。" },
  { id: 18, mainEn: "Tears Know No Age", subJp: "大人だって泣いていいんだよ", noteEn: "Tears are meant to be shed. Let your emotions flow.", noteJp: "その涙の温もりが、あなたの人生を温めてくれます。" },
  { id: 19, mainEn: "Even when eight direction are blocked, search for the ninth direction", subJp: "八方塞がっても九方目を探せ", noteEn: "When all ways seem blocked, look for a new path.", noteJp: "諦めずに「九方目」を探しましょう。" },
  { id: 20, mainEn: "Although it's painful, frustrating, and lonely, it's Heno Kappa", subJp: "苦しいけれど悔しいけれど寂しいけれど", noteEn: "Embracing those feelings is what makes your kindness real.", noteJp: "苦しい時に「苦しい」と感じる自分も否定しないで。" },
  { id: 21, mainEn: "It's okay, the sun is always watching over you!", subJp: "大丈夫いつだってお天道さんが見ているよ", noteEn: "The sun is always watching. You know your own effort.", noteJp: "あなた自身が自分の努力を知っている、それだけで十分なのです。" },
  { id: 22, mainEn: "We are all connected!", subJp: "ボクらはつながっているよ", noteEn: "Whether it is sunny or rainy, the same sky connects us all.", noteJp: "孤独を感じた時は、空を見上げてみてください。" },
  { id: 23, mainEn: "There's someone tracing your footsteps", subJp: "君の足あとを辿る人がいる", noteEn: "Your footprints will become a guide for those who follow.", noteJp: "あなたの一歩一歩が重なり、やがて誰かの道しるべになる。" },
  { id: 24, mainEn: "If you can't look back, even headwinds become tailwinds", subJp: "風", noteEn: "By shifting your mindset, resistance becomes energy.", noteJp: "考え方ひとつで、困難はあなたを前へ運ぶ追い風に変わります。" },
  { id: 25, mainEn: "Letter to the Future", subJp: "未来への手紙", noteEn: "You have the freedom to draw whatever makes you smile.", noteJp: "未来はいつだって、あなた次第で描き変えられます。" },
  { id: 26, mainEn: "I am grateful to have met you from the bottom of my heart", subJp: "あなたに出逢えて良かった", noteEn: "Meeting special people is an attraction.", noteJp: "自分らしく生きていれば、運命の出逢いにきっと気づけるはずです。" },
  { id: 27, mainEn: "Too ◯◯ is your charm", subJp: "◯◯過ぎなところ", noteEn: "Your \"too much\" qualities are actually your greatest strengths.", noteJp: "「〇〇過ぎ」なところは、抑えられないほど溢れるあなたの才能です。" },
  { id: 28, mainEn: "Wakuwaku Dokidoki Ukiuki", subJp: "ワクワク　ドキドキ　ウキウキ", noteEn: "Living with your \"likes\" keeps your heart and body youthful.", noteJp: "自分の「好き」を大切に生きる人は、細胞レベルで輝き出します。" },
  { id: 29, mainEn: "Cherished Gems of Our Past Experiences", subJp: "ぜんぶぜんぶ宝もの", noteEn: "Your joy, pain, and regrets have shaped you.", noteJp: "喜びも悲しみも、何一つ間違いではありませんでした。" },
  { id: 30, mainEn: "The future is wide open and full of possibilities!", subJp: "未来は自由自在なんだ", noteEn: "Like a blank canvas, paint whatever you desire.", noteJp: "描く未来に制限はいりません。自由に未来を想像してみてください。" },
  { id: 31, mainEn: "There's no need to hold back in your own life", subJp: "自分の人生に遠慮は要らん", noteEn: "To bring happiness to others, you must first be happy yourself.", noteJp: "一度きりの人生、あなたの「幸せ」を最優先に生きてください。" }
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isPiReady, setIsPiReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    if (typeof window !== "undefined" && window.Pi) {
      setIsPiReady(true);
      window.Pi.init({ version: "2.0", sandbox: false });
    }
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async () => {
    if (!window.Pi) return;
    try {
      const auth = await window.Pi.authenticate(["username", "payments"], () => {});
      setUser(auth.user);
    } catch (err) { alert("Error: " + err.message); }
  };

  const nextCard = () => { setDirection(1); setIndex((prev) => (prev + 1) % WORDS.length); setShowNote(false); };
  const prevCard = () => { setDirection(-1); setIndex((prev) => (prev - 1 + WORDS.length) % WORDS.length); setShowNote(false); };
  const goToTop = () => { setDirection(-1); setIndex(0); setShowNote(false); };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -30) nextCard();
    else if (info.offset.x > 30) prevCard();
  };

  // アニメーション設定
  const variants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 })
  };

  return (
    <div className="fixed inset-0 bg-white overflow-hidden text-black font-sans flex flex-col">
      <AnimatePresence>
        {isLoading ? (
          <motion.div key="loader" className="flex h-screen flex-col items-center justify-center bg-white" exit={{ opacity: 0 }}>
            <img src="/Loading.png" alt="Loading" className="w-full max-w-[280px]" />
          </motion.div>
        ) : (
          <motion.main key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center bg-white h-full relative">
            
            <div className="flex-1 w-full max-w-sm flex items-center justify-center px-6 relative overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  onClick={() => user && index !== 0 && setShowNote(true)}
                  transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer absolute pt-16"
                >
                  {index === 0 ? (
                    <img src={WORDS[0].image} className="w-full h-auto max-h-[80vh] object-contain pointer-events-none" alt="Cover" />
                  ) : (
                    <div className="text-center pt-8 w-full h-full flex flex-col justify-center items-center">
                      <h2 className="text-3xl font-bold mb-6 px-2 leading-tight text-black">{WORDS[index].mainEn}</h2>
                      <p className="text-base text-gray-500 px-4">{WORDS[index].subJp}</p>
                      <div className="absolute bottom-10 left-0 right-0">
                        <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-[10px] text-gray-500 tracking-[0.25em] uppercase font-bold">Tap for Note</motion.p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                {showNote && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNote(false)} className="absolute inset-0 z-50 bg-black/50 flex flex-col items-center justify-center p-8 backdrop-blur-[2px]">
                    <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-8 leading-tight">{WORDS[index].noteEn}</h3>
                      <p className="text-base leading-relaxed opacity-95">{WORDS[index].noteJp}</p>
                      <p className="mt-14 text-xs opacity-60 tracking-widest uppercase font-bold text-white">Tap to close</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ナビゲーション */}
            <div className="w-full max-w-[340px] h-40 flex flex-col items-center justify-start shrink-0">
              {!user ? (
                <button onClick={handleLogin} disabled={!isPiReady} className="w-full max-w-[280px] py-3 bg-[#8A2BE2] text-white rounded-full font-bold shadow-lg mt-4">
                  {isPiReady ? "Pi Network Login" : "Loading..."}
                </button>
              ) : (
                index === 0 ? (
                  <div className="flex flex-col items-center pt-4">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-gray-700 mb-4">Welcome, {user.username}!</motion.p>
                    <button onClick={nextCard} className="px-14 py-3 bg-black text-white rounded-full text-sm font-bold shadow-md uppercase transition-transform active:scale-95">OPEN</button>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center">
                    {/* DAY表示 */}
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-[0.3em] mb-4">
                      Day {index}
                    </span>
                    
                    {/* 操作ボタンエリア: < TOP > を一直線に */}
                    <div className="flex items-center justify-between w-full px-2">
                      <button onClick={prevCard} className="text-4xl text-gray-300 hover:text-black p-4 w-16 flex justify-center items-center transition-colors">
                        &lt;
                      </button>
                      
                      <div className="flex-1 flex justify-center items-center">
                        <button onClick={goToTop} className="text-[10px] font-bold text-gray-400 hover:text-black hover:border-black tracking-widest border border-gray-200 px-8 py-2.5 rounded-full uppercase transition-all">
                          Top
                        </button>
                      </div>

                      <button onClick={nextCard} className="text-4xl text-gray-300 hover:text-black p-4 w-16 flex justify-center items-center transition-colors">
                        &gt;
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>

            <footer className="w-full text-center py-4 shrink-0 bg-white border-t border-gray-100">
              <div className="mx-10">
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