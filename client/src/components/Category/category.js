import React,{ useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { getCourses } from '../../actions';
import CatDefault from '../widgets/CatDefault/catDefault';
import { Link } from 'react-router-dom';

const Categories = (props) => {

    useEffect(()=>{
        props.getCourses()
        
    },[props])

    const renderDash=()=>{
        let template=null

        switch (props.match.params.id) {
            case 'technology':
                template=(
                    <h1>Technology</h1>
                );
            break;
            case 'language':
                template=(
                    <h1>language</h1>
                );
            break;
            case 'science':
                template=(
                    <h1>science</h1>
                );
            break;
            case 'health':
                template=(
                    <h1>health</h1>
                );
            break;
            case 'humanities':
                template=(
                    <h1>humanities</h1>
                );
            break;
            case 'business':
                template=(
                    <h1>business</h1>
                );
            break;
            case 'mathematics':
                template=(
                    <h1>mathematics</h1>
                );
            break;
            case 'marketing':
                template=(
                    <h1>marketing</h1>
                );
            break;
            case 'lifestyle':
                template=(
                    <h1>lifestyle</h1>
                );
            break;
            default:
                template=(
                    <CatDefault courses={props.courses}/>
                );
                break;
        }
        return template;
    }
    let cat=["TECHNOLOGY","LANGUAGE","SCIENCE","HEALTH","HUMANITIES","BUSINESS","MATHEMATICS","MARKETING","LIFESTYLE"]
    const renderCat=()=>{
       return cat.map((item,i)=>(
                    <li key={i}>
                        <Link to={`/category/${item.toLowerCase()}`} style={{fontSize:'15px'}}>{item}</Link>
                    </li>
                )
            )
    }
    return (
        <div className="row" style={{margin:'8% 0 0 0',width:'100%'}}>
            <div className="col-sm-3 catnav">
                <div style={{marginTop:'8%'}}>
                    <ul style={{lineHeight:'5'}}>
                        {renderCat()}
                    </ul>
                </div>
                
            </div>
            <div className="col-sm-9">
                {renderDash()}
            </div>
            
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        courses: state.courses
    }
}

const mapDispatchToProps=(dispatch)=>{
    return bindActionCreators({getCourses},dispatch)
}

Categories.propTypes={
    courses:PropTypes.object,
    getCourses:PropTypes.func
}


export default connect(mapStateToProps, mapDispatchToProps)(Categories)