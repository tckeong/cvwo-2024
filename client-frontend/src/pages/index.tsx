import { Box } from "@mui/material";
import Header from "../components/header";
import SideBar from "../components/sideBar";
import AddPosts from "../components/addPosts";
import "./css/index.css";
import PostList from "../components/postList";

function Index() {
    return (
      <Box className="main-layout">
        <Header />
        <div  className="topic" style={{padding: "0px", margin: "0px", borderBottom: "0.05rem solid #000000", borderRight: "0.05rem solid #000000"}}>
          <h4 style={{margin: '0px', padding: '0px', alignSelf: "center", justifySelf: "center"}}>Topics</h4>
        </div>
        <SideBar />
        <AddPosts />
        <PostList />
      </Box>
    );
}

export default Index;
