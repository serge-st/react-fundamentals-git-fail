import { FC } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostItem, { Post } from "./PostItem";

interface PostListProps {
  posts: Post[];
  title: string;
  remove: (id: number) => void;
}

const PostList: FC<PostListProps> = ({title, posts, remove}) => {

  if (!posts.length) {
    return (
      <h1 style={{textAlign: 'center'}}>
        No Posts Found!
      </h1>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem number={index + 1} post={post} remove={remove} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default PostList;