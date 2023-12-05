import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';

const Cars = () =>{

    return(
        <div className='"flex flex-wrap justify-center"'>
            <h1>Below you will find our yard inventory!</h1>
            <h2>Expand your search by including Year, Make or Model</h2>
            <DataTable/>
        </div>
    )
}

export default Cars
