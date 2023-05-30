import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { getPageTitle } from "./getPageTitle";

export async function GET(req: NextRequest, res: NextApiResponse<string>) {
    return getPageTitle()
}