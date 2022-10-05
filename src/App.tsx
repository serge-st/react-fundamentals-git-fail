import './styles/App.css';
import { useMemo, useState } from "react";
import PostForm from "./components/PostForm";
import { Post } from "./components/PostItem";
import PostList from "./components/PostList";
import MySelect from './components/UI/Select/MySelect';
import MyInput from './components/UI/Input/MyInput';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/Modal/MyModal';
import MyButton from './components/UI/Button/MyButton';

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'JavaScript - programming language' },
    { id: 2, title: 'TypeScript', body: 'TypeScript - more powerful JavaScript' },
    { id: 3, title: 'HTML', body: 'No frontend without it' },
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);

  type SortOptions = Omit<Post, "id">
  const sortedPosts = useMemo(() => {
    if(filter.sort) {
      return [...posts].sort((a: SortOptions, b: SortOptions) => a[filter.sort as keyof SortOptions].localeCompare(b[filter.sort as keyof SortOptions]))
    } else {
      return posts;
    }
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts]);

  const createPost = (newPost: Post) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (id: number) => {
    setPosts([...posts.filter(post => post.id !== id)]);
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} name='Create Post' onClick={() => setModal(true)}/>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <hr style={{margin: '15px 0'}}/>

      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post About JS and Frontend"/>

      {/* {sortedAndSearchedPosts.length
        ?
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post About JS and Frontend"/>
        :
        <h1 style={{textAlign: 'center'}}>
          No Posts Found!
        </h1>
      } */}
    </div>
  );
}

export default App;
