import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedData: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedData.id;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
