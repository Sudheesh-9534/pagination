import axios from 'axios';

const testurl="https://ddbhnfigh3.execute-api.us-west-2.amazonaws.com/development"
const end= testurl + "/myyshopp"

 function report(service){
    return axios.post(end,service)
    .then((data)=>data)
    .then((res)=>res)

}
export default report