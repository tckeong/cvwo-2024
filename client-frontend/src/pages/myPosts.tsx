import { Divider, Typography } from "@mui/material";
import MyPost from "../components/myPosts/myPost";
import Layout from "./layout";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState, useReducer } from "react";
import API_URL from "../api/apiConfig";
import { reducer } from "../components/index/postList";

function MyPosts() {
    const username = Cookies.get("username");
    const userID = Cookies.get("userId");

    const [postID, setPostID] = useState<number[]>([]);
    const [_, dispatch] = useReducer(reducer, []);
    const [likes, setLikes] = useState<number[]>([]);

    useEffect(() => {
        fetch(`${API_URL}user_thread`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setPostID(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        
        })

        
        if(userID !== undefined) {
            fetch(`${API_URL}like/${userID}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        if(data.value === null) return;

                        setLikes(data.value);
                        for (let i = 0; i < data.value.length; i++) {
                            dispatch({type: "like", payload: {index: data.value[i]}});
                        }
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        }

        return () => {
            if(userID === undefined) return;

            const likeStore = localStorage.getItem("likes");
            const likes = likeStore?.substring(1, likeStore.length - 1).split(",")
                                    .map(id => parseInt(id))
                                    .filter(id => id !== undefined && id !== null && !isNaN(id));

            localStorage.removeItem("likes");

            if(likes === undefined) return;
            
            fetch(`${API_URL}like`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: likes
                })
            })
        }
    }, [userID]);

    return (
        <Layout>
            <div className="content" style={{overflowY: "scroll"}}>
                <Typography component="div" variant="h6" sx={{padding: "1rem", paddingBottom: "0.5rem", paddingLeft: "1.5rem"}}>{username} 's posts</Typography>
                <Divider />
                <Box sx={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                    { 
                        (postID.length === 0)
                        ? ( <Typography variant="h4" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                                no posts found
                            </Typography>)
                        : postID.map((index) => {
                            return <MyPost key={index} postID={index} liked={likes.find(id => id === index) === index} dispatch={dispatch} />
                        })
                    }
                </Box>
            </div>
        </Layout>
    );
}

export default MyPosts;