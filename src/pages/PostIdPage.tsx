import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import { Post } from '../components/PostItem';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { IComment } from '../types/types';

interface PostParams {
    id: string;
}

const PostIdPage = () => {
    const { id } = useParams<PostParams>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<IComment[] | []>([]);
    const [fetchPostById, isLoading, postError] = useFetching(async () => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });
    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById();
        fetchComments();
    }, [])

    return (
        <div>
            <h1>You Post With ID: {id}</h1>
            {isLoading
                ? <Loader />
                : <div>{post?.id}. {post?.title}</div>
            }
            <h2>Comments</h2>
            {isCommentsLoading
                ? <Loader />
                : <div>
                    {comments.map(comm => 
                        <div key={comm.id} style={{marginTop: '15px'}}>
                            <h3>{comm.email}</h3>
                            <p>{comm.body}</p>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;