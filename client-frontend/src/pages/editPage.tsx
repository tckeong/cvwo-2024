import Layout from "./layout";
import { useParams } from "react-router-dom";
import EditThread from "../components/editThread/editThread";

function EditPage() {
    const { thread_id } = useParams<string>();

    return (
        <Layout>
            <div className="content" style={{overflowY: "scroll"}}>
                <EditThread threadID={thread_id} />
            </div>
        </Layout>
    );
}

export default EditPage;