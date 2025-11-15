export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const arrayBuffer = await req.arrayBuffer();
  const text = Buffer.from(arrayBuffer).toString("utf-8");

  if (!text.trim()) {
    return NextResponse.json({ error: "CSV kosong" }, { status: 400 });
  }

  const rows = text.split(/\r?\n/).map((row) => row.split(","));

  const htmlRows = rows
    .map(
      (cols) => `<tr>${cols.map((c) => `<td>${c.trim()}</td>`).join("")}</tr>`
    )
    .join("");

  return NextResponse.json({
    html: `<table border="1" cellspacing="0" cellpadding="4">${htmlRows}</table>`,
  });
}
