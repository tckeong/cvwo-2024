import { Avatar, Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import API_URL from "../../api/apiConfig";
import { FormatDate } from "../index/post";

export type CommentType = {
    ID: number;
    PostID: number;
    Content: string;
    AuthorID: number;
    AuthorName: string;
    CreatedTime: string;
}

interface Props {
    index: number;
}

function Comment(props: Props) {
    const { index } = props;

    const [comment, setComment] = useState<CommentType | undefined>(undefined);

    useEffect(() => {
        fetch(`${API_URL}comment/${index}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setComment(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }, [index]);

    return (
        <>
        <Card sx={{width: "auto", height: "auto", padding: "0px", margin: "1rem", backgroundColor: "#F8F8FF", border: "0.05rem solid #000000"}} elevation={6}>
            <CardHeader
                avatar={
                <Avatar aria-label="person">
                    <Icon icon="oi:person" />
                </Avatar>
                }
                title={comment?.AuthorName}
                subheader={FormatDate(comment?.CreatedTime.substring(0, 10) || "")}
            />
             <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }} className="card-content">
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="subtitle1" color="text.secondary" component="div" paragraph={true} noWrap={false}>
                    {comment?.Content}
                </Typography>
                </CardContent>
            </Box>
        </Card>
        </>
    )
}

export default Comment;