import { NextResponse } from "next/server";

export async function POST(request) {
  const { paymentId } = await request.json();
  console.log("【サーバー承認】決済を開始するわね！ ID:", paymentId);
  return NextResponse.json({ message: "Approved" });
}