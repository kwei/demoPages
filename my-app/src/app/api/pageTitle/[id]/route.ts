import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse<string>) {
    const id = req.url?.slice(req.url.lastIndexOf('/') + 1)
    return NextResponse.json({ data: 'Use swagger-codegen to generate the client api sdk from the swagger.yaml file.'})
}