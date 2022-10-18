import cl from './PostItem.module.css'
import { FC } from 'react'
import Button from '../UI/Button/Button'
import { useHistory } from 'react-router-dom'
import { IPost } from '../../types/types'

// TODO delete this interface
export interface Post {
  id: number
  title: string | ''
  body: string | ''
}

export interface PostItemProps {
  post: IPost
  number: number
  remove: (id: number) => void
}

const PostItem: FC<PostItemProps> = ({ post: { title, body, id }, remove }) => {
  const history = useHistory()

  return (
    <div className={cl.post}>
      <div>
        <strong>
          {id}. {title}
        </strong>
        <div>
          {body}
        </div>
      </div>
      <div className={cl.post__btns}>
        <Button name='Open' onClick={() => history.push(`/posts/${id}`)} />
        <Button name='Delete' onClick={() => remove(id)} />
      </div>
    </div>
  )
}

export default PostItem
