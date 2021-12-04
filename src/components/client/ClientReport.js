import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from '../../UserProvider';
import Axios from 'axios';
import Box from "@mui/material/Box";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ClientTraderReport from './ClientTraderReport';
import ClientBankReport from './ClientBankReport';
import ClientBTCReport from './ClientBTCReport';

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
  
const ClientReport = () => {

    const {user} = useContext(UserContext);
    const [report, setReport] = useState([])
    const [bankReport, setBankReport] = useState([])
    const [btcReport, setBTCReport] = useState([])
    const [value, setValue] = useState(0)

    useEffect(() => {
        fetchReport()
    }, [user])

    const fetchReport = () => {
        Axios.get(`/clients/${user.user_id}/traders`)
        .then((res) => {
            console.log("client report",res.data);
            if(Array.isArray(res.data))setReport(res.data.reverse())
        });
        Axios.get(`/bank?client_id=${user.user_id}`)
        .then((res) => {
            console.log("client's bank report",res.data);
            if(Array.isArray(res.data))setBankReport(res.data.reverse())
        });
        Axios.get(`/btc/trade?client_id=${user.user_id}`)
        .then((res) => {
            console.log("client's btc report",res.data);
            if(Array.isArray(res.data))setBTCReport(res.data.reverse())
        });
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <div className="row justify-content-center">
                <Tabs value={value} onChange={handleChange} aria-label="report tabs" centered>
                    <Tab label="With Traders Report"  />
                    <Tab label="Bank Transactions"  />
                    <Tab label="BTC Transactions" />
                </Tabs>
                </div>
                
            </Box>
            <TabPanel value={value} index={0}>
                <ClientTraderReport report={report}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ClientBankReport report={bankReport}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ClientBTCReport report={btcReport}/>
            </TabPanel>
        </>
    )
}

export default ClientReport
