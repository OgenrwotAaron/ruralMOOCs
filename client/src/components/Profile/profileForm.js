import React,{useState,useEffect} from 'react';
import axios from 'axios'

const ProfileForm = (props) => {

    let [formData,setFormData]=useState()
    let [loading,setLoading]=useState(false)
    let [updated,setUpdated]=useState('')
    
    useEffect(()=>{
        setFormData(props.user.user)
    },[props.user])

    const updateProfile=(e)=>{
        e.preventDefault();
        setLoading(true)
        let dataToSubmit={}
        for(let key in formData){
            dataToSubmit[key]=formData[key]
        }
        axios.post('/api/editProfile',dataToSubmit)
        .then(res=>{
            setLoading(false)
            setUpdated(true)
        })
        .catch(e=>{
            setLoading(false)
            setUpdated(false)
        })
    }

    const updateFields=(e,id)=>{
        const newFormData={...formData}
        let newElement=newFormData[id]

        newElement=e.target.value;

        newFormData[id]=newElement;
        setFormData(newFormData)
    }

    if(!formData){
        return null
    }

    return ( 
        <form style={{color:'#4c4c4c'}} onSubmit={(e)=>updateProfile(e)} className="form">
            <div className="form-group">
                <div className="row">
                    <label className="col-sm-3 control-label">First Name</label>
                    <div className="col-sm-9">  
                        <input type="text" onChange={(e)=>updateFields(e,'fname')}  value={formData.fname}  name="fname" className="form-control" id="event" required/>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <label className="col-sm-3 control-label">Last Name</label>
                    <div className="col-sm-9">
                        <input type="text" onChange={(e)=>updateFields(e,'lname')}  value={formData.lname}  name="lname" className="form-control" required/>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <label className="col-sm-3 control-label">Email</label>
                    <div className="col-sm-9">
                        <input type="text" onChange={(e)=>updateFields(e,'email')} value={formData.email}  name="email"  className="form-control" required/>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <label className="col-sm-3 control-label">Gender</label>
                    <div className="col-sm-9">
                        <select name="gender" onChange={(e)=>updateFields(e,'gender')} value={formData.gender} className="form-control" required>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <label className="col-sm-3 control-label">Date Of Birth</label>
                    <div className="col-sm-9">
                        <input type="date" onChange={(e)=>updateFields(e,'dob')} value={formData.dob} name="dob" className="form-control"/>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div className="row">
                    <label className="col-sm-3 control-label">Contact</label>
                    <div className="col-sm-9">
                        <input type="text" onChange={(e)=>updateFields(e,'phone')} value={formData.phone} name="contact" className="form-control" id="tbNumbers" minLength="10" maxLength="13" required/>
                    </div>
                </div>
            </div>
            <button disabled={loading?true:false} type="submit" name="btn_update" className="btn btn-primary btn-flat m-b-30 m-t-30">{loading ? `Loading...`:`Update`}</button>
            { 
                updated===true?
                    <p style={{color:'green'}}>Profile updated Successfully</p>
                    :
                    updated===true?
                        <p style={{color:'red'}}>Profile update failed</p>
                        :
                        null
            }
        </form>
     );
}
 
export default ProfileForm;