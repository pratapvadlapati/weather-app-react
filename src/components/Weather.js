import React, {useState, useEffect} from 'react';
const WEATHER_API_KEY='a1b033436a7ee971bf921ec647240fef';




const Weather = () => {
    let temp
    const [values, setValues] = useState({
        name: "",
        min: "",
        max: "",
        icon: "",
        city: "",
        country: "",
        celsious: "",
        feels:"",
        error: "",
        description: "",
        dt: "",
        rangeId : ""
    })

    const {name, min, max, icon, city, country, celsious, feels, description, error, dt, rangeId} = values;

//invke api
    const getWeather = async() => {

             fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${WEATHER_API_KEY}`)
           /*  const resp =  apiCall.json(); */
           .then(data => {
                
                return data.json();
           })
           .then(resp => {
             if(resp.cod === '400') {
                 setValues({...values, error: resp.message})   
             }else{   
            if(resp) {
                setValues({...values,
                    city: resp.name,
                    country: resp.sys.country,
                    feels: resp.main.feels_like,
                    min: getCelsious(resp.main.temp_min),
                    max: getCelsious(resp.main.temp_max),
                    icon: resp.weather[0].icon,
                    description: resp.weather[0].description,
                    dt: getDateTiem(resp.dt),
                    rangeId: resp.weather[0].id   
                })
            } else {
                console.log('no response data received')
            }
             }
           })
           .catch(err => {console.log(err)})
            
     
    }
    
    //get icons based on weather
    const weatherIcon = {
            thunderstorm : "wi-thrundestorm",
            drizzle: "wi-sleet",
            rain: "wi-storm-sowers",
            snow: "wi-snow",
            Atmosphere: "wi-fog",
            clear: "wi-day-sunny",
            clouds: "wi-day-fog"
    }

    
    const getIcon = (weatherIcon, rangeId) => {
        switch(true){
            case rangeId >= '200' && rangeId <= '232' :
                setValues({...values,icon: weatherIcon.thunderstorm})
            case rangeId >= '300' && rangeId <= '321' :
                setValues({...values, icon: weatherIcon.drizzle})
            case rangeId >= '500' && rangeId <= '531' :
                setValues({...values, icon: weatherIcon.rain})
            case rangeId >= '600' && rangeId <= '622' :
                setValues({...values, icon: weatherIcon.snow})
            case rangeId >= '700' && rangeId <= '781' :
                setValues({...values, icon: weatherIcon.Atmosphere})
            case rangeId >= '800' && rangeId <= '804' :
                setValues({...values, icon: weatherIcon.drizzle})
        }
       
        
    }


    //get data
   const getDateTiem = (ts) => {
        let unixTS =  ts;
        let milliseconds = (unixTS * 1000)
        let date = new Date(milliseconds);

        //get the date
        
        let ftdate = (date).toString()
        let formatDate = ftdate.substring(0, 10)

        //get the day of week
       // let day =   date.toLocaleString("en-US", {weekday: "long"})
        
        const formattedDate = formatDate
        return formattedDate;
   }



    // handle change
    const handleChange = (e) => {
        setValues({
            name: e.target.value
        })
    }

   
    //on submit
    const onSubmit = (event) => {
        event.preventDefault();
        getWeather();
    }
 

    const getCelsious = (temp) => {
        let cell = Math.floor(temp - 273.5) 
        return cell
    }
  

    return(
        <div className="container">
            <div class="md-form active-cyan active-cyan-2 mb-3">
         <input class="form-control text-light text-center"
          type="text" 
          placeholder="Enter City" 
          aria-label="Search"
          required
          onChange={handleChange}
           value={name}
           />
         <button className="btn btn-outline-warning btn-rounded btn-sm b-4 mt-2"
         onClick={onSubmit}>Search</button>
        </div>
        <div>
            
       {error ? <p>Please enter the city name</p>: null}
        { city ? <h2>{city}</h2> : null}
          </div>
           { min ? <span className="lead p-3">{min}<i>&deg;</i> <i>C</i></span> : null}  
           { max ? <span className="lead p-3">{max}<i>&deg;</i> <i>C</i></span> : null}
          <h3>
          { icon ? <i className={`wi ${icon}`}></i> : null}
          </h3>
             <span>{dt}</span>
        </div>
    )
}



export default Weather;