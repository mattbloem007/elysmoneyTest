const Intro = () => (
    <div style={{
        fontSize: 15,
        fontWeight: 700,
        textAlign: 'center',
        display: 'block',
        maxWidth: 750,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        padding: 5
    }}>
        <div>
        This is the home of the ELYS token. ELYS is the native token of the Elyseos Sacramental Medicine ecosystem. To find out more visit
        <a href="https://www.elyseos.com" style={{
            display: 'block',
            fontSize: 25,
            color: '#ffffff',
            textDecoration: 'none',
            marginTop: 10
        }}>www.elyseos.com</a>
        </div>
        <div style={{maxWidth: 420, marginLeft: 'auto', marginRight: 'auto', marginTop: 30}}>
            Elys.money is for interacting with the Token itself. You can:
            <ul style={{textAlign: 'left'}}>
                <li style={{padding: 5}}>Stake your liquidity for 3, 6, 12 months to earn ELYS rewards</li>
                <li style={{padding: 5}}>Long-term stake your ELYS to earn ELYS rewards</li>
                <li style={{padding: 5}}>Bridge from ELYS to ETH</li>
                <li style={{padding: 5}}>Get tools to accept ELYS on your website</li>
                <li style={{padding: 5}}>Find vendors who accept ELYS</li>
            </ul>
        </div>

    </div>
)

export default Intro

