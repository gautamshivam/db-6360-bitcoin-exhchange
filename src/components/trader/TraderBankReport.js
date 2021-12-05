import React, {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Axios from 'axios';

const TraderBankReport = (props) => {

	const approveXact = (id) => {
       Axios.put("/bank/"+id, {
            status : "APPROVED"
        }).then((res) => {
            console.log("Transaction  Approved",res.data);
            props.txnUpdated();
        }).catch((err) => {
            alert(err);
        })
    }
	const cancelXact = (id) => {
        Axios.put("/bank/"+id, {
            status : "CANCEL"
        }).then((res) => {
            console.log("Transaction Cancelled",res.data);
            props.txnUpdated()
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        <div className="row justify-content-center m-0">
            <div className="col-md-8 mt-5">

                <Box sx={{ boxShadow: 3, mb: 2 }}>
                    
                    <TableContainer component={Paper}>
                        <Table aria-label="client report table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Client's Name</TableCell>
                                    <TableCell align="left">Trader's Name</TableCell>
                                    <TableCell align="left">Type</TableCell>
                                    <TableCell align="left">Amount</TableCell>
                                    <TableCell align="left">Status</TableCell>
                                    <TableCell align="left">Date</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.report.map((item) => {
                                        if(item.status === "PENDING") {
                                            return(
                                            <TableRow key={item.tid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 },backgroundColor:'#ffe1a1'}}>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{item.client_fname} {item.client_lname}</TableCell>
    
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{item.trader_fname} {item.trader_lname}</TableCell>
                                                
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{item.type}</TableCell>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>${item.amount}</TableCell>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{item.status}</TableCell>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>{new Date(item.timestamp).toDateString()}</TableCell>
                                                <TableCell align="left" style={{ fontSize:'18px'}}>
                                                        <Button variant="contained" style={{marginRight:"5px"}}
                                                        onClick={() => approveXact(item.tid)}>Approve</Button>
                                                        <Button onClick={() => cancelXact(item.tid)} variant="contained" color="warning">Decline</Button>
                                                </TableCell>
                                            </TableRow>)
                                        }
                                        if (item.status === "APPROVED") {
                                            return(
                                                <TableRow key={item.tid}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor:'#d6ffe1'}}>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.client_fname} {item.client_lname}</TableCell>
                                                    
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.trader_fname} {item.trader_lname}</TableCell>
                                                    
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.type}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>${item.amount}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.status}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{new Date(item.timestamp).toDateString()}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}></TableCell>
                                                </TableRow>)
                                        } 
                                        if (item.status === "CANCEL") {
                                            return(
                                                <TableRow key={item.tid}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor:'#ffb0b0'}}>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.client_fname} {item.client_lname}</TableCell>
                                                    
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.trader_fname} {item.trader_lname}</TableCell>
                                                                                                       <TableCell align="left" style={{ fontSize:'18px'}}>{item.type}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>${item.amount}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{item.status}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}>{new Date(item.timestamp).toDateString()}</TableCell>
                                                    <TableCell align="left" style={{ fontSize:'18px'}}></TableCell>

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

export default TraderBankReport
