import Layout from "./layout";
import WritePost from "../components/addPost/writePost";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddPost() {
    const navigate = useNavigate();

    const loginState = Cookies.get("Authorization") !== undefined;
    const alertShownRef = useRef(false);

    useEffect(() => {
        if (!loginState && !alertShownRef.current) {
            alert("Please login first!");
            navigate("/login");
            alertShownRef.current = true;
        }
    }, [loginState]);

    return (
        <Layout>
            <WritePost edit={false} />
        </Layout>
    );
}

export default AddPost;