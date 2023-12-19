import { Link } from "react-router-dom";

function Index() {
    return (
        <>
            <h1>First Page</h1>
            <Link to="/detail">Go to detail page</Link>
        </>
    );
}

export default Index;