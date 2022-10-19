import cl from './PostIdPage.module.css'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../../API/PostService'
import Loader from '../../components/UI/Loader/Loader'
import { useFetching } from '../../hooks/useFetching'
import { IComment, IPost } from '../../types/types'
import { capitalize } from '../../utils/capitalize'

interface PostParams {
  id: string
}

const PostIdPage: FC = () => {
  const { id } = useParams<PostParams>()
  const [post, setPost] = useState<IPost | null>(null)
  const [comments, setComments] = useState<IComment[] | []>([])

  const [fetchPostById, isLoading, postError] = useFetching(async () => {
    const response = await PostService.getById(id)
    setPost(response.data)
  })

  const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(id)
    setComments(response.data)
  })

  useEffect(() => {
    fetchPostById()
    fetchComments()
  }, [])

  return (
    <div>
      {(post == null) || isLoading || isCommentsLoading
        ? <Loader />
        : <div>
          <h1 className={cl.post__header}>{capitalize(post?.title)}</h1>
          <div className={cl.post__container}>
            <h3>Post ID: {id}</h3>
            <h3>Description:</h3>
            <p>{post?.body}</p>
          </div>
          <h3 className={cl.comments__header}>Comments:</h3>
          <div>
            {comments.map(comm =>
              <div
                className={cl.comment}
                key={comm.id}
              >
                <h5>User: {comm.email}</h5>
                <h5>Comment:</h5>
                <p className={cl.comment__body}>
                  {comm.body}
                  <hr />
                </p>
              </div>
            )}
          </div>
        </div>}
    </div>
  )
}

export default PostIdPage
