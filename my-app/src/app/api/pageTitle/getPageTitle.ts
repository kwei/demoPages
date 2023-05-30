import {NextResponse} from "next/server";

export const getPageTitle = () => {
    return NextResponse.json({ data: 'Swagger-Codegen Example'})
}