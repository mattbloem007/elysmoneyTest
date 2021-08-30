import React, { Component } from 'react'
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider'
import Loading from './loading'
import Connect from './connect'

class PageWrapper extends Component {
    state = {
        loading: true,
        hasMetamask: false,
        isConnected: false,
    }
    checkMetamask = async () => {
        let provider = await detectEthereumProvider({mustBeMetaMask:true})
        if (provider) {
            window.ethereum = provider
            return true //window.ethereum.isMetaMask 
        }
        return false
    }
    connect = async () => {
        //window.ethereum.enable();
        try{
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            let connected = accounts.length>0 && window.ethereum.isConnected
            if(connected){
                this.setState({isConnected: true})
                this.props.connected()
            }
        }
        catch(e){
            console.log(e)
        }
    }
    componentDidMount = async () => {
        let hasMetamask = await this.checkMetamask()
        if(hasMetamask){
            window.web3 = new Web3(window.ethereum);
            if(!window.ethereum.isConnected){
                this.setState({loading: false,hasMetamask: true, isConnected: false})
                return
            }
            let accounts = await window.web3.eth.getAccounts();
            let connected = accounts.length>0
            this.setState({loading: false,hasMetamask: true, isConnected: connected})
            this.props.connected()
        }
        else{
            this.setState({loading: false})
        }
        
    }
    render = () => {
        if(this.state.loading){
            return (
                <div style={{display: 'flex', position: 'relative', minHeight: 700}}>
                        <Loading />
                </div>
            )
        } else {
            if(this.state.hasMetamask && !this.state.isConnected){
                return (
                    <div style={{display: 'flex', position: 'relative', minHeight: 700}}>
                            <Connect connect={this.connect}/>
                    </div>
                )
            } else if (!this.state.hasMetamask){
                return (
                    <div style={{display: 'flex', position: 'relative', minHeight: 700}}>
                            no metamask
                    </div>
                )
            } else {
                return (
                    <div style={{display: 'flex', position: 'relative', minHeight: 700}}>
                        {this.props.children}
                    </div>
                )
            }
        }
        
    }

}

export default PageWrapper