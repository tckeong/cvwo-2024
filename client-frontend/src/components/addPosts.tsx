import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function AddPosts() {
    return (
        <div className="addPosts" style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
            <Button sx={{margin: "0px", justifySelf: "center", alignSelf: "center"}} variant="contained" startIcon={<AddIcon />}>Add Posts</Button>
        </div>
    )
}

export default AddPosts;