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
import UserImage from "./Images/usericon.jpeg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

export default function MyProfile() {
  const [isEditable, setIsEditable] = React.useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    // Save the changes here
    setIsEditable(false);
  };

  const handlePasswordDialogClose = () => {
    setIsPasswordDialogOpen(false);
  };

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    setNewPassword(inputValue);
  };

  const handleConfirmPasswordChange = (event) => {
    const inputValue = event.target.value;
    setConfirmPassword(inputValue);
  };

  return (
    <Box sx={{ flex: 1, height: "100vh", width: "100%", backgroundColor: "#DDE6ED" }}>
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
        <Box sx={{ px: { xs: 2, md: 6 } }} border="none">
          <Typography level="h1" component="h1" sx={{ mt: 0, mb: 0 }}>
            My Profile
          </Typography>
        </Box>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card sx={{ bgcolor: "#f0f0f0" }}>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md" variant="h5" fontWeight="Bold">
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
                  Name
                </FormLabel>
                <FormControl
                  sx={{
                    display: { sm: "flex-column", md: "flex-row" },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    placeholder="First name"
                    disabled={!isEditable}
                  />
                  <Input
                    size="sm"
                    placeholder="Last name"
                    sx={{ flexGrow: 1 }}
                    disabled={!isEditable}
                  />
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
                    placeholder="email"
                    sx={{ flexGrow: 1 }}
                    disabled={!isEditable}
                  />
                </FormControl>
              </Stack>
              <div>
                <FormControl sx={{ display: { sm: "contents" } }}>
                  <FormLabel sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    Phone Number
                  </FormLabel>
                  <Input
                    size="sm"
                    type="text"
                    placeholder="phone number"
                    disabled={!isEditable}
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                </FormControl>
              </div>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                >
                  <img src={UserImage} />
                </AspectRatio>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    placeholder="First name"
                    disabled={!isEditable}
                  />
                  <Input
                    size="sm"
                    placeholder="Last name"
                    sx={{ flexGrow: 1 }}
                    disabled={!isEditable}
                  />
                </FormControl>
              </Stack>
            </Stack>
         </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "transparent" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2}}>
              {isEditable ? (
                <Button size="sm" variant="solid" onClick={handleSaveClick}>
                  Save
                </Button>
              ) : (
                <Button size="sm" variant="solid" onClick={handleEditClick}>
                  Edit
                </Button>
              )}
              <Button
                size="sm"
                variant="solid"
                onClick={() => setIsPasswordDialogOpen(true)}
              >
                Change Password
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
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
          p: 3,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <DialogActions>
          <Typography level="h2" component="h2">
            Update Password
          </Typography>
        </DialogActions>
        <Divider />
        <Stack spacing={2} sx={{ p: 2, flexGrow: 1 }}>
          <FormControl>
            <FormLabel>Enter new password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </FormControl>
        </Stack>
        <DialogActions>
          <Button size="sm" variant="solid" onClick={handlePasswordDialogClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}