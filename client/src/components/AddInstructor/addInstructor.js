import React,{Component} from 'react';
import axios from 'axios';

class AddInstructor extends Component {
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
        })
    }

    validate=(element)=>{
        let error=[true,''];
        if(element.validation.email){
            const valid=/\S+@\S+\.\S+/.test(element.value);
            const message=`${!valid ? 'Must be a valid email':''}`;
            error=!valid ? [valid,message]:error;
        }

        if(element.validation.required){
            const valid=element.value.trim()!=='';
            const message=`${!valid ? 'This field is required':''}`;
            error=!valid ? [valid,message]:error;
        }

        return error;
    }

    registerInstructor=({e,register})=>{
        e.preventDefault();

        let dataToSubmit={};
        let formIsValid=true;

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
            let pwd='';
            const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charLength=characters.length;
            for(let i=0;i<8;i++){
                pwd+=characters.charAt(Math.floor(Math.random()*charLength));
            }
            axios.post('/api/register',{
                email:dataToSubmit.email,
                password:pwd,
                fname:dataToSubmit.fname,
                lname:dataToSubmit.lname,
                role:1
            })
            .then(response=>{
                if(response.data.success===false){
                    this.setState({
                        registerError:response.data.error.errmsg
                    })
                }else{
                    this.props.history.push('/dashboard/instructor')
                }
            })
            .catch(err=>this.setState({
                registerError:err
            }))
        }
    }

    showError = ()=>(
        this.state.registerError !=='' ? 
        <div style={{color:'red'}}>{this.state.registerError}</div>
        :''
    )

    render(){
        return (
            <div className="slide-1" style={{backgroundImage:"url('images/science.jpg')",backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:"50% 50%",backgroundAttachment:'fixed'}}>
                    <div className="container jumb" style={{backgroundColor:'rgba(7,6,28,0.88)',width:'100%'}}>
                        <div className="row jumbo">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6"  data-aos="fade-up" data-aos-duration="500">
                            <form className="form-box">
                                    <div data-aos='fade-in' data-aos-delay='100' data-aos-duration='500'>
                                        <h3 className="h4 text-black mb-4">Add Instructor</h3>
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
                                            <button 
                                                type="submit" 
                                                onClick={(e)=>this.registerInstructor({e,register:true})} 
                                                className="btn btn-primary btn-block">
                                                    Add Instructor
                                            </button>
                                            {this.showError()}
                                        </div>
                                    </div>
                            </form>
                            </div>
                            <div className="col-sm-3"></div>
                        </div>
                    </div>
                </div>
        );
    }
}
 
export default AddInstructor;