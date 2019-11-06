import React,{ Component } from 'react';
import axios from 'axios';
const Uppy = require('@uppy/core')
const Transloadit=require('@uppy/transloadit');
const { Dashboard, ProgressBar } = require('@uppy/react')

class AddTopic extends Component {

    state={
        formdata:'',
        title:''
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

    uppy= new Uppy({
        id:'uppy',
        autoProceed:false,
        debug:true,
        restrictions:{
            allowedFileTypes:['video/mp4'],
            maxNumberOfFiles:1,
            minNumberOfFiles:1
        }
    })
    .use(Transloadit,{
        params: {
            template_id: '63faa7b75c624882a12a862c043a4e53',
            auth:{key:'c330851cae3e4bbc83328eb89b2926fe'}
        },
        fields:{
            title:this.state.title
        }
    })
    .on('complete',results=>{
        console.log(results)
    })

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
                            <h1 style={{textAlign:'center'}}>Add Topic to {`${this.state.formdata.metadata.course}`}</h1>
                            <form id='my-form'>
                                <input type='text' style={{color:'black'}} onChange={(e)=>this.setState({title:e.target.value})} placeholder='Topic title' />
                            </form>
                            {
                                <Dashboard
                                    uppy={this.uppy}
                                    height={100}
                                    metaFields={[
                                        { id: 'name', name: 'Name', placeholder: 'Enter the file name.' },
                                        { id: 'caption', name: 'Caption', placeholder: 'Describe what the image is about.' }
                                      ]}
                                />
                            }
                            {
                                <ProgressBar
                                    uppy={this.uppy}
                                    hideAfterFinish={false}
                                />
                            }
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default AddTopic;