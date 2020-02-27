import React,{ useState,useEffect} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

const EditInstructor = (props) => {

    let [user,setUser]=useState()
    let [loading,setLoading]=useState(false)
    let [updated,setUpdated]=useState('')

    useEffect(()=>{
        axios.get(`/api/user/${props.match.params.id}`)
        .then(user=>{
            setUser(user.data[0])
        })
    },[props])

    const updateForm=(event,id)=>{
        event.preventDefault()
        const newFormData={...user}
        let newElement=newFormData[id]

        newElement=event.target.value;

        newFormData[id]=newElement;
        setUser(newFormData)
    }

    const updateInstructor=(event)=>{
        event.preventDefault()
        setLoading(true)
        let dataToSubmit={}
        for(let key in user){
            dataToSubmit[key]=user[key]
        }
        axios.post(`/api/editInstructor/${dataToSubmit.id}`,dataToSubmit)
        .then(res=>{
            if(res.data.success){
                setUpdated(true)
            }else{
                setUpdated(false)
            }
            setLoading(false)
        })
        .catch(e=>{
            setLoading(false)
            setUpdated(false)
        })
    }

    if(!user){
        return null;
    }

    return ( 
        <div className="slide-1">
            <div className="container jumb" style={{background:'linear-gradient(to right top, #d1d2f1, #ffffff)',width:'100%'}}>
                <div className="row jumbo">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6"  data-aos="fade-up" data-aos-duration="500">
                    <form onSubmit={(e)=>updateInstructor(e)} style={{boxShadow:'#0000005e 1px 1px 20px 1px'}} className="form-box">
                            <div data-aos='fade-in' data-aos-delay='100' data-aos-duration='500'>
                                <h3 className="h4 text-black mb-4">Edit Instructor {user.fname} {user.lname}</h3>
                                <div className="form-group">
                                    <div className='row' style={{minHeight:'0'}}>
                                        <div className='col-sm-6'>
                                            <label>Firstname</label>
                                            <input value={user.fname}  onChange={(e)=>updateForm(e,'fname')} required type="text" placeholder="Firstname" className="form-control"/>
                                        </div>
                                        <div className='col-sm-6'>
                                            <label>Lastname</label>
                                            <input value={user.lname}  onChange={(e)=>updateForm(e,'lname')} required type="text" placeholder="Lastname" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={user.email} onChange={(e)=>updateForm(e,'email')} required type="email" placeholder="Email" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <select name='role' value={user.role}  onChange={(e)=>updateForm(e,'role')} className="form-control">
                                        <option value={user.role}>{user.role===0?'Student':user.role===1?'Instructor':'Administrator'}</option>
                                        <option value=''>Choose role</option>
                                        <option value='0'>Student</option>
                                        <option value='1'>Instructor</option>
                                        <option value='2'>Administrator</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button 
                                        disabled={loading?true:false}
                                        type="submit" 
                                        className="btn btn-primary btn-block">
                                            {loading ? `Loading...`:`Update`}
                                    </button>
                                </div>
                                { 
                                    updated===true?
                                        <p style={{color:'green'}}>Instructor updated Successfully</p>
                                        :
                                        updated===true?
                                            <p style={{color:'red'}}>Instructor update failed</p>
                                            :
                                            null
                                }
                            </div>
                            <Link style={{position:'absolute',color:'white',backgroundColor:'red',height:'15px',width:'15px',textAlign:'center',borderRadius:'50%',top:'30px',right:'40px'}} to={`/dashboard/instructors/${props.user.user.role}`}>
                                <span className="icon icon-close"></span>
                            </Link>
                    </form>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </div>
     );
}
 
export default EditInstructor;