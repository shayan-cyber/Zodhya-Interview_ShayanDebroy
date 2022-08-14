import axios from 'axios'

export const get_past_updates = async() =>{


    let url = 'http://127.0.0.1:8000/api/past-updates/';
    let resp;


    try{
        
        resp = await axios.get(url);



    }catch(err){

        resp ={
            data : err,
            error:false
        }

    }
    
    
    return resp;


}