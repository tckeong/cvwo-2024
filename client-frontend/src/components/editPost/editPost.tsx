import WritePost from "../addPost/writePost";

interface Props {
    postId: string | undefined;
}

function EditPost(props: Props) {
    const { postId } = props;

    // loading the post data from the server according to the post Id
    
    return (
        <WritePost title="title" content="content" imgLink="imgLink" tagsIndex={[1,3,5]} edit={true} />
    );
}

export default EditPost;