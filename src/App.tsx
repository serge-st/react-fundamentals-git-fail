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
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './utils/pages';
import { usePagination } from './hooks/usePagination';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([
    // { id: 1, title: 'JavaScript', body: 'JavaScript - programming language' },
    // { id: 2, title: 'TypeScript', body: 'TypeScript - more powerful JavaScript' },
    // { id: 3, title: 'HTML', body: 'No frontend without it' },
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort as keyof SortOptions, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = Number(response.headers['x-total-count']);
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const createPost = (newPost: Post): void => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (id: number): void => {
    setPosts([...posts.filter(post => post.id !== id)]);
  }

  const changePage = (page: number): void => {
    setPage(page);
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
      {postError &&
        <h1 style={{textAlign: 'center'}}>An Error Occurred {postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}> <Loader /> </div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post About JS and Frontend"/>
      }
      <div className='page__wrapper'>
        {usePagination(totalPages).map(p => {
          return (
            <span
              onClick={() => changePage(p)}
              key={p}
              className={page === p ? 'page page__selected' : 'page'}
            >
              {p}
            </span>
          )
        })}
      </div>
    </div>
  );
}

export default App;
