import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import PostContent from './postContent';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardActionArea from '@mui/material/CardActionArea';
import { useEffect, useState } from 'react';
import API_URL from '../../api/apiConfig';
import { Action } from './postList';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {Snackbar, Alert} from '@mui/material';

export type PostType = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    authorID: number;
    authorName: string;
    title: string;
    content: string;
    imgLink: string;
    tags: string;
    likedBy: string;
}

export function FormatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}   

interface Props {
    index: number;
    handleClick: (index: number) => void;
    liked: boolean
    dispatch: React.Dispatch<Action>;
}

function Post(props: Props) {
    const { index, handleClick, liked, dispatch } = props;
    const navigate = useNavigate();

    const [post, setPost] = useState<PostType | undefined>(undefined);
    const [checked, setChecked] = useState<boolean>(liked);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        fetch(`${API_URL}thread/${index}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setPost(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })

    }, [index]);

    const handleLike = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Cookies.get("userId") === undefined) {
            alert("Please login to like this post!");
            navigate("/login");
            return;
        }
        
        setChecked(event.target.checked);
        if(event.target.checked) {
            dispatch({type: "like", payload: {index: index}});
        } else {
            dispatch({type: "unlike", payload: {index: index}});
        }
    }

    const handleShare = () => {
        setOpen(true);
        navigator.clipboard.writeText(`http://localhost:5173/post/${index}`).catch(err => console.log(err));
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <Card sx={{width: "auto", border: "0.001rem solid #000000", height: "auto", backgroundColor: "#f1f1f1", padding: "0px", margin: "1rem"}}>
            <CardActionArea onClick={() => handleClick(index)} 
                sx={{height: "100%", backgroundColor: "#f1f1f1", padding: "0px", ":hover": {cursor: "pointer", backgroundColor: "#f1f1f1"},
                    width: "100%", ":active": {backgroundColor: "#f1f1f1"}}}
                className='post-card'
            >
                <CardHeader
                    avatar={
                    <Avatar aria-label="person">
                        <Icon icon="oi:person" />
                    </Avatar>
                    }
                    title={post?.authorName}
                    subheader={post ? FormatDate(post.CreatedAt) : ""}
                />
                <PostContent img={post?.imgLink} content={{title: post?.title, content: post?.content}} />
            </CardActionArea>
            <CardActions disableSpacing >
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={checked} onChange={handleLike}/>
                <IconButton aria-label="share" onClick={handleShare}>
                    <ShareIcon />
                </IconButton>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal: "center"}}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
                        Copy thread link to clipboard successfully!
                    </Alert>
                </Snackbar>
            </CardActions>
        </Card>
    );
}

export default Post;