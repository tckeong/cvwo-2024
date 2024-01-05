import Post from './post';
import { Box, Typography } from "@mui/material";
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import SortedType from './sortedType';
import { useEffect, useState, useReducer } from 'react';
import API_URL from '../../api/apiConfig';
import Cookies from 'js-cookie';

interface Action {
    type: 'like' | 'unlike';
    payload: {
        index: number;  
    }
}

export const reducer = (state: number[], action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case "like": {
            if (state.find(id => id === payload.index) !== undefined) return state;

            const newState = [...state, payload.index];
            localStorage.setItem("likes", JSON.stringify(newState));
            return newState;
        }
        case "unlike": {
            const newState = state.filter(id => id !== payload.index);
            localStorage.setItem("likes", JSON.stringify(newState));
            return newState;
        }
        default:
            return state;
    }
}

function PostList() {
    const navigate = useNavigate();
    const userID = Cookies.get("userId");

    const [result, setResult] = useState<number[]>([]);
    const [likes, setLikes] = useState<number[]>([]);
    const [_, dispatch] = useReducer(reducer, []);

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

        if(userID !== undefined) {
            fetch(`${API_URL}like/${userID}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        if(data.value === null) return;

                        setLikes(data.value);
                        for (let i = 0; i < data.value.length; i++) {
                            dispatch({type: "like", payload: {index: data.value[i]}});
                        }
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        }

        return () => {
            if(userID === undefined) return;

            const likeStore = localStorage.getItem("likes");
            const likes = likeStore?.substring(1, likeStore.length - 1).split(",")
                                    .map(id => parseInt(id))
                                    .filter(id => id !== undefined && id !== null && !isNaN(id));

            localStorage.removeItem("likes");

            if(likes === undefined) return;
            
            fetch(`${API_URL}like`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    likes: likes
                })
            })
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
              <SortedType />
            </div>
            {
                (result.length === 0) 
                ?( <Typography variant="h4" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                        no posts found
                    </Typography>)
                : result.map((index) => {
                    return <Post key={index} index={index} dispatch={dispatch}
                            handleClick={(index) => navigate("/post/" + index)} liked={likes.find(id => id === index) === index} />
                })
            }
        </List>
      </Box>
    );
}

export default PostList;