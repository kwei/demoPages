import { ArticleDataType } from "@/app/dataFetching/type"

const Article = ({article}: {article: ArticleDataType}) => {
    return (
        <div className='w-full flex flex-col px-4 py-5 border-b border-[var(--border-rgb)]'>
            <article className='flex flex-col gap-3'>
                <span className='text-2xl font-bold'>{article.id}. {article.title}</span>
                <span className='text-xs'>Author: {article.userId}</span>
                <p className='text-sm'>{article.body}</p>
            </article>
        </div>
    )
}

export default Article