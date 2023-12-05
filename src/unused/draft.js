import { useEffect, useState } from "react";

export default function Cars(){
    const [cars, setCars] = useState();

    useEffect(() =>{
        console.log("Fetching...");
        fetch('http://localhost:8000/api/cars/')
        .then((response)=> response.json())
        .then((data)=> {
            console.log(data);
            setCars(data);
        });
    },[]);

    return(
        <>
            
        </>
    );

}

//<h1> Here are our cars!</h1>
//{cars
//    ? cars.map((car) => {
//        return <p>{car.make}</p>;
//    })
    //    : null}