import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse<string>) {
    return NextResponse.json({ data: 'Swagger-Codegen Example'})
}