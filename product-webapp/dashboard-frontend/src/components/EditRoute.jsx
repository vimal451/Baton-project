import { Button, Box, Typography, Modal, TextField, Input, FormControl, FormLabel, Grid} from '@mui/joy';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup'
 import routeservice from '../service/routeservice';
import './AddRoute.css'
import axios from 'axios';
import { InputLabel } from '@mui/material';

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
const token = localStorage.getItem("token");
const Config = {
  headers: {
    Authorization: `Bearer ${token}`,
    ContentType: "application/json"  
   },
   withCredentials: true
}
const EditRoute = (e) => {
  const [routes, setRoutes] = React.useState({});
  const initialValues = {
    // routeId: routes.routeId,
    localHost: routes.localHost,
    localPort: routes.localPort,
    localUsername: routes.localUsername,
    localPassword: routes.localPassword,
    localDirectory: routes.localDirectory,
    remoteHost: routes.remoteHost,
    remotePort: routes.remotePort,
    remoteUsername: routes.remoteUsername ,
    remotePassword: routes.remotePassword,
    remoteDirectory: routes.remoteDirectory,
    status:routes.status
  };
  
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize:true,
    validationSchema: Yup.object({
      routeId: Yup.string()
                .min(5, 'Must be longer than 5 characters')
                .max(20, 'Must be less than 20 characters'),
      localDirectory: Yup.string()
                        .matches(/^(?!\/|\\).*/, 'Should not start with / or \\ '),
      remoteDirectory: Yup.string()
                        .matches(/^(?!\/|\\).*/, 'Should not start with / or \\ '),

    }),
    onSubmit: (values) => {
        editRoute(values, e.routeId)
      console.log(values)
      //  formik.resetForm()
      handleClose()

    }
  })
  
  const [open, setOpen] = React.useState(e.ModalState);
  const[routeId,setrouteId] = React.useState("");
  const handleClose = () => {setOpen(false); e.onClose()}

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setrouteId(e.routeId);
        console.log(routeId);
        const response = await axios.get(`http://localhost:8080/api/v1/route/${e.routeId}`, Config);
        console.log(response.data);
        setRoutes(response.data)
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };
  
    fetchData(); // Call the async function immediately inside useEffect
  
    // Add dependencies to the dependency array
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
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
           Edit Route - {routes.routeId}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
          <FormControl>
          {/* <Input
            name="routeId"
            id="routeId"
            placeholder="Route ID"
            value={formik.values.routeId}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            required
          /> */}
          {
            formik.touched.routeId && formik.errors.routeId ?
            <span className="error">{formik.errors.routeId}</span> : null
          }
          </FormControl>
          <Grid container spacing={2}>
  {/* Local Settings */}
  <Grid item xs={12} md={6}>
    <FormControl fullWidth>
      <FormLabel>Local Settings</FormLabel>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Local Host</FormLabel>
        <Input
          name="localHost"
          id="localHost"
          placeholder="Local Host"
          value={formik.values.localHost}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          required
        />
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Local Port</FormLabel>
        <Input
          name="localPort"
          id="localPort"
          placeholder="Local Port"
          type="number"
          value={formik.values.localPort}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
        />
      </FormControl>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ mt: 2 }}>
            <FormLabel>Local Username</FormLabel>
            <Input
              name="localUsername"
              placeholder="Local Username"
              value={formik.values.localUsername}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ mt: 2 }}>
            <FormLabel>Local Password</FormLabel>
            <Input
              name="localPassword"
              placeholder="Local Password"
              type="password"
              value={formik.values.localPassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              required
            />
          </FormControl>
        </Grid>
      </Grid>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Local Directory</FormLabel>
        <Input
          name="localDirectory"
          placeholder="Local Directory"
          value={formik.values.localDirectory}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
        />
        {formik.touched.localDirectory && formik.errors.localDirectory ? (
          <span className="error">{formik.errors.localDirectory}</span>
        ) : null}
      </FormControl>
    </FormControl>
  </Grid>

  {/* Remote Settings */}
  <Grid item xs={12} md={6}>
    <FormControl fullWidth>
      <FormLabel>Remote Settings</FormLabel>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Remote Host</FormLabel>
        <Input
          name="remoteHost"
          placeholder="Remote Host"
          value={formik.values.remoteHost}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
          required
        />
      </FormControl>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Remote Port</FormLabel>
        <Input
          name="remotePort"
          placeholder="Remote Port"
          type="number"
          value={formik.values.remotePort}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
        />
      </FormControl>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ mt: 2 }}>
            <FormLabel>Remote Username</FormLabel>
            <Input
              name="remoteUsername"
              placeholder="Remote Username"
              value={formik.values.remoteUsername}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl sx={{ mt: 2 }}>
            <FormLabel>Remote Password</FormLabel>
            <Input
              name="remotePassword"
              placeholder="Remote Password"
              type="password"
              value={formik.values.remotePassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              required
            />
          </FormControl>
        </Grid>
      </Grid>

      <FormControl sx={{ mt: 2 }}>
        <FormLabel>Remote Directory</FormLabel>
        <Input
          name="remoteDirectory"
          placeholder="Remote Directory"
          value={formik.values.remoteDirectory}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          fullWidth
        />
        {formik.touched.remoteDirectory && formik.errors.remoteDirectory ? (
          <span className="error">{formik.errors.remoteDirectory}</span>
        ) : null}
      </FormControl>
    </FormControl>
  </Grid>
</Grid>

<Input
  name="status"
  id="status"
  value={formik.values.status}
  type="hidden"
  style={{ display: 'none' }}
/>
<FormControl>
            <Button type="submit" width="250">
              Submit
            </Button>
          </FormControl>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditRoute;
