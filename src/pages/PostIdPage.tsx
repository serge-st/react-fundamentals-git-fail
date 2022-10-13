import { useParams } from 'react-router-dom';

interface PostParams {
    id: string;
}

const PostIdPage = () => {
    const { id } = useParams<PostParams>();

    return (
        <div>
            <h1>You Post With ID: {id}</h1>

        </div>
    );
};

export default PostIdPage;