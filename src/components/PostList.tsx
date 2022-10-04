import { FC } from "react";
import PostItem, { Post } from "./PostItem";

interface PostListProps {
  posts: Post[];
  title: string;
  remove: (id: number) => void;
}

const PostList: FC<PostListProps> = ({title, posts, remove}) => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>

      {posts.map((post, index) =>
        <PostItem number={index + 1} post={post} key={post.id} remove={remove} />
      )}
    </div>
  );
};

export default PostList;