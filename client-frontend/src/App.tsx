import Index from "./pages/index";
import NotFound from "./pages/notFound";
import PostPage from "./pages/postPage";
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
