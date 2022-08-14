import React from "react";
import PlacesSearch from "./PlacesSearch";
import { useState } from "react";
import { weather_check } from "../utils/backend-handlers/weather_check";
function GetDataForm({changeRespData}) {
  const [startlat, setStartLat] = useState(null);
  const [startlon, setStartLon] = useState(null);
  const [endlat, setEndLat] = useState(null);
  const [endlon, setEndLon] = useState(null);
  const [startaddress, setStartAddress] = useState(null);
  const [endaddress, setEndAddress] = useState(null);


  // const [respdata, setRespdata] =useState(null)
  const changeLatLon = (_lat, _lon, isStart) => {
    if (isStart === true) {
      setStartLat(_lat);
      setStartLon(_lon);
    } else {
      setEndLat(_lat);
      setEndLon(_lon);
    }
  };

  const changeFormattedAddress = (formatted_address, isStart) => {
    if(isStart){
      setStartAddress(formatted_address)
    }else{
      setEndAddress(formatted_address)
    }
  }


  console.log({ startlat }, { startlon }, { endlat }, { endlon });

  const [loading, setLoading] = useState(false)
  const checkWeather = () =>{
    if(startlat && startlon && endlat && endlon){
      setLoading(true)
      weather_check(startlat, startlon, endlat, endlon, startaddress, endaddress).then((res)=>{
          console.log(res);
          if(res?.data?.resp_now?.error == false && res?.data?.resp_forecast?.error ==false ){
            changeRespData({
              current_precip :res?.data?.resp_now?.data[0]?.precip,
              forecast_time:res?.data?.resp_forecast?.data?.timestamp_utc
            })
          

          }
          setLoading(false)
      }).catch((err)=>{
        console.log(err);
      })

    }
  }

  // console.log(respdata);
  return (
    <div className="flex justify-center items-center p-6 w-full bg-white rounded-md shadow-md">
      <div className="block w-full">
        <h1 className="text-xl font-medium block mb-2 mt-4">Start Place</h1>
        <PlacesSearch changeLatLon={changeLatLon} isStart={true} changeFormattedAddress={changeFormattedAddress} />

        <h1 className="text-xl font-medium block mt-4 mb-2">Destination</h1>
        <PlacesSearch changeLatLon={changeLatLon} isStart={false} changeFormattedAddress={changeFormattedAddress}/>

        <div className="w-full my-6">
          <button disabled={loading} className="w-full p-2 rounded-md bg-indigo-600 disabled:opacity-50 text-white text-lg" onClick={()=>checkWeather()}>
            Check
          </button>
        </div>
      </div>

      {/* <h1>{lat} {lon}</h1> */}
    </div>
  );
}

export default GetDataForm;
