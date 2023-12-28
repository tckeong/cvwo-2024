import { Typography, Box, FormControl, ListItemText, OutlinedInput, InputLabel, MenuItem, Checkbox, Divider } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

import "../css/writePost.css"

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

let tagsIndexCheck: number[] | undefined = undefined;

interface Props {
    title?: string;
    content?: string;
    imgLink?: string;
    tagsIndex?: number[] | undefined;
    edit: boolean;
}

function WritePost(props: Props) {
    let { title, content, imgLink, tagsIndex, edit } = props;
    let pageTitle = "Edit";

    useEffect(() => {
        tagsIndexCheck = tagsIndex;
        console.log(tagsIndexCheck);
    }, []);

    if(!edit) {
        title = "";
        content = "";
        imgLink = "";
        pageTitle = "Create Post as username";
    }

    const tagsList = names;

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
            console.log(tagsIndexCheck);
            if(tagsIndexCheck) {
                let temp: number = -1;

                for(let i = 0; i < tagsIndexCheck.length; i++) {
                    const index = tagsIndexCheck[i];
                    if (tagsList[index] === tag) {
                        temp = index;
                        setTags([tag, ...tags]);
                        break;
                    }
                }

                tagsIndexCheck = tagsIndexCheck.filter((index) => index !== temp);
                
                if(tagsIndexCheck.length === 0) {
                    tagsIndexCheck = undefined;
                }

                return temp !== -1;
            }
            return false;
      }


    return (
        <div className="content" style={{overflowY: "scroll"}}>
            <Typography component="div" variant="h6" sx={{padding: "1rem", paddingBottom: "0.5rem", paddingLeft: "1.5rem"}}>{pageTitle}</Typography>
            <Divider />
            <Form style={{padding: "1.5rem", paddingTop: "0.5rem"}}>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label style={{marginLeft: "0.5rem"}}>Title</Form.Label>
                    <Form.Control as="textarea" placeholder="Title" value={title} onChange={(e) => title = e.target.value} required rows={1} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label style={{marginLeft: "0.5rem"}}>Content</Form.Label>
                    <Form.Control as="textarea" placeholder="Content" value={content} onChange={(e) => content = e.target.value} rows={4} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label style={{marginLeft: "0.5rem"}}>Img Link</Form.Label>
                    <Form.Control type="url" placeholder="link" value={imgLink} onChange={(e) => imgLink = e.target.value} />
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
                    <Button variant="primary" type="reset" onClick={() => alert(title + " " + content + " " + imgLink + " " + tags)} className="submit-btn"
                            style={{width: "80%", height: "80%", alignSelf: "center", justifySelf: "center"}} >
                        Submit
                    </Button>
                </Box>
            </Form>
        </div>
    );
}

export default WritePost;