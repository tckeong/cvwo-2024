import { Box, Typography, Card, CardHeader, Avatar, List, CardActionArea, CardContent } from "@mui/material";
import { Icon } from '@iconify/react';

interface Props {
    index: number;
    title: string;
}

function RecommendPost(props: Props) {
    const { index, title } = props;

    let tag1 = "tag1";
    let tag2 = "tag2";
    let tag3 = "tag3";

    const handleClick = (index: number) => {
        alert(index);
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
                    title="usename"
                    sx={{padding: "0.5rem", paddingBottom: "0px", paddingLeft: "0.7rem", alignSelf: "center", justifySelf: "center"}}
                />
                <CardContent sx={{display: "flex", alignContent: "center", justifyContent: "center", flexDirection: "column"}}>
                    <Typography component="div" variant="h5" sx={{alignSelf: "center", justifySelf: "center", paddingBottom: "1rem"}}>
                        {title}
                    </Typography>
                    <Typography component="div" variant="subtitle2" color="text.secondary" sx={{display: "flex", flexDirection: "row", alignSelf: "center"}}>
                        #{tag1} #{tag2} #{tag3}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

function RecommendBar() {
    return (
        <Box sx={{display: "flex", alignContent: "center", flexDirection: "column", height: "100%", width: "100%", overflowX: "hidden"}}>
            <Typography variant="h6" sx={{fontWeight: "bold", mb: "1rem", alignSelf: "center"}}>Guess you like</Typography>
            <List component="div" aria-label="recommend-post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
                <RecommendPost index={1} title="hello world" />
                <RecommendPost index={2} title="hello bro" />
                <RecommendPost index={3} title="hello world" />
                <RecommendPost index={4} title="hello bro" />
                <RecommendPost index={5} title="hello world" />
                <RecommendPost index={6} title="hello bro" />
            </List>
        </Box>
    );
}

export default RecommendBar;