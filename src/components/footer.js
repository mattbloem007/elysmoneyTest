import twitter from "../images/twitter-black-icon.png"
import github from "../images/github-black-icon.png"
import medium from "../images/medium-black-icon.png"
import email from "../images/email-icon.png"
import discord from "../images/discord-black-icon.png"
import telegram from "../images/telegram-black-icon.png"

const Icon = (props) => {
    return (
        <a href={props.href} style={{
            textDecoration: 'none',
            width: 80,
            textAlign: 'center',
            display: 'inline-block'
        }} target="_blank" rel="noreferrer"><img style={{
            verticalAlign: 'top',  
            margin: 13
        }}
        src={props.src} alt={props.alt} href={props.href} height={22}/></a>
    )    
}

const Column = (props) => {
    return (
        <div style={{
            display: 'inline-block',
            width: 180,
            color: '#000000',
            verticalAlign: 'top',
            textAlign: 'left',
            marginLeft: 30
        }}>
            <div style={{fontSize: 16, fontWeight: 'bold', marginTop: 8, marginBottom: 5}}>{props.header}</div> 
            {props.children}
        </div>
    )
}

const Link = (props) => {
    return <a href={'https://www.elyseos.com/' + props.href} style={{
        display: 'block', 
        textDecoration: 'none',
        textAlign: 'left',
        color: '#000000',
        fontSize: 14,
        marginLeft: 4,
        marginTop: 2
    }}>{props.children}</a>
}

const Footer = () => (
    <div style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#facbac',
        height: 100
    }}>

        <div style={{
            position: 'relative',
            maxWidth: 900,
            marginLeft: 'auto',
            marginRight: 'auto'
        }}>
            <Column header="General">
                <Link href="home">About</Link>
                <Link href="faq">FAQ</Link>
            </Column>
            <Column header="Technology">
                <Link href="roadmap">Roadmap</Link>
                <Link href="token-timelines">Token</Link>
                <Link href="litepaper">Lightpaper</Link>
            </Column>
            <Column header="Community">
                <Link href="roadmap">Roadmap</Link>
                <Link href="litepaper">Lightpaper</Link>
            </Column>
            <div style={{
                display: 'inline-block',
                right: 0,
                width: 250,
                marginTop: 0
            }}>
                <Icon src={twitter} alt="twitter" href="https://twitter.com/ElyseosFDN"/>
                <Icon src={telegram} alt="telegram" href="https://t.me/joinchat/kJCUkY1WacpkZTVk"/>
                <Icon src={github} alt="github" href="https://github.com/elyseos/contracts"/>
                <Icon src={medium} alt="medium" href="https://medium.com/@Elyseos"/>
                <Icon src={email} alt="email" href="https://www.elyseos.com/email-signup"/>
                <Icon src={discord} alt="discord" href="https://discord.gg/YKJsDyHDkc"/>
            </div>
        </div>
    </div>
)

export default Footer