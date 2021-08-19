import React, { Component } from 'react'
import TokenInfoBox from './tokeninfobox'
import Contract from '../lib/contract'
import Withdraw from './withdraw'
import contractAddress from '../crypto/contractAddress';



class TokenInfo extends Component {
    state = {
        lockedLoading: true,
        withdrawnLoading: true,
        availableLoading: true,
        locked: 0,
        withdrawn: 0,
        available: 0,
        waitingForWithdraw: false
    }
    withdraw = async () => {
        let lock = await this.getLock()
        this.setState({waitingForWithdraw:true})
        await lock['release']([])
        await this.getInfo(lock)
        this.setState({waitingForWithdraw:false})
    }
    getLock = async () => {
        let TokenFactory = new Contract('lockFactory',contractAddress['lockFactory'])
        let accounts = await window.web3.eth.getAccounts()
        let account = accounts[0]
        let lockAddress = await TokenFactory['getLock']([account])
        let lock = new Contract('lockToken',lockAddress)
        return lock
    }

    getInfo = async (lock) => {
        
        let locked = await lock['locked']([])
        locked = (locked/100000).toString()
        this.setState({lockedLoading: false,locked: locked})

        let withdrawn = await lock['released']([])
        withdrawn = (withdrawn/100000).toString()
        this.setState({withdrawnLoading: false,withdrawn: withdrawn})

        let available = await lock['amountCanRelease']([])
        available = (available/100000).toString()
        this.setState({availableLoading: false,available: available})
    }
    componentDidMount = async () => {
        let lock = await this.getLock()
        await this.getInfo(lock)
    }
    render = () => {
        return (
            <div style={{
                maxWidth: 900,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 60
            }}>
                <TokenInfoBox text={this.state.locked + " ELYS"} label="Locked" loading={this.state.lockedLoading}/>
                <TokenInfoBox text={this.state.withdrawn + " ELYS"} label="Already Withdrawn" loading={this.state.withdrawnLoading}/>
                <TokenInfoBox text={this.state.available + " ELYS"} label="Available to Withdraw" loading={this.state.availableLoading}/>
                <Withdraw amount={parseFloat(this.state.available)} withdraw={this.withdraw} waiting={this.state.waitingForWithdraw} />
            </div>
        )
    }
}

export default TokenInfo