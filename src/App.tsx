import './styles/App.css';
import { useEffect, useState } from "react";
import PostForm from "./components/PostForm";
import { Post } from "./components/PostItem";
import PostList from "./components/PostList";
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/Modal/MyModal';
import MyButton from './components/UI/Button/MyButton';
import { SortOptions, usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([
    // { id: 1, title: 'JavaScript', body: 'JavaScript - programming language' },
    // { id: 2, title: 'TypeScript', body: 'TypeScript - more powerful JavaScript' },
    // { id: 3, title: 'HTML', body: 'No frontend without it' },
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort as keyof SortOptions, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostService.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 1000);
  }
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
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
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}> <Loader /> </div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post About JS and Frontend"/>
      }
    </div>
  );
}

export default App;
