// import React from 'react'

// const RouteForm = ({route}) => {
//   return (
//     <div>
//         <form onSubmit={handleSubmit}>
//           <FormControl>
//           <Input
//             name="routeId"
//             placeholder="Route ID"
//             value={route.routeId}
//             onChange={handleChange}
//             fullWidth
//             sx={{ mb: 2 }}
//           />
//             <Input
//               name="localHost"
//               placeholder="Local Host"
//               value={route.localHost}
//               onChange={handleChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <Input
//               name="localPort"
//               placeholder="Local Port"
//               type="number"
//               value={route.localPort}
//               onChange={handleChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                 <Input
//                   name="localUsername"
//                   placeholder="Local Username"
//                   value={route.localUsername}
//                   onChange={handleChange}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 </Grid>
//                 <Grid item xs={6}>
//                   {/* <InputLabel htmlFor="remotePassword">Remote Password</InputLabel> */}
//                   <Input
//                     name="localPassword"
//                     placeholder="Local Password"
//                     type="password"
//                     value={route.localPassword}
//                     onChange={handleChange}
//                     fullWidth
//                     sx={{ mb: 2 }}
//                   />
//                 </Grid>
//               </Grid>


//                 <Input
//                   name="localDirectory"
//                   placeholder="Local Directory"
//                   value={route.localDirectory}
//                   onChange={handleChange}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 <Input
//                   name="remoteHost"
//                   placeholder="Remote Host"
//                   value={route.remoteHost}
//                   onChange={handleChange}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 <Input
//                   name="remotePort"
//                   placeholder="Remote Port"
//                   type="number"
//                   value={route.remotePort}
//                   onChange={handleChange}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                 <Input
//                   name="remoteUsername"
//                   placeholder="Remote Username"
//                   value={route.remoteUsername}
//                   onChange={handleChange}
//                   fullWidth
//                   sx={{ mb: 2 }}
//                 />
//                 </Grid>
//                 <Grid item xs={6}>
//                   {/* <InputLabel htmlFor="remotePassword">Remote Password</InputLabel> */}
//                   <Input
//                     name="remotePassword"
//                     placeholder="Remote Password"
//                     type="password"
//                     value={route.remotePassword}
//                     onChange={handleChange}
//                     fullWidth
//                     sx={{ mb: 2 }}
//                   />
//                 </Grid>
//               </Grid>


//               <Input
//                 name="remoteDirectory"
//                 placeholder="Remote Directory"
//                 value={route.remoteDirectory}
//                 onChange={handleChange}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//             <Button type="submit" width="250">
//               Submit
//             </Button>
//           </FormControl>
//           </form>
//     </div>
//   )
// }

// export default RouteForm