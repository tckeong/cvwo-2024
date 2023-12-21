import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

interface Props {
    index: number;
    handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void;
    selectedIndex: number;
}

function RenderRows(props: Props) {
    const { index, handleClick, selectedIndex} = props;

  return (
    <ListItem key={index} component="div" disablePadding>
      <ListItemButton selected={index === selectedIndex} onClick={(event) => handleClick(event, index)}>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default RenderRows;