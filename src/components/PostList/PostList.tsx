import './PostList.css'
import { FC } from 'react'
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group'
import { IPost } from '../../types/types'
import PostItem from '../PostItem/PostItem'

interface PostListProps {
  posts: IPost[]
  title: string
  remove: (id: number) => void
}

const PostList: FC<PostListProps> = ({ title, posts, remove }) => {
  if (posts.length === 0) {
    return (
      <div className='post_list'>
        <SwitchTransition>
          <CSSTransition
            timeout={500}
            classNames='post_title'
            appear
          >
            <h1>No Posts Found!</h1>
          </CSSTransition>
        </SwitchTransition>
      </div>
    )
  }

  return (
    <div className='post_list'>
      <SwitchTransition>
        <CSSTransition
          timeout={500}
          classNames='post_title'
          appear
        >
          <h1>{title}</h1>
        </CSSTransition>
      </SwitchTransition>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames='post'
            appear
          >
            <PostItem number={index + 1} post={post} remove={remove} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
}

export default PostList
