import { useEffect, useRef, useState } from "react";
import { Post } from '../components/PostItem';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import Button from '../components/UI/Button/Button';
import Loader from '../components/UI/Loader/Loader';
import Modal from '../components/UI/Modal/Modal';
import Pagination from '../components/UI/Pagination/Pagination';
import { useFetching } from '../hooks/useFetching';
import { usePosts, SortOptions } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/Select/MySelect";

const Posts = () => {
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
  const lastElement = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = Number(response.headers['x-total-count']);
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);
  
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
      <Button style={{marginTop: '30px'}} name='Create Post' onClick={() => setModal(true)}/>
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </Modal>

      <hr style={{margin: '15px 0'}}/>

      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <MySelect 
        value={String(limit)}
        onChange={value => setLimit(Number(value))}
        defaultValue="The amount of posts per page"
        options={[
          {value: '5', name: '5'},
          {value: '10', name: '10'},
          {value: '25', name: '25'},
          {value: '-1', name: 'Show All'},
        ]}
      />
      {postError &&
        <h1 style={{textAlign: 'center'}}>An Error Occurred {postError}</h1>
      }
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Post About JS and Frontend"/>
      
      <div ref={lastElement} className='infinite_scroll'></div>
      
      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}> <Loader /> </div>
      }
      {isPostsLoading
        ? null
        : <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
      }
    </div>
  );
}

export default Posts;
