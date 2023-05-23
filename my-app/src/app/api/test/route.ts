import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { ApiTestResType } from "./type";

export async function GET(req: NextRequest, res: NextApiResponse<string>) {
    return NextResponse.json({ data: 'test api'} as ApiTestResType)
}