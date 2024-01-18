import { IconButton, Snackbar, Alert } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import { useState } from "react";

interface Props {
    threadID: number;
}

const url = import.meta.env.VITE_REACT_APP_URL;;

function ShareButton(props: Props) {
    const { threadID } = props;

    const [open, setOpen] = useState<boolean>(false);

    const handleShare = () => {
        setOpen(true);
        navigator.clipboard.writeText(`${url}thread/${threadID}`).catch(err => console.log(err));
    }

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <>
            <IconButton aria-label="share" onClick={handleShare}>
                <ShareIcon />
            </IconButton>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal: "center"}}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
                    Copy thread link to clipboard successfully!
                </Alert>
            </Snackbar>
        </>
    );
}

export default ShareButton;