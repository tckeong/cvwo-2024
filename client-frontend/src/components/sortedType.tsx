import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { IconButton, Box } from '@mui/material';
import { useState } from 'react';
import { Icon } from '@iconify/react';


type handleClickType = "byRating" | "byDate";

function SortedType() {
  const [byRating, setByRating] = useState(false);
  const [byDate, setByDate] = useState(false);
  const [reverse , setReverse] = useState(false);

  function handleClick(type: handleClickType) {
    switch (type) {
      case "byRating":
        setByRating(true);
        setByDate(false);
        break;
      case "byDate":
        setByRating(false);
        setByDate(true);
        break;
      default:
        break;
    }
  }

  return (
    <Box sx={{display: "flex", flexDirection: "row"}}>
      {(reverse)
        ?(<IconButton color="primary" aria-label='reverse' sx={{marginRight: "1rem"}} onClick={() => setReverse(!reverse)}>
            <Icon icon="system-uicons:reverse" rotate={1} />
          </IconButton>)
        : (<IconButton aria-label="reverse" sx={{marginRight: "1rem"}} onClick={() => setReverse(!reverse)}>
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