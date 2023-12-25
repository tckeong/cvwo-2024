import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import "./css/postContent.css"

function PostContent() {
    return (
        <Box className="card-content">
            <CardMedia
                component="img"
                sx={{ width: "5rem", height: "5rem", objectFit: "contain" }}
                image="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="apple"
                className="card-img"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }} className="card-content">
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    Live From Space
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    Mac Miller
                </Typography>
                </CardContent>
            </Box>
        </Box>
    )
}

export default PostContent;