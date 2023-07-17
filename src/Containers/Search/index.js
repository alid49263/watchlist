import React, { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import Services from '../../Services/api';
import { addCoin, removeCoin } from '../../Slices/watchlistSlice';
import { debounce, toastConfig } from '../../utils';
import toast from 'react-hot-toast';
import './styles.scss';

const Search = ({ coins }) => {
    const [option, setOption] = useState([]);
    const [value, setValue] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        loadOptions('');
    }, [])


    const loadOptions = (
        inputValue
    ) => {
        setLoading(true);
        Services.searchCryptoWithQuery(inputValue).then(resp => {
            setLoading(false);
            const data = resp.coins.slice(0, 10).map(coin => {
                return {
                    label: coin.name,
                    value: coin.id,
                    data: coin,
                }
            })
            setOption(data);
        }).catch(() => {
            toast.error('Api request limit exceeded', toastConfig)
        })
    };

    const getCryptoLabel = (coin) => {
        const coinsList = coins || [];
        return (
            <div className='option-container'>
                <img className='thumb-image' src={coin.large} alt="img"></img>
                <p className='option-name'>{coin.name}</p> <p className='option-symbol'>({coin.symbol})</p>
                {coinsList.findIndex(ele => ele.name === coin.name) === -1 && <button className='button' onClick={() => addToWatchlist(coin)}>+ Add</button>}
                {coinsList.findIndex(ele => ele.name === coin.name) > -1 && <button className='button remove' onClick={() => removeFromWatchlist(coin)}><span>Remove</span></button>}
            </div>
        )
    }

    const addToWatchlist = (coin) => {
        dispatch(addCoin(coin))
        toast.success('Coin added', toastConfig)
    }

    const removeFromWatchlist = (coin) => {
        dispatch(removeCoin(coin))
        toast.success('Coin removed', toastConfig)
    }

    return (
        <div className='search-container'>
            <Select
                value={value}
                placeholder="Search eg: Bitcoin, Cardano, Solana"
                options={option}
                isLoading={loading}
                onInputChange={debounce((e) => {
                    loadOptions(e)
                }, 500)}
                onChange={() => {
                    setValue(null);
                }}
                formatOptionLabel={(coin) => getCryptoLabel(coin.data)}
            />
        </div>
    )
}

export default memo(Search)