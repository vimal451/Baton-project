// import React, { useState } from 'react'
// // import { editRoute, getRouteById } from '../service/routeservice'
// import routeservice from '../service/routeservice';
// import RouteForm from './RouteForm'
// import { Box, Button, Typography } from '@mui/joy'
// import { FormControl, Grid, Input, Modal } from '@mui/material'

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 600,
//     bgcolor: 'white',
//     //border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//     borderRadius: '16px'
//   };


// const EditRoute = (props) => {
//     const [open, setOpen] = useState(props.showModal)
//     const [route, setRoute] = useState({})

//     const getRoute = async (routeId) => {
//         const response = (await routeservice.getRouteById(routeId)).data
//         setRoute(response)
//     }
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setRoute({ ...route, [name]: value });
//       };
    
//     const handleSubmit = async (event) => {
//         await routeservice.editRoute(routeId, route)
//     }

//     const handleClose = () => {
//         setOpen(false)
//     }
//   return (
//     <div>
//         <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
//             Edit Route
//           </Typography>
//         <form onSubmit={handleSubmit}>
//   <FormControl>
//     <Input
//       name="routeId"
//       placeholder="Route ID"
//       value={route.routeId}
//       onChange={handleChange}
//       fullWidth
//       sx={{ mb: 2 }}
//       readOnly={true}
//     />
//   </FormControl>
//   <FormControl>
//     <Input
//       name="localHost"
//       placeholder="Local Host"
//       value={route.localHost}
//       onChange={handleChange}
//       fullWidth
//       sx={{ mb: 2 }}
//     />
//   </FormControl>
//   <FormControl>
//     <Input
//       name="localPort"
//       placeholder="Local Port"
//       type="number"
//       value={route.localPort}
//       onChange={handleChange}
//       fullWidth
//       sx={{ mb: 2 }}
//     />
//   </FormControl>
//   <Grid container spacing={2}>
//     <Grid item xs={6}>
//       <FormControl>
//         <Input
//           name="localUsername"
//           placeholder="Local Username"
//           value={route.localUsername}
//           onChange={handleChange}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//       </FormControl>
//     </Grid>
//     <Grid item xs={6}>
//       <FormControl>
//         <Input
//           name="localPassword"
//           placeholder="Local Password"
//           type="password"
//           value={route.localPassword}
//           onChange={handleChange}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//       </FormControl>
//     </Grid>
//   </Grid>
//   <FormControl>
//     <Input
//       name="localDirectory"
//       placeholder="Local Directory"
//       value={route.localDirectory}
//       onChange={handleChange}
//       fullWidth
//       sx={{ mb: 2 }}
//     />
//   </FormControl>
//   <FormControl>
//     <Input
//       name="remoteHost"
//       placeholder="Remote Host"
//       value={route.remoteHost}
//       onChange={handleChange}
//       fullWidth
//       sx={{ mb: 2 }}
//     />
//   </FormControl>
//   <FormControl>
//     <Input
//       name="remotePort"
//       placeholder="Remote Port"
//       type="number"
//       value={route.remotePort}
//       onChange={handleChange}
//       fullWidth
//       sx={{ mb: 2 }}
//     />
//   </FormControl>
//   <Grid container spacing={2}>
//     <Grid item xs={6}>
//       <FormControl>
//         <Input
//           name="remoteUsername"
//           placeholder="Remote Username"
//           value={route.remoteUsername}
//           onChange={handleChange}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//       </FormControl>
//     </Grid>
//     <Grid item xs={6}>
//       <FormControl>
//         <Input
//           name="remotePassword"
//           placeholder="Remote Password"
//           type="password"
//           value={route.remotePassword}
//           onChange={handleChange}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//       </FormControl>
//     </Grid>
//   </Grid>
//   <FormControl>
//     <Input
//       name="remoteDirectory"
//       placeholder="Remote Directory"
//       value={route.remoteDirectory}
//       onChange={handleChange}
//       fullWidth
//       sx={{ mb: 2 }}
//     />
//   </FormControl>
//   <FormControl>
//   <Button type="submit" width="250">
//     Submit
//   </Button>
// </FormControl>

//           </form>
//         </Box>
//         </Modal>
//     </div>
//   )
// }

// export default EditRoute