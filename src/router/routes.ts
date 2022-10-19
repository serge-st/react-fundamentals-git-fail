import { FC } from 'react'
import About from '../pages/About/About'
import Login from '../pages/Login/Login'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'
import TestHook from '../pages/TestHook'

interface MyRoute {
  path: string
  component: FC<any>
  exact: boolean
}

export const privateRoutes: MyRoute[] = [
  { path: '/about', component: About, exact: false },
  { path: '/posts', component: Posts, exact: true },
  { path: '/posts/:id', component: PostIdPage, exact: true },
  { path: '/test', component: TestHook, exact: true }
]

export const publicRoutes: MyRoute[] = [
  { path: '/login', component: Login, exact: true }
]
