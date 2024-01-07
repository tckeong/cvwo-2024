import { useEffect, useState } from "react";
import { PostType } from "../index/post";
import API_URL from "../../api/apiConfig";
import { Box, Typography, Divider, InputLabel, MenuItem, Checkbox, ListItemText, OutlinedInput, FormControl } from "@mui/material";
import { Form, Button } from "react-bootstrap";
import {TagsLabel} from "../tags/tags";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from "react-router-dom";

interface Props {
    postId: string | undefined;
}

let initState: boolean = true;

function EditPost(props: Props) {
    const { postId } = props;
    const [content, setContent] = useState<PostType | undefined>(undefined);
    const pageTitle = "Edit Post";

    const [titleState, setTitleState] = useState<string>("");
    const [contentState, setContentState] = useState<string>("");
    const [imgLinkState, setImgLinkState] = useState<string>("");

    const tagsList = TagsLabel;

    const navigate = useNavigate();

    const [tags, setTags] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof tags>) => {
        const { target: { value } } = event;
        if(typeof value === 'string') {
            if(value.split(",").length > 3) {
                alert("You can only select up to 3 tags");
                return ;
            }
        } else {
            if(value.length > 3) {
                alert("You can only select up to 3 tags");
                return ;
            }
        }

        setTags(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const tagsCheck = (tag: string) : boolean => {
            if(!initState) {
                return false;
            }

            if(tags) {
                let temp: number = -1;

                for(let i = 0; i < tags.length; i++) {
                    const index = tagsList.indexOf(tags[i]);
                    if (tags[index] === tag) {
                        temp = index;
                        break;
                    }
                }

                if(tagsList.indexOf(tag) === tagsList.length - 1) {
                    initState = false;
                }

                return temp !== -1;
            }
            return false;
      }

    const handleSubmit = () => {
        fetch(`${API_URL}thread`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                post_id: parseInt(postId ? postId : "-1", 10),
                title: titleState,
                content: contentState,
                img_link: imgLinkState,
                tags: tags.join(",")
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then(_ => {
                    alert("Post successfully updated!");
                    navigate("/");
                });
            } else {
                alert("Post failed to update!");
            }
        }).catch(err => {
            console.log(err);
        })
    }


    // loading the post data from the server according to the post Id
    useEffect(() => {
        fetch(`${API_URL}thread/${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setContent(data.value);
                    setTitleState(data.value.title);
                    setContentState(data.value.content);
                    setImgLinkState(data.value.imgLink);
                    setTags(data.value.tags.split(","));
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }, [postId]);

    return (
        <div className="content" style={{overflowY: "scroll"}}>
            <Typography component="div" variant="h6" sx={{padding: "1rem", paddingBottom: "0.5rem", paddingLeft: "1.5rem"}}>{pageTitle}</Typography>
            <Divider />
            <Form style={{padding: "1.5rem", paddingTop: "0.5rem"}}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label style={{marginLeft: "0.5rem"}}>Title</Form.Label>
                    <Form.Control as="textarea" placeholder="Title" value={titleState} onChange={(e) => setTitleState(e.target.value)} required rows={1} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label style={{marginLeft: "0.5rem"}}>Content</Form.Label>
                    <Form.Control as="textarea" placeholder="Content" value={contentState} onChange={(e) => setContentState(e.target.value)} rows={4} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label style={{marginLeft: "0.5rem"}}>Img Link</Form.Label>
                    <Form.Control type="url" placeholder="link" value={imgLinkState} onChange={(e) => setImgLinkState(e.target.value)} />
                </Form.Group>
                <Box className="tags-btn-container">
                    <FormControl sx={{ width: "100%", height: "100%" }} className="tags-checkbox">
                        <InputLabel>Tags</InputLabel>
                        <Select
                            labelId="tag-checkbox-label"
                            id="tag-checkbox"
                            multiple
                            value={tags}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                        {tagsList.map((tag) => (
                            <MenuItem key={tag} value={tag}>
                            <Checkbox checked={tags.indexOf(tag) > -1 || tagsCheck(tag)} />
                            <ListItemText primary={tag} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <Button variant="primary" type="reset" onClick={handleSubmit} className="submit-btn"
                            style={{width: "80%", height: "80%", alignSelf: "center", justifySelf: "center"}} >
                        Submit
                    </Button>
                </Box>
            </Form>
        </div>
    );
}

export default EditPost;