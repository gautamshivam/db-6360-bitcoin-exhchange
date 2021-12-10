import React, {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";


const TraderBTCReport = (props) => {

    return (
        <div className="row justify-content-center m-0">
            <div className="col-md-8 mt-5">

                <Box sx={{ boxShadow: 3, mb: 2 }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="client report table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Row</TableCell>
                                    <TableCell align="left">Client's Name</TableCell>
                                    <TableCell align="left">Quantity</TableCell>
                                    <TableCell align="left">Rate</TableCell>
                                    <TableCell align="left">Type</TableCell>
                                    <TableCell align="left">Transaction Value</TableCell>
                                    <TableCell align="left">Commision Type</TableCell>
                                    <TableCell align="left">Commision Value</TableCell>
                                    <TableCell align="left">Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.report.map((item, idx) => {
                                        return(
                                            <TableRow key={item.tid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor:`${item.transaction_type === "BUY" ? '#d6ffe1' : '#ffb0b0'}`}}>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>{idx+1}</TableCell>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>{item.client_fname} {item.client_lname}</TableCell>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>{item.btc_qty}</TableCell>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>${item.btc_rate}</TableCell>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>{item.transaction_type}</TableCell>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>${item.transaction_value}</TableCell>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>{item.commission_type}</TableCell>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>{item.commission_value}</TableCell>
                                            <TableCell align="left" style={{ fontSize:'18px'}}>{new Date(item.timestamp).toDateString()}</TableCell>
                                            </TableRow>
                                        )
                                        
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

export default TraderBTCReport
