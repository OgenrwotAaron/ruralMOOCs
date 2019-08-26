import React from 'react';
import {Link} from 'react-router-dom'

const Nav = () => {

    return (
        <ul className="nav navbar-nav navbar-right">
                  <li className="dropdown">
                    <a
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      href="all"
                    >
                      MOOCs
                      <span className="caret" />
                    </a>
                    <ul className="dropdown-menu">
                      <label style={{paddingLeft:'5px'}}>Available MOOCS</label>
                      <li>
                        <Link to='/category/science'>SCIENCE & TECHNOLOGY</Link>
                      </li>
                      <li>
                        <Link to='/category/agriculture'>AGRICULTURE</Link>
                      </li>
                      <li>
                        <Link to='/category/arts'>HISTORY & ARTS</Link>
                      </li>
                      <li>
                      <Link to='/category/commerce'>BUSINESS & ECONOMICS</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to='/about'>MORE</Link>
                  </li>
                  <li style={{padding:'15px'}}>
                    <input id='search' className="form-control" placeholder='browse..' style={{height:'25px',padding:'2px 10px',border:'none',borderRadius:'25px'}} type='search' /><span style={{margin:'15px',fontSize:'18px',paddingTop:'2px',color:'#01a9f0'}} className='icon icon-search form-control-feedback'></span>
                  </li>
                </ul>
    );
};

export default Nav;