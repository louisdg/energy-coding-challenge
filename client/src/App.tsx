import { Box } from "@mui/material";
import SideMenu from "./components/SideMenu.tsx";
import MainContent from "./components/MainContent.tsx";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu />
      <MainContent />
    </Box>
  );
}

export default App;
