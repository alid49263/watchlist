import Request from '../request';

const Services={
    searchCryptoWithQuery: (query)=>{
        const url= `/api/v3/search?query=${query}`
        return Request.get(url);
    },
    getCoinDetails: (coinId)=>{
        const url= `/api/v3/coins/${coinId}?market_data=true`
        return Request.get(url);
    }
}

export default Services;