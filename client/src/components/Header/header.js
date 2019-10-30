import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Nav from '../Nav/nav';

class Header extends Component {

  state={
    classes:'navbar header'
  }

  handleScroll=()=>{
    if(window.scrollY>0){
      this.setState({
        classes:'navbar sticky'
      })
    }else{
      this.setState({
        classes:'navbar header'
      })
    }
  }

    render() {
      window.addEventListener('scroll',this.handleScroll)
        return (
          <nav className={this.state.classes}>
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#myNavbar"
                >
                  <span className="icon-bar" style={{backgroundColor:'white'}} />
                  <span className="icon-bar" style={{backgroundColor:'white'}}/>
                  <span className="icon-bar" style={{backgroundColor:'white'}}/>
                </button>
                <div className="navbar-brand">
                    <Link to="/">
                        RuralMOOCs
                    </Link>
                </div>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <Nav/>
              </div>
            </div>
            <hr id='scrolling' style={{margin:'0',borderTop:'3px solid white',width:'0'}}/>
          </nav>
        );
    }
}

export default Header;