import React, { Component } from 'react'
import Banner from '../components/banner'
import Web3 from "web3";
import Intro from '../components/intro'
import Connect from '../components/connect'
import Loading from '../components/loading'
import TokenInfo from '../components/tokeninfo'
import Footer from '../components/footer'

import detectEthereumProvider from '@metamask/detect-provider'

class Main extends Component {
    state = {
        loading: true,
        hasMetamask: false,
        isConnected: false
    }
    checkMetamask = async () => {
        let provider = await detectEthereumProvider()
        if (provider) {
            return window.ethereum.isMetaMask
        }
        return false
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
            let connected = accounts.length>0;
            this.setState({loading: false,hasMetamask: true, isConnected: connected})
        }
        else{
            this.setState({loading: false})
        }
    }
    connect = async () => {
        //window.ethereum.enable();
        try{
            let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            let connected = accounts.length>0 && window.ethereum.isConnected
            if(connected){
                this.setState({isConnected: true})
            }
        }
        catch(e){
            console.log(e)
        }
    }
    render = () => {
        let body = null
        if(this.state.loading){
            body = <Loading />
        } else {
            if(this.state.hasMetamask && !this.state.isConnected){
                body = <Connect connect={this.connect}/>
            } else if (!this.state.hasMetamask){
                body = <div>no metamask</div>
            } else {
                body=(
                    <TokenInfo/>
                )
            }
        }

        return (
            <div>
                <Banner />
                <Intro />
                {body}
                <Footer />
            </div>
        )
    }
}

export default Main