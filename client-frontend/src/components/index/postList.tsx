import Post from './post';
import { Box, Typography } from "@mui/material";
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import SortedType from './sortedType';
import { useEffect, useState } from 'react';
import API_URL from '../../api/apiConfig';

function PostList() {
    const navigate = useNavigate();

    const [result, setResult] = useState<number[] | undefined>(undefined); 

    useEffect(() => {
        fetch(`${API_URL}all`, {
            method: "GET",
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setResult(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    console.log(result);

    return (
      <Box sx={{backgroundColor: "#fafafa", height: "100%", width: "100%"}} className="content" >
        <List component="div" aria-label="post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
            <div 
              style={{width: "100%", paddingLeft: "2rem", paddingTop: "1rem", display: "flex", flexDirection:"row", justifyContent: "space-between",
                      paddingRight: "3rem"}}>
              <Typography variant="h6" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "0px"}}>
                have 7 posts
              </Typography>
              <SortedType />
            </div>
            {
                (result === undefined || result.length === 0) 
                ?( <Typography variant="h4" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                        no posts found
                    </Typography>)
                : result.map((index) => {
                    return <Post index={index} handleClick={(index) => navigate("/post/" + index)} />
                })
            }
        </List>
      </Box>
    );
}

export default PostList;