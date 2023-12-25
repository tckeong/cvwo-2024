import ListItemButton from '@mui/material/ListItemButton';
import Post from './post';
import { Box } from "@mui/material";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import * as React from 'react';
import List from '@mui/material/List';
import { ListItemIcon } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function PostList() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
    };
  
    return (
      <Box sx={{backgroundColor: "#f1f1f1", height: "100%", width: "100%"}} className="content">
        <List component="div" aria-label="post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
            <Post index={1} handleClick={(index) => alert(index)} />
            <Post index={2} handleClick={(index) => alert(index)} />
            <Post index={3} handleClick={(index) => alert(index)} />
            <Post index={4} handleClick={(index) => alert(index)} />
            <Post index={5} handleClick={(index) => alert(index)} />
            <Post index={6} handleClick={(index) => alert(index)} />
            <Post index={7} handleClick={(index) => alert(index)} />
        </List>
      </Box>
    );
}

export default PostList;