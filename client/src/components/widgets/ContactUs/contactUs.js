import React,{Component} from 'react';
import axios from 'axios'

class ContactUs extends Component{

    state={
        sendError:'',
        sendSuccess:'',
        loading:false,
        formdata:{
            fname:{
                value:''
            },
            lname:{
                value:''
            },
            subject:{
                value:''
            },
            email:{
                value:''
            },
            message:{
                value:''
            }
        }
    }

    updateForm=({e,id})=>{
        const newFormData={...this.state.formdata};
        const newElement={...newFormData[id]};
        newElement.value=e.target.value;

        newFormData[id]=newElement;

        this.setState({
            formdata:newFormData
        })
    }

    sendMessage=(event)=>{
        event.preventDefault();

        let dataToSubmit={};

        for(let key in this.state.formdata){
            dataToSubmit[key]=this.state.formdata[key].value
        }

        this.setState({
            loading:true
        })

        axios.post('/api/message',{
            fname:dataToSubmit.fname,
            lname:dataToSubmit.lname,
            subject:dataToSubmit.subject,
            email:dataToSubmit.email,
            message:dataToSubmit.message
        })
        .then(response=>{
            this.setState({
                loading:false,
                sendSuccess:'Message Sent'
            })
        })
        .catch(e=>this.setState({
            sendError:e
        }))

    }

    showFeedback=()=>{
        if(this.state.sendError !== ''){
            return (
                <div style={{color:'red'}}>{this.state.sendError}</div>
            )
        }else if(this.state.sendSuccess !== ''){
            const form=document.getElementById('form1')
            for (let i = 0; i < form.length; i++) {
                form[i].value=null
            }
            return (
                <div style={{color:'#257d38',fontSize:'18px'}}>{this.state.sendSuccess}</div>
            )
        }else{
            return null;
        }
    }

    render(){
        return (
            <div style={{background:'#f8f9fa',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <h1 style={{color:'#707070'}}>Message Us</h1>
                <h3 style={{color:'#808080',fontWeight:'300',textAlign:'center'}}>Get in touch with us for all enquiries and support</h3>
                <form id="form1" className='form' onSubmit={(e)=>{this.sendMessage(e)}}>
                    <div className='rows'>
                        <div className='col-sm-6' style={{padding:'15px'}}>
                            <input onChange={(e)=>{this.updateForm({e,id:'fname'})}} required type='text' placeholder='First Name' className='form-control'/>
                        </div>
                        <div className='col-sm-6' style={{padding:'15px'}}>
                            <input onChange={(e)=>{this.updateForm({e,id:'lname'})}}  required type='text' placeholder='Last Name' className='form-control'/>
                        </div>
                    </div>
                    <div className='rows'>
                        <div className='col-sm-12' style={{padding:'15px'}}>
                            <input onChange={(e)=>{this.updateForm({e,id:'subject'})}}  required type='text' placeholder="Subject" className="form-control"/>
                        </div>
                    </div>
                    <div className='rows'>
                        <div className='col-sm-12' style={{padding:'15px'}}>
                            <input onChange={(e)=>{this.updateForm({e,id:'email'})}}  required type='email' placeholder="Email" className="form-control"/>
                        </div>
                    </div>
                    <div className='rows'>
                        <div className='col-sm-12' style={{padding:'15px'}}>
                            <textarea onChange={(e)=>{this.updateForm({e,id:'message'})}}  required className="form-control" cols='30' rows='10' placeholder='write your message here'></textarea>
                        </div>
                    </div>
                    {this.showFeedback()}
                    <button type='submit' className="btn btn-primary btn-pill" style={{margin:'15px 0'}}>SEND MESSAGE</button>
                </form>
            </div>
        )
    }
}

export default ContactUs;