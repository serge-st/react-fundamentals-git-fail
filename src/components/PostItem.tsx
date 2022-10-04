import { FC } from 'react';

export type Post = {
    id: number,
    title: string,
    body: string,
}

export interface PostItemProps {
    post: Post;
}

const PostItem: FC<PostItemProps> = ({post: {id, title, body}}) => {
    return (
        <div className="post">
            <div className="post__content">
                <strong>
                    {id}. {title}
                </strong>
                <div>
                    {body}
                </div>
            </div>
            <div className="post__btns">
                <button>Delete</button>
            </div>
        </div>
    );
};

export default PostItem;