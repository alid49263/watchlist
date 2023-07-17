import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { getCoins } from '../../Slices/watchlistSlice';
import CoinDetails from '../CoinDetails'
import './styles.scss'

const CoinList = () => {
  const coins = useSelector(getCoins, shallowEqual);
  if (!coins || coins.length === 0) {
    return (
      <div className='list-container no-data'>
        <img width={100} height={100} src="https://kite.zerodha.com/static/images/illustrations/marketwatch.svg" alt="no_coins"></img>
        <div className='imp-message'>No Coins Added</div>
        <div className='imp-info'>Use the search bar to add coins.</div>
      </div>
    )
  }
  return (
    <div className='list-container'>
      <table className='coin-table'>
        <thead>
          <tr>
            <th className='align-left'>Name</th>
            <th className='align-right'>Price</th>
            <th className='align-right'>24h %</th>
            <th className='align-right'>7d %</th>
            <th className='align-right'>1y %</th>
            <th className='align-right'>Market Cap</th>
            <th className='align-right'>Volume</th>
          </tr>
        </thead>
        <tbody>
          {(coins || []).map((coin) => (
            <tr key={coin.name}><CoinDetails coinId={coin.id} /></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CoinList