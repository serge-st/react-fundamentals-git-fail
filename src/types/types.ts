export interface IPost {
  userId?: number
  id: number
  title: string
  body: string
}

export interface IComment {
  postId: IPost['id']
  id: number
  name: string
  email: string
  body: string
}
