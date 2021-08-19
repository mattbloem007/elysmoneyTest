import Loading from './loading'

const TokenInfoBox = (props) => {
    let boxStyle = {
        display: 'inline-block',
        fontSize: 30,
        textAlign: 'center',
        width: 250,
        marginLeft: 20,
        marginRight: 25,
        color: '#ed6f1b',
        fontWeight: 'bold'
    }

    if(props.loading){
        return (
            <div style={boxStyle}><Loading /></div>
        )
    }
    return (
        <div style={boxStyle}>
            <div style={{fontSize: 30, marginBottom: 8}}>{props.text}</div>
            <div style={{fontSize: 20}}>{props.label}</div>
        </div>
    )
}

export default TokenInfoBox