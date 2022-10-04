import { FC } from 'react';

export type Post = {
    id: number,
    title: string,
    body: string,
}

export interface PostItemProps {
    post: Post;
    number: number;
}

const PostItem: FC<PostItemProps> = ({post: {title, body}, number}) => {
    return (
        <div className="post">
            <div className="post__content">
                <strong>
                    {number}. {title}
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