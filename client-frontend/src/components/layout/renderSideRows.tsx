import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

interface Props {
    index: number;
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
    selectedIndex: number;
    style: React.CSSProperties;
}

function RenderSideRows(props: Props) {
    const { index, handleClick, selectedIndex, style} = props;

    const Tags: string[] = ["Technology", "Programming Language", "Computer Science", "Finance", "Health", "Entertaiment", "Food", 
                            "Travel", "Education", "Sport", "Fashion", "Music", "Movie", "Game", "Book", "Art", "Business", "Science", 
                            "News", "Politics", "Other"];

    return (
      <ListItem key={index} component="div" disablePadding sx={{margin: "0px", padding: '0px', height: '100%'}} style={style}>
        <ListItemButton selected={index === selectedIndex} onClick={(event) => handleClick(event, index)} 
            sx={{margin: "0px", height: "100%", backgroundColor: "#f1f1f1", padding: "0px"}}
        >
          <ListItemText primary={`Item ${index + 1}`} sx={{margin: "0px", textAlign: "center"}} />
        </ListItemButton>
      </ListItem>
    );
}

export default RenderSideRows;