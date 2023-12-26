import {useParams} from 'react-router-dom';
import PostDetail from '../components/postDetail';
import RecommendBar from '../components/recommendBar';
import PostComment from '../components/postComment';
import Layout from './layout';
import "./css/style.css"
import {Box} from "@mui/material";

function PostPage() {
    const {postId} = useParams();

    return (
        <Layout>
            <Box className="content">
                <Box className="post-page-content" >
                    <Box className="post-content" >
                        <PostDetail />
                        <PostComment />
                    </Box>
                    <Box className="recommend-bar">
                        <RecommendBar />
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
}

export default PostPage;