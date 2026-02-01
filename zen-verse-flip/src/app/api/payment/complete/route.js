import { NextResponse } from "next/server";

export async function POST(request) {
  const { paymentId, txid } = await request.json();
  console.log("【決済完了報告】おめでとう！ ID:", paymentId, "TxID:", txid);
  return NextResponse.json({ message: "Completed" });
}