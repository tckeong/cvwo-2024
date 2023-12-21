import * as React from 'react';
import Box from '@mui/material/Box';
import { Virtuoso } from 'react-virtuoso'
import RenderRows from './renderRows';
import "./css/scrollBar.css";

function SideBar() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const totalItems = 11;

    const handleListItemClick = (
        _: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

  return (
    <Box
      sx={{height: '100%', width: "100%", bgcolor: 'background.paper', borderRight: '1px solid #ccc'}}
    >
        <h4 style={{borderBottom: "1px solid #000000", padding: "0.5rem", margin: "0"}}>Topics</h4>
       {/* <Virtuoso
            style={{ height: '100%', padding:'0px', overflowY: 'auto' }}
            totalCount={totalItems}
            itemContent={i => <RenderRows index={i} handleClick={handleListItemClick} selectedIndex={selectedIndex} />}
        /> */}
    </Box>
  );
}

export default SideBar;