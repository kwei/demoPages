import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";

export const HomeLink = ({router}: {router: AppRouterInstance}) => {
    return <span className='fixed z-50 top-4 right-4 cursor-pointer select-none' onClick={() => router.push('/')}>Go to Home</span>
}