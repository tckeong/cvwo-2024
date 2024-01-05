import { Avatar, Box, Card, CardContent, CardHeader, Typography, IconButton, Popover, Button, TextField } from "@mui/material";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import API_URL from "../../api/apiConfig";
import { FormatDate } from "../index/post";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Cookies from "js-cookie";

export type CommentType = {
    ID: number;
    PostID: number;
    Content: string;
    AuthorID: number;
    AuthorName: string;
    CreatedTime: string;
}

interface Props {
    index: number;
}

interface PropsPopper {
    handleClose: () => void;
    anchorEl: HTMLButtonElement | null;
    setEdit: (edit: boolean) => void;
}

function CommentPopper(props: PropsPopper) {
    const { handleClose, anchorEl, setEdit } = props;

    const open = Boolean(anchorEl);
    const id = "comment-popper";

    return (
        <Popover id={id} anchorEl={anchorEl} onClose={handleClose} open={open} anchorOrigin={{vertical: "bottom", horizontal: "left"}} >
            <div style={{display: "flex", flexDirection: "column"}}>
                <Button variant="contained" size='small' onClick={() => setEdit(true)}>
                    Edit
                </Button>
                <Button variant="contained" color="error" size='small'>
                    Delete
                </Button>
            </div>
        </Popover>
    );
}

function Comment(props: Props) {
    const { index } = props;
    const userId = Cookies.get("userId");
    const userID: number | undefined = parseInt(userId ? userId : "-1", 10);

    const [comment, setComment] = useState<CommentType | undefined>(undefined);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [edit, setEdit] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = () => {
        setEdit(false);
        fetch(`${API_URL}comment/${index}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: content,
            }),
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetch(`${API_URL}comment/${index}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setComment(data.value);
                    setContent(data.value.Content);
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }, [index]);

    return (
        <>
        <Card sx={{width: "auto", height: "auto", padding: "0px", margin: "1rem", backgroundColor: "#F8F8FF", border: "0.05rem solid #000000"}} elevation={6}>
            <CardHeader
                avatar={
                <Avatar aria-label="person">
                    <Icon icon="oi:person" />
                </Avatar>
                }
                title={comment?.AuthorName}
                subheader={FormatDate(comment?.CreatedTime.substring(0, 10) || "")}
                action={
                    (userID === comment?.AuthorID && userID !== undefined) &&
                    (<IconButton aria-label="settings" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>)
                }
            />
            <CommentPopper handleClose={handleClose} anchorEl={anchorEl} setEdit={setEdit} />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }} className="card-content">
                <CardContent sx={{ flex: '1 0 auto' }}>
                { (edit)
                    ? (
                    <Box>
                        <TextField
                            id="outlined-multiline-static"
                            label="Comment"
                            multiline
                            rows={4}
                            defaultValue={content}
                            onChange={(event) => setContent(event.target.value)}
                            fullWidth
                        />
                        <Button variant="contained" size='small' sx={{marginTop: "1rem"}} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                    )
                    : (<Typography variant="subtitle1" color="text.secondary" component="div" paragraph={true} noWrap={false}>
                        {content}
                    </Typography>)
                }
                </CardContent>
            </Box>
        </Card>
        </>
    )
}

export default Comment;