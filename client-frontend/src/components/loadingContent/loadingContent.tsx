import { Box, Typography, CircularProgress } from "@mui/material";

function LoadingContent() {
    return (
        <Box sx={{display:"flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}} className="content" >
            <CircularProgress sx={{alignSelf: "center", justifySelf: "center"}} size="4rem" />
            <Typography variant="h4" component="div" sx={{fontWeight: "bold", justifySelf: "center", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                loading...
            </Typography>
        </Box>
    );
}

export default LoadingContent;