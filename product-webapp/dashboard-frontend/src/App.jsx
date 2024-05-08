import * as React from "react"
import { CssVarsProvider } from "@mui/joy/styles"
import CssBaseline from "@mui/joy/CssBaseline"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Typography from "@mui/joy/Typography"

import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"

// import Sidebar from './components/Sidebar';
import OrderTable from "./components/Dashboard"
import AddRoute from "./components/AddRoute"
import StartAlert from "./components/StartRoute"
import ResponsiveAppBar from "./components/AppAppBar"
import FrontPage from "./components/FrontPage"
import { Route, Routes } from "react-router"
import LandingPage from "./Landing Page/LandingPage"
import { BrowserRouter } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import UserProfile from "./components/UserProfile"
import PrivateRoutes from "./components/AuthService"
import Logout from "./components/Logout"
// import Header from './components/Header';

export default function JoyOrderDashboardTemplate() {

  // const [isModalOpen, setIsModalOpen] = React.useState(false);
  // const handleButtonClick = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <div>
    {/* <ResponsiveAppBar/> */}
    {/* <FrontPage/> */}
    <BrowserRouter>
    <Routes>
      <Route index element={<LandingPage/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<Register/>}/>
      <Route element={<PrivateRoutes/>}>
      <Route path="dashboard" element={<FrontPage/>}/>
      <Route path="user" element={<UserProfile/>}/>
      <Route path="logout" element={<Logout/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<FrontPage />} />
          <Route path="profile" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
    {/* <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: "70px"
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            //height: "100dvh",
            height: '100%',
            gap: 1
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            <Typography level="h2" component="h1">
              SFTP Channels
            </Typography>
            {<AddRoute/>}
          </Box>
          <OrderTable />
        </Box>
        
      </Box>
     
     </CssVarsProvider> */}
    </div>
  )
}
