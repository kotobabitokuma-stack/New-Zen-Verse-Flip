import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { paymentId } = await request.json();
    const apiKey = process.env.PI_API_KEY; // Vercelに登録したキーを使うわ

    // 1. Piネットワークのサーバーに「承認（approve）」を直接伝えるわ！
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: {
        Authorization: `Key ${apiKey}`,
      },
    });

    if (response.ok) {
      console.log("Piネットワークに承認を伝えたわよ！");
      return NextResponse.json({ message: "Approved" }, { status: 200 });
    } else {
      const errorData = await response.json();
      console.error("Piサーバーからの拒否:", errorData);
      return NextResponse.json({ error: "Pi server rejected" }, { status: 400 });
    }
  } catch (err) {
    console.error("承認エラー:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}