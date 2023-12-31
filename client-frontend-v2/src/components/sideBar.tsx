import * as React from 'react';
import Box from '@mui/material/Box';
import RenderSideRows from './renderSideRows';
import "./css/scrollBar.css";
import { FixedSizeList } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";

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
      sx={{backgroundColor: "#f1f1f1", height: '100%', width: '100%', margin: "0px", padding: "0px"}}
      className="sideBar"
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
                <RenderSideRows
                  index={index}
                  style={style}
                  selectedIndex={selectedIndex}
                  handleClick={handleListItemClick}
                />
              )}
            </FixedSizeList>
          )}
        </AutoSizer>
    </Box>
  );
}

export default SideBar;