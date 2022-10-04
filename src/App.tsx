import { useState } from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/Button/MyButton";
import './styles/App.css';

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'JavaScript - programming language' },
    { id: 2, title: 'TypeScript', body: 'TypeScript - more powerful JavaScript' },
    { id: 3, title: 'HTML', body: 'No frontend without it' },
  ]);

  const [posts2, setPosts2] = useState([
    { id: 1, title: 'SQL vs NoSQL', body: 'What to chose?' },
    { id: 2, title: 'Docker', body: 'How easy is it to setup' },
  ]);

  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Post Title"></input>
        <input type="text" placeholder="Post Description"></input>
        <MyButton />
      </form>


      <PostList posts={posts} title="Post About JS and Frontend"/>

      <PostList posts={posts2} title="Misc Posts"/>
      
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
