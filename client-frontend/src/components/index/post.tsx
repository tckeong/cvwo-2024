import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import PostContent from './postContent';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardActionArea from '@mui/material/CardActionArea';
import { useEffect, useState } from 'react';
import API_URL from '../../api/apiConfig';

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
}

function Post(props: Props) {
    const { index, handleClick} = props;

    const [post, setPost] = useState<PostType | undefined>(undefined);

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
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <CommentIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default Post;