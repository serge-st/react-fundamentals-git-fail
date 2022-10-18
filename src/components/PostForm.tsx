import { FC, useState, FormEvent } from 'react'
import { IPost } from '../types/types'
import Button from './UI/Button/Button'
import Input from './UI/Input/Input'

type PostBody = Omit<IPost, 'id' | 'userId'>
interface PostFormProps {
  create: (newPost: IPost) => void
}

const PostForm: FC<PostFormProps> = ({ create }) => {
  const [post, setPost] = useState<PostBody>({ title: '', body: '' })

  const addNewPost = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const newPost: IPost = {
      ...post,
      id: Date.now()
    }
    create(newPost)
    setPost({ title: '', body: '' })
  }

  return (
    <form>
      <Input
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
        type='text'
        placeholder='Post Title'
      />
      <Input
        value={post.body}
        onChange={e => setPost({ ...post, body: e.target.value })}
        type='text'
        placeholder='Post Description'
      />
      <Button onClick={addNewPost} name='Create Post' />
    </form>
  )
}

export default PostForm
