
import * as React from "react";
  import AspectRatio from "@mui/joy/AspectRatio";
  import Box from "@mui/joy/Box";
  import Button from "@mui/joy/Button";
  import Divider from "@mui/joy/Divider";
  import FormControl from "@mui/joy/FormControl";
  import FormLabel from "@mui/joy/FormLabel";
  import FormHelperText from "@mui/joy/FormHelperText";
  import Input from "@mui/joy/Input";
  import IconButton from "@mui/joy/IconButton";
  import Textarea from "@mui/joy/Textarea";
  import Stack from "@mui/joy/Stack";
  import Select from "@mui/joy/Select";
  import Option from "@mui/joy/Option";
  import Typography from "@mui/joy/Typography";
  import Tabs from "@mui/joy/Tabs";
  import TabList from "@mui/joy/TabList";
  import Tab, { tabClasses } from "@mui/joy/Tab";
  import Breadcrumbs from "@mui/joy/Breadcrumbs";
  import Card from "@mui/joy/Card";
  import CardActions from "@mui/joy/CardActions";
  import CardOverflow from "@mui/joy/CardOverflow";
  import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
  import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
  import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
  import EditRoundedIcon from "@mui/icons-material/EditRounded";
  import UserImage from "../images/usericon.jpeg";
  import Dialog from "@mui/material/Dialog";
  import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { LocalActivity } from "@mui/icons-material";
