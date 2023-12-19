import Index from "./pages/index";
import NotFound from "./pages/notFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Index} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
