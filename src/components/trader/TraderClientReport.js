import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";

const TraderClientReport = (props) => {
    return (
        <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5">
            <Box sx={{ boxShadow: 3, mb: 2 }}>
                <TableContainer component={Paper}>
                    <Table aria-label="client report table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Row</TableCell>
                                <TableCell>Client Name</TableCell>
                                <TableCell align="left">Client's Email</TableCell>
                                <TableCell align="left">FIAT Balance</TableCell>
                                <TableCell align="left">BTC Balance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.report.map((item,idx) => (
                                    <TableRow key={item.client_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                                        <TableCell align="left" style={{ fontSize:'18px'}}>{idx+1}</TableCell>
                                        <TableCell align="left" style={{ fontSize:'18px'}}>{item.fname} {item.lname}</TableCell>
                                        <TableCell align="left" style={{ fontSize:'18px'}}>{item.email}</TableCell>
                                        <TableCell align="left" style={{ fontSize:'18px'}}>${item.fiat_balance}</TableCell>
                                        <TableCell align="left" style={{ fontSize:'18px'}}>{item.bitcoin_balance}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
        </div>
    )
}

export default TraderClientReport
