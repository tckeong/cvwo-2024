import {useParams} from 'react-router-dom';
import PostDetail from '../components/postPage/postDetail';
import RecommendBar from '../components/postPage/recommendBar';
import PostComment from '../components/postPage/postComment';
import Layout from './layout';
import "./css/style.css"
import {Box} from "@mui/material";

function PostPage() {
    const {postId} = useParams<{postId: string}>();

    return (
        <Layout>
            <Box className="content" sx={{overflowY: "hidden", backgroundColor: "#F8F8FF"}}>
                <Box className="post-page-content">
                    <Box className="post-content" sx={{overflowY: "scroll"}}>
                        <PostDetail />
                        <PostComment />
                    </Box>
                    <Box className="recommend-bar" sx={{overflowY: "scroll"}}>
                        <RecommendBar />
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
}

export default PostPage;