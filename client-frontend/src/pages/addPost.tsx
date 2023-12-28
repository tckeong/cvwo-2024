import Layout from "./layout";
import WritePost from "../components/addPost/writePost";

function AddPost() {
    return (
        <Layout>
            <WritePost edit={false} />
        </Layout>
    );
}

export default AddPost;