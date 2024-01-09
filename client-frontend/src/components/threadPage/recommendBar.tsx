import { Box, Typography, Card, CardHeader, Avatar, List, CardActionArea, CardContent } from "@mui/material";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import API_URL from "../../api/apiConfig";
import { ThreadType } from "../index/thread";
import { useNavigate } from "react-router-dom";

interface PropsRecommendPost {
    threadID: number;
}

interface Props {
    tags: string;
    curThreadID: number;
}

function RecommendPost(props: PropsRecommendPost) {
    const { threadID } = props;
    const [post, setPost] = useState<ThreadType | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}thread/${threadID}`, {
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
    }, [threadID]);

    const handleClick = () => {
        navigate(`/post/${threadID}`);
    }

    return (
        <Card sx={{width: "auto", border: "0.001rem solid #000000", height: "auto", backgroundColor: "#f1f1f1", padding: "0px", margin: "1rem"}}>
            <CardActionArea onClick={handleClick} 
                sx={{height: "100%", backgroundColor: "#f1f1f1", padding: "0px", ":hover": {cursor: "pointer", backgroundColor: "#f1f1f1"},
                    width: "100%", ":active": {backgroundColor: "#f1f1f1"}}}
                className='post-card'
            >
                <CardHeader
                    avatar={
                    <Avatar aria-label="person">
                        <Icon icon="oi:person" />
                    </Avatar>
                    }
                    title={post?.author_name}
                    sx={{padding: "0.5rem", paddingBottom: "0px", paddingLeft: "0.7rem", alignSelf: "center", justifySelf: "center"}}
                />
                <CardContent sx={{display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column"}}>
                    <Typography component="div" variant="h5" sx={{alignSelf: "center", justifySelf: "center", paddingBottom: "1rem"}}>
                        {post?.title}
                    </Typography>
                    {post?.tags.split(",").map((tag) => (
                        <Typography component="div" variant="subtitle2" color="text.secondary" sx={{paddingRight: "0.5rem", fontSize: "0.8rem"}}>
                            # {tag}
                        </Typography>
                    ))}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

function RecommendBar(props: Props) {
    const { tags, curThreadID } = props;
    const [posts, setPosts] = useState<number[]>([]);

    useEffect(() => {
        fetch(`${API_URL}search`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({keywords: tags})
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setPosts(data.value);
                });
            }
        }).catch(err => console.log(err));
    }, [])

    return (
        <Box sx={{display: "flex", alignContent: "center", flexDirection: "column", height: "100%", width: "100%", overflowX: "hidden"}}>
            <Typography variant="h6" sx={{fontWeight: "bold", mb: "0.5rem", alignSelf: "center", mt: "1rem"}}>Guess you like</Typography>
            <List component="div" aria-label="recommend-post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
                {
                    (posts.filter(index => index !== curThreadID).length === 0) 
                    ?( <Typography variant="h5" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                            no posts found
                        </Typography>)
                    : posts.map((index) => {
                        return <RecommendPost key={index} threadID={index} />
                    })
                }
            </List>
        </Box>
    );
}

export default RecommendBar;