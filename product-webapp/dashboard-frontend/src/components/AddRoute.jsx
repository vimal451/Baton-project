import { Button, Box, Typography, Modal, TextField, Input, FormControl, FormLabel, Grid} from '@mui/joy';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup'
 import routeservice from '../service/routeservice';
import './AddRoute.css'
import { useNavigate } from 'react-router';

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
const {addRoute} = routeservice;

const AddRoute = (e) => {

  const navigate = useNavigate()
  const [open, setOpen] = React.useState(e.ModalState);
  // const [open, setOpen] = React.useState(true);
  const[routeId,setrouteId] = React.useState("");
  const handleClose = () => {setOpen(false); e.onClose()}
  // const handleOpen = () => setOpen(true);

  const initialValues = {
      routeId: '',
      localHost: '',
      localPort: 22,
      localUsername: '',
      localPassword: '',
      localDirectory: '',
      remoteHost: '',
      remotePort: 22,
      remoteUsername: '',
      remotePassword: '',
      remoteDirectory: '',
      status: 'INACTIVE'
  }
  const formik = useFormik({
    initialValues: initialValues,
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
      // try{
        addRoute(values)
      console.log(values)
       formik.resetForm()
       handleClose();
       navigate("/dashboard")
      // }
      // catch(error)
      // {
        alert(`${error.response.data}`);
      // }
     

    }
  })


  return (
    <div>
         {/* <Button
              // Bcolor="#526D82"
              startDecorator={<AddIcon />}
              size="lg"
              onClick={handleOpen}
              style={{ backgroundColor: "#526D82", color: 'white' }}
            >
              Add Route
              </Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }}>
            Add new Route
          </Typography>
          <form onSubmit={formik.handleSubmit}>
          <FormControl>
          <Input
            name="routeId"
            id="routeId"
            placeholder="Route ID"
            value={formik.values.routeId}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          {
            formik.touched.routeId && formik.errors.routeId ?
            <span className="error">{formik.errors.routeId}</span> : null
          }
          </FormControl>
          <FormControl>
            <Input
              name="localHost"
              id="localHost"
              placeholder="Local Host"
              value={formik.values.localHost}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              sx={{ mb: 2 }}
              required
            />
            </FormControl>
            <FormControl>
            <Input
              name="localPort"
              id="localPort"
              placeholder="Local Port"
              type="number"
              value={formik.values.localPort}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            </FormControl>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                <FormControl>
                <Input
                  name="localUsername"
                  id="localUsername"
                  placeholder="Local Username"
                  value={formik.values.localUsername}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  sx={{ mb: 2 }}
                  required
                />
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                  {/* <InputLabel htmlFor="remotePassword">Remote Password</InputLabel> */}
                  <FormControl>
                  <Input
                    name="localPassword"
                    id="localPassword"
                    placeholder="Local Password"
                    type="password"
                    value={formik.values.localPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  />
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl>
                <Input
                  name="localDirectory"
                  placeholder="Local Directory"
                  value={formik.values.localDirectory}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                {
                  formik.touched.localDirectory && formik.errors.localDirectory ?
                  <span className="error">{formik.errors.localDirectory}</span> : null
                }
                </FormControl>
                <FormControl>
                <Input
                  name="remoteHost"
                  placeholder="Remote Host"
                  value={formik.values.remoteHost}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                />
                </FormControl>
                <FormControl>
                <Input
                  name="remotePort"
                  placeholder="Remote Port"
                  type="number"
                  value={formik.values.remotePort}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                </FormControl>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                <FormControl>
                <Input
                  name="remoteUsername"
                  placeholder="Remote Username"
                  value={formik.values.remoteUsername}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                />
                </FormControl>
                </Grid>
                <Grid item xs={6}>
                  {/* <InputLabel htmlFor="remotePassword">Remote Password</InputLabel> */}
                  <FormControl>
                  <Input
                    name="remotePassword"
                    placeholder="Remote Password"
                    type="password"
                    value={formik.values.remotePassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    required
                  />
                  </FormControl>
                </Grid>
              </Grid>

              <FormControl>
              <Input
                name="remoteDirectory"
                placeholder="Remote Directory"
                value={formik.values.remoteDirectory}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              {
                formik.touched.remoteDirectory && formik.errors.remoteDirectory ?
                <span className="error">{formik.errors.remoteDirectory}</span> : null
              }
              </FormControl>
              <FormControl>
                <Input
                  name="status"
                  id="status"
                  value={formik.values.status}
                  sx={{ mb: 2 }}
                  required
                  type="hidden"
                  style={{ display: 'none' }}
                />
                </FormControl>
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

export default AddRoute;
