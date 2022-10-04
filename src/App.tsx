import './styles/App.css';
import { useState } from "react";
import PostForm from "./components/PostForm";
import { Post } from "./components/PostItem";
import PostList from "./components/PostList";

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'JavaScript - programming language' },
    { id: 2, title: 'TypeScript', body: 'TypeScript - more powerful JavaScript' },
    { id: 3, title: 'HTML', body: 'No frontend without it' },
  ]);

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  }

  const removePost = (id: number) => {
    setPosts([...posts.filter(post => post.id !== id)]);
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>

      {posts.length
        ?
        <PostList remove={removePost} posts={posts} title="Post About JS and Frontend"/>
        :
        <h1 style={{textAlign: 'center'}}>
          No Posts Found!
        </h1>
      }
      
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
