import * as React from 'react';
import Box from '@mui/material/Box';
import RenderSideRows from './renderSideRows';
import "../css/scrollBar.css";
import Tags from '../tags/tags';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';

interface Props {
    index?: number;
}

function SideBar(props: Props) {
    const navigate = useNavigate();
    const { index } = props;

    const [selectedIndex, setSelectedIndex] = React.useState(index ? index : -1);


    const handleListItemClick = (
        _: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        const tag = Tags[index][0];
        setSelectedIndex(index);
        navigate(`/search/?keywords=${tag}`);

    };

  return (
    <Box
      sx={{backgroundColor: "#f1f1f1", height: '100%', width: '100%', margin: "0px", padding: "0px", overflowY: "scroll"}}
      className="sideBar"
    >
        <nav aria-label="side-bar">
        <List sx={{margin: "0px", padding: "0px"}}>
          {Tags.map((tag, index) => (
            <RenderSideRows
              key={index}
              index={index}
              selectedIndex={selectedIndex}
              handleClick={handleListItemClick}
              tag={tag}
            />
          ))}
        </List>
        </nav>
    </Box>
  );
}

export default SideBar;