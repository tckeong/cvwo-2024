import { Box } from "@mui/system";
import AddComment from "./addComment";
import { Divider } from "@mui/material";
import Comment from "./comment";

function PostComment() {
    return (
        <Box className="post-comment" sx={{margin: "2rem"}}>
            <AddComment />
            <Divider sx={{marginTop: "1.5rem"}}>All Comments</Divider>
            <Comment content="hahaha"/>
        </Box>
    );
}

export default PostComment;