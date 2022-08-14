import axios from 'axios'

export const weather_check = async (startplace_lat,startplace_lng, endplace_lat, endplace_lon , startaddress, endaddress) =>{

    

    let url = 'http://127.0.0.1:8000/api/check-weather/';
    let body = {
        start_lat: startplace_lat,
        start_lon: startplace_lng,
        end_lat:endplace_lat,
        end_lon:endplace_lon,
        startaddress:startaddress,
        endaddress:endaddress

    }
    
    let resp;
    try{
        
        resp = await axios.post(url, body);



    }catch(err){

        resp ={
            data : err,
            error:false
        }

    }
    
    
    return resp;




}