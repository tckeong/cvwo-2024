import Post from './post';
import { Box, Typography } from "@mui/material";
import * as React from 'react';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import SortedType from './sortedType';

function PostList() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const navigate = useNavigate();

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
    };
  
    return (
      <Box sx={{backgroundColor: "#fafafa", height: "100%", width: "100%"}} className="content" >
        <List component="div" aria-label="post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
            <div 
              style={{width: "100%", paddingLeft: "2rem", paddingTop: "1rem", display: "flex", flexDirection:"row", justifyContent: "space-between",
                      paddingRight: "3rem"}}>
              <Typography variant="h6" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "0px"}}>
                have 7 posts
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
    );
}

export default PostList;