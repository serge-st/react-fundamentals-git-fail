import { FC } from "react";
import PostItem, { Post } from "./PostItem";

interface PostListProps {
  posts: Post[];
  title: string;
}

const PostList: FC<PostListProps> = ({posts, title}) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>

      {posts.map((post, index) =>
        <PostItem number={index + 1} post={post} key={post.id} />
      )}
    </div>
  );
};

export default PostList;