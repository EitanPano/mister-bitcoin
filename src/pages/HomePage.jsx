import { Component } from 'react'
import axios from 'axios'
import { userService } from '../services/userService'
import { storageService } from '../services/storageService'

export class HomePage extends Component {
    state = {
        user: null,
        BTC: ''
    }
    async componentDidMount() {
        const user = await userService.getUser()
        const BTC = await this.getBtc(user.coins)
        this.setState({ user, BTC })
    }

    async getBtc(coins) {
        if (!storageService.load('btc') || storageService.load('dollar') !== coins) {
            const btcDollarRate = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
            storageService.store('btc',btcDollarRate.data)
            storageService.store('dollar',coins)
        }
        return storageService.load('btc')
    }


    render() {
        const { user, BTC } = this.state
        return (
            !user ? <div>Loading...</div> :
                <div className="container user-details">
                    <div>
                        <img src={`https://robohash.org/${user.name}?set=set5`} alt="" />
                    </div>
                    <div>
                        <div className="details-row">
                            <span className="material-icons icon">campaign</span>
                            <h2>Hello {user.name.split(' ')[1]}</h2>
                            {/* <h3>{user.name}</h3> */}
                        </div>
                        
                        <div className="details-row">
                            <span className="material-icons icon">account_balance_wallet</span>
                            <h2>Balance:</h2>
                            <h3>{user.coins} $</h3>
                        </div>
                        
                        <div className="details-row">
                            <span className="material-icons icon">currency_bitcoin</span>
                            <h2>BTC:</h2>
                            <h3>{BTC}</h3>
                        </div>
                    </div>
                </div>

        )
    }
}