import ResponsiveAppBar from "./AppAppBar";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from 'yup';

  export default function UserProfile() {
    const [isEditable, setIsEditable] = React.useState(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false);
    const [newPassword, setNewPassword] = React.useState("");
    const [currentPassword, setCurrentPassword] = React.useState("");
    const [datapwd, setDataPwd] = React.useState("");
    const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
    const [mobileNumber, setMobileNumber] = React.useState("");

    // const[refresh, setRefresh] = React.useState(true)

    const email= localStorage.getItem("emailId")

    const [user, setUser] = React.useState({})

    const initialValues = {
      userName: `${user.userName}`,
      emailId: `${user.emailId}`,
      mobileNumber: `${user.mobileNumber}`,
      password:`${user.password}`,
      location:`${user.location}`
    };
    // const pwdInitialValues = {
    //   userName: `${user.userName}`,
    //   emailId: `${user.emailId}`,
    //   mobileNumber: `${user.mobileNumber}`,
    //   password:`${user.password}`,
    //   location:`${user.location}`,
    // };

    const handleEditClick = (e) => {
      e.preventDefault();
      setIsEditable(true);
    };
    // const handleSaveClick = () => {
    //   // Save the changes here
    //   setIsEditable(false);
    // };
    const handlePasswordDialogClose = () => {
      setIsPasswordDialogOpen(false);
    };
    const handlePasswordChange = (event) => {
      const inputValue = event.target.value;
      setNewPassword(inputValue);
    };
    const handleConfirmNewPasswordChange = (event) => {
      const inputValue = event.target.value;
      setConfirmNewPassword(inputValue);
    };
    const handleMobileNumberChange = (event) => {
      const inputValue = event.target.value;
      // Ensure only numeric values are set
      setMobileNumber(inputValue.replace(/\D/, ""));
    };
    // const response= axios.get("http://localhost:8095/user-service/users");
    // response.then(res =>{console.log(res)})
    // localStorage.setItem("token",response.data.token)
    // localStorage.setItem("emailId",response.data.emailID)
    //Axios


    
React.useEffect(()=>{
  const getData= async () => {
    try{
    // const result= await axios.get("http://localhost:8095/user-service/users/{$email}");
    const result = await axios.get(`http://localhost:8095/user-service/users/${email}`);
  
    // console.log(JSON.stringify(result.data));
    setUser(result.data)
    setDataPwd(result.data.password)
    }
    catch(error)
    {
      console.log(error.message + "  he---");
    }
  };
  getData();

});

// const [initialValues,setInitialValues] = React.useState({})
const formik = useFormik({
initialValues: initialValues,
enableReinitialize:true,
validationSchema: Yup.object({
  userName: Yup.string()
    .required('Username is required'),
    mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid mobile number')
    .required('Mobile number is required'),
}),
onSubmit: (values) => {
  // setRefresh(!refresh)
  setIsEditable(false);
  // console.log("in put" + JSON.stringify(values))
    postData(values)
   formik.resetForm()
}
})
const pwdFormik = useFormik({
  initialValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' },
  enableReinitialize:true,
validationSchema: Yup.object({
  currentPassword: Yup.string()
                   .test('check-current-password', `Current password is incorrect`, (value) => {
                       return value === datapwd;
                   })
                   .required('Current password is required'),
  newPassword: Yup.string()
                .min(8, 'New password must be at least 8 characters')
                .max(20, 'New password must be less than 20 characters')
                .matches(/[a-z]/, 'New password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'New password must contain at least one uppercase letter')
  .matches(/\d/, 'New password must contain at least one number')
  .matches(/[@$!%*?&]/, 'New password must contain at least one special character')
                .required('New password is required'),
  confirmNewPassword: Yup.string()
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                        .required('Confirm new password is required')
}),
  onSubmit: (values) => {
    // setRefresh(!refresh)
    console.log("in put" + JSON.stringify(values))
      // postData(values)
       console.log("check")
    console.log(values)
    //  formik.resetForm()
    setUser(user.password=values.newPassword)
    postData(user)
    alert("Succesfully Changed")
  }
  })


// const getData= async () => {
//   try{
//   // const result= await axios.get("http://localhost:8095/user-service/users/{$email}");
//   const result = await axios.get(`http://localhost:8095/user-service/users/${email}`);

//   console.log(JSON.stringify(result.data));
//   setUser(result.data)
//   }
//   catch(error)
//   {
//     console.log(error.message + "  he---");
//   }
// }

const postData= async (data) => {
  try{
    console.log(data+"hello")
    await axios.put(`http://localhost:8095/user-service/users/${email}`,data)
  }
  catch(error)
  {
    console.log("Can't Update")
  }
}


    return (
      <div>
        <ResponsiveAppBar/>
      <Box sx={{ flex: 1, height: "100vh", width: "100%", backgroundColor: "#DDE6ED", marginTop:"60px",position:"fixed"}}>
        <Box
          sx={{
            position: "sticky",
            top: { sm: -100, md: -110 },
            bgcolor: "background.body",
            backgroundColor: "#DDE6ED",
            zIndex: 9995,
            border: "none",
          }}
        >
        </Box>
        <Stack
          spacing={4}
          sx={{
            display: "flex",
            maxWidth: "700px",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
        <Box sx={{ width: '50%', maxWidth: 300 }}>
        <Typography variant="h1" sx={{ fontSize: "36px", fontWeight: "bold", color: "#000000" }} gutterBottom>
    My Profile
  </Typography>
          </Box>
          <Card sx={{ bgcolor: "#F0F0F0" }}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: 1 }}>
              <Typography level="title-md" variant="h5" fontWeight="Bold" color="#000000">
                Personal Info
  </Typography>
            </Box>
            <Divider />
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
            >
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={200}
                  sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
                >
                  <img src={UserImage} />
                </AspectRatio>
              </Stack>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  
                  <FormLabel sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    Username
                  </FormLabel>
                  <FormControl
                    // sx={{
                    //   display:"flex",
                    //   flexDirection:"row",
                    //   gap: 2,
                    //   alignItems:"center"
                    // }}
                  >
                    <Input
                      size="sm"
                      placeholder="Username"
                      id="userName"
                      name="userName"
                      disabled={!isEditable}
                      // value={localStorage.getItem("emailId")}
                      value={formik.values.userName}
                      sx={{ width: "510px" }}
                      onChange={formik.handleChange}
            
                    />
                       {
                  formik.touched.userName && formik.errors.userName ?
                  <span className="error">{formik.errors.userName }</span> : null
                }
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Email
                    </FormLabel>
                    <Input
                      size="sm"
                      type="email"
                      id="emailId"
                      name="emailId"
                      placeholder="Email"
                      //value={JSON.parse(localStorage.getItem("user")).emailId}
                      value={formik.values.emailId}
                      sx={{ flexGrow: 1 ,width:"510px"}}
                      disabled
                    />
                       {
                  formik.touched.emailId && formik.errors.emailId ?
                  <span className="error">{formik.errors.emailId }</span> : null
                }
                  </FormControl>
                </Stack>
                <div>
                  <FormControl sx={{ display: { sm: "contents" } }}>
                    <FormLabel sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Mobile Number
                    </FormLabel>
                    <Input
                      size="sm"s
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      placeholder="Mobile number"
                      sx={{width:"510px"}}
                      disabled={!isEditable}
                      value={formik.values.mobileNumber}
                      onChange={formik.handleChange}
                    />
                  </FormControl>
                  {
                  formik.touched.mobileNumber && formik.errors.mobileNumber ?
                  <span className="error">{formik.errors.mobileNumber }</span> : null
                }
                </div>
                
              </Stack>
              
            </Stack>

{/* //Buttons  - Save and Edit */}
            <CardOverflow sx={{ borderTop: "1px solid", borderColor: "transparent" }}>
              <CardActions sx={{ alignSelf: "flex-end", pt: 2}}>
                {isEditable ? (
                  <Button size="sm" variant="solid" type="submit" style={{ backgroundColor: "#526D82", color: 'white' }}>
                    Save
                  </Button>
                ) : (
                  <Button size="sm" variant="solid" onClick={handleEditClick} type="button" style={{ backgroundColor: "#526D82", color: 'white' }}>
                    Edit
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="solid"
                  onClick={() => setIsPasswordDialogOpen(true)}
                  style={{ backgroundColor: "#526D82", color: 'white' }}
                >
                  Change Password
                </Button>
              </CardActions>
            </CardOverflow>
            </form>
          </Card>
        </Stack>


<Box sx={{width:"6000px"}}>
        <Dialog
          open={isPasswordDialogOpen}
          onClose={handlePasswordDialogClose}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            bgcolor: "background.body",
            borderRadius: "sm",
             boxShadow: "md",
             backdropFilter:"blur(1px)",
            display: "flex",
            flexDirection: "column"
          }}
        >
         <form onSubmit={pwdFormik.handleSubmit}>
  <DialogActions>
    <Typography level="h4" component="h2" align="left">Update Password
    </Typography>
  </DialogActions>
  <Divider />
  <Stack spacing={2} sx={{ p: 2, flexGrow: 1 }}>
  
    <FormControl>
      <FormLabel>Enter current password</FormLabel>
      <Input
        type="password"
        name="currentPassword"
        value={pwdFormik.values.currentPassword}
        onChange={pwdFormik.handleChange}
      />
      {/* <ErrorMessage name="currentPassword" component="div" className="error" /> */}
      {
                  pwdFormik.touched.currentPassword && pwdFormik.errors.currentPassword ?
                  <span className="error">{pwdFormik.errors.currentPassword }</span> : null
                }
    </FormControl>
    <FormControl>
      <FormLabel>Enter new password</FormLabel>
      <Input
        type="password"
        name="newPassword"
        value={pwdFormik.values.newPassword}
        onChange={pwdFormik.handleChange}
      />
       {
                  pwdFormik.touched.newPassword && pwdFormik.errors.newPassword ?
                  <span className="error">{pwdFormik.errors.newPassword }</span> : null
                }
      {/* <ErrorMessage name="newPassword" component="div" className="error" /> */}
    </FormControl>
    <FormControl>
      <FormLabel>Confirm password</FormLabel>
      <Input
        type="password"
        name="confirmNewPassword"
        value={pwdFormik.values.confirmNewPassword}
        onChange={pwdFormik.handleChange}
      />
       {
                  pwdFormik.touched.confirmNewPassword && pwdFormik.errors.confirmNewPassword ?
                  <span className="error">{pwdFormik.errors.confirmNewPassword }</span> : null
                }
      {/* <ErrorMessage name="confirmPassword" component="div" className="error" /> */}
    </FormControl>
    
  </Stack>
  <DialogActions>
    <FormControl>
      <Button size="sm" variant="solid" type="submit" style={{ backgroundColor: "#526D82", color: 'white' }}>
        Save
      </Button>
    </FormControl>
  </DialogActions>
</form>
<div className="error" class="error"></div>

        </Dialog>
        </Box>
      </Box>
      </div>
    );
  }