import { FC } from "react";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";
import PostItem, { Post } from "./PostItem";

interface PostListProps {
  posts: Post[];
  title: string;
  remove: (id: number) => void;
}

const PostList: FC<PostListProps> = ({title, posts, remove}) => {
  if (!posts.length) {
    return (
      <>
        <SwitchTransition>
          <CSSTransition
            timeout={500}
            classNames="post_title"
            appear
          >
            <h1 style={{textAlign: 'center'}}>No Posts Found!</h1>
          </CSSTransition>
        </SwitchTransition>
      </>
    )
  }

  return (
    <div>
        <SwitchTransition>
          <CSSTransition
            timeout={500}
            classNames="post_title"
            appear
          >
            <h1
              style={{textAlign: 'center'}}
            >
              {title}
            </h1>
          </CSSTransition>
        </SwitchTransition>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
            appear
          >
            <PostItem number={index + 1} post={post} remove={remove} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default PostList;