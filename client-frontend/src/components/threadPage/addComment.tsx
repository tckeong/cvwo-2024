import { Fab } from '@mui/material';
import TextField from '@mui/material/TextField';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import API_URL from '../../api/apiConfig';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface Props {
    threadID: number;
    setStatus: (status: any) => void;
}

function AddComment(props: Props) {
    const { threadID, setStatus } = props;
    const [comment, setComment] = useState<string>("");

    const navigate = useNavigate();

    const loginState = Cookies.get("Authorization") !== undefined;

    // handle the click event for the add comment button
    const handleClick = () => {
        if(!loginState) {
            alert("Please login first!");
            navigate("/login");
            return ;
        }
        
        if(comment.length === 0 || comment === "") return ; 

        fetch(`${API_URL}comment/${Cookies.get("Authorization")}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "thread_id": threadID,
                "content": comment,
            }),
        }).catch(err => {
            console.log(err);
        })

        setComment("");
        setStatus((prevState: boolean) => !prevState);
    }

    return (
        <>
            <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={5}
                sx={{width: "100%"}}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Fab variant="extended" size="medium" color="primary" sx={{marginTop: "1rem", padding: "1rem"}} onClick={handleClick}>
                <AddCircleOutlineIcon sx={{mr: 1}}/>
                Add Comment
            </Fab>
        </>
    );
}

export default AddComment;