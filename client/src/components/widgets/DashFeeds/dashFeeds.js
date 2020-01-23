import React from 'react';

const DashFeeds = () => {
    return ( 
        <div className='col-sm-9'>
            <div style={{padding:'9% 0 0 0'}}>
                <h1 style={{margin:'20px'}}>News Feeds</h1>
                <div className="row">
                    <div className='col-sm-2'>
                        <img className='img img-responsive' src='/images/header-img.png' alt='Avatar'/>
                    </div>
                    <div className='col-sm-10'>
                        <form>
                            <div className='form-group'>
                                <textarea style={{width:'100%',borderRadius:'5px',border:'2px solid #4d4d50'}} className="form-control" cols='20' rows='3' placeholder='write your message here'></textarea>
                            </div>
                            <div className='row'>
                                <div className='col-xs-3'>
                                    <div className='col-xs-6'>
                                        <input id='photo' type='file'/>
                                        <label htmlFor='photo'>
                                            <span className="icon icon-camera"></span>
                                        </label>
                                    </div>
                                    <div className='col-xs-6' style={{paddingLeft:'0'}}>
                                        <input id='video' type='file'/>
                                        <label htmlFor='video'>
                                            <span className="icon icon-video-camera"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className='col-xs-6'></div>
                                <div className='col-xs-3'>
                                    <input type='submit' style={{padding:'5px',float:'right'}} value='Post Feed' className="btn btn-white"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                    <h1 style={{fontSize:'30px',color:'#d6d3d3',margin:'20px',textAlign:'center'}}>Recent Updates</h1>
                    <div style={{background:'#1918289c',border:'#0ea0a030 2px solid',borderRadius:'10px',margin:'5px',padding:'10px'}} className="row">
                        <div className='col-sm-2'>
                            <img className='img img-responsive' src='/images/header-img.png' alt='Avatar'/>
                        </div>
                        <div className="col-sm-10">
                            <div>
                                <b style={{fontSize:'18px'}}>Ogenrwot Aaron</b>
                                <i style={{padding:'0px 5px',fontSize:'12px'}}>09 October 2019</i>
                            </div>
                            <p style={{marginTop:'0'}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsa nulla sed quis rerum amet natus quas necessitatibus.
                            </p>
                            <div>
                                <img style={{maxHeight:'200px'}} className="img img-responsive" src='/images/card.jpg' alt='post_image'/>
                            </div>
                            <div style={{marginTop:'10px'}}>
                                <span style={{padding:'5px',fontWeight:'bold',fontSize:'12px'}} className="icon icon-thumbs-o-up"> Like</span>
                                <span style={{padding:'5px',fontWeight:'bold',fontSize:'12px'}} className="icon icon-reply"> Reply</span>
                                <span style={{padding:'5px',fontWeight:'bold',fontSize:'12px'}} className="icon icon-share2"> Share</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DashFeeds;