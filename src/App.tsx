import { useState } from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import MyInput from "./components/UI/Input/MyInput";
import './styles/App.css';

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'JavaScript - programming language' },
    { id: 2, title: 'TypeScript', body: 'TypeScript - more powerful JavaScript' },
    { id: 3, title: 'HTML', body: 'No frontend without it' },
  ]);

  const [post, setPost] = useState({title: '', body: ''})

  const addNewPost = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPosts([...posts, {...post, id: Date.now()}]);
    setPost({title: '', body: ''});
  }

  return (
    <div className="App">
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


      <PostList posts={posts} title="Post About JS and Frontend"/>
      
      {/* <br />
      <PostItem post={posts[1]}/>

      <br />
      <Input />
      <br />
      <Counter /> */}
    </div>
  );
}

export default App;
