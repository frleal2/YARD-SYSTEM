import { useEffect, useState } from 'react';

export default function Dictionary(){
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [cars, setCars] = useState([]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
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
              setSearchResults(data);
              setCars(data.Results);
              
            })
            
            .catch(error => {
              // Handle errors, e.g., display an error message to the user
              console.error('Error fetching data:', error);
            });
        }
    };

    let carInfo = new Array(cars.length);

    cars.forEach((element, index, array) => {
        carInfo[index] = element.Value;
    })

    // the code above is to fetch data from the VIN api 
    

    // the code below is to gather the data fetched from VIN api and post it to the cars api.

    const carObj = {
        year: carInfo[10],
        make: carInfo[7],
        model: carInfo[9],
        date_on_yard: '2023-10-05',
        style: carInfo[14],
        drive_type: carInfo[51],
        engine: carInfo[75],
        fuel_type: carInfo[77],
        vin: searchQuery,
        color: 'NULL',
        transmission: 'NULL'

    }
    


    const [postData, setPostData] = useState({key: 'value'});

    const handlePostRequest = () => {
        fetch('http://localhost:8000/api/cars/', {
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

   



    return(
        <div>
            <div>
                <h1>INPUT YOUR VEHICLE'S VIN </h1>
                <input 
                    type = "text"
                    value = {searchQuery}
                    onChange = {handleInputChange}
                    placeholder='Enter VIN'
                />
                <button onClick={handleSearchClick}>Search VIN</button>
            </div>
            <div>
                <h2>Search Query: {searchQuery}</h2>
                <h2>Search Results:</h2>
                    <ul>
                    <li>{carInfo[10]}</li>
                    <li>{carInfo[7]}</li>
                    <li>{carInfo[9]}</li>
                    <li>{carInfo[14]}</li>
                    <li>{carInfo[51]}</li>
                    <li>{carInfo[75]}</li>
                    <li>{carInfo[77]}</li>
                    
                    </ul>
            </div>
            <div>
            <h1>Post Data to API</h1>
                <button onClick={handlePostRequest}>Post Data</button>
            </div>
        </div>
    );
}


   //carInfo[7] MAKE
   //carInfo[9] MODEL
   //carinfo[10] YEAR
   //carInfo[14] STYLE
   //carInfo[13] TRIM
   //carInfo[51] DRIVE TYPE
   //carInfo[75] ENGINE
   //carInfo[77] FUEL TYPE
   //
  
    /*

    1FTFW1RG5JFD84810

    
    const carObj = {
        year: carInfo[10],
        make: carInfo[7],
        model: carInfo[9],
        date_on_yard: 'NULL',
        style: carInfo[14],
        drive_type: carInfo[51],
        engine: carInfo[75],
        fuel_type: carInfo[77],
        vin: searchQuery,
        color: 'NULL',
        transmission: 'NULL'

    }
    
    useEffect(() =>{
    console.log("Fetching...");
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVIN/JTEBU14R730009127?format=json')
    .then(response=> response.json())
    .then(data => {
        setCars(data.Results);
    });
    },[]);

    //console.log(cars[8]);
    //console.log()

   

   const carRender = cars.map((car) => 
        <p1>{car.Value}</p1>
   )

   //console.log(cars.length);

    const carInfos = cars.forEach((element, index, array) =>{
        //console.log(index + " " + element.Variable + " " + element.Value);
        
   })


   

   //cars.forEach((element, index, array) => {
        //carInfo[index] = element.Value;
  // })

  <ul>
                    {cars.map((car, index) => (
                        <li key={index}>{car.Value}</li> 
                    ))}
                    </ul>

  */
