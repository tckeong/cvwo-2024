import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

function AddThreadButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/addThread");
    }
    return (
        <div className="addPosts" style={{display: "flex", justifyContent: "center", alignContent: "center", width: "100%", height: "100%", padding: "1rem"}}>
            <Button sx={{margin: "0px", justifySelf: "center", alignSelf: "center", width: "auto", height: "auto"}} variant="contained" startIcon={<AddIcon />} onClick={handleClick}>
                Add Posts
            </Button>
        </div>
    )
}

export default AddThreadButton;