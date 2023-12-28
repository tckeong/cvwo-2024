import { Fab } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddComment() {
    let comment: string = "";

    return (
        <>
            <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={5}
                sx={{width: "100%"}}
                onChange={(e) => comment = e.target.value}
            />
            <Fab variant="extended" size="medium" color="primary" sx={{marginTop: "1rem", padding: "1rem"}} onClick={() => alert(comment)}>
                <AddCircleOutlineIcon sx={{mr: 1}}/>
                Add Comment
            </Fab>
        </>
    );
}

export default AddComment;