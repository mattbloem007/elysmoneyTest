import React, { Component } from 'react'
import Banner from '../components/banner'
import Web3 from "web3";
import Intro from '../components/intro'
import Connect from '../components/connect'
import TokenInfo from '../components/tokeninfo'
import UnlockPage from './unlock'
import FarmPage from './farm'
import SwapPage from './swap'
import Footer from '../components/footer'
import SideMenu from '../components/sidemenu'
import elysPrice from '../lib/elysprice'
import {isMobile} from 'react-device-detect';

import PageWrapper from '../components/pagewrapper'

import detectEthereumProvider from '@metamask/detect-provider'

class Main extends Component {
    state = {
        elysPrice: 0,
        sideMenuHidden: false,
        page: 'home'
    }
    checkMetamask = async () => {
        let provider = await detectEthereumProvider()
        if (provider) {
            window.ethereum = provider
            return true //window.ethereum.isMetaMask 
        }
        return false
    }
    getPrice = async () => {
        let price = await elysPrice.get()
        return price
    }
    connected = async () => {
        let price = await this.getPrice()
        this.setState({connected:true,elysPrice: price})
        setInterval(async () => {
            let price = await this.getPrice()
            this.setState({connected:true,elysPrice: price})
        },30000)
    }
    gotoPage = (page) => {
        if(page==='homepage'){
            window.location.href="https://www.elyseos.com"
            return
        }
        this.setState({page: page})
    }
       
    render = () => {
        /*
        let body = null
        if(this.state.loading){
            body = <Loading />
        } else {
            if(this.state.hasMetamask && !this.state.isConnected){
                body = <Connect connect={this.connect}/>
            } else if (!this.state.hasMetamask){
                body = <div>no metamask</div>//create metamask info
            } else {

                body=(
                    
                )
            }
        }
        */
       let body = null
        switch(this.state.page){
            default:
            case 'home':
                body = (<PageWrapper connected={this.connected}>
                    <Intro />
                </PageWrapper>)
                break
            case 'token':
                body = (<PageWrapper connected={this.connected}>
                    <UnlockPage />
                </PageWrapper>)
                break
            case 'farm':
                body = (<PageWrapper connected={this.connected}>
                    <FarmPage />
                </PageWrapper>)
                break
            case 'swap':
                body = (<PageWrapper connected={this.connected}>
                    <SwapPage />
                </PageWrapper>)
                break
                
        }


        return (
            <div style={{position: 'relative', width: '100%', height: '100%', display: 'flex'}} id="main">
                <SideMenu hidden={this.state.sideMenuHidden}  page={this.state.page} price={this.state.elysPrice} connected={this.state.connected} gotoPage={this.gotoPage}/>
                <div style={{display: 'inline-block',width: 'auto',verticalAlign: 'top', position: 'relative'}}>
                    <Banner />
                    {body}
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Main