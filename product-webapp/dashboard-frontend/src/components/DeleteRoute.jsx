import { Button, Box, Typography, Modal, TextField, Input, FormControl, FormLabel, Grid} from '@mui/joy';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup'
 import routeservice from '../service/routeservice';
import './AddRoute.css'
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px'
};
const {editRoute} = routeservice;
const Config = {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE0NjI0MzE3fQ.nVLCsu4V1GVS5Q_IUPISrbBr3mtYig1jAI1nm8nRksg",
    ContentType: "application/json"  
   },
   withCredentials: true
}
const DeleteRoute = (e) => {
  const [routes, setRoutes] = React.useState({});
  const [a, sa] = React.useState("ll")
  
  const [open, setOpen] = React.useState(e.ModalState);
  const[routeId,setrouteId] = React.useState("");
  //  const handleOpen = () => setOpen(e.ModalState);
  const handleClose = () => {setOpen(false); e.onClose()}
  const handleAccept = async () => {
    await routeservice.deleteRoute(e.routeId)
    e.onClose();
  }

  React.useEffect(() => {
  },[e.ModalState])


  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Route - {e.routeId}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this route?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" color="danger" onClick={handleAccept}>
              Yes
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteRoute;
