import { Card, CardHeader, Box, Typography, CardMedia, CardActions, Checkbox, IconButton, CardContent, Popover, Button } from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import API_URL from "../../api/apiConfig";
import { PostType } from "../index/post";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { like, unlike } from "../interact/likeInteract";
import ShareButton from "../interact/shareButton";

interface Props {
    postID: number;
    liked: boolean;
}

interface PropsPopper {
    handleClose: () => void;
    anchorEl: HTMLButtonElement | null;
    postID: number;
}

function MyPostPopper(props: PropsPopper) {
    const { handleClose, anchorEl, postID } = props;
    const navigate = useNavigate();

    const open = Boolean(anchorEl);
    const id = "user-button-popper";

    return (
        <Popover id={id} anchorEl={anchorEl} onClose={handleClose} open={open} anchorOrigin={{vertical: "bottom", horizontal: "left"}} >
            <div style={{display: "flex", flexDirection: "column"}}>
                <Button variant="contained" size='small' onClick={() =>navigate(`/edit/${postID}`)} >
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
    const { postID, liked } = props;
    const [content, setContent] = useState<PostType | undefined>(undefined);
    const [checked, setChecked] = useState<boolean>(liked);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${API_URL}thread/${postID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setContent(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLike = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if(event.target.checked) {
            dispatch(like({index: postID}));
        } else {
            dispatch(unlike({index: postID}));
        }
    }

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
            <MyPostPopper handleClose={handleClose} anchorEl={anchorEl} postID={postID} />
            <Box className="post-detail" >
                <Typography component="div" variant="h4" sx={{paddingLeft: "1.5rem"}}>
                        {content?.title}
                </Typography>
                <Box className="post-detail-content">
                    {(content?.imgLink !== "") && <CardMedia
                        component="img"
                        sx={{ width: "5rem", height: "5rem", objectFit: "contain" }}
                        image={content?.imgLink}
                        alt="apple"
                        className="card-img"
                        style={{alignSelf: "center", justifySelf: "center"}}
                    />}
            
                    <CardContent sx={{alignSelf: "center", padding: "1rem", paddingLeft: "1.5rem"}}>
                        <Typography variant="subtitle1" color="text.secondary" component="div" paragraph={true} noWrap={false}>
                            {content?.content}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
            <Box sx={{display:"flex", flexDirection: "row"}}>
            {
                content?.tags.split(",").map((tags) => {
                    return (
                    <Typography key={tags} variant="subtitle1" color="text.secondary" component="div" sx={{paddingLeft: "1.5rem"}}>
                        #{tags}
                    </Typography>);
                })
            }
            </Box>
            <CardActions disableSpacing sx={{marginLeft: "0.25rem"}}>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={checked} onChange={handleLike} />
                <ShareButton index={postID} />
            </CardActions>
        </Card>
    );
}

export default MyPost;