
import { Alert, Snackbar } from '@mui/joy';
import React from 'react'
import routeservice from '../service/routeservice';

const StartRoute = (e) => {

    const [open, setOpen] = React.useState(e.ModalState);
    const[routeId,setrouteId] = React.useState("");
    const handleClose = (event, reason) => {
        console.log("closed"+`${e.routeId}`)
    
        setOpen(false);
        e.onClose();
      };
  React.useEffect(() => {
    setOpen(true);
    console.log(routeservice.startRoute(e.routeId));
  },[])


  return (
    <div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} sx={{padding:0}}>
        <Alert
          onClose={handleClose}
          color="success"
          variant="solid"
          sx={{ width: '100%' }}
        >
          Route Started
        </Alert>
      </Snackbar> 
    </div>
  );
}

export default StartRoute;
