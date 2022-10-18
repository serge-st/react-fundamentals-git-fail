import { FC, useState } from "react";
import { Post } from "./PostItem";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/Input";

interface PostFormProps {
    create: (newPost: Post) => void;
}

const PostForm: FC<PostFormProps> = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e: React.FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const newPost = {
        ...post,
        id: Date.now(),
      };
      create(newPost);
      setPost({title: '', body: ''});
    }
    
    return (
        <form>
            <Input
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Post Title"
            />
            <Input
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Post Description"
            />
            <Button onClick={addNewPost} name='Create Post'/>
        </form>
    );
};

export default PostForm;