import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Services from '../../Services/api'
import { removeCoin } from '../../Slices/watchlistSlice'
import { toastConfig } from '../../utils'

const CoinDetails = ({ coinId }) => {
    const [coin, setCoin] = useState({})
    const [isDataPresent, setIsDataPresent] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        Services.getCoinDetails(coinId).then(resp => {
            setCoin(resp);
            setIsDataPresent(true);
        }).catch(() => {
            toast.error('Api request limit exceeded', toastConfig)
        })
    }, [])

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const getValueWithIndicator = (val, withDollar) => {
        if (val) {
            if (val > 0) {
                return (<div className='upward-indicator'>
                    <span className="material-icons">
                        arrow_drop_up
                    </span>
                    <span>{withDollar ? USDollar.format(val) : val}{!withDollar && '%'}</span>
                </div>)
            } else {
                return (<div className='downward-indicator'>
                    <span className="material-icons">
                        arrow_drop_down
                    </span>
                    <span>{Math.abs(withDollar ? USDollar.format(val) : val)}{!withDollar && '%'}</span>
                </div>)
            }
        }
    }

    const removeCoinFromWatchlist = () => {
        dispatch(removeCoin(coin));
    }

    if (!isDataPresent) {
        return;
    }

    return (
        <>
                <td className='align-left' width="20%">
                    <div className='name-container'>
                        <img className='coin-image' src={coin?.image?.large} alt="coin_img"></img>
                        <span>{coin.name}</span>
                        <span className='symbol'>{coin?.symbol?.toUpperCase()}</span>
                    </div>
                </td>
                <td className='align-right' width="10%">{USDollar.format(coin?.market_data?.current_price?.usd)}</td>
                <td className='align-right' width="10%">{getValueWithIndicator(coin?.market_data?.price_change_percentage_24h)}</td>
                <td className='align-right' width="10%">{getValueWithIndicator(coin?.market_data?.price_change_percentage_7d)}</td>
                <td className='align-right' width="11%">{getValueWithIndicator(coin?.market_data?.price_change_percentage_1y)}</td>
                <td className='align-right' width="17%">{USDollar.format(coin?.market_data?.market_cap?.usd)}</td>
                <td className='align-right' width="17%">
                    {USDollar.format(coin?.market_data?.total_volume?.usd)}
                    <button className='delete-button' width='0%' onClick={removeCoinFromWatchlist}>
                        <span class="material-icons-outlined">
                            delete
                        </span>
                        Remove
                    </button>
                </td>
        </>
    )
}

export default CoinDetails