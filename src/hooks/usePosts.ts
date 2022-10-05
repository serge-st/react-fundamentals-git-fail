import { useMemo } from "react";
import { Post } from "../components/PostItem";

export type SortOptions = Omit<Post, "id">
export const userSortedPosts = (posts: Post[], sort: keyof SortOptions): Post[] => {
    const sortedPosts = useMemo(() => {
        if(sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        } else {
            return posts;
        }
    }, [sort, posts]);

    return sortedPosts;
}

export const usePosts = (posts: Post[], sort: keyof SortOptions, query: string): Post[] => {
    const sortedPosts = userSortedPosts(posts, sort);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}