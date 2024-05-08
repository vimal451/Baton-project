
import { Alert, Snackbar } from '@mui/joy';
import React from 'react'
import routeservice from '../service/routeservice';

const StopRoute = (e) => {

    const [open, setOpen] = React.useState(e.ModalState);
    const[routeId,setrouteId] = React.useState("");
    const handleClose = (event, reason) => {
        console.log("closed"+`${e.routeId}`)
    
        setOpen(false);
        e.onClose();
      };
  React.useEffect(() => {
    setOpen(true);
    console.log(routeservice.stopRoute(e.routeId));
  },[])


  return (
    <div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} sx={{padding:0}}>
        <Alert
          onClose={handleClose}
          color="danger"
          variant="solid"
          sx={{ width: '100%' }}
        >
          Route Stopped
        </Alert>
      </Snackbar> 
    </div>
  );
}

export default StopRoute;
