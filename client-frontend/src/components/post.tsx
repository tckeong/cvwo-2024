import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import PostContent from './postContent';

function Post() {
    return (
        <Card sx={{width: "auto", margin: "1rem", padding: "1rem", border: "0.001rem solid #000000", height: "auto"}} className='post'>
            <CardHeader
                avatar={
                <Avatar aria-label="person">
                    <Icon icon="oi:person" />
                </Avatar>
                }
                title="usename"
                subheader="September 14, 2016"
            />
            <CardContent>
                <PostContent />
            </CardContent>
            <CardActions disableSpacing >
                <IconButton aria-label="add to favorites" >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <CommentIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Post;