import { createSlice } from '@reduxjs/toolkit'

export const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: {
        activeWatchlist: "Must Buy",
        watchlist: ["Must Buy"],
        coins: [],
    },
    reducers: {
        setCoins: (state, action) => {
            const { payload } = action
            state.coins= [...payload];
        },
        addCoin: (state, action) => {
            const { payload } = action
            state.coins = [...state.coins.concat(payload)] ;
        },
        setWatchlist: (state, action) => {
            const { payload } = action
            state.watchlist = [...payload] ;
        },
        addToWatchlist: (state, action) => {
            const { payload } = action
            state.watchlist = [...state.watchlist, payload] ;
        },
        removeCoin: (state, action) => {
            const { payload } = action
            const index = state.coins.filter(ele=>ele.name !== payload.name);
            state.coins = [...index];
        },
        setActiveWatchList: (state, action) => {
            const { payload } = action
            state.activeWatchlist = payload
        },
    },
})

export const { setCoins, setActiveWatchList, addCoin, removeCoin, setWatchlist, addToWatchlist } = watchlistSlice.actions

export const getCoins = state => state.watchlist.coins
export const activeWatchlist = state => state.watchlist.activeWatchlist
export const getWatchlists = state => state.watchlist.watchlist

export default watchlistSlice.reducer