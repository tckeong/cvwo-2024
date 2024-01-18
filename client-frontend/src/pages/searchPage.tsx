import { Box, List, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Post from "../components/index/thread";
import SortedType, {handleClickType} from "../components/index/sortedType";
import Layout from "./layout";
import { useEffect, useState } from "react";
import API_URL from "../api/apiConfig";
import { RootState } from "../components/interact/likeInteract";
import { useSelector } from "react-redux";
import LoadingContent from "../components/loadingContent/loadingContent";

function SearchPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("keywords");
    const keywords: string = query ? query : "";
    const navigate = useNavigate();

    const [result, setResult] = useState<number[][]>([]); 
    const [likes, setLikes] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<handleClickType>("byRating");
    const [reverse, setReverse] = useState<boolean>(false);
    const likeStore = useSelector((state: RootState) => state.like.value);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_URL}search`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keywords: keywords.split(",").map((keyword) => keyword.trim()).join(","),
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setResult(data.value);
                });

                setTimeout(() => setLoading(false), 1500);
            }
        }).catch(err => {
            console.log(err);
        })

        setLikes(likeStore)

    }, [keywords])
    
    return (
        <Layout>
            {   
                (loading)
                ? <LoadingContent />
                : (<Box sx={{backgroundColor: "#fafafa", height: "100%", width: "100%"}} className="content">           
                    <List component="div" aria-label="post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
                        <div 
                        style={{width: "100%", paddingLeft: "2rem", paddingTop: "1rem", display: "flex", flexDirection:"row", justifyContent: "space-between",
                                paddingRight: "3rem"}}>
                        <Typography variant="h6" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "0px"}}>
                            Search Result by {keywords}: {result[0].length} posts
                        </Typography>
                        <SortedType setReverse={setReverse} reverse={reverse} setStatus={setStatus} />
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
            }
        </Layout>
    );
}

export default SearchPage;