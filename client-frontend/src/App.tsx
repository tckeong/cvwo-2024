import Index from "./pages/index";
import NotFound from "./pages/notFound";
import ThreadPage from "./pages/threadPage";
import AddThread from "./pages/addThread";
import MyThreads from "./pages/myThreads";
import EditPage from "./pages/editPage";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import SearchPage from "./pages/searchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SubmitLikes, reset } from "./components/interact/likeInteract";
import { useEffect } from "react";
import Cookies from "js-cookie";
import API_URL from "./api/apiConfig";

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
      await fetch(`${API_URL}logout/${Cookies.get("Authorization")}`, 
      {
        credentials: "include",
      });

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
          <Route path="/thread/:thread_id" Component={ThreadPage} />
          <Route path="/addThread" Component={AddThread} />
          <Route path="/myThreads" Component={MyThreads} />
          <Route path="/edit/:thread_id" Component={EditPage} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/search" Component={SearchPage} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
