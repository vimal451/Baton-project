import { Button, Box, Typography, Modal, TextField, Input, FormControl, FormLabel, Grid, Table, Sheet, ModalClose, ModalDialog} from '@mui/joy';
import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup'
 import routeservice from '../service/routeservice';
import './AddRoute.css'
import axios from 'axios';
import dateAndTime from '../service/dateAndTime';
import { Paper } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px'
};
const {editRoute} = routeservice;
const token = localStorage.getItem("token")
const Config = {
  headers: {
    Authorization: `Bearer ${token}`,
    ContentType: "application/json"  
   },
   withCredentials: true
}
const Stats = (e) => {
  const [route, setRoutes] = React.useState({});
  const [stats, setStats] = React.useState([]);
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
        setRoutes(response.data);
        const response1 = await axios.get(`http://localhost:8080/api/v1/routecontroller/stats/${e.routeId}`, Config);
        console.log(response1.data);
        setStats(response1.data);
        console.log(stats)
        // console.log(typeof stats + "check"
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };
  
    fetchData(); // Call the async function immediately inside useEffect
  
    // Add dependencies to the dependency array
  },[e.ModalState])

//   function sortAndFilterStats(statsList) {
//     statsList.sort((a, b) => b.statsId - a.statsId);
//     return statsList.slice(0, 5);
// }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {/* <ModalClose/> */}
         <Box sx={style}>
          {/* <ModalClose/> */}
        <h1>Route {routeId} <ModalClose/></h1>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        <strong>Local Directory:</strong> {route.localDirectory}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Local Host:</strong> {route.localHost}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Local Port:</strong> {route.localPort}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Local Username:</strong> {route.localUsername}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="subtitle1">
                        <strong>Remote Directory:</strong> {route.remoteDirectory}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Remote Host:</strong> {route.remoteHost}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Remote Port:</strong> {route.remotePort}
                    </Typography>
                    <Typography variant="subtitle1">
                        <strong>Remote Username:</strong> {route.remoteUsername}
                    </Typography>
                </Grid>
            </Grid>
        <Sheet sx={{ height: 300, overflow: 'auto' }}>
        <Table aria-label="stats"
          stickyHeader
          hoverRow>
            <thead>
                <tr>
                {/* <th style={{ width: 240, padding: "12px 6px" }}>Destination</th> */}
                <th style={{ width: 240, padding: "12px 6px",top: "-1px" }}>File Name</th>
                <th style={{ width: 140, padding: "12px 44px",top: "-1px"  }}>Time Taken </th>
              <th style={{ width: 240, padding: "12px 6px",top: "-1px"  }}>Transferred Time</th>
              
                </tr>
            </thead>
            <tbody>
            {stats.map(row => (
                 <tr key={row.statsId}>
                 <td>{row.fileName}</td>
                 <td>{row.transferDurationInMillis} ms</td>
                 <td>{dateAndTime.formatDate(row.transferredAt)}</td>
             </tr>
            ))}
            </tbody>
        </Table>
        </Sheet>
        </Box>
        </div>
      </Modal>
    </div>
  );
};

export default Stats;