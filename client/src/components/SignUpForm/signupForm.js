import React,{ Component,Fragment} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

class SignUpForm extends Component {

    state={
        loggedIn:false,
        registerError:'',
        loading:false,
        formData:{
            fname:{
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            lname:{
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            email:{
                value:'',
                validation:{
                    email:true,
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            pwd:{
                value:'',
                validation:{
                    pwd:true,
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    updateForm=({e,blur,id})=>{
        const newFormData={...this.state.formData};
        const newElement={...newFormData[id]};
        newElement.value=e.target.value;

        if(blur){
            let validData=this.validate(newElement);
            newElement.valid=validData[0];
            newElement.validationMessage=validData[1];
        }

        newFormData[id]=newElement;

        this.setState({
            formData:newFormData
        });
    };

    validate=(element)=>{
        let error=[true,''];

        if(element.validation.email){
            const valid=/\S+@\S+\.\S+/.test(element.value);
            const message=`${!valid ? 'Must be a valid email':''}`;
            error=!valid ?  [valid,message]:error;
        }

        if(element.validation.pwd){
            const valid=element.value.length>=8;
            const message=`${!valid ? 'Password must be greater than 8':''}`;
            error=!valid ? [valid,message]:error;
        }

        if(element.validation.required){
            const valid=element.value.trim()!=='';
            const message=`${!valid ? 'This field is required':''}`;
            error=!valid ? [valid,message]:error;
        }

        return error;
    }

    renderFields=()=>{
        let template=null;
        switch (this.props.type) {
            case 'signin':
                template=(
                    <div data-aos='fade-in' data-aos-delay='100' data-aos-duration='500'>
                        <h3 className="h4 text-black mb-4">Sign In</h3>
                        <div className="form-group">
                            <input onChange={(e)=>this.updateForm({e,blur:true,id:'email'})} type="email" placeholder="Email Address" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input onChange={(e)=>this.updateForm({e,blur:true,id:'pwd'})} type="password" placeholder="Password" className="form-control"/>
                        </div>
                        <div className="form-group">
                            {this.state.loading ? 
                                <p style={{color:'#03a9f0'}}>Loading...</p>
                                :
                                <button 
                                    type="submit" 
                                    onClick={(e)=>this.registerUser({e,login:true})} 
                                    className="btn btn-primary btn-pill">
                                        SIGN IN
                                </button>
                            }
                            {this.props.fun()}
                            <Link style={{position:'absolute',top:'0',right:'0'}} to="/">
                                <span className="icon icon-close"></span>
                            </Link>
                        </div>
                    </div>
                )
                break;
            case 'signup':
                template=(
                    <div data-aos='fade-in' data-aos-delay='100' data-aos-duration='500'>
                        <h3 className="h4 text-black mb-4">Sign Up</h3>
                        <div className="form-group">
                            <div className='row' style={{minHeight:'0'}}>
                                <div className='col-sm-6'>
                                    <input onChange={(e)=>this.updateForm({e,blur:true,id:'fname'})} required type="text" placeholder="Firstname" className="form-control"/>
                                </div>
                                <div className='col-sm-6'>
                                    <input onChange={(e)=>this.updateForm({e,blur:true,id:'lname'})} required type="text" placeholder="Lastname" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input onChange={(e)=>this.updateForm({e,blur:true,id:'email'})} required type="email" placeholder="Email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input onChange={(e)=>this.updateForm({e,blur:true,id:'pwd'})} required type="password" placeholder="Password" className="form-control"/>
                        </div>
                        <div className="form-group">
                            {this.state.loading? 
                                <p style={{color:'#03a9f0'}}>Loading...</p>
                                :
                                <button 
                                    type="submit" 
                                    onClick={(e)=>this.registerUser({e,register:true})} 
                                    className="btn btn-primary btn-pill">
                                        SIGN UP
                                </button>
                            }
                            {this.props.fun()}
                            <Link style={{position:'absolute',top:'0',right:'0'}} to="/">
                                <span className="icon icon-close"></span>
                            </Link>
                        </div>
                    </div>
                )
            
                break;
        
            default:
                template=null;
                break;
        }
        return template;
    }

    registerUser=(event)=>{
        event.e.preventDefault();

        let dataToSubmit={};
        let formIsValid=true;

        if(event.register){
            for(let key in this.state.formData){
                dataToSubmit[key]=this.state.formData[key].value;
            };

            for(let key in this.state.formData){
                formIsValid=this.state.formData[key].valid && formIsValid;
            };

            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                })
                axios.post('/api/register',{
                    email:dataToSubmit.email,
                    password:dataToSubmit.pwd,
                    fname:dataToSubmit.fname,
                    lname:dataToSubmit.lname
                })
                .then(response=>{
                    const message=response.data.message
                    if(message){
                        this.setState({
                            registerError:response.data.message,
                            loading:false
                        })
                    }else{
                        this.setState({
                           loggedIn:true,
                           loading:false
                        });
                        window.location.reload();
                    }
                })
                .catch(err=>this.setState({
                    registerError:err
                }))
            }
        }

        if(event.login){
            let newFormData={};
            newFormData['email']=this.state.formData.email;
            newFormData['pwd']=this.state.formData.pwd;

            dataToSubmit['email']=newFormData.email.value;
            dataToSubmit['pwd']=newFormData.pwd.value;

            for(let key in newFormData){
                formIsValid=newFormData[key] && formIsValid;
            }

            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                });
                axios.post('/api/login',{email:dataToSubmit.email,password:dataToSubmit.pwd})
                .then(response=>{
                    const message=response.data.message
                    if(message){
                        this.setState({
                            registerError:response.data.message,
                            loading:false
                        })
                    }else{
                        this.setState({
                           loggedIn:true,
                           loading:false
                        });
                        switch(response.data.role){
                            case 2 || 1:
                                window.location.replace('/dashboard');
                                break;
                            default:
                                window.location.replace('/category');
                                break;
                        }
                    }
                    
                })
                .catch(err=>this.setState({
                    registerError:err.message
                }))
            }
        }
    }

    showError = ()=>(
        this.state.registerError !=='' ? 
        <div style={{color:'red'}}>{this.state.registerError}</div>
        :''
    )

    render(){
        return (
            <Fragment>
                {!this.state.loggedIn ? <form style={{padding:'20px 40px',boxShadow:'#0000005e 1px 1px 20px 1px'}} className="form-box">
                    {this.renderFields()}
                    {this.showError()}
                </form> : ''}
            </Fragment>
            
        );
    }
    
};

export default SignUpForm;