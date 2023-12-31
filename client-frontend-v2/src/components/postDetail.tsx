import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Icon } from '@iconify/react';
import CardActions from '@mui/material/CardActions';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import "./css/postDetail.css"

type contentProps = {
    title: string;
    content: string;
}

interface Props {
    img: "none" | string;
    content: contentProps;
}

function PostContent(props: Props) {
    const { img, content } = props;

    return (
        <Box className="post-detail" >
            <Typography component="div" variant="h4" sx={{paddingLeft: "1rem"}}>
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
           
                <CardContent sx={{alignSelf: "center", padding: "1rem"}}>
                    <Typography variant="subtitle1" color="text.secondary" component="div" paragraph={true} noWrap={false}>
                        {content.content}
                    </Typography>
                </CardContent>
            </Box>
        </Box>
    )
}

function PostDetail() {
    return (
        <Card sx={{width: "auto", height: "auto", padding: "0px", margin: "1rem", backgroundColor: "#F8F8FF", border: "0px"}} elevation={6}>
            <CardHeader
                avatar={
                <Avatar aria-label="person">
                    <Icon icon="oi:person" />
                </Avatar>
                }
                title="usename"
                subheader="September 14, 2016"
            />
            <PostContent img="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" content={{title: "Live From Space", content: "hello"}}/>
            <CardActions disableSpacing sx={{marginLeft: "0.25rem"}}>
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default PostDetail;