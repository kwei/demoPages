import { Loading } from "@/components/Loading"
import React, {Suspense} from "react"
import PostList from "@/app/dataFetching/PostList"
import { PageTitle } from "@/components/PageTitle"

const PAGE_TITLE = 'Fetch data at server side'

const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    if (!res.ok) return null
    return await res.json()
}

export default async function Home() {
    const posts = await getPosts()
    console.log("Data fetching at server component: ", posts)

    return (
        <>
            <PageTitle title={PAGE_TITLE} descList={[]}/>
            <Suspense fallback={<Loading className={'m-auto'}/>}>
                <PostList posts={posts} />
            </Suspense>
        </>
    )
}