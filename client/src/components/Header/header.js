import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Nav from '../Nav/nav';
import io from 'socket.io-client';
const socket=io();

class Header extends Component {

  state={
    classes:'navbar header',
    online:false
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  componentWillMount() {
    if(this.props.user){
      socket.emit('online',this.props.user.user._id)
    }
    socket.on('online_status',(status)=>{
      this.setState({
        online:status
      })
    })
  }

  componentWillUnmount(){
    if(this.props.user){
      socket.emit('offline',this.props.user.user._id)
    }
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
                  <span className="icon-bar" style={{backgroundColor:'#a5a5a5'}} />
                  <span className="icon-bar" style={{backgroundColor:'#a5a5a5'}}/>
                  <span className="icon-bar" style={{backgroundColor:'#a5a5a5'}}/>
                </button>
                <div className="navbar-brand">
                    <Link to="/">
                        RuralMOOCs
                    </Link>
                </div>
              </div>
              <div className="collapse navbar-collapse" id="myNavbar">
                <Nav online={this.state.online} {...this.props}/>
              </div>
            </div>
            <hr id='scrolling' style={{margin:'0',borderTop:'3px solid #dddff5',width:'0'}}/>
          </nav>
        );
    }
}

export {Header,socket};
