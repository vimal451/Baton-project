// eslint-disable jsx-a11y/anchor-is-valid
import * as React from "react"
import Box from "@mui/joy/Box"
import Chip from "@mui/joy/Chip"
import FormControl from "@mui/joy/FormControl"
import FormLabel from "@mui/joy/FormLabel"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"
import Table from "@mui/joy/Table"
import Sheet from "@mui/joy/Sheet"
import Typography from "@mui/joy/Typography"
import Button from "@mui/joy/Button"
import SearchIcon from '@mui/icons-material/Search';
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import BlockIcon from "@mui/icons-material/Block"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"
import {
  PlayArrowRounded,
  RestartAltRounded,
  StopRounded
} from "@mui/icons-material"
import { Link } from "@mui/material"
import { Grid, Input, Tooltip } from "@mui/joy"
// import EditRoute from "./EditRoute"
import routeservice from "../service/routeservice"
import sortAndFilter from "../service/sortAndFilter"
import EditRoute from "./EditRoute"
import DeleteRoute from "./DeleteRoute"
import StartRoute from "./StartRoute"
import StopRoute from "./StopRoute"
import RestartRoute from "./RestartRoute"
import Stats from "./Stats"
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import dateAndTime from "../service/dateAndTime"
import AddRoute from "./AddRoute"
  
const { getComparator, stableSort } = sortAndFilter;
const {getRoutes} = routeservice;



