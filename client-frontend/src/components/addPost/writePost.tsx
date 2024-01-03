import { Typography, Box, FormControl, ListItemText, OutlinedInput, InputLabel, MenuItem, Checkbox, Divider } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "../css/writePost.css"
import API_URL from "../../api/apiConfig";
import Tags from "../tags/tags";

interface Props {
    title?: string;
    content?: string;
    imgLink?: string;
    tagsIndex?: number[] | undefined;
    edit: boolean;
}

let initState : boolean = true;

function WritePost(props: Props) {
    let { title, content, imgLink, tagsIndex, edit } = props;

    const username = Cookies.get("username") || "";

    let pageTitle = (edit) ? "Edit" : `Create Post as ${username}`;

    const [titleState, setTitleState] = useState<string>(title || "");
    const [contentState, setContentState] = useState<string>(content || "");
    const [imgLinkState, setImgLinkState] = useState<string>(imgLink || "");

    const tagsList = Tags.map((tag) => tag[0]);

    const navigate = useNavigate();

    const [tags, setTags] = useState<string[]>(tagsIndex ? tagsIndex.map((index) => tagsList[index]) : []);

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

            if(tagsIndex) {
                let temp: number = -1;

                for(let i = 0; i < tagsIndex.length; i++) {
                    const index = tagsIndex[i];
                    if (tagsList[index] === tag) {
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
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleState,
                content: contentState,
                img_link: imgLinkState,
                tags: tags.join(",")
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then(_ => {
                    alert("Post successfully created!");
                    navigate("/");
                });
            } else {
                alert("Post failed to create!");
            }
        }).catch(err => {
            console.log(err);
        })
      }


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

export default WritePost;