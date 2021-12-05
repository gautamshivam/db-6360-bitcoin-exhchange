import React, {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const ClientBankReport = (props) => {
    const [showClientOnly, setShowClientOnly] = useState(false)
    const [showTraderOnly, setShowTraderOnly] = useState(false)
    return (
        <div className="row justify-content-center m-0">
            <div className="col-md-8 mt-5">
                <FormGroup>
                    <FormControlLabel control={<Switch onChange={(e,val) => setShowClientOnly(val)} />} label="Clients Only" />
                    <FormControlLabel control={<Switch onChange={(e,val) => setShowTraderOnly(val)} />} label="Traders Only" />
                </FormGroup>
                <Box sx={{ boxShadow: 3, mb: 2 }}>
                    
                    <TableContainer component={Paper}>
                        <Table aria-label="client report table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Row</TableCell>
                                    <TableCell align="left">Client's Name</TableCell>
                                    {!showClientOnly && <TableCell align="left">Trader's Name</TableCell>}
                                    <TableCell align="left">Type</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.report.map((item, idx) => {
                                        if(!showClientOnly || !showTraderOnly){
                                            if(showClientOnly && item.trader_id != null) {
                                                return(<></>);
                                            }
                                            if(showTraderOnly && item.trader_id == null) {
                                                return(<></>);
                                            }
                                        }
                                        if(item.status === "PENDING") {
                                            return(
                                            <TableRow key={item.tid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:'#ffe1a1'}}>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{idx+1}</TableCell>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{item.client_fname} {item.client_lname}</TableCell>
                                                {
                                                   !showClientOnly && <TableCell align="left" style={{ fontSize:'18px'}}>{item.trader_fname} {item.trader_lname}</TableCell>
                                                }
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{item.type}</TableCell>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>${item.amount}</TableCell>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{item.status}</TableCell>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{new Date(item.timestamp).toDateString()}</TableCell>
                                            </TableRow>)
                                        }
                                        if (item.status === "APPROVED") {
                                            return(
                                                <TableRow key={item.tid}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor:'#d6ffe1'}}>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{idx+1}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.client_fname} {item.client_lname}</TableCell>
                                                    {
                                                        !showClientOnly && <TableCell align="left" style={{ fontSize:'18px'}}>{item.trader_fname} {item.trader_lname}</TableCell>
                                                    }
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.type}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>${item.amount}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.status}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{new Date(item.timestamp).toDateString()}</TableCell>
                                                </TableRow>)
                                        } 
                                        if (item.status === "CANCEL") {
                                            return(
                                                <TableRow key={item.tid}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor:'#ffb0b0'}}>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{idx+1}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.client_fname} {item.client_lname}</TableCell>
                                                    {
                                                        !showClientOnly && <TableCell align="left" style={{ fontSize:'18px'}}>{item.trader_fname} {item.trader_lname}</TableCell>
                                                    }                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.type}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>${item.amount}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.status}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{new Date(item.timestamp).toDateString()}</TableCell>
                                                </TableRow>)
                                        } 
                                        
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        </div>
    )
}

export default ClientBankReport
