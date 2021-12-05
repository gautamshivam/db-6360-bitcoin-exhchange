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
    const [bankReport, setBankReport] = useState([])
    const [btcReport, setBTCReport] = useState([])
    const [value, setValue] = useState(0)


	// const [filterText, setFilterText] = useState('');
	// const [selectValue, setSelectValue] = useState('');
	// const [bankReport, setBankReport] = useState([]);
	// const [bitcoinReport, setBitCoinReport] = useState([]);
	// const [allUsers, setAllUsers] = useState([]);


	useEffect(() => {
        fetchReport()
    }, [user])


    const fetchReport = () => {

		// fetch trader client report
        Axios.get(`/traders/${user.user_id}/clients`)
        .then((res) => {
            console.log("client report",res.data);
            if(Array.isArray(res.data))setReport(res.data.reverse())
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

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div className="row justify-content-center">
                <Tabs value={value} onChange={handleTabChange} aria-label="report tabs" centered>
                    <Tab label="With Traders Report"  />
                    <Tab label="Bank Transactions"  />
                    <Tab label="BTC Transactions" />
                </Tabs>
                </div>
                
            </Box>
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
