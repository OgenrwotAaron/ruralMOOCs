import React from 'react';

const SignUpForm = (props) => {
    const renderFields=()=>{
        let template=null;
        switch (props.type) {
            case 'signin':
                template=(
                    <div data-aos='fade-in' data-aos-delay='100' data-aos-duration='500'>
                        <h3 className="h4 text-black mb-4">Sign In</h3>
                        <div className="form-group">
                            <input type="email" placeholder="Email Address" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-pill">SIGN IN</button>
                            {props.fun()}
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
                                    <input type="text" placeholder="Firstname" className="form-control"/>
                                </div>
                                <div className='col-sm-6'>
                                    <input type="text" placeholder="Lastname" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-pill">SIGN UP</button>
                            {props.fun()}
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

    return (
        <form method="post" className="form-box">
            {renderFields()}
        </form>
    );
};

export default SignUpForm;