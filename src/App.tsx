import './styles/App.css';
import { useState } from "react";
import PostForm from "./components/PostForm";
import { Post } from "./components/PostItem";
import PostList from "./components/PostList";
import MySelect from './components/UI/Select/MySelect';

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'JavaScript - programming language' },
    { id: 2, title: 'TypeScript', body: 'TypeScript - more powerful JavaScript' },
    { id: 3, title: 'HTML', body: 'No frontend without it' },
  ]);

  const [selectedSort, setSelectedSort] = useState('');

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  }

  const removePost = (id: number) => {
    setPosts([...posts.filter(post => post.id !== id)]);
  }

  type SortOptions = Omit<Post, "id">
  const sortPosts = (sort: string) => {
    setSelectedSort(sort);
    setPosts([...posts].sort((a: SortOptions, b: SortOptions) => a[sort as keyof SortOptions].localeCompare(b[sort as keyof SortOptions])))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>

      <hr style={{margin: '15px 0'}}/>

      <MySelect
        value={selectedSort}
        onChange={sortPosts}
        defaultValue='Sort By'
        options={[
          {value: 'title', name: 'By Name'},
          {value: 'body', name: 'By Description'}
        ]}
      />

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
