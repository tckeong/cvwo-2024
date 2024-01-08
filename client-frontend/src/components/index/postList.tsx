import Post from './post';
import { Box, Typography } from "@mui/material";
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import SortedType from './sortedType';
import { useEffect, useState } from 'react';
import API_URL from '../../api/apiConfig';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { RootState, like } from '../interact/likeInteract';
import { useSelector } from 'react-redux';

function PostList() {
    const navigate = useNavigate();
    const userID = Cookies.get("userId");

    const [result, setResult] = useState<number[]>([]);
    const [likes, setLikes] = useState<number[]>([]);
    const dispatch = useDispatch();
    const likeStore = useSelector((state: RootState) => state.like.value);

    useEffect(() => {
        fetch(`${API_URL}all`)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setResult(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })

        if(userID !== undefined && likeStore.length === 0) {
            fetch(`${API_URL}like/${userID}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        const value = data.value;

                        if(value === null) return;

                        setLikes(value);
                        for (let i = 0; i < value.length; i++) {
                            dispatch(like( {index: value[i]}));
                        }
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            setLikes(likeStore);
        }
    }, [userID])

    return (
      <Box sx={{backgroundColor: "#fafafa", height: "100%", width: "100%"}} className="content" >
        <List component="div" aria-label="post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
            <div 
              style={{width: "100%", paddingLeft: "2rem", paddingTop: "1rem", display: "flex", flexDirection:"row", justifyContent: "space-between",
                      paddingRight: "3rem"}}>
              <Typography variant="h6" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "0px"}}>
                have { result.length } posts
              </Typography>
              {/* <SortedType /> */}
            </div>
            {
                (result.length === 0) 
                ?( <Typography variant="h4" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                        no posts found
                    </Typography>)
                : result.map((index) => {
                    return <Post key={index} index={index}
                            handleClick={(index) => navigate("/post/" + index)} liked={likes.find(id => id === index) === index} />
                })
            }
        </List>
      </Box>
    );
}

export default PostList;