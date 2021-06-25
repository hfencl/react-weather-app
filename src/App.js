import './App.css';
import React, {useState} from 'react';

const api = {
	key: "d116accaa13bf804b0acc66f177e59f3",
	base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const search = evnt => {
		if (evnt.key === "Enter") {
			fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then(res => res.json())
				.then(result => {
					setWeather(result);
					setQuery('');
					console.log(result);
				});
		}

	}


	const dateBuilder = (d) => {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		
		let day = days[d.getDay()];
		let date = d.getDay();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`
	}

  return (
    <div className={
    	(typeof weather.main != "undefined")
    	 ? ((weather.main.temp > 16) 
    	 	? 'App warm' : 'App') : 'app'}>
    	<main>
    		<div className="searchBox">
    			<input type="text"
    			  className="searchBar"
    			  placeholder="Search..."
    			  onChange={e => setQuery(e.target.value)}
    			  value={query}
    			  onKeyPress={search}
    			/>
    		</div>
    		{(typeof weather.main != "undefined") ? (
    		<div>
    			<div className="locationBox">
    				<div className="location">{weather.name}, {weather.sys.country}</div>
    				<div className="date">{dateBuilder(new Date())}</div>
    			</div>
    			<div className="weatherBox">
    		 		<div className="temperature">
    		 			{Math.round(weather.main.temp)}°C
    		 		</div>
    		 	<div className="weather">{weather.weather[0].main}</div>
    		 	</div>
    		</div>
    		) : ('')}
    		
    	
    	</main>
      
    </div>
  );
}

export default App;
