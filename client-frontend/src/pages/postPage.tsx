import {useParams} from 'react-router-dom';
import PostDetail from '../components/postPage/postDetail';
import RecommendBar from '../components/postPage/recommendBar';
import PostComment from '../components/postPage/postComment';
import Layout from './layout';
import "./css/style.css"
import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import API_URL from "../api/apiConfig";
import { PostType } from '../components/index/post';

function PostPage() {
    const {postId} = useParams<{postId: string}>();
    const [post, setPost] = useState<PostType | undefined>(undefined);

    const index = parseInt(postId ? postId : "-1", 10);

    useEffect(() => {
        fetch(`${API_URL}thread/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setPost(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }, [index]);   


    return (
        <Layout>
            <Box className="content" sx={{overflowY: "hidden", backgroundColor: "#F8F8FF"}}>
                {(post !== undefined)
                ? ( <Box className="post-page-content">
                        <Box className="post-content" sx={{overflowY: "scroll"}}>
                            <PostDetail post={post} />
                            <PostComment postID={post.ID} />
                        </Box>
                        <Box className="recommend-bar" sx={{overflowY: "scroll"}}>
                            <RecommendBar />
                        </Box>
                    </Box>)
                : ( <Typography variant="h4" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                        post does not exist
                    </Typography>)
                }
            </Box>
        </Layout>
    );
}

export default PostPage;