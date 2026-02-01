import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { paymentId, txid } = await request.json();
    const apiKey = process.env.PI_API_KEY;

    // Piネットワークのサーバーに「決済完了（complete）」を報告するわ！
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${apiKey}`,
      },
      body: JSON.stringify({ txid }), // 送金番号を添えて報告するの
    });

    if (response.ok) {
      console.log("Piネットワークに決済完了を報告したわよ！");
      return NextResponse.json({ message: "Completed" }, { status: 200 });
    } else {
      const errorData = await response.json();
      console.error("Piサーバーからの拒否:", errorData);
      return NextResponse.json({ error: "Pi server rejected completion" }, { status: 400 });
    }
  } catch (err) {
    console.error("完了エラー:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}