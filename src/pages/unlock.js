import React, { Component } from 'react'
import TokenInfoBox from '../components/tokeninfobox'
import Contract from '../lib/contract'
import Withdraw from '../components/withdraw'
import contractAddress from '../crypto/contractAddress';



class TokenInfo extends Component {
    state = {
        lockedLoading: true,
        withdrawnLoading: true,
        availableLoading: true,
        locked: 0,
        withdrawn: 0,
        available: 0,
        waitingForWithdraw: false,
        account: ''
    }
    withdraw = async () => {
        let lock = this.props.lock
        this.setState({waitingForWithdraw:true})
        //need to do polling etc. here
        let checkDone = setInterval(async ()=>{
            try{
                let available = await lock['amountCanRelease']([])
                if(available===0){
                    clearInterval(checkDone)
                    await this.getInfo(lock)
                    this.setState({waitingForWithdraw:false})
                }
            }
            catch(e){
                console.log(e)
            }
        },20000)
        await lock['release']([])
        clearInterval(checkDone)
        await this.getInfo(lock)
        this.setState({waitingForWithdraw:false})
    }
    
    getInfo = async () => {
        if(!this.props.lock){
            this.setState({
                lockedLoading: false,
                locked: "0",
                withdrawnLoading: false,
                withdrawn: "0",
                availableLoading: false,
                available: "0"
            })
        }
        let lock = this.props.lock
        try{
            let locked = await lock['locked']([])
            locked = parseInt(locked/100000).toString()
            this.setState({lockedLoading: false,locked: locked})
        }
        catch(e){
            this.setState({lockedLoading: false,locked: "0"})
        }

        try{
            let withdrawn = await lock['released']([])
            withdrawn = parseInt(withdrawn/100000).toString()
            this.setState({withdrawnLoading: false,withdrawn: withdrawn})
        }
        catch(e){
            this.setState({withdrawnLoading: false,withdrawn: "0"})
        }

        try{
            let available = await lock['amountCanRelease']([])
            available = parseInt(available/100000).toString()
            this.setState({availableLoading: false,available: available})
        }
        catch(e){
            this.setState({availableLoading: false,available: "0"})
        }
    }
    componentDidMount = async () => {
        await this.getInfo()
    }
    render = () => {
        return (
            <div style={{
                maxWidth: 900,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 40,
                textAlign: 'center'
            }}>
                <TokenInfoBox text={this.state.locked + " ELYS"} label="Locked" loading={this.state.lockedLoading}/>
                <TokenInfoBox text={this.state.withdrawn + " ELYS"} label="Already Withdrawn" loading={this.state.withdrawnLoading}/>
                <TokenInfoBox text={this.state.available + " ELYS"} label="Available to Withdraw" loading={this.state.availableLoading}/>
                <Withdraw amount={parseFloat(this.state.available)} withdraw={this.withdraw} waiting={this.state.waitingForWithdraw} />
            </div>
        )
    }
}

class UnlockPage extends Component {
    state = {
        lockSeed: null,
        lockTeam: null,
        viewing: 'seed',
        loading: true,
        account: ''
    }
    getLock = async (factory) => {
        
        let TokenFactory = new Contract('lockFactory',contractAddress[factory])
        let accounts = await window.web3.eth.getAccounts()
        let account = accounts[0]
        this.setState({account: account})
        try{
            let lockAddress = await TokenFactory['getLock']([account])
            return new Contract('lockToken',lockAddress)
        }
        catch(e){
            return null
        }
        
    }

    componentDidMount = async () => {
        let seedLock = await this.getLock('lockFactorySeed')
        let teamLock = await this.getLock('lockFactoryTeam')
        this.setState({
            lockSeed: seedLock,
            lockTeam: teamLock,
            loading: false
        })
    }
    choose = (lock) => {
        this.setState({viewing:lock})
    }
    render = () => {
        let style={
            display: 'block',
            marginTop: 100,
            textAlign: 'center',
            fontSize: 20,
            width: '100%'
        }
        if(this.state.loading)return (
            <div style={style}>Loading..</div>
        )
        if(!this.state.lockSeed && !this.state.lockTeam)return (
            <div style={style}>
                You don't currently have any tokens locked up for this account
                <div style={{fontSize: 12, color: '#dddddd', marginTop: 10}}>[{this.state.account}]</div>
            </div>
        )
        if(this.state.lockSeed && this.state.lockTeam){
            let tokenInfo = (this.state.viewing==='seed')?(<TokenInfo lock={this.state.lockSeed} />):(<TokenInfo lock={this.state.lockTeam} />)
            return (
            <div>
                <div style={{width: 300, marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}>
                    <button onClick={()=>this.choose('seed')} style={{
                        display: 'inline-block',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontWeight: (this.state.viewing==='seed')?'bold':'normal',
                        borderBottom: (this.state.viewing==='seed')?'solid 1px #ffffff':'none',
                        cursor: (this.state.viewing==='seed')?'none':'pointer',
                        fontSize: 18,
                        marginRight: 20,
                        color: (this.state.viewing==='seed')?'#ffffff':'#eeeeee'
                    }}>Seed Tokens</button>
                    <button onClick={()=>this.choose('team')} style={{
                        display: 'inline-block',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontWeight: (this.state.viewing==='team')?'bold':'normal',
                        borderBottom: (this.state.viewing==='team')?'solid 1px #ffffff':'none',
                        cursor: (this.state.viewing==='team')?'none':'pointer',
                        fontSize: 18,
                        marginLeft: 20,
                        color: (this.state.viewing==='team')?'#ffffff':'#eeeeee'
                    }}>Team Tokens</button>
                </div>
                {tokenInfo}
            </div>
            )
        } 
        if(this.state.lockSeed) return (<TokenInfo lock={this.state.lockSeed} />)
        return (<TokenInfo lock={this.state.lockTeam} />)
    }
}

export default UnlockPage