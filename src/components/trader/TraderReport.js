import React, {useContext, useState, useEffect} from 'react'
import {UserContext} from '../../UserProvider'
// import { Container,Nav, Navbar, NavDropdown, Form, FormControl, Button, Breadcrumb } from 'react-bootstrap'
// import { Card, Row, Col, Table, ProgressBar} from 'react-bootstrap'
import Axios from 'axios';
import Box from "@mui/material/Box";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import TraderClientReport from './TraderClientReport';
import TraderBankReport from './TraderBankReport';
import TraderBTCReport from './TraderBTCReport';
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';

function TraderTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`trader-tabpanel-${index}`}
        aria-labelledby={`trader-tab-${index}`}
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

const TraderReport = (props) => {

	const {user} = useContext(UserContext);
	const [report, setReport] = useState([])
	const [clientList, setClientList] = useState([])
    const [bankReport, setBankReport] = useState([])
    const [btcReport, setBTCReport] = useState([])
    const [value, setValue] = useState(0)

    const [queryName, setQueryName] = useState("")
    const [clientFilter, setClientFilter] = useState(0)

	useEffect(() => {
        fetchReport()
    }, [user])


    const fetchReport = () => {

		// fetch trader client report
        Axios.get(`/traders/${user.user_id}/clients`)
        .then((res) => {
            console.log("client report",res.data);
            if(Array.isArray(res.data)){
                setReport(res.data.reverse())
                setClientList(res.data);
            }
        });

		//fetch bank txns
        Axios.get(`/bank?trader_id=${user.user_id}`)
        .then((res) => {
            console.log("client's bank report",res.data);
            if(Array.isArray(res.data))setBankReport(res.data.reverse())
        });

		// fetch btc
        Axios.get(`/btc/trade?trader_id=${user.user_id}`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data))setBTCReport(res.data.reverse())
        });
    }

	const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
	
	const txnUpdated = () => {
		//fetch bank txns
        Axios.get(`/bank?trader_id=${user.user_id}`)
        .then((res) => {
            console.log("client's bank report",res.data);
            if(Array.isArray(res.data))setBankReport(res.data.reverse())
        });
	}

    const onQueryNameChange = (e) => {
        let q = e.target.value;
        setQueryName(q);
        
        // fetch trader client report
        Axios.get(`/traders/${user.user_id}/clients`)
        .then((res) => {
            console.log("client report",res.data);
            if(Array.isArray(res.data)){
                let filteredReport = res.data.filter((item) => {
                    return (item.fname.toLowerCase().includes(q.toLowerCase()) ||
                            item.lname.toLowerCase().includes(q.toLowerCase()))
                });
                setReport(filteredReport.reverse());
            }
        });

        //fetch bank txns
        Axios.get(`/bank?trader_id=${user.user_id}`)
        .then((res) => {
            console.log("client's bank report",res.data);
            if(Array.isArray(res.data)){
                let filteredBankReport = res.data.filter((item) => {
                    return (item.client_fname.toLowerCase().includes(q.toLowerCase()) ||
                            item.client_lname.toLowerCase().includes(q.toLowerCase()))
                });
                setBankReport(filteredBankReport.reverse());
            }
        });

        // fetch btc
        Axios.get(`/btc/trade?trader_id=${user.user_id}`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data)){
                let filteredBTCReport = res.data.filter((item) => {
                    return (item.client_fname.toLowerCase().includes(q.toLowerCase()) ||
                            item.client_lname.toLowerCase().includes(q.toLowerCase()))
                });
                setBTCReport(filteredBTCReport.reverse());
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
        // fetch trader client report
        Axios.get(`/traders/${user.user_id}/clients`)
        .then((res) => {
            console.log("client report",res.data);
            if(Array.isArray(res.data)){
                let filteredReport = res.data.filter((item) => item.client_id === clientId);
                setReport(filteredReport.reverse());
            }
        });

        //fetch bank txns
        Axios.get(`/bank?trader_id=${user.user_id}&client_id=${clientId}`)
        .then((res) => {
            console.log("client's bank report",res.data);
            if(Array.isArray(res.data)){
                setBankReport(res.data.reverse());
            }
        });

        // fetch btc
        Axios.get(`/btc/trade?trader_id=${user.user_id}&client_id=${clientId}`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data)){
                setBTCReport(res.data.reverse());
            }
        });
    }

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div className="row justify-content-center">
                <Tabs value={value} onChange={handleTabChange} aria-label="report tabs" centered>
                    <Tab label="With Clients Report"  />
                    <Tab label="Bank Transactions"  />
                    <Tab label="BTC Transactions" />
                </Tabs>
                </div>
                
            </Box>
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                        <TextField id="standard-basic" 
                            label="Client's Name" 
                            style={{marginTop:"5px", marginBottom:"5px"}}
                            value={queryName}
                            autoComplete='off'
                            onChange={onQueryNameChange}/>
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
                                    clientList.map(item => (
                                        <MenuItem key={item.client_id} value={item.client_id}>
                                            {item.fname} {item.lname}
                                        </MenuItem>
                                    ))
                                }
                                
                        </TextField>
                </div>
            </div>
            <TraderTabPanel value={value} index={0}>
                <TraderClientReport report={report}/>
            </TraderTabPanel>
            <TraderTabPanel value={value} index={1}>
                <TraderBankReport report={bankReport} txnUpdated={txnUpdated}/>
            </TraderTabPanel>
            <TraderTabPanel value={value} index={2}>
                <TraderBTCReport report={btcReport}/>
            </TraderTabPanel>

            
        </>
    )
}
export default TraderReport
