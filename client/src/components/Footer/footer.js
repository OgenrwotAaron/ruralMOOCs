import React,{useEffect} from 'react';

const Footer = () => {

    useEffect(()=>{
        window.addEventListener('scroll',getScroll)
    })
    let date=new Date()
    const getScroll=()=>{
        const headers=document.getElementById('scrolling')
        let max=document.body.scrollHeight-window.innerHeight;
        let percent=(window.pageYOffset/max) * 100;
        headers.style.width=percent +'%'
    }
    return (
        <div>
            <div className='col-xs-12' style={{color:'#1e486d',textAlign:'center',fontSize:'25px'}}>
                <div className='col-xs-3'>
                    <span className='icon icon-facebook-square'></span>
                </div>
                <div className='col-xs-3'>
                    <span className='icon icon-twitter'></span>
                </div>
                <div className='col-xs-3'>
                    <span className='icon icon-linkedin-square'></span>
                </div>
                <div className='col-xs-3'>
                    <a href="mailto:support@ruralmoocs.com">
                        <span className='icon icon-envelope'></span>
                    </a>
                </div>
            </div>
            <div style={{width:'100%'}}>
                <p style={{color:'#1e486d',textAlign:'center'}}>RuralMoocs &copy; {date.getFullYear()}</p>
            </div>
        </div>
    );
};

export default Footer;