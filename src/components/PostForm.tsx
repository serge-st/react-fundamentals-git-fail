import { FC, useState } from "react";
import { Post } from "./PostItem";
import MyButton from "./UI/Button/MyButton";
import MyInput from "./UI/Input/MyInput";

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
            <MyInput
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
                type="text"
                placeholder="Post Title"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text"
                placeholder="Post Description"
            />
            <MyButton onClick={addNewPost} name='Create Post'/>
        </form>
    );
};

export default PostForm;