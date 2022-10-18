import { useMemo } from 'react'
import { Post } from '../components/PostItem/PostItem'
import { IPost } from '../types/types'

export type SortOptions = Omit<IPost, 'userId'>
export const userSortedPosts = (posts: Post[], sort: keyof SortOptions): Post[] => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return sort === 'id'
        ? posts
        : [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
    } else {
      return posts
    }
  }, [sort, posts])

  return sortedPosts
}

export const usePosts = (posts: Post[], sort: keyof SortOptions, query: string): Post[] => {
  const sortedPosts = userSortedPosts(posts, sort)

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedPosts])

  return sortedAndSearchedPosts
}
