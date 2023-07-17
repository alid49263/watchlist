import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeWatchlist, addToWatchlist, getCoins, getWatchlists, setActiveWatchList, setCoins, setWatchlist } from '../../Slices/watchlistSlice';
import List from '../CoinList';
import Modal from '../../Components/Modal';
import Search from '../Search'
import './styles.scss';
import toast from 'react-hot-toast';
import { toastConfig } from '../../utils';

const WatchList = () => {

    const [modal, setModal] = useState(false)

    const coins = useSelector(getCoins);
    const active = useSelector(activeWatchlist);
    const watchlist = useSelector(getWatchlists);

    const dispatch = useDispatch();

    const storedList = JSON.parse(localStorage.getItem("watchlists"));

    const mounted = useRef();
    const inputRef = useRef();

    useEffect(() => {
        if (storedList) {
            const parsed = storedList;
            dispatch(setCoins(parsed[active]||[]))
            dispatch(setWatchlist(Object.keys(parsed)))
            dispatch(setActiveWatchList(Object.keys(parsed)[0]))
        } else {
            const data = {};
            data[active] = coins;
            dispatch(setCoins(coins||[]))
            localStorage.setItem("watchlists", JSON.stringify(data));
        }
    }, [])

    useEffect(() => {
        const data = storedList;
        if(data){
            dispatch(setCoins(data[active]||[]));
        }
    }, [watchlist, active])
    

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }
        const data = storedList;
        if(watchlist){
            watchlist.forEach((list)=>{
                data[list]=storedList[list]||[]
            })
        }
        data[active]=coins;
        localStorage.setItem("watchlists", JSON.stringify(data));
    }, [coins, active, watchlist])

    const getWatchListHeader = () => {
        if (!watchlist) {
            return;
        }
        return <>
            {watchlist.map((watchList) => {
                return <div key={watchList} className={`watchlist-name ${watchList === active && 'active'}`} onClick={() => dispatch(setActiveWatchList(watchList))}>{watchList}</div>
            })}
            <div className='add-button' onClick={() => setModal(!modal)}><span className="material-icons">
                add
            </span></div>
        </>
    }

    if (!active) {
        return;
    }

    return (
        <div className='app-container'>
            <div className='watchlist-name-continer'>{getWatchListHeader()}</div>
            <div className='watchlist-data-container'>
                <Search coins={coins} />
                <List />
            </div>
            {modal &&
                <Modal
                    onCancel={() => setModal(false)}
                    modalHeader="Add Watchlist"
                    modalClass="s"
                    modalContent={
                        <div className="watchlist-add">
                            <div className='watchlist-label'>Watchlist Name</div>
                            <input ref={inputRef} className='watchlist-input' type="text" placeholder='Enter watchlist name'></input>
                        </div>
                    }
                    modalFooter={
                        <>
                            <button type="button" className="btn " onClick={() => { setModal(false) }}>
                                Cancel
                            </button>
                            <button type="button" className="btn primary" onClick={() => {
                                console.log(inputRef.current)
                                if(watchlist.includes(inputRef.current.value)){
                                    toast.error('Watchlist already present', toastConfig)
                                    return;
                                }
                                dispatch(setCoins([]));
                                dispatch(addToWatchlist(inputRef.current.value));
                                dispatch(setActiveWatchList(inputRef.current.value));
                                setModal(false);
                                toast.success('Watchlist added', toastConfig)
                            }}
                            >
                                Add
                            </button>
                        </>
                    }
                />
            }
        </div>
    )
}

export default WatchList