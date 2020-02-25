import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Nav = (props) => {

    const logout=()=>{
      axios.get('/api/logout')
      .then(res=>{
          window.location.assign('/')
      })
      .catch(err=>console.log(err))
    }

    return (
        <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link style={{fontSize:'15px'}} to="/">
                        Home
                    </Link>
                  </li>
                  <li className="dropdown">
                    <a
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      href="all"
                      style={{fontSize:'15px'}}
                    >
                      Courses
                    </a>
                    <ul className="dropdown-menu">
                      <li><Link to="/category">Courses</Link></li>
                      <label style={{paddingLeft:'5px'}}>Course Category</label>
                      <li>
                        <Link to='/category/science'>TECHNOLOGY</Link>
                      </li>
                      <li>
                        <Link to='/category/arts'>LANGUAGE</Link>
                      </li>
                      <li>
                        <Link to='/category/science'>SCIENCE</Link>
                      </li>
                      <li>
                      <Link to='/category/science'>HEALTH</Link>
                      </li>
                      <li>
                      <Link to='/category/agriculture'>HUMANITIES</Link>
                      </li>
                      <li>
                      <Link to='/category/commerce'>BUSINESS</Link>
                      </li>
                      <li>
                      <Link to='/category/science'>MATHEMATICS</Link>
                      </li>
                      <li>
                      <Link to='/category/commerce'>MARKETING</Link>
                      </li>
                      <li>
                      <Link to='/category/arts'>LIFESTYLE</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <a
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      href="all"
                      style={{fontSize:'15px'}}
                    >
                      Programs
                    </a>
                    <ul className="dropdown-menu">
                      <label style={{paddingLeft:'5px'}}>Available Programs</label>
                      <li>
                        <Link to='/category/science'>Computer Science</Link>
                      </li>
                      <li>
                        <Link to='/category/arts'>Information Technology</Link>
                      </li>
                      <li>
                        <Link to='/category/science'>Data Science</Link>
                      </li>
                      <li>
                      <Link to='/category/science'>Artificial Intelligence</Link>
                      </li>
                      <li>
                      <Link to='/category/commerce'>Programming</Link>
                      </li>
                    </ul>
                  </li>
                  <li style={{padding:'15px'}}>
                    <input id='search' className="form-control" placeholder='browse..' style={{height:'25px',padding:'2px 10px',border:'none',borderRadius:'25px'}} type='search' /><span style={{margin:'15px',fontSize:'18px',paddingTop:'2px',color:'#01a9f0'}} className='icon icon-search form-control-feedback'></span>
                  </li>
                  {props.user ? 
                      (
                        props.user.user.role !== 0 ?
                          <>
                            <li className="dropdown" style={{padding:'0 5px',fontSize:'20px'}}>
                              <a style={{padding:'15px 5px'}} className="dropdown-toggle" data-toggle="dropdown" href="all">
                                <span className="icon-chat_bubble_outline"></span>
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  Messages
                                </li>
                                <li>
                                  <Link to={`/inbox/${props.user.user._id}`}>All Messages</Link>
                                </li>
                              </ul>
                            </li>
                            <li style={{padding:'0 5px',fontSize:'20px'}}>
                              <Link style={{padding:'15px 5px'}}  to="/dashboard">
                                <span className="icon icon-dashboard"></span>
                              </Link> 
                            </li>
                            <li className="dropdown" style={{padding:'0 5px',fontSize:'20px'}}>
                              <a
                                style={{padding:'15px 5px'}}
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                href="all"
                              >
                                <span className="icon icon-user-circle-o"></span>
                                {
                                    props.online && <div style={{width: '10px',height: '10px',background: 'green',position: 'absolute',right: '5px',borderRadius: '5px',bottom: '18px',margin: '0'}}></div>
                                }
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link to={`/profile/${props.user.user._id}`}>Profile</Link>
                                </li>
                                <li>
                                  <button onClick={()=>logout()} style={{padding:'3px 20px',border:'none',background:'none',color:'white'}} to='/dashboard/mail/1'>
                                    Logout
                                  </button>
                                </li>
                              </ul>
                            </li>
                          </>
                          
                          :
                          <>
                            <li className="dropdown" style={{padding:'0 5px',fontSize:'20px'}}>
                              <a style={{padding:'15px 5px'}} className="dropdown-toggle" data-toggle="dropdown" href="all">
                                <span className="icon icon-bell-o"></span>
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  Notifications
                                </li>
                                <li>
                                  <Link to={`/notifications/${props.user.user._id}`}>View all</Link>
                                </li>
                              </ul>
                            </li>
                            <li className="dropdown" style={{padding:'0 5px',fontSize:'20px'}}>
                              <a style={{padding:'15px 5px'}} className="dropdown-toggle" data-toggle="dropdown" href="all">
                                <span className="icon-chat_bubble_outline"></span>
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  Messages
                                </li>
                                <li>
                                  <Link to={`/inbox/${props.user.user._id}`}>All Messages</Link>
                                </li>
                              </ul>
                            </li>
                            <li className="dropdown" style={{padding:'0 5px',fontSize:'20px'}}>
                              <a
                                style={{padding:'15px 5px'}}
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                href="all"
                              >
                                <span className="icon icon-user-circle-o"></span>
                                {
                                    props.online && <div style={{width: '10px',height: '10px',background: 'green',position: 'absolute',right: '5px',borderRadius: '5px',bottom: '18px',margin: '0'}}></div>
                                }
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link to={`/profile/${props.user.user._id}`}>Profile</Link>
                                </li>
                                <li>
                                  <button onClick={()=>logout()} style={{padding:'3px 20px',border:'none',background:'none',color:'white'}} to='/dashboard/mail/1'>
                                    Logout
                                  </button>
                                </li>
                              </ul>
                            </li>
                          </>
                          
                      )
                    :
                    null
                  }
                </ul>
    );
};

export default Nav;