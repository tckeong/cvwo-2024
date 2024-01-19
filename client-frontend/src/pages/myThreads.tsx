import { Divider, Typography } from "@mui/material";
import MyThread from "../components/myThreads/myThread";
import Layout from "./layout";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import API_URL from "../api/apiConfig";
import { useSelector } from "react-redux";
import { RootState } from "../components/interact/likeInteract";
import LoadingContent from "../components/loadingContent/loadingContent";

function MyThreads() {
    const username = Cookies.get("username");
    const userID = Cookies.get("userId");

    const [threadID, setThreadID] = useState<number[]>([]);
    const [likes, setLikes] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<boolean>(false);
    const likeStore = useSelector((state: RootState) => state.like.value);

    useEffect(() => {
        fetch(`${API_URL}user_thread/${Cookies.get("Authorization")}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setThreadID(data.value);
                });

                setTimeout(() => setLoading(false), 1500);
            }
        }).catch(err => {
            console.log(err);
        
        })

        setLikes(likeStore);

    }, [userID, status]);

    return (
        <Layout>
            {
                (loading)
                ? <LoadingContent />
                : (<div className="content" style={{overflowY: "scroll"}}>
                    <Typography component="div" variant="h6" sx={{padding: "1rem", paddingBottom: "0.5rem", paddingLeft: "1.5rem"}}>{username} 's posts</Typography>
                    <Divider />
                    <Box sx={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                        { 
                            (threadID.length === 0)
                            ? ( <Typography variant="h4" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                                    no posts found
                                </Typography>)
                            : threadID.map((index) => {
                                return <MyThread key={index} threadID={index} liked={likes.find(id => id === index) === index} setStatus={setStatus}/>
                            })
                        }
                    </Box>
                </div>)
            }
        </Layout>
    );
}

export default MyThreads;