import React from 'react'

const ContactUs=()=>{
    return (
        <div style={{background:'#f8f9fa',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <h1 style={{color:'#707070'}}>Message Us</h1>
            <h3 style={{color:'#808080',fontWeight:'300',textAlign:'center'}}>mollitia temporibus culpa dolore molestias blanditiis consequuntur sunt nisi</h3>
            <form className='form'>
                <div className='rows'>
                    <div className='col-sm-6' style={{padding:'15px'}}>
                        <input type='text' placeholder='First Name' className='form-control'/>
                    </div>
                    <div className='col-sm-6' style={{padding:'15px'}}>
                        <input type='text' placeholder='Last Name' className='form-control'/>
                    </div>
                </div>
                <div className='rows'>
                    <div className='col-sm-12' style={{padding:'15px'}}>
                        <input type='text' placeholder="Subject" className="form-control"/>
                    </div>
                </div>
                <div className='rows'>
                    <div className='col-sm-12' style={{padding:'15px'}}>
                        <input type='email' placeholder="Email" className="form-control"/>
                    </div>
                </div>
                <div className='rows'>
                    <div className='col-sm-12' style={{padding:'15px'}}>
                        <textarea className="form-control" cols='30' rows='10' placeholder='write your message here'></textarea>
                    </div>
                </div>
                <button className="btn btn-primary btn-pill" style={{margin:'15px 0'}}>SEND MESSAGE</button>
            </form>
        </div>
    )
}

export default ContactUs;