import React,{ Component } from 'react';
import axios from 'axios';

class AddTopic extends Component {

    state={
        formdata:''
    }

    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        axios.get(`/api/course/${this.props.match.params.id}`)
        .then(res=>{
            this.setState({
                formdata:res.data
            })
        })
    }

    changeLabel=(event)=>{
        console.log(event.target.files)
        const file=event.target.files[0];
        if(file.size>62914560){
            alert('File too large')
            event.target.value=''
            document.getElementById('thename').innerText='Upload Video';
        }else{
           document.getElementById('thename').innerText=file.name; 
        }
        
    }

    render(){
        if(this.state.formdata === ''){
            return null;
        }
        return ( 
            <div className="slide-1" style={{backgroundImage:`url('/api/image/${this.state.formdata.filename}')`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:"50% 50%",backgroundAttachment:'fixed'}}>
                <div className="container jumb" style={{backgroundColor:'rgba(7,6,28,0.88)',width:'100%'}}>
                    <div className="row jumbo">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6"  data-aos="fade-up" data-aos-duration="500">
                            <form encType='multipart/form-data' method='POST' action='/api/addtopic'>
                                <h1 style={{textAlign:'center'}}>Add Topic to {`${this.state.formdata.metadata.course}`}</h1>
                                <div className="row custom-file mb-3">
                                    <div className='col-sm-3'></div>
                                    <div className='col-sm-6'>
                                        <input required accept='video/mp4' type="file" onChange={(e)=>this.changeLabel(e)} name="file" id="file" className="custom-file-input"/>
                                        <label id="thename" htmlFor="file" className="custom-file-label">Upload Video</label>
                                    </div>
                                    <div className='col-sm-3'></div>
                                </div>
                                <div className="row form-group">
                                    <div className='col-sm-3'></div>
                                    <div className="col-sm-6">
                                        <input required name='title' className="form-control" type="text" placeholder="Topic title"/>
                                    </div>
                                    <div className='col-sm-3'>
                                        <input name='course' type='text' readOnly style={{display:'none'}} value={this.state.formdata._id}/>
                                    </div>
                                </div>
                                <div className='row form-group'>
                                    <div className='col-sm-3'></div>
                                    <div className='col-sm-6'>
                                        <button type='submit' className='btn btn-primary btn-block'>
                                            Add Topic
                                        </button>
                                    </div>
                                    <div className='col-sm-3'></div>
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
 
export default AddTopic;