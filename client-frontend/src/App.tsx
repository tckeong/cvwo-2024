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
import { useDispatch } from "react-redux";
import { SubmitLikes, reset } from "./components/interact/likeInteract";
import { useEffect } from "react";
import Cookies from "js-cookie";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = async (event: any) => {
      // Perform cleanup or execute actions before the app is closed
      // For example, you can save data, send a request, or show a confirmation dialog
      event.preventDefault();
      const userID = Cookies.get("userId");
      if(userID === undefined) return;

      await SubmitLikes(() => dispatch(reset()));

      Cookies.remove("Authorization");
      Cookies.remove("username");
      Cookies.remove("userId");
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


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
          <Route path="/search" Component={SearchPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
