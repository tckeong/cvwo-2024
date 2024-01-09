import {useParams} from 'react-router-dom';
import ThreadDetail from '../components/threadPage/threadDetail';
import RecommendBar from '../components/threadPage/recommendBar';
import ThreadComment from '../components/threadPage/threadComments';
import Layout from './layout';
import "./css/style.css"
import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import API_URL from "../api/apiConfig";
import { ThreadType } from '../components/index/thread';
import {useSelector } from 'react-redux';
import { RootState } from '../components/interact/likeInteract';

function ThreadPage() {
    const {thread_id} = useParams<string>();
    const [thread, setThread] = useState<ThreadType | undefined>(undefined);
    const [likes, setLikes] = useState<number[]>([]);
    const likeStore = useSelector((state: RootState) => state.like.value);


    const threadID: number = parseInt(thread_id ? thread_id : "-1", 10);

    useEffect(() => {
        fetch(`${API_URL}thread/${threadID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setThread(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })

        setLikes(likeStore);
    }, [threadID]);   


    return (
        <Layout>
            <Box className="content" sx={{overflowY: "hidden", backgroundColor: "#F8F8FF"}}>
                {(thread !== undefined)
                ? ( <Box className="post-page-content">
                        <Box className="post-content" sx={{overflowY: "scroll"}}>
                            <ThreadDetail thread={thread} liked={likes.find(id => id === threadID) === threadID} />
                            <ThreadComment threadID={threadID} />
                        </Box>
                        <Box className="recommend-bar" sx={{overflowY: "scroll"}}>
                            <RecommendBar curThreadID={threadID} tags={thread.tags} />
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

export default ThreadPage;