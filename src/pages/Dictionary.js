import { useState } from 'react';

export default function Dictionary(){
    const [searchQuery, setSearchQuery] = useState('');
    const [cars, setCars] = useState([]);
    const [carObj, setCarObj] = useState({
        year: "",
        make: "",
        model: "",
        date_on_yard: '',
        style: "",
        drive_type: "",
        engine: "",
        fuel_type: "",
        vin: searchQuery,
        color: '',
        transmission: ''

    });
    
//This section handles the VIN search functionality by fetching data
//from the NHTSA API.

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        if (searchQuery) {
          // Fetch data from the API based on the searchQuery
          fetch('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/'+searchQuery+'?format=json')
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              // Update the search results state with the API response data
              //set the cars obj with the data.
              setCars(data.Results);

              //create a new carinfo array of size of data results
              const carInfo = new Array(cars.length);

              //populate new carinfo array with results from data
              cars.forEach((element, index, array) => {
                carInfo[index] = element.Value;
              });

              //populate the CarObj with specific results from new carinfo array
              setCarObj({
                year: carInfo[10],
                make: carInfo[7],
                model: carInfo[9],
                date_on_yard: '',
                style: carInfo[14],
                drive_type: carInfo[51],
                engine: carInfo[75],
                fuel_type: carInfo[77],
                vin: searchQuery,
                color: 'NULL',
                transmission: 'NULL'
              })
              
            })
            
            .catch(error => {
              // Handle errors, e.g., display an error message to the user
              console.error('Error fetching data:', error);
            });
        }
    };

        
//The section below gathers the data fetched from the NHTSA api and 
//executes a POST method to send the car obj data through the custom 
//django RESTAPI to submit to the SQLite database.

    const handlePostRequest = () => {
        fetch('http://localhost:8000/api/cars/addCar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carObj)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
        })
        .catch(error => {
            console.error('Error posting data:', error);
        });
    }

//the code below will allow you to edit the values that come in
//from the api show in the form and submit into the database.
    
    function handleYearChange(e){
        setCarObj({
            ...carObj,
            year: e.target.value
        })
    }

    function handleMakeChange(e){
        setCarObj({
            ...carObj,
            make: e.target.value
        })
    }

    function handleModelChange(e){
        setCarObj({
            ...carObj,
            model: e.target.value
        })
    }

    function handleDateChange(e){
        setCarObj({
            ...carObj,
            date_on_yard: e.target.value
        })
    }

    function handleStyleChange(e){
        setCarObj({
            ...carObj,
            style: e.target.value
        })
    }

    function handleDriveTypeChange(e){
        setCarObj({
            ...carObj,
            drive_type: e.target.value
        })
    }

    function handleEngineChange(e){
        setCarObj({
            ...carObj,
            engine: e.target.value
        })
    }

    function handleFuelChange(e){
        setCarObj({
            ...carObj,
            fuel_type: e.target.value
        })
    }

    function handleColorChange(e){
        setCarObj({
            ...carObj,
            color: e.target.value
        })
    }

    function handleTransmissionChange(e){
        setCarObj({
            ...carObj,
            transmission: e.target.value
        })
    }

//CODE BELOW HANDLES ALL STRUCTURE OF THE PAGE
    return(
        <div className = "container mx-auto">
            <h4 className='mt-4 mb-4'>Enter VIN or Add Manually</h4>
            <div className="relative flex w-full rounded-[7px] mt-8">
                <div className="relative h-10 w-full rounded-[7px] bg-slate-50 mb-4">
                    <input 
                        type="text"
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder='Enter Vin' 
                    />
                </div>
                <button onClick={handleSearchClick}
                    className="!absolute right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button">
                    Search
                </button>
            </div>
            <div>
                
            </div>
            <h4>Results:</h4>
                <div className="mt-1">
                    <label className="block text-lg mb-2">
                    Year:
                    </label>
                    <input
                        type="text"
                        value={carObj.year}
                        onChange={handleYearChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />

                    <label htmlFor="make" className="block text-lg mb-2">
                    Make:
                    </label>
                    <input
                        type="text"
                        value={carObj.make}
                        onChange={handleMakeChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />

                    <label className="block text-lg mb-2">
                    Model:
                    </label>
                    <input
                        type="text"
                        value={carObj.model}
                        onChange={handleModelChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />

                    <label className="block text-lg mb-2">
                    Date Arrived (YYYY-MM-DD):
                    </label>
                    <input
                        type="text"
                        value={carObj.date_on_yard}
                        onChange={handleDateChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />

                    <label className="block text-lg mb-2">
                    Style:
                    </label>
                    <input
                        type="text"
                        value={carObj.style}
                        onChange={handleStyleChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />

                    <label className="block text-lg mb-2">
                    Drive Type:
                    </label>
                    <input
                        type="text"
                        value={carObj.drive_type}
                        onChange={handleDriveTypeChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />
                    <label className="block text-lg mb-2">
                    Engine:
                    </label>
                    <input
                        type="text"
                        value={carObj.engine}
                        onChange={handleEngineChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />

                    <label className="block text-lg mb-2">
                    Fuel:
                    </label>
                    <input
                        type="text"
                        value={carObj.fuel_type}
                        onChange={handleFuelChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />

                    <label className="block text-lg mb-2">
                        VIN:
                    </label>
                    <input
                    type="text"
                    value= {carObj.vin}
                    readOnly
                    className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                    />

                    <label className="block text-lg mb-2">
                    Color:
                    </label>
                    <input
                        type="text"
                        value={carObj.fuel_type}
                        onChange={handleColorChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />
                    <label className="block text-lg mb-2">
                    Transmission:
                    </label>
                    <input
                        type="text"
                        value={carObj.transmission}
                        onChange={handleTransmissionChange}
                        className="w-full p-2 text-lg border border-gray-300 rounded mb-4"
                     />
                </div>
                <div>
                <button
                        onClick={handlePostRequest} 
                        className= 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mb-20'
                        type="button">
                        Post Data
                    </button>
                </div>
        </div>
    );
}
    