import { Typography } from "@mui/material";
import "./css/content.css"

function PostContent() {
    return (
        <div className="card-content">
            <img  className="card-img" alt="Img" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"/>
            <div className="card-text">
                <Typography gutterBottom variant="h5" component="div">
                    Title
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Contents
                </Typography>
            </div>
        </div>
    )
}

export default PostContent;