import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { IconButton, Box } from '@mui/material';
import { useState } from 'react';
import { Icon } from '@iconify/react';


export type handleClickType = "byRating" | "byDate";

interface Props {
  setStatus: (status: handleClickType) => void;
  setReverse: (reverse: any) => void;
  reverse: boolean;
}

function SortedType(props: Props) {
  const { setStatus, setReverse, reverse } = props;

  const [byRating, setByRating] = useState(false);
  const [byDate, setByDate] = useState(false);

  function handleClick(type: handleClickType) {
    switch (type) {
      case "byRating":
        setByRating(true);
        setByDate(false);
        setStatus("byRating");
        break;
      case "byDate":
        setByRating(false);
        setByDate(true);
        setStatus("byDate");
        break;
      default:
        break;
    }
  }

  function handleReverse() {
    setReverse(!reverse);
  }

  return (
    <Box sx={{display: "flex", flexDirection: "row"}}>
      {(reverse)
        ?(<IconButton color="primary" aria-label='reverse' sx={{marginRight: "1rem"}} onClick={handleReverse}>
            <Icon icon="system-uicons:reverse" rotate={1} />
          </IconButton>)
        : (<IconButton aria-label="reverse" sx={{marginRight: "1rem"}} onClick={handleReverse}>
            <Icon icon="system-uicons:reverse" rotate={1}/>
          </IconButton>
        )}
      <Breadcrumbs separator="|" aria-label="breadcrumb" sx={{alignSelf: "center"}}>
        <div onClick={() => handleClick("byRating")}>
          {(byRating)
          ? (<Typography color="text.primary">by rating</Typography>)
          :(<Link underline="hover" color="inherit" sx={{":hover": {cursor: "pointer"}}}>
            by rating
          </Link>)}
        </div>
        <div onClick={() => handleClick("byDate")}>
          {(byDate)
          ? (<Typography color="text.primary">by date</Typography>)
          :(<Link underline="hover" color="inherit" sx={{":hover": {cursor: "pointer"}}}>
            by date
          </Link>)}
        </div>
      </Breadcrumbs>
    </Box>
  );
}

export default SortedType;