import axios from 'axios';


export const getCoursesAsync = res=>{
    return {
        type:'GET_COURSES',
        payload:res
    }
}

export const getCourses=()=> {
    return dispatch =>{
        axios.get('/api/courses')
        .then(response=>{
            dispatch(getCoursesAsync(response.data))
        })
        .catch(e=>console.error(e))
    }
}

const getInstructorAsync=(res)=>{
    return {
        type:"GET_INSTRUCTOR",
        payload:res.data
    }
}

export const getInstructor=(instructorId)=>{
    return dispatch =>{
        axios.get(`/api/user/${instructorId}`)
        .then(res=>{
            dispatch(getInstructorAsync(res.data))
        })
    }
    
}