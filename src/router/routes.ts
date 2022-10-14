import { FC } from "react";
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

interface MyRoute {
    path: string;
    component: FC;
    exact: boolean;
}

export const routes: MyRoute[] = [
    {path: '/about', component: About, exact: false},
    {path: '/posts', component: Posts, exact: true},
    {path: '/posts/:id', component: PostIdPage, exact: true},
];