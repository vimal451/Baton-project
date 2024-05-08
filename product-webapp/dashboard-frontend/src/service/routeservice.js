import axios from "axios";

const token = localStorage.getItem("token")
const Config = {
  headers: {
    Authorization: "Bearer " + `${token}`,
    ContentType: "application/json"
    // "Cache-Control": "no-cache"   
   },
   withCredentials: true
}
const routeservice = {

  startRoute: async (routeId) =>
  {
    try{
      const response = await axios.get(`http://localhost:8080/api/v1/routecontroller/start/${routeId}`,Config)
      return (response.data)
    }
    catch(error)
    {
      console.log(error)
    }

  },
  stopRoute: async (routeId) =>
  {
    try{
      const response = await axios.get(`http://localhost:8080/api/v1/routecontroller/stop/${routeId}`,Config)
      return (response.data)
    }
    catch(error)
    {
      console.log(error)
    }

  },
  restartRoute: async (routeId) =>
  {
    try{
      const response = await axios.get(`http://localhost:8080/api/v1/routecontroller/restart/${routeId}`,Config)
      return (response.data)
    }
    catch(error)
    {
      console.log(error)
    }
  },

    
    getRouteById: async (routeId) => {
      try{
        const response = await axios.get(`http://localhost:8080/api/v1/route/${routeId}`,route,Config)
        return (response.data)
      }
      catch(error)
      {
        console.log(error)
      }
    },
    
    editRoute: async (route,routeId) => {
        // return axios.put()
        try{
          await axios.put(`http://localhost:8080/api/v1/route/${routeId}`,route,Config)
        }
        catch(error)
        {
          console.log(error)
        }
    },
    
    addRoute: async (route) => {

      // route.status="INACTIVE"
      console.log(route)
      try{
        await axios.post("http://localhost:8080/api/v1/route/",route, Config)

      }
      catch(error)
      {
        console.log(error)
        console.log(error.response.data + "  he---");
              alert(error.response.data)
      }

        // return true;
    },
    getRoutes: async ()=>{
        try{
            const result= await axios.get("http://localhost:8080/api/v1/route/", Config)
              // console.log(e.response.data+"hello")
          
            //  console.log("LoadRoutes" + JSON.stringify(result));
            // console.log(result.data);
                const firstArray = result.data.map(({ routeId, createdBy, updatedAt, remoteDirectory,remoteUsername, status, createdAt}) => ({
                  channelId: routeId,
                  createdBy,
                  updatedAt,
                  destination: `${remoteUsername}/${remoteDirectory}`,
                  createdAt,
                  // status: "Inactive"
                  // status: (status==null)? "Inactive" : "Active"
                  status
                }));
                // console.log(firstArray);
                 console.log(firstArray)
                console.log(typeof firstArray[0])
                return(firstArray)
            }
            catch(error)
            {
              console.log(error.response.data + "  he---");
              // alert(error + " get info " + `${localStorage.getItem("token")}`)
              // return([])
              return(this.getRoutes)
              

            }
            

    },
    deleteRoute: async (routeId)=>{
      try{
        await axios.delete(`http://localhost:8080/api/v1/route/${routeId}`,Config)
      }
      catch(error)
      {
        console.log(error)
      }
    },
    // filterRowsByStatus: (rows, statusFilter) => {
    //   return statusFilter ? rows.filter(row => row.status === statusFilter) : rows;
    // },
    // filterRowsByName:  (rows, name) => {
    //   //return statusFilter ? rows.filter(row => row.channelId.includes(name)) : rows;
    //   return statusFilter ? rows.filter(row => row.channelId.toLowerCase().includes(name.toLowerCase())) : rows;
    // }
  };
  
  export default routeservice;
  