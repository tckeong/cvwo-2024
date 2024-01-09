import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import "../css/postContent.css"

type contentProps = {
    title?: string;
    content?: string;
}

export interface Props {
    img?: string;
    content: contentProps;
}

function ThreadContent(props: Props) {
    const { img, content } = props;

    return (
        <Box className="card-content">
            {(img !== undefined && img !== "") && <CardMedia
                component="img"
                sx={{ width: "5rem", height: "5rem", objectFit: "contain" }}
                image={img}
                alt={img}
                className="card-img"
                style={{alignSelf: "center", justifySelf: "center"}}
            />}
            <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" , marginLeft: "1rem"}} className="card-content">
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                    {content.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" paragraph={true} noWrap={false}>
                    {content.content}
                </Typography>
                </CardContent>
            </Box>
        </Box>
    )
}

export default ThreadContent;