import { Typography } from "@mui/material";
import Layout from "./layout";

function NotFound() {
  return (
    <Layout>
      <div className="content" style={{display: "flex", alignContent: "center", justifyContent: "center"}}>
        <Typography variant="h3" component="h2">
          Sorry, the page you find does not exist.
        </Typography>
      </div>
    </Layout>
  );
}

export default NotFound;