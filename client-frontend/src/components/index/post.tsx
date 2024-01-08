import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import CardActions from '@mui/material/CardActions';
import PostContent from './postContent';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardActionArea from '@mui/material/CardActionArea';
import { useEffect, useState } from 'react';
import API_URL from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { like, unlike } from '../interact/likeInteract';
import ShareButton from '../interact/shareButton';

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
}

function Post(props: Props) {
    const { index, handleClick, liked } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [post, setPost] = useState<PostType | undefined>(undefined);
    const [checked, setChecked] = useState<boolean>(liked);

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
            dispatch(like({index: index}));
        } else {
            dispatch(unlike({index: index}));
        }
    }

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
                <ShareButton index={index} />
            </CardActions>
        </Card>
    );
}

export default Post;