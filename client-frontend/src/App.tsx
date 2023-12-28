import Index from "./pages/index";
import NotFound from "./pages/notFound";
import PostPage from "./pages/postPage";
import AddPost from "./pages/addPost";
import MyPosts from "./pages/myPosts";
import EditPage from "./pages/editPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Test from "./pages/test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Index} />
          <Route path="*" Component={NotFound} />
          <Route path="/test" Component={Test} />
          <Route path="/post/:postId" Component={PostPage} />
          <Route path="/addPost" Component={AddPost} />
          <Route path="/myPosts" Component={MyPosts} />
          <Route path="/edit/:postId" Component={EditPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
