import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import CardActions from '@mui/material/CardActions';
import PostContent from './threadContent';
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

export type ThreadType = {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    author_id: number;
    author_name: string;
    title: string;
    content: string;
    img_link: string;
    tags: string;
    liked_by: string;
}

/**
 * @param date 
 * @returns string of the date in format: Month Day, Year
 */
export function FormatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}   

interface Props {
    index: number;
    handleClick: (index: number) => void;
    liked: boolean
}


function Thread(props: Props) {
    const { index, handleClick, liked } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [thread, setThread] = useState<ThreadType | undefined>(undefined);
    const [checked, setChecked] = useState<boolean>(liked);

    // fetch the post data from the server
    useEffect(() => {
        fetch(`${API_URL}thread/${index}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setThread(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })

    }, [index]);

    /** 
     * handleLike for like button.
     * detect the change of the like button.
     * set the like status of the post in redux store.
     */
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
                    title={thread?.author_name}
                    subheader={thread ? FormatDate(thread.CreatedAt) : ""}
                />
                <PostContent img={thread?.img_link} content={{title: thread?.title, content: thread?.content}} />
            </CardActionArea>
            <CardActions disableSpacing >
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={checked} onChange={handleLike}/>
                <ShareButton threadID={index} />
            </CardActions>
        </Card>
    );
}

export default Thread;