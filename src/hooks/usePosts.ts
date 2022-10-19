import { useMemo } from 'react'
import { IPost } from '../types/types'

export type SortOptions = Omit<IPost, 'userId'>
export const userSortedPosts = (posts: IPost[], sort: keyof SortOptions): IPost[] => {
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

export const usePosts = (posts: IPost[], sort: keyof SortOptions, query: string): IPost[] => {
  const sortedPosts = userSortedPosts(posts, sort)

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
  }, [query, sortedPosts])

  return sortedAndSearchedPosts
}
