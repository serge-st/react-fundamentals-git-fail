import { FC } from 'react'
import About from '../pages/About/About'
import Login from '../pages/Login/Login'
import PostIdPage from '../pages/PostIdPage/PostIdPage'
import Posts from '../pages/Posts/Posts'

interface MyRoute {
  path: string
  component: FC<any>
  exact: boolean
}

export const privateRoutes: MyRoute[] = [
  { path: '/about', component: About, exact: false },
  { path: '/posts', component: Posts, exact: true },
  { path: '/posts/:id', component: PostIdPage, exact: true }
]

export const publicRoutes: MyRoute[] = [
  { path: '/login', component: Login, exact: true }
]
