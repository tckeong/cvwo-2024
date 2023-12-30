import Index from "./pages/index";
import NotFound from "./pages/notFound";
import PostPage from "./pages/postPage";
import AddPost from "./pages/addPost";
import MyPosts from "./pages/myPosts";
import EditPage from "./pages/editPage";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import SearchPage from "./pages/searchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Index} />
          <Route path="*" Component={NotFound} />
          <Route path="/post/:postId" Component={PostPage} />
          <Route path="/addPost" Component={AddPost} />
          <Route path="/myPosts" Component={MyPosts} />
          <Route path="/edit/:postId" Component={EditPage} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/search/:keywords" Component={SearchPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
