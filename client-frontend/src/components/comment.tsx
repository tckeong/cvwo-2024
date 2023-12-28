import { Avatar, Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

interface Props {
    content: string;
}

function Comment(props: Props) {
    const { content } = props;

    return (
        <>
        <Card sx={{width: "auto", height: "auto", padding: "0px", margin: "1rem", backgroundColor: "#F8F8FF", border: "0.05rem solid #000000"}} elevation={6}>
            <CardHeader
                avatar={
                <Avatar aria-label="person">
                    <Icon icon="oi:person" />
                </Avatar>
                }
                title="usename"
                subheader="September 14, 2016"
            />
             <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }} className="card-content">
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="subtitle1" color="text.secondary" component="div" paragraph={true} noWrap={false}>
                    {content}
                </Typography>
                </CardContent>
            </Box>
        </Card>
        </>
    )
}

export default Comment;