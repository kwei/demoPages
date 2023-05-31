import { PageTitle } from "@/components/PageTitle";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import RouteLink from "@/components/RouteLink";

export const metadata = {
  openGraph: {
      title: 'Online Demo Base Page',
      siteName: 'Online Demo Base Page',
      description: 'Using Next.js and React.js to implement a demo page.',
      url: 'https://kw-demo-page.vercel.app/',
      images: [
      {
          url: '/assets/images/og.png',
          width: 600,
          height: 600,
      },
      ],
      authors: [{ name: 'KW', url: 'kaiweiyeh2018@gmail.com' }],
      locale: 'en-US'
  }
}

const PAGE_TITLE = 'Welcome to My Demo Website'

export default async function Home() {
    let userName: string = ''
    const session = await getServerSession(authOptions)
    console.log("Get session at server side: ", session?.user)
    if (session && session.user && session.user.name) userName = session.user.name.split(' ')[0]

    return (
        <>
            <PageTitle title={userName !== '' ? `Hello ${userName}, ${PAGE_TITLE}` : PAGE_TITLE} descList={[]}/>
            <div className='flex flex-wrap items-start gap-4 m-auto'>
                <RouteLink label='Demo IndexedDB' link='/indexedDB'/>
                <RouteLink label='Demo Swagger' link='/swagger'/>
                <RouteLink label='Demo Next Auth' link='/session'/>
                <RouteLink label='Demo Data Fetch' link='/dataFetching'/>
            </div>
        </>
    )
}
