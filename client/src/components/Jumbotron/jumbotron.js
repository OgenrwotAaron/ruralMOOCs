import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../SignUpForm/signupForm';

class Jumbotron extends Component {

    state={
        form:'signin',
        getStarted:true
    }

    getStarted=()=>(
        this.state.getStarted? 
            <p onClick={()=>{this.setState({form:'signup',getStarted:false})}} style={{color:'#333',cursor:'pointer'}}>Or Signup <i style={{color:'#337ab7',textDecoration:'underline'}}>here</i></p>
            :
            <p onClick={()=>{this.setState({form:'signin',getStarted:true})}} style={{color:'#333',cursor:'pointer'}}><i style={{color:'#337ab7',textDecoration:'underline'}}>Login</i></p>
    )

    renderJumbo=()=>{
        let template=null;
        

        switch (this.props.type) {
            case 'home':
                template=(
                    <div className="slide-1" >
                        <div className="container jumb" style={{background:'linear-gradient(to right top, #d1d2f1, #ffffff)',width:'100%'}}>
                            <div className="row jumbo">
                                <div className="col-sm-12" style={{padding:'0 5%'}}  data-aos="fade-up" data-aos-duration="500">
                                    <div className="col-sm-6" style={{paddingBottom:'10px'}}>
                                        <h1 style={{marginBottom:'0',color:'#1e1746',fontSize:'50px'}}>Learning Beyond Limitations</h1>
                                        <p style={{marginTop:'0',color:'#171235'}}> We truly believe in giving everyone a chance to pursue their goals, through education beyond limitations.</p>
                                        {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                                            this.props.auth ? 
                                                null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                            :
                                                <Link to="/join">   
                                                    <button className="btn btn-white">Get Started</button>
                                                </Link>
                                        }
                                    </div>
                                    <div className='col-sm-6' style={{display:'flex',justifyContent:'center'}}>
                                        <img style={{width:'60%', height:'auto',float:'right'}} src='/images/header-img.png' alt='home'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break;
            case 'category':
                template=(
                    <div className="slide-2" style={{backgroundImage:`url(${this.props.image})`,backgroundSize:'cover'}}>
                        <div className="container" style={{backgroundColor:'#343a40c9',height:'100%',width:'100%'}}>
                            <div className="row jumbo">
                                <div className="col-md-12"  data-aos="fade-up" data-aos-duration="500">
                                    <h1 style={{marginBottom:'0',textAlign:'center'}}>{this.props.title}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )

                break;
            case 'profile':
                template=(
                    <div className="slide-2" style={{backgroundImage:'url(/images/coverProfile.jpg)',backgroundSize:'cover'}}>
                        <div className="container" style={{backgroundColor:'#041a2f94',height:'100%',width:'100%'}}>
                            <div className="row jumbo">
                                <div className="col-md-12"  data-aos="fade-up" data-aos-duration="500">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )
                break;
            case 'join':
                template=(
                    <div className="slide-1">
                        <div className="container jumb" style={{background:'linear-gradient(to right top, #d1d2f1, #ffffff)',width:'100%'}}>
                            <div className="row jumbo">
                                <div className="col-sm-12"  data-aos="fade-up" data-aos-duration="500">
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-4" style={{paddingBottom:'10px',textAlign:'center'}}>
                                        <SignUpForm fun={this.getStarted} type={this.state.form}/>
                                    </div>
                                    <div className="col-sm-4"></div>
                                </div>
                            </div>
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

    render(){
        console.log(this.props.user)
       return (
            <div>
                {this.renderJumbo()}
            </div>
        ); 
    }

    
};

export default Jumbotron;
