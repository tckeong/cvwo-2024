import Index from "./pages/index";
import NotFound from "./pages/notFound";
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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
