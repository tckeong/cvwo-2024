import { Card, CardHeader, Box, Typography, CardMedia, CardActions, Checkbox, IconButton, CardContent, Popover, Button } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";

type contentProps = {
    title: string;
    content: string;
}

interface Props {
    img: "none" | string;
    content: contentProps;
}

interface PropsPopper {
    handleClose: () => void;
    anchorEl: HTMLButtonElement | null;
}

function MyPostPopper(props: PropsPopper) {
    const { handleClose, anchorEl } = props;

    const open = Boolean(anchorEl);
    const id = "user-button-popper";

    return (
        <Popover id={id} anchorEl={anchorEl} onClose={handleClose} open={open} anchorOrigin={{vertical: "bottom", horizontal: "left"}} >
            <div style={{display: "flex", flexDirection: "column"}}>
                <Button variant="contained" href={"/edit/" + "1"} size='small'>
                    Edit
                </Button>
                <Button variant="contained" color="error" size='small'>
                    Delete
                </Button>
            </div>
        </Popover>
    );
}

function MyPost(props: Props) {
    const { img, content } = props;

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Card sx={{width: "auto", height: "auto", padding: "0px", margin: "1rem", backgroundColor: "#F8F8FF", border: "0.005rem solid #000000"}} elevation={6}>
            <CardHeader 
                subheader="September 14, 2016" 
                action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                  }
            />
            <MyPostPopper handleClose={handleClose} anchorEl={anchorEl} />
            <Box className="post-detail" >
            <Typography component="div" variant="h4" sx={{paddingLeft: "1.5rem"}}>
                    {content.title}
            </Typography>
            <Box className="post-detail-content">
                {(img !== "none") && <CardMedia
                    component="img"
                    sx={{ width: "5rem", height: "5rem", objectFit: "contain" }}
                    image={img}
                    alt="apple"
                    className="card-img"
                    style={{alignSelf: "center", justifySelf: "center"}}
                />}
           
                <CardContent sx={{alignSelf: "center", padding: "1rem", paddingLeft: "1.5rem"}}>
                    <Typography variant="subtitle1" color="text.secondary" component="div" paragraph={true} noWrap={false}>
                        {content.content}
                    </Typography>
                </CardContent>
            </Box>
        </Box>
            <Typography variant="subtitle2" color="text.secondary" component="div" sx={{paddingLeft: "1rem"}}>
                #tag #tag #tag
            </Typography>
            <CardActions disableSpacing sx={{marginLeft: "0.25rem"}}>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default MyPost;