import cl from './Posts.module.css'
import { FC, useEffect, useState } from 'react'
import PostService from '../../API/PostService'
import PostFilter, { FilterOptions } from '../../components/PostFilter'
import PostForm from '../../components/PostForm'
import PostList from '../../components/PostList/PostList'
import Button from '../../components/UI/Button/Button'
import Loader from '../../components/UI/Loader/Loader'
import Modal from '../../components/UI/Modal/Modal'
import Pagination from '../../components/UI/Pagination/Pagination'
import { useFetching } from '../../hooks/useFetching'
import { usePosts, SortOptions } from '../../hooks/usePosts'
import { getPageCount } from '../../utils/pages'
import Select from '../../components/UI/Select/Select'
import { IPost } from '../../types/types'

const Posts: FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [filter, setFilter] = useState<FilterOptions>({ sort: '', query: '' })
  const [modal, setModal] = useState<boolean>(false)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort as keyof SortOptions, filter.query)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = Number(response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [page, limit])

  const createPost = (newPost: IPost): void => {
    setPosts([newPost, ...posts])
    setModal(false)
  }

  const removePost = (id: number): void => {
    setPosts([...posts.filter(post => post.id !== id)])
  }

  const changePage = (page: number): void => {
    setPage(page)
  }

  return (
    <div className={cl.posts__container}>
      <Button
        name='Create Post'
        onClick={() => setModal(true)}
      />
      <Modal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </Modal>

      <hr className={cl.posts__hr} />

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      <Select
        value={String(limit)}
        onChange={value => setLimit(Number(value))}
        defaultValue='The amount of posts per page'
        options={[
          { value: '5', name: '5' },
          { value: '10', name: '10' },
          { value: '25', name: '25' },
          { value: '-1', name: 'Show All' }
        ]}
      />
      {postError &&
        <h1 style={{ textAlign: 'center' }}>An Error Occurred {postError}</h1>}
      {!isPostsLoading &&
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title='Posts About TS and Frontend'
        />}

      {isPostsLoading && <Loader />}
      {isPostsLoading
        ? null
        : <Pagination page={page} changePage={changePage} totalPages={totalPages} />}
    </div>
  )
}

export default Posts
