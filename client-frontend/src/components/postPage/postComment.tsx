import { Box } from "@mui/system";
import AddComment from "./addComment";
import { Divider } from "@mui/material";
import Comment from "./comment";
import { useEffect, useState } from "react";
import API_URL from "../../api/apiConfig";

interface Props {
    postID: number;
}

function PostComment(props: Props) {
    const { postID } = props;
    const [commentsID, setCommentsID] = useState<number[]>([]);
    const [status, setStatus] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${API_URL}comments/${postID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setCommentsID(data.value);
                });
            } else {
                response.json().then(data => {
                    console.log(data.message);
                });
            }
        }).catch(err => console.log(err));
    }, [postID, status]);

    return (
        <Box className="post-comment" sx={{margin: "2rem"}}>
            <AddComment postID={postID} setStatus={setStatus} />
            <Divider sx={{marginTop: "1.5rem"}}>All Comments</Divider>
            {commentsID.map((comment_id) => (
                <Comment key={comment_id} index={comment_id} />
            ))}
        </Box>
    );
}

export default PostComment;