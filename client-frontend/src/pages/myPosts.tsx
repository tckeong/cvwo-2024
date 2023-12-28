import { Divider, Typography } from "@mui/material";
import MyPost from "../components/myPosts/myPost";
import Layout from "./layout";
import { Box } from "@mui/material";

function MyPosts() {
    return (
        <Layout>
            <div className="content" style={{overflowY: "scroll"}}>
                <Typography component="div" variant="h6" sx={{padding: "1rem", paddingBottom: "0.5rem", paddingLeft: "1.5rem"}}>username 's posts</Typography>
                <Divider />
                <Box sx={{marginLeft: "0.5rem", marginRight: "0.5rem"}}>
                    <MyPost img="none" content={{content: "hello world", title: "hello"}} />
                    <MyPost img="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" content={{content: "hello world", title: "hello"}} />
                </Box>
            </div>
        </Layout>
    );
}

export default MyPosts;