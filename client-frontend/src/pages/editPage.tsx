import Layout from "./layout";
import { useParams } from "react-router-dom";
import EditPost from "../components/editPost/editPost";

function EditPage() {
    const { postId } = useParams<string>();

    return (
        <Layout>
            <div className="content" style={{overflowY: "scroll"}}>
                <EditPost postId={postId} />
            </div>
        </Layout>
    );
}

export default EditPage;