import React, { Component } from 'react'
import Contract from '../lib/contract'
import contractAddress from '../crypto/contractAddress';

const orange = '#ec7019'

let trimDec = (n,dec) => {
    let ar = n.toString().split('.')
    if(ar.length===1) return ar[0]
    if(dec===0) return ar[0]
    ar[1] = ar[1].substr(0,dec)
    return ar.join('.')
}

let addCommas = (amnt) => {
    let ar = amnt.toString().split('').reverse()
    let cnt = 0
    let rslt = ''
    for(var i in ar){
        if(cnt===3){
            cnt=0
            rslt = ',' + rslt
        }
        rslt = ar[i] + rslt
        cnt++
    }
    return rslt
}

class Stats extends Component {
    state = {
        totalSupply: 0
    }
    loading = () => this.state.totalSupply>0 && !this.props.price.loading
    getTotalElys = async () => {
        let Token = new Contract('elys',contractAddress['elys'])
        let totalSupply = await Token['totalSupply']()
        this.setState({totalSupply})
    }
    getLocked = async () => {

    }
    componentDidMount = async () => {
        
        await this.getTotalElys()
    }
    marketCap = () => {
        return addCommas(trimDec((this.state.totalSupply/100000)*this.props.price.usd,0))
    }
    render = () => {
       
        return (
            <div>Market Cap: ${this.marketCap()}</div>
        )
    }

}

export default Stats