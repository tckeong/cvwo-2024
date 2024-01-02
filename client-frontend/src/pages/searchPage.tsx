import { Box, List, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Post from "../components/index/post";
import SortedType from "../components/index/sortedType";
import Layout from "./layout";
import { useEffect, useState } from "react";
import API_URL from "../api/apiConfig";

function SearchPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("keywords");
    const keywords: string = query ? query : "";
    const navigate = useNavigate();

    const [result, setResult] = useState<number[] | undefined>(undefined); 

    useEffect(() => {
        fetch(`${API_URL}search`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keywords: keywords
            }),
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    setResult(data.value);
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }, [keywords])
    
    return (
        <Layout>
            <Box sx={{backgroundColor: "#fafafa", height: "100%", width: "100%"}} className="content">           
                <List component="div" aria-label="post-list" sx={{height: "100%", width: "100%", overflowY: "scroll"}}>
                    <div 
                    style={{width: "100%", paddingLeft: "2rem", paddingTop: "1rem", display: "flex", flexDirection:"row", justifyContent: "space-between",
                            paddingRight: "3rem"}}>
                    <Typography variant="h6" component="div" sx={{fontWeight: "bold", alignSelf: "center", margin: "0px"}}>
                        Search Result by {keywords}: {result?.length} posts
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
        </Layout>
    );
}

export default SearchPage;