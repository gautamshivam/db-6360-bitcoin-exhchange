import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../../UserProvider';
import Axios from 'axios';
import Box from "@mui/material/Box";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ManagerBankReport from './ManagerBankReport';
import ManagerBTCReport from './ManagerBTCReport';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

const ManagerReport = () => {
    const {clients, traders} = useContext(UserContext);
    const [clientFilter, setClientFilter] = useState(0)
    const [traderFilter, setTraderFilter] = useState(0)
    const [historyFilter, setHistoryFilter] = useState(0)
    const [sortBy, setSortBy] = useState(0)
    const [date, setDate] = useState(null)

    const [bankReport, setBankReport] = useState([])
    const [btcReport, setBTCReport] = useState([])
    const [value, setValue] = useState(0)

    useEffect(() => {
        fetchReport()
    }, [])

    const fetchReport = () => {
        Axios.get(`/bank`)
        .then((res) => {
            console.log("bank report",res.data);
            if(Array.isArray(res.data))setBankReport(res.data.reverse())
        });
        Axios.get(`/btc/trade`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data))setBTCReport(res.data.reverse())
        });
    }
    const onHistoryFilterChange = (e) => {
        let filterType = e.target.value;
        setHistoryFilter(filterType);
        let lastD = new Date();
        let last7D = (new Date(lastD.getTime() - (7 * 24 * 60 * 60 * 1000))).getTime();
        let last30D = (new Date(lastD.getTime() - (30 * 24 * 60 * 60 * 1000))).getTime();

        Axios.get(`/bank`)
        .then((res) => {
            console.log("bank report",res.data);
            if(Array.isArray(res.data)){
                let filteredData = res.data.reverse();
                switch(parseInt(filterType)) {
                    case 1:{
                        console.log("filtered daily", lastD)
                        filteredData = filteredData.filter((item) => new Date(item.timestamp).getDate() === lastD.getDate());
                        break;
                    }
                    case 2: {
                        console.log("filtered last 7 D", last7D)
                        filteredData = filteredData.filter((item) => new Date(item.timestamp).getTime() >=  last7D);
                        break;
                    }
                    case 3: {
                        console.log("filtered last 30 D",last30D)
                        filteredData = filteredData.filter((item) => new Date(item.timestamp).getTime() >=  last30D);
                        break;
                    }
                    default:
                }
                setBankReport(filteredData)
            }
        });
        Axios.get(`/btc/trade`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data)){
                let filteredData = res.data.reverse();
                switch(parseInt(filterType)) {
                    case 1:{
                        console.log("filtered daily", lastD)
                        filteredData = filteredData.filter((item) => new Date(item.timestamp).getDate() === lastD.getDate());
                        break;
                    }
                    case 2: {
                        console.log("filtered last 7 D", last7D)
                        filteredData = filteredData.filter((item) => new Date(item.timestamp).getTime() >=  last7D);
                        break;
                    }
                    case 3: {
                        console.log("filtered last 30 D",last30D)
                        filteredData = filteredData.filter((item) => new Date(item.timestamp).getTime() >=  last30D);
                        break;
                    }
                    default:
                }
                setBTCReport(filteredData)
            }
        });
    }
    const onClientSelection = (e) => {
        let clientId = e.target.value
        setClientFilter(clientId);
        if(clientId === "0") {
            fetchReport();
            return;
        }

        //fetch bank txns
        Axios.get(`/bank?client_id=${clientId}`)
        .then((res) => {
            console.log("client's bank report",res.data);
            if(Array.isArray(res.data)){
                setBankReport(res.data.reverse());
            }
        });

        // fetch btc
        Axios.get(`/btc/trade?client_id=${clientId}`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data)){
                setBTCReport(res.data.reverse());
            }
        });
    }
    const onTraderSelection = (e) => {
        let traderId = e.target.value
        setTraderFilter(traderId);
        if(traderId === "0") {
            fetchReport();
            return;
        }

        //fetch bank txns
        Axios.get(`/bank?trader_id=${traderId}`)
        .then((res) => {
            console.log("client's bank report",res.data);
            if(Array.isArray(res.data)){
                setBankReport(res.data.reverse());
            }
        });

        // fetch btc
        Axios.get(`/btc/trade?trader_id=${traderId}`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data)){
                setBTCReport(res.data.reverse());
            }
        });
    }
    const onSortBy = (e) => {
        let sortBy = parseInt(e.target.value);
        setSortBy(e.target.value)
        switch(sortBy) {
            case 1: {
                setBankReport(bankReport.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)))
                setBTCReport(btcReport.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)))
                break;
            }
            case 2: {
                setBankReport(bankReport.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
                setBTCReport(btcReport.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
                break;
            }
            default: {
                fetchReport();
            }
        }
    }
    const onDateChange = (newValue) => {
        setDate(newValue);
        console.log(newValue.getDate());
        Axios.get(`/bank`)
        .then((res) => {
            console.log("bank report",res.data);
            if(Array.isArray(res.data)){
                let filteredData = res.data.reverse();
                filteredData = filteredData.filter((item) => compareDateEqual(new Date(item.timestamp), newValue))
                setBankReport(filteredData)
            }
        });
        Axios.get(`/btc/trade`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data)){
                let filteredData = res.data.reverse();
                filteredData = filteredData.filter((item) => compareDateEqual(new Date(item.timestamp), newValue))
                setBTCReport(filteredData)
            }
        });

    }
    const compareDateEqual = (d1,d2) => {
        return d1.getYear() === d2.getYear() 
        && d1.getMonth() === d2.getMonth() 
        && d1.getDate() === d2.getDate();
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div className="row justify-content-center">
                <Tabs value={value} onChange={handleChange} aria-label="report tabs" centered>
                    <Tab label="Bank Transactions"  />
                    <Tab label="BTC Transactions" />
                </Tabs>
                </div>
                
            </Box>
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                        <TextField  id="standard-basic" 
                            select
                            label="Single Client" 
                            style={{marginTop:"5px", marginBottom:"5px", marginLeft:"20px", minWidth:"170px"}}
                            value={clientFilter}
                            onChange={onClientSelection} >
                                <MenuItem key="0" value="0">
                                    All
                                </MenuItem>
                                {
                                    clients.map(item => (
                                        <MenuItem key={item.client_id} value={item.client_id}>
                                            {item.fname} {item.lname}
                                        </MenuItem>
                                    ))
                                }
                                
                        </TextField>
                        <TextField  id="standard-basic" 
                            select
                            label="Single Trader" 
                            style={{marginTop:"5px", marginBottom:"5px", marginLeft:"20px", minWidth:"170px"}}
                            value={traderFilter}
                            onChange={onTraderSelection} >
                                <MenuItem key="0" value="0">
                                    All
                                </MenuItem>
                                {
                                    traders.map(item => (
                                        <MenuItem key={item.user_id} value={item.user_id}>
                                            {item.fname} {item.lname}
                                        </MenuItem>
                                    ))
                                }
                                
                        </TextField>
                        <TextField  id="standard-basic" 
                            select
                            label="Previous" 
                            style={{marginTop:"5px", marginBottom:"5px", marginLeft:"20px", minWidth:"170px"}}
                            value={historyFilter}
                            onChange={onHistoryFilterChange} >
                                <MenuItem key="0" value="0">
                                    All
                                </MenuItem>
                                <MenuItem key="1" value="1">
                                    Daily
                                </MenuItem>
                                <MenuItem key="2" value="2">
                                    Last 7 days
                                </MenuItem>
                                <MenuItem key="3" value="3">
                                    Last 30 days
                                </MenuItem>
                        </TextField>
                        <TextField  id="standard-basic" 
                            select
                            label="Sort By" 
                            style={{marginTop:"5px", marginBottom:"5px", marginLeft:"20px", minWidth:"170px"}}
                            value={sortBy}
                            onChange={onSortBy} >
                                <MenuItem key="0" value="0">
                                    Created
                                </MenuItem>
                                <MenuItem key="1" value="1">
                                    Date Ascending
                                </MenuItem>
                                <MenuItem key="2" value="2">
                                    Date Descending
                                </MenuItem>
                        </TextField>
                        <Typography marginTop="10px">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Select Date"
                                    value={date}
                                    onChange={onDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Typography>
                </div>
            </div>
            <TabPanel value={value} index={0}>
                <ManagerBankReport report={bankReport}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ManagerBTCReport report={btcReport}/>
            </TabPanel>
        </>
    )
}

export default ManagerReport
