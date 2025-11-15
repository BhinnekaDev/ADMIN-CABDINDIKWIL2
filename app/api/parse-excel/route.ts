export const runtime = "nodejs";

import ExcelJS from "exceljs";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const arrayBuffer = await req.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (!buffer.length) {
    return NextResponse.json(
      { error: "File kosong atau request tidak valid" },
      { status: 400 }
    );
  }

  const stream = Readable.from(buffer);
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.read(stream);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Gagal parse file Excel" },
      { status: 400 }
    );
  }

  const sheet = workbook.worksheets[0];
  let html = "<table border='1' cellspacing='0' cellpadding='4'>";

  sheet.eachRow((row) => {
    html += "<tr>";
    row.eachCell((cell) => {
      html += `<td>${cell.value ?? ""}</td>`;
    });
    html += "</tr>";
  });

  html += "</table>";

  return NextResponse.json({ html });
}
