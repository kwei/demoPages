import {ArticleDataType} from "@/app/dataFetching/type";
import Article from "@/app/dataFetching/Article";

const PostList = ({posts}: {posts: ArticleDataType[]}) => {
    return (
        <div className='w-full flex items-stretch flex-wrap gap-4'>
            {posts.map(post => (
                <Article key={post.userId + '-' + post.id} article={post} />
            ))}
        </div>
    )
}

export default PostList