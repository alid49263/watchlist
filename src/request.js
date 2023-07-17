const url='https://api.coingecko.com';
const Request = {
    get: async(endpoint)=>{
        const resp= await fetch(`${url}${endpoint}`)
        console.log(resp)
        const data = await resp.json();
        return data;
    }
}

export default Request;