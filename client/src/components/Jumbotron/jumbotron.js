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
            <p onClick={()=>{this.setState({form:'signup',getStarted:false})}} style={{color:'#333',cursor:'pointer'}}>Or Signup here</p>
            :
            <p onClick={()=>{this.setState({form:'signin',getStarted:true})}} style={{color:'#333',cursor:'pointer'}}>Login</p>
    )

    renderJumbo=()=>{
        let template=null;

        switch (this.props.type) {
            case 'home':
                template=(
                    <div className="slide-1" style={{backgroundImage:"url('images/hero.jpg')",backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:"50% 50%",backgroundAttachment:'fixed'}}>
                        <div className="container jumb" style={{backgroundColor:'rgba(7,6,28,0.88)',width:'100%'}}>
                            <div className="row jumbo">
                                <div className="col-sm-12"  data-aos="fade-up" data-aos-duration="500">
                                    <div className="col-sm-12" style={{paddingBottom:'10px',textAlign:'center'}}>
                                        <img style={{width:'30%', height:'auto'}} src='/images/header-img.png' alt='home'/>
                                        <h1 style={{marginBottom:'0'}}>Learning Beyond Limitations</h1>
                                        <p style={{marginTop:'0'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsa nulla sed quis rerum amet natus quas necessitatibus.</p>
                                        <Link to="/join"><button className="btn btn-white">Get Started</button></Link>
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
                                    <h1 style={{marginBottom:'0',textAlign:'center'}}>{this.props.image}</h1>
                                    <p style={{marginTop:'0',textAlign:'center'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsa nulla sed quis rerum amet natus quas necessitatibus.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

                break;
            case 'join':
                template=(
                    <div className="slide-1" style={{backgroundImage:"url('images/hero.jpg')",backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:"50% 50%",backgroundAttachment:'fixed'}}>
                        <div className="container jumb" style={{backgroundColor:'rgba(7,6,28,0.88)',width:'100%'}}>
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
       return (
            <div>
                {this.renderJumbo()}
            </div>
        ); 
    }

    
};

export default Jumbotron;