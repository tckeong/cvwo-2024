import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Post from './post';
import { Box } from "@mui/material";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import * as React from 'react';

interface Props {
    index: number;
    handleClick: (index: number) => void;
    style: React.CSSProperties;
}

function RenderRows(props: Props) {
    const { index, handleClick, style} = props;

    return (
      <ListItem key={index} component="div" disablePadding sx={{margin: "0px", padding: '0px', height: '100%'}} style={style}>
        <ListItemButton onClick={() => handleClick(index)} 
            sx={{margin: "0px", height: "100%", backgroundColor: "#f1f1f1", padding: "0px"}}
        >
          <Post />
        </ListItemButton>
      </ListItem>
    );
}

function PostList() {
    let totalItems: number = 11;

    const handleListItemClick = (index: number) => {
        alert(index);
    };

    return (
        <Box
            sx={{backgroundColor: "#f1f1f1", height: '100%', width: '100%', margin: "0px", padding: "0px"}}
            className="content"
            >
                <AutoSizer>
                {({ height, width }) => (
                    <FixedSizeList
                    className="sideBar"
                    height={height}
                    itemCount={totalItems}
                    itemSize={height / 5}
                    width={width}
                    style={{margin: "0px", padding: "0px"}}
                    >
                    {({ index, style }) => (
                        <RenderRows
                        index={index}
                        style={style}
                        handleClick={handleListItemClick}
                        />
                    )}
                    </FixedSizeList>
                )}
                </AutoSizer>
        </Box>
    )
}

export default PostList;