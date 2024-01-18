import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import CardActions from '@mui/material/CardActions';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { ThreadType } from '../index/thread';
import ShareButton from '../interact/shareButton';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Props } from '../index/threadContent';
import { FormatDate } from '../index/thread';
import { useState } from 'react';
import "../css/postDetail.css"
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { like, unlike } from '../interact/likeInteract';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';

function ThreadContent(props: Props) {
    const { img, content } = props;

    return (
        <Box className="thread-detail" >
            <Typography component="div" variant="h4" sx={{paddingLeft: "1rem"}}>
                    {content.title}
            </Typography>
            <Box className="post-detail-content">
                {(img !== undefined && img !== "") && <CardMedia
                    component="img"
                    sx={{ width: "5rem", height: "5rem", objectFit: "contain" }}
                    image={img}
                    alt={img}
                    className="card-img"
                    style={{alignSelf: "center", justifySelf: "center"}}
                />}
           
                <CardContent sx={{alignSelf: "center", padding: "1rem"}}>
                    <Typography variant="subtitle1" color="text.secondary" component="div" paragraph={true} noWrap={false}>
                        {content.content}
                    </Typography>
                </CardContent>
            </Box>
        </Box>
    )
}

interface ThreadDetailProps {
    thread: ThreadType | undefined;
    liked: boolean;
}

function ThreadDetail(props: ThreadDetailProps) {
    const { thread, liked } = props;
    const [checked, setChecked] = useState<boolean>(liked);
    const dispatch = useDispatch();
    const threadID = thread ? thread.ID : -1;
    const navigate = useNavigate();
    
    const handleLike = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (Cookies.get("userId") === undefined) {
            alert("Please login to like this post!");
            navigate("/login");
            return;
        }
        
        setChecked(event.target.checked);
        if(event.target.checked) {
            dispatch(like({index: threadID}));
        } else {
            dispatch(unlike({index: threadID}));
        }
    }


    return (
        <Card sx={{width: "auto", height: "auto", padding: "0px", margin: "1rem", backgroundColor: "#F8F8FF", border: "0px"}} elevation={6}>
            <CardHeader
                avatar={
                <Avatar aria-label="person">
                    <Icon icon="oi:person" />
                </Avatar>
                }
                title={thread?.author_name}
                subheader={FormatDate(thread ? thread.CreatedAt : "")}
            />
            <ThreadContent img={thread?.img_link} content={{title: thread?.title, content: thread ? thread.content : ""}}/>
            <Box sx={{display: "flex", flexDirection: "row"}}>
                {thread?.tags.split(",").filter(tag => tag !== "").map((tag) => {
                    return (
                    <Link key={tag} onClick={() => navigate(`/search/?keywords=${tag}`)} underline='hover' sx={{color: "#000000"}} >
                        <Typography variant="subtitle1" color="text.secondary" component="div" sx={{paddingLeft: "1.5rem"}}>
                            #{tag}
                        </Typography>
                    </Link>);
                })}
            </Box>
            <CardActions disableSpacing sx={{marginLeft: "0.25rem"}}>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={checked} onChange={handleLike} />
                <ShareButton threadID={thread ? thread.ID : -1} />
            </CardActions>
        </Card>
    );
}

export default ThreadDetail;