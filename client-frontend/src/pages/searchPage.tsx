import { Box, List, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../components/index/post";
import SortedType from "../components/index/sortedType";
import Layout from "./layout";

function SearchPage() {
    const { keywords } = useParams();
    const navigate = useNavigate();

    return (
        <Layout>
            <Box sx={{backgroundColor: "#fafafa", height: "100%", width: "100%"}} className="content">           
                <List component="div" aria-label="post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
                    <div 
                    style={{width: "100%", paddingLeft: "2rem", paddingTop: "1rem", display: "flex", flexDirection:"row", justifyContent: "space-between",
                            paddingRight: "3rem"}}>
                    <Typography variant="h6" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "0px"}}>
                        Search Result by {keywords}: 7 posts
                    </Typography>
                    <SortedType />
                    </div>
                    <Post index={1} handleClick={(index) => navigate("/post/" + index)} />
                    <Post index={2} handleClick={(index) => navigate("/post/" + index)} />
                    <Post index={3} handleClick={(index) => navigate("/post/" + index)} />
                    <Post index={4} handleClick={(index) => navigate("/post/" + index)} />
                    <Post index={5} handleClick={(index) => navigate("/post/" + index)} />
                    <Post index={6} handleClick={(index) => navigate("/post/" + index)} />
                    <Post index={7} handleClick={(index) => navigate("/post/" + index)} />
                </List>
            </Box>
        </Layout>
    );
}

export default SearchPage;