export default function Dashboard() {
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [rows, setRows] = React.useState([])
  const [newRows, setNewRows] = React.useState([])
  const [order, setOrder] = React.useState("desc")
  const [sorter, setSorter] = React.useState("channelId")
  const [statusFilter, setStatusFilter] = React.useState("ACTIVE");
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [rflag, setRflag] =React.useState(false);
    const [selectValue, setSelectValue] = React.useState("");
    const onChange = (event) => {
      const value = event.target.value;
      setSelectValue(value);
      console.log(selectValue)
    };

  // Filter rows based on the selected status
  //const filteredRows = statusFilter ? rows.filter(row => row.status === statusFilter) : rows;
  const [filteredRows,setFilteredRows] = React.useState([]);
  const [filteredRowsaS,setFilteredRowsaS] = React.useState([]);
  //statusFilter ? rows.filter(row => row.status === statusFilter) : rows;

  const filterRowsByStatus = (rows, statusFilter) => {
    return statusFilter ? rows.filter(row => row.status === statusFilter) : rows;
  };
  const filterRowsByName = (rows, name) => {
    //return statusFilter ? rows.filter(row => row.channelId.includes(name)) : rows;
    return statusFilter ? rows.filter(row => row.channelId.toLowerCase().includes(name.toLowerCase())) : rows;
  };

  // const [start, setStart] = React.useState(false);
  // const [stop, setStop] = React.useState(false);

  // const handleStartRoute=()=>{
  //   setStart(true);
  // }
  
    
  const renderFilters = () => (
    <React.Fragment>
    <FormControl size="sm">
      <FormLabel>Status</FormLabel>
      <Select
        size="sm"
        id="hello"
        placeholder="Filter by status"
        slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        //value={statusFilter}
        onChange={(e, newValue) => {
          console.log(newValue)
          setFilteredRows(filterRowsByStatus(rows,newValue))
         setFilteredRowsaS(filterRowsByStatus(rows,newValue))
        }}
      >
        <Option value={""}>All</Option>
        <Option value={"ACTIVE"}>ACTIVE</Option>
        <Option value={"INACTIVE"}>INACTIVE</Option>
      </Select>
    </FormControl>
  </React.Fragment>
  
  )


React.useEffect(() => {
  const fetchData = async () => {
    console.log("" + localStorage.getItem("token"))
    try {
      console.log("Email " + localStorage.getItem("email"))
      const firstArray = await routeservice.getRoutes();
      setRows(firstArray);
      setFilteredRowsaS(firstArray);
      setFilteredRows(firstArray);
      console.log(rows);
    } catch (error) {
      console.log(error.message + "  he---");
      // console.log(localStorage.getItem("token"))
    }
  };


  fetchData(); // Call the async function immediately
},[]);


const [editModalOpen, setEditModalOpen] = React.useState({});

const handleOpenEditModal = (channelId) => {
  setEditModalOpen({ ...editModalOpen, [channelId]: true });
};

const handleCloseEditModal = async (channelId) => {
  setEditModalOpen({ ...editModalOpen, [channelId]: false });
  setFilteredRowsaS(await routeservice.getRoutes());
};

const [deleteModalOpen, setDeleteModalOpen] = React.useState({});

const handleOpenDeleteModal =  (channelId) => {
  setDeleteModalOpen({ ...deleteModalOpen, [channelId]: true });
  // setFilteredRowsaS(await routeservice.getRoutes());
};

const handleCloseDeleteModal = async (channelId) => {
  setDeleteModalOpen({ ...editModalOpen, [channelId]: false });
  setFilteredRowsaS(await routeservice.getRoutes());
};

const [startModalOpen, setStartModalOpen] = React.useState({});

const handleOpenStartModal = async (channelId) => {
  setStartModalOpen({ ...startModalOpen, [channelId]: true });
  setFilteredRowsaS(await routeservice.getRoutes());
};

const handleCloseStartModal = async (channelId) => {
  setStartModalOpen({ ...startModalOpen, [channelId]: false });
  setFilteredRowsaS(await routeservice.getRoutes());
};

const [stopModalOpen, setStopModalOpen] = React.useState({});

const handleOpenStopModal = async (channelId) => {
  setStopModalOpen({ ...stopModalOpen, [channelId]: true });
  setFilteredRowsaS(await routeservice.getRoutes());
};

const handleCloseStopModal = async (channelId) => {
  setStopModalOpen({ ...stopModalOpen, [channelId]: false });
  setFilteredRowsaS(await routeservice.getRoutes());
};

const [restartModalOpen, setRestartModalOpen] = React.useState({});

const handleOpenRestartModal = (channelId) => {
  setRestartModalOpen({ ...restartModalOpen, [channelId]: true });
};

const handleCloseRestartModal = async (channelId) => {
  setRestartModalOpen({ ...restartModalOpen, [channelId]: false });
  setFilteredRowsaS(await routeservice.getRoutes());
};

const [statsModalOpen, setStatsModalOpen] = React.useState({});

const handleOpenStatsModal = (channelId) => {
  setStatsModalOpen({ ...statsModalOpen, [channelId]: true });
};

const handleCloseStatsModal = async (channelId) => {
  setStatsModalOpen({ ...statsModalOpen, [channelId]: false });
  setFilteredRowsaS(await routeservice.getRoutes());
};

const [addModalOpen, setAddModalOpen] = React.useState(false);

const handleOpenAddModal = () => {
  setAddModalOpen(true);
};

const handleCloseAddModal = async () => {
  setAddModalOpen(false);
  setFilteredRowsaS(await routeservice.getRoutes());
};




  return (
    <div>
        <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            <Typography level="h2" component="h1">
              SFTP Channels
            </Typography>
            <Button
              // Bcolor="#526D82"
              startDecorator={<AddIcon />}
              size="lg"
              onClick={handleOpenAddModal}
              style={{ backgroundColor: "#526D82", color: 'white' }}
            >
              Add Route
              </Button>
            {/* {<AddRoute/>} */}
          </Box>
    <React.Fragment>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" }
          }
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for Channel Name</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} sx={{ width: '600px', fontSize: '0.8rem', padding: '8px' }} onInput={(e)=>{
            setFilteredRowsaS(filterRowsByName(filteredRows,e.target.value))
            }}/>
        </FormControl>
        {renderFilters()}
      </Box>
      {/* Table of the routes */}
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "#9DB2BF",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "40px",
            "--TableCell-paddingX": "8px",
            bgcolor:"white"
          }}
        >
          <thead>
            <tr>
              <th
                style={{ width: 28, textAlign: "center", padding: "12px 6px" }}
              ></th>

              <th style={{ width: 90, padding: "12px 6px" }}>
                <Link
                underline="none"
                color="primary"
                component="button"
                onClick={() => {
                  setSorter("channelId");
                  setOrder(order === 'asc' ? 'desc' : 'asc');
                }}
                fontWeight="lg"
                endDecorator={<ArrowDropDownIcon />}
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                  },
                }}
              >
                Route ID
              </Link></th>
              <th style={{ width: 100, padding: "12px 6px" }}><Link
                underline="none"
                color="primary"
                component="button"
                onClick={() => {
                  setSorter("updatedAt");
                  setOrder(order === 'asc' ? 'desc' : 'asc');
                }}

                fontWeight="lg"
                // endDecorator={<SortIcon />}
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                  },
                }}
              >
               Last Updated
              </Link></th>
              <th style={{ width: 100, padding: "12px 6px" }}><Link
                underline="none"
                color="primary"
                component="button"
                onClick={() => {
                  setSorter("status");
                  setOrder(order === 'asc' ? 'desc' : 'asc');
                }}
                fontWeight="lg"
                endDecorator={<ArrowDropDownIcon />}
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                  },
                }}
              >
                Status
              </Link></th>
              <th style={{ width: 80, padding: "12px 6px" }}>Created At</th>
              {/* <th style={{ width: 80, padding: "12px 6px" }}>Updated At</th> */}
              <th style={{ width: 80, padding: "12px 6px" }}>Destination</th>
              <th style={{ width: 130, padding: "12px 6px" }}></th>
              <th style={{ width: 180, padding: "12px 44px" }}>Actions </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {stableSort(filteredRowsaS, getComparator(order, sorter)).map(row => (
              <tr key={row.channelId}>
                <td style={{ textAlign: "center", width: 120 }}>
                </td>
                <td>
                  <Typography level="body-xs">{row.channelId}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{dateAndTime.formatDate(row.updatedAt)}</Typography>
                </td>
                <td>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        ACTIVE: <CheckRoundedIcon />,
                        // Refunded: <AutorenewRoundedIcon />,
                        INACTIVE: <BlockIcon />
                      }[row.status]
                    }
                    color={
                      {
                        ACTIVE: "success",
                        // Refunded: 'neutral',
                        INACTIVE: "danger"
                      }[row.status]
                    }
                  >
                    {row.status}
                  </Chip>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <div>
                      <Typography level="body-xs">{dateAndTime.formatDate(row.createdAt)}</Typography>
                    </div>
                  </Box>
                </td>
                {/* <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <div>
                      <Typography level="body-xs">{dateAndTime.formatDate(row.updatedAt)}</Typography>
                    </div>
                  </Box>
                </td> */}
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <div>
                      <Typography level="body-xs">{row.destination}</Typography>
                    </div>
                  </Box>
                </td>
                <td>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Tooltip title="Start" variant="outlined">
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => handleOpenStartModal(row.channelId)}
                      id="start"
                      name="start"
                      disabled={row.status === "ACTIVE"}
                    >
                      <PlayArrowRounded />
                    </Button>
                    </Tooltip>
                    <Tooltip title="Stop" variant="outlined">
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleOpenStopModal(row.channelId)}
                      id="stop"
                      name="stop"
                      disabled={row.status === "INACTIVE"}
                    >
                      <StopRounded />
                    </Button>
                    </Tooltip>
                    <Tooltip title="Restart" variant="outlined">
                    <Button
                      color="neutral"
                      onClick={() => handleOpenRestartModal(row.channelId)}
                      size="sm"
                      id="restart"
                      name="restart"
                      disabled={row.status === "INACTIVE"}
                    >
                      <RestartAltRounded />
                    </Button>
                    </Tooltip>
                  </Box>
                </td>
                <td>
                  {/* <RowMenu /> */}
                  <Box sx={{ display: "flex", gap: 0, alignItems: "center" }}>
                  {/* <Grid container spacing={2}> */}
              {/* <Grid item> */}
              
                {/* <Button variant="outlined" color="primary" onClick={handleOpenEditModal}>
                  Edit
                </Button>
                {isEditModalOpen && (
        <EditRoute onClose={handleCloseEditModal} ModalState={true} emailId={row.channelId}/>
      )} */}
      <Tooltip title="Edit" variant="outlined">
      <Button variant="plain" color="primary" onClick={() => handleOpenEditModal(row.channelId)}>
        {/* Edit */}
        <EditIcon/>
      </Button>
      </Tooltip>
      {editModalOpen[row.channelId] && (
        <EditRoute onClose={() => handleCloseEditModal(row.channelId)} ModalState={editModalOpen[row.channelId]} routeId={row.channelId} data={row}/>
      )}
              {/* </Grid> */}
              {/* <Grid item> */}
               
              {/* </Grid> */}
              {/* <Grid item> */}
              <Tooltip title="History" variant="outlined">
                <Button variant="plain" color="primary" onClick={() => handleOpenStatsModal(row.channelId)}>
                  {/* Stats */}
                  {/* <QueryStatsIcon/> */}
                  {/* <CompareArrowsIcon/> */}
                  <HistoryToggleOffIcon/>
                </Button>
                </Tooltip>
                <Tooltip title="Delete" variant="outlined">
                <Button variant="plain" color="danger" onClick={() => handleOpenDeleteModal(row.channelId)}>
                  {/* Delete */}
                  <DeleteOutlineIcon/>
                 
                </Button>
                </Tooltip>
                {deleteModalOpen[row.channelId] && (
        <DeleteRoute onClose={() => handleCloseDeleteModal(row.channelId)} ModalState={deleteModalOpen[row.channelId]} routeId={row.channelId}/>
                )}
                </Box>
                {/* </Grid> */}
                {/* {statsModalOpen[row.channelId] && (
    <Stats onClose={() => handleCloseStatsModal(row.channelId)} ModalState={statsModalOpen[row.channelId]} routeId={row.channelId}/>
)} */}

      
            {/* </Grid> */}
            
            {startModalOpen[row.channelId] && (
    <StartRoute onClose={() => handleCloseStartModal(row.channelId)} ModalState={startModalOpen[row.channelId]} routeId={row.channelId}/>
)}

            {stopModalOpen[row.channelId] && (
    <StopRoute onClose={() => handleCloseStopModal(row.channelId)} ModalState={stopModalOpen[row.channelId]} routeId={row.channelId}/>
)}
 {restartModalOpen[row.channelId] && (
    <RestartRoute onClose={() => handleCloseRestartModal(row.channelId)} ModalState={restartModalOpen[row.channelId]} routeId={row.channelId}/>
)}
{statsModalOpen[row.channelId] && (
    <Stats onClose={() => handleCloseStatsModal(row.channelId)} ModalState={statsModalOpen[row.channelId]} routeId={row.channelId}/>
)}
 



                </td>
              </tr>
              
            ))}
          </tbody>
        </Table>
        {addModalOpen && (
        <AddRoute onClose={() => handleCloseAddModal()} ModalState={addModalOpen}/>
      )}
      </Sheet>
      {/* <StartAlert open={start}/> */}
      {/* <StopAlert open={stop}/> */}
    </React.Fragment>
    </div>
  )
}
