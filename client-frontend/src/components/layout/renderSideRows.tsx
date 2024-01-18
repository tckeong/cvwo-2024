import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { ListItemIcon } from '@mui/material';

interface Props {
    index: number;
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
    selectedIndex: number;
    tag: [string, React.ReactNode];
}

function RenderSideRows(props: Props) {
    const { index, handleClick, selectedIndex, tag} = props;
    const [ content, icon ] = tag;

    return (
      <ListItem key={index} component="div" disablePadding sx={{width: "100%"}}>
        <ListItemButton selected={index === selectedIndex} onClick={(event) => handleClick(event, index)} >
          <ListItemIcon sx={{width: "min-content"}}>
              {icon}
          </ListItemIcon>
          <ListItemText primary={content} />
        </ListItemButton>
      </ListItem>
    );
}

export default RenderSideRows;