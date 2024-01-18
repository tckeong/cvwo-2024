import Post from './thread';
import { Box, Typography } from "@mui/material";
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';
import SortedType, {handleClickType} from './sortedType';
import { useEffect, useState } from 'react';
import API_URL from '../../api/apiConfig';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { RootState, like } from '../interact/likeInteract';
import { useSelector } from 'react-redux';
import LoadingContent from '../loadingContent/loadingContent';

function ThreadList() {
    const navigate = useNavigate();
    const userID = Cookies.get("userId");
    const dispatch = useDispatch();

    const [result, setResult] = useState<number[][]>([]);
    const [likes, setLikes] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<handleClickType>("byRating");
    const [reverse, setReverse] = useState<boolean>(false);
    const likeStore = useSelector((state: RootState) => state.like.value);

    useEffect(() => {
        fetch(`${API_URL}all`)
        .then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setResult(data.value);
                });

                setTimeout(() => setLoading(false), 1500);
            }
        }).catch(err => {
            console.log(err);
        })

        /**
         * fetch the likes data from the server
         * if the user is logged in and the likeStore is empty
         * and set the like to the redux store
         */
        if(userID !== undefined && likeStore.length === 0) {           
            fetch(`${API_URL}like/${Cookies.get("Authorization")}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            })
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
        (loading)
        ? <LoadingContent />
        : (<Box sx={{backgroundColor: "#fafafa", height: "100%", width: "100%"}} className="content" >
            <List component="div" aria-label="post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
                <div 
                style={{width: "100%", paddingLeft: "2rem", paddingTop: "1rem", display: "flex", flexDirection:"row", justifyContent: "space-between",
                        paddingRight: "3rem"}}>
                <Typography variant="h6" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "0px"}}>
                    have { result[0].length } posts
                </Typography>
                <SortedType setStatus={setStatus} setReverse={setReverse} reverse={reverse} />
                </div>
                {
                    (result[0].length === 0) 
                    ?( <Typography variant="h4" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "2rem", marginLeft: "3rem"}}>
                            no posts found
                        </Typography>)
                    : (
                        (status === "byDate")
                        ? ((reverse)
                            ?(result[0].slice().reverse().map((index) => {
                                return <Post key={index} index={index}
                                        handleClick={(index) => navigate("/thread/" + index)} liked={likes.find(id => id === index) === index} />
                            }))
                            : (result[0].map((index) => {
                                return <Post key={index} index={index}
                                        handleClick={(index) => navigate("/thread/" + index)} liked={likes.find(id => id === index) === index} />
                            })))
                        : ((reverse)
                            ?(result[1].slice().reverse().map((index) => {
                                return <Post key={index} index={index}
                                        handleClick={(index) => navigate("/thread/" + index)} liked={likes.find(id => id === index) === index} />
                            }))
                            : (result[1].map((index) => {
                                return <Post key={index} index={index}
                                        handleClick={(index) => navigate("/thread/" + index)} liked={likes.find(id => id === index) === index} />
                            })))
                    )
                }
            </List>
        </Box>)
    );
}

export default ThreadList;