import moment from 'moment'

export const timeSent=(time)=>{
    return moment(time,"YYYYMMDD").fromNow()
}