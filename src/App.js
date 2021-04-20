import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ReactComponent as Icon } from './images/icon-arrow.svg'
function App() {
  const [active, setActive] = useState(false);
  const [location, setLocation] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [isp, setIsp] = useState('');
  const [ip, setIp] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const center = [lat, long];



  async function getLoc() {
    await axios.get(`https://geo.ipify.org/api/v1?apiKey=at_okK0qhn2UFGroQVcOA190j9Ceqki7&ipAddress=${ip}`)
      .then((res) => {
        const data = res.data;
        setLat(data.location.lat);
        setLong(data.location.lng);
        setIp(data.ip);
        setLocation(data.location.city);
        setTimeZone(data.location.timezone);
        setIsp(data.isp);
        console.log(lat);
        console.log(long);
      })
  };

  useEffect(() => {
    getLoc()
    setActive(true);
    return <MapContainer key={`${lat}`} center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {<Marker position={center}>
        <Popup>
          {isp}
        </Popup>
      </Marker>}

    </MapContainer>
  }, [active])

  return (
    <div className="container">
      <div className="top">
        <img src={'pattern-bg.png'} alt='background'></img>
        <div className="title">
          <h1>IP Address Tracker</h1>
        </div>
        <div className="input">

          <input type="text" onChange={(e) => setIp(e.target.value)} value={ip} placeholder="Search for any IP address or domain"></input>
          <div className="go"><button className="button" onClick={() => setActive(false)}><Icon></Icon></button></div>
        </div>

        <div className="cards">
          <div className="cards_child">
            <span>IP ADDRESS</span>
            <h1>{ip}</h1>
          </div>
          <div className="divider"></div>

          <div className="cards_child">
            <span>LOCATION</span>
            <h1>{location}
            </h1>
          </div>
          <div className="divider"></div>

          <div className="cards_child">
            <span>TIMEZONE</span>
            <h1>{timeZone}</h1>
          </div>
          <div className="divider"></div>

          <div className="cards_child">
            <span>ISP</span>
            <h1>{isp}</h1>
          </div>
        </div>
        {active ?
          <MapContainer key={`${lat}`} center={center} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {<Marker position={center}>
              <Popup>
                {isp}
              </Popup>
            </Marker>}

          </MapContainer>

          :
          <div></div>}

      </div>

    </div>
  );
}

export default App;
