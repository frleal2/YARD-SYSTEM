import '../index.css';
import Car from './components/cars';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import EditCar from './components/EditCar';
import Header from './components/Header';

function Cars() {
  const[cars, setCars] = useState(
    [
      {id: 1, make: "TOYOTA", model: "Celica", img: "https://i.redd.it/23ytnxknpka91.jpg"},
      {id: 2, make: "NISSAN", model: "Celica", img: "https://i.redd.it/23ytnxknpka91.jpg"},
      {id: 3, make: "BMW", model: "Celica", img: "https://i.redd.it/23ytnxknpka91.jpg"},
      {id: 4, make: "MERCEDES", model: "Celica", img: "https://i.redd.it/23ytnxknpka91.jpg"},
      {id: 5, make: "FORD", model: "Celica", img: "https://i.redd.it/23ytnxknpka91.jpg"},
      {id: 6, make: "PORSCHE", model: "Celica", img: "https://i.redd.it/23ytnxknpka91.jpg"}
    ]
  );

  function updateCar(id, newMake, newModel){
    const updatedCars = cars.map((car) => {
      if(id == car.id){
        return {...car, make: newMake, model: newModel}
      }

      return car;
    });
      setCars(updatedCars);
  }

  return (
    <div className = "App" >
      <div className= "flex flex-wrap justify-center">
        {cars.map((car) => {
          const editCar = (
            <EditCar
              id = {car.id}
              make = {car.make}
              model = {car.model}
              updateCar = {updateCar}
            />
        );
          return(
            <Car
              key =   {car.id}
              id =    {car.id}
              make =  {car.make}
              model = {car.model}
              img =   {car.img}
              editCar = {editCar}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Cars;
