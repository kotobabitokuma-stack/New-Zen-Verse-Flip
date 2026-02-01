"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- WORDSデータは必ず31番まで含めてね ---
const WORDS = [
  { id: 0, isCover: true, image: "/coverV0.png" },
  { id: 1, mainEn: "All encounters and events exist to lead you to happiness.", subJp: "すべての出逢いも出来事も 幸せのためにやってくる", noteEn: "Every experience—hardships, joys, and challenges—is a seed of happiness. Believe that everything you face today is paving the path to a brighter future.", noteJp: "苦しいことも嬉しいことも、すべては幸せの素。今の経験が必ず未来の幸せに繋がると、自分を信じてあげてください。" },
  // ... (id: 2 〜 31 までのデータ)
];

export default function Home() {
  const [index, setIndex] = useState(0);
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

  const onIncompletePaymentFound = async (payment) => {
    try {
      await fetch("/api/payment/approve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paymentId: payment.identifier }) });
      if (payment.transaction && payment.transaction.txid) {
        await fetch("/api/payment/complete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ paymentId: payment.identifier, txid: payment.transaction.txid }) });
      }
    } catch (err) { console.error("Error:", err); }
  };

  const handleLogin = async () => {
    if (!window.Pi) return;
    try {
      const auth = await window.Pi.authenticate(["username", "payments"], onIncompletePaymentFound);
      setUser(auth.user);
    } catch (err) { alert("Error: " + err.message); }
  };

  // 確実に次のインデックスへ進むように修正
  const nextCard = () => { 
    setIndex((prev) => (prev + 1) % WORDS.length); 
    setShowNote(false); 
  };
  const prevCard = () => { 
    setIndex((prev) => (prev - 1 + WORDS.length) % WORDS.length); 
    setShowNote(false); 
  };

  const handleDragEnd = (event, info) => {
    // スワイプの感度を少し調整（50px移動で発動）
    if (info.offset.x < -50) nextCard();
    else if (info.offset.x > 50) prevCard();
  };

  return (
    <div className="fixed inset-0 bg-white overflow-hidden text-black font-sans flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" className="flex h-screen flex-col items-center justify-center bg-white" exit={{ opacity: 0 }}>
            <img src="/Loading.png" alt="Loading" className="w-full max-w-[280px]" />
          </motion.div>
        ) : (
          <motion.main key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center bg-white">
            
            <div className="flex-1 w-full max-w-sm flex items-center justify-center px-6 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  onClick={() => user && index !== 0 && setShowNote(true)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  {index === 0 ? (
                    <img src={WORDS[0].image} className="w-full h-auto" alt="Cover" />
                  ) : (
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-6 px-4 leading-snug text-black">
                        {WORDS[index].mainEn}
                      </h2>
                      <p className="text-sm text-gray-500 px-6">
                        {WORDS[index].subJp}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* 💡 解説オーバーレイ（背景を少し薄く 50% に変更） */}
              <AnimatePresence>
                {showNote && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowNote(false)}
                    className="absolute inset-0 z-50 bg-black/50 flex flex-col items-center justify-center p-8 backdrop-blur-[2px]"
                  >
                    <motion.div 
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="text-center text-white"
                    >
                      <h3 className="text-xl font-bold mb-6 leading-relaxed">{WORDS[index].noteEn}</h3>
                      <p className="text-sm leading-loose opacity-90">{WORDS[index].noteJp}</p>
                      <p className="mt-12 text-[10px] opacity-60 tracking-widest uppercase font-bold">Tap to close</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-full max-w-[280px] py-4 h-32 flex flex-col items-center justify-start">
              {!user ? (
                <button
                  onClick={handleLogin}
                  disabled={!isPiReady}
                  className="w-full py-3 bg-[#8A2BE2] text-white rounded-full font-bold shadow-lg"
                >
                  {isPiReady ? "Piでログインして始める" : "読み込み中..."}
                </button>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  {index === 0 && (
                    <>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold text-gray-700 mb-2 italic">
                        Welcome, {user.username}-kun!
                      </motion.p>
                      <button
                        onClick={nextCard}
                        className="px-10 py-2.5 bg-black text-white rounded-full text-sm font-bold shadow-md active:scale-95 transition-transform"
                      >
                        OPEN
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <footer className="w-full text-center pb-8 shrink-0">
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