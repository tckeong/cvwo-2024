import { Box } from "@mui/material";
import AddComment from "./addComment";
import { Divider } from "@mui/material";
import Comment from "./comment";
import { useEffect, useState } from "react";
import API_URL from "../../api/apiConfig";

interface Props {
    threadID: number;
}

function ThreadComments(props: Props) {
    const { threadID } = props;
    const [commentsID, setCommentsID] = useState<number[]>([]);
    const [status, setStatus] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${API_URL}comments/${threadID}`, {
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
    }, [threadID, status]);

    return (
        <Box className="post-comment" sx={{margin: "2rem"}} >
            <AddComment threadID={threadID} setStatus={setStatus} />
            <Divider sx={{marginTop: "1.5rem"}}>All Comments</Divider>
            {commentsID.map((comment_id) => (
                <Comment key={comment_id} commentID={comment_id} setStatus={setStatus} />
            ))}
        </Box>
    );
}

export default ThreadComments;