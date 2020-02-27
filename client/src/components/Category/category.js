import React,{ useEffect,useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { getCourses } from '../../actions';
import CatDefault from '../widgets/CatDefault/catDefault';
import axios from 'axios'
import CatMyCat from '../widgets/CatMyCat/catMyCat';

const Categories = (props) => {

    let [user,setUser]=useState()

    useEffect(()=>{
        props.getCourses()
        axios.get('/api/user')
        .then(res=>{
            setUser(res.data)
        })
    },[props])

    const renderDash=()=>{
        let template=null

        switch (props.match.params.id) {
            case 'my-ategory':
                template=(
                    <CatMyCat courses={props.courses} user={user}/>
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
    return (
        <div className="row" style={{margin:'8% 0 0 0',width:'100%'}}>
            <div className="col-sm-1 catnav">
                <div style={{marginTop:'8%'}}>
                    <ul style={{lineHeight:'5'}}>
                        {/* <Link to={`/category/my-category`} style={{fontSize:'15px'}}>My Courses</Link> */}
                    </ul>
                </div>
                
            </div>
            <div className="col-sm-10">
                {renderDash()}
            </div>
            <div className="col-sm-1">

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

const propsAreEqual=(prevProps,nextProps)=>{
    return Object.keys(prevProps.courses).length===Object.keys(nextProps.courses).length
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Categories,propsAreEqual))
