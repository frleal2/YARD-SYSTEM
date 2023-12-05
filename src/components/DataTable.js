import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const columns = [
    { field: 'year', headerName: 'YEAR', width: 150 },
    { field: 'make', headerName: 'MAKE', width: 150 },
    { field: 'model', headerName: 'MODEL', width: 150 },
    { field: 'date_on_yard', headerName: 'DATE ON YARD', width: 150 },
    { field: 'style', headerName: 'STYLE', width: 150 },
    { field: 'drive_type', headerName: 'DRIVE TYPE', width: 150 },
    { field: 'engine', headerName: 'ENGINE', width: 150 },
    { field: 'fuel_type', headerName: 'FUEL TYPE', width: 150 },
    { field: 'vin', headerName: 'VIN', width: 150 },
    { field: 'color', headerName: 'COLOR', width: 150 },
    { field: 'transmission', headerName: 'TRANSMISSION', width: 150 },
];


export default function DataTable() { 
    
    const [cars, setCars] = useState([]);
    //FETCHING DATA FROM API
    useEffect(() =>{
    console.log("Fetching...");
    fetch('http://localhost:8000/api/cars/')
    .then((response)=> response.json())
    .then((data)=> {
        setCars(data);
    });

    console.log(cars);

    }, []);

    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={cars} columns={columns} autoHeight ={true} />
        </div>
    );
}