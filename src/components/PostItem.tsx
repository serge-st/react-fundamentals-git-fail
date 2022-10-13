import { FC } from 'react';
import MyButton from './UI/Button/MyButton';
import { useHistory } from 'react-router-dom'; 

export type Post = {
    id: number,
    title: string | '',
    body: string | '',
}

export interface PostItemProps {
    post: Post;
    number: number;
    remove: (id: number) => void;
}

const PostItem: FC<PostItemProps> = ({post: {title, body, id}, remove}) => {
    const history = useHistory();

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
                <MyButton name='Open' onClick={() => history.push(`/posts/${id}`)} />
                <MyButton name='Delete' onClick={() => remove(id)} />
            </div>
        </div>
    );
};

export default PostItem;