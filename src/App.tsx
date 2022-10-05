import './styles/App.css';
import { useMemo, useState } from "react";
import PostForm from "./components/PostForm";
import { Post } from "./components/PostItem";
import PostList from "./components/PostList";
import MySelect from './components/UI/Select/MySelect';
import MyInput from './components/UI/Input/MyInput';

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'JavaScript - programming language' },
    { id: 2, title: 'TypeScript', body: 'TypeScript - more powerful JavaScript' },
    { id: 3, title: 'HTML', body: 'No frontend without it' },
  ]);

  const [selectedSort, setSelectedSort] = useState('');
  const [searchQuerry, setSearchQuerry] = useState('');

  type SortOptions = Omit<Post, "id">
  const sortedPosts = useMemo(() => {
    if(selectedSort) {
      return [...posts].sort((a: SortOptions, b: SortOptions) => a[selectedSort as keyof SortOptions].localeCompare(b[selectedSort as keyof SortOptions]))
    } else {
      return posts;
    }
  }, [selectedSort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuerry.toLowerCase()))
  }, [searchQuerry, sortedPosts]);

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
  }

  const removePost = (id: number) => {
    setPosts([...posts.filter(post => post.id !== id)]);
  }

  const sortPosts = (sort: string) => {
    setSelectedSort(sort);
    setPosts(sortedPosts);
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>

      <hr style={{margin: '15px 0'}}/>

      <div>
        <MyInput
          value={searchQuerry}
          onChange={e => setSearchQuerry(e.target.value)}
          placeholder='Search...'
        />

        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Sort By'
          options={[
            {value: 'title', name: 'By Name'},
            {value: 'body', name: 'By Description'}
          ]}
        />
      </div>


      {sortedAndSearchedPosts.length
        ?
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post About JS and Frontend"/>
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
