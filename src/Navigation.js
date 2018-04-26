import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Well, Button } from 'react-bootstrap';

import Tools from './Tools';
import QuizComponent from './QuizComponent';
import Banner from './Banner';
import Example from './Example';


function AllTogether(props) {
  const pagenumber = props.page;
  if (pagenumber == 1) {
    return <div>
            <Banner />
            <QuizComponent />
          </div>;
  }
  else if (pagenumber == 2) {
    return <div>
            <Example />
          </div>;
  }
  else {
    return <div>
            <Tools />
          </div>;
  }

}

class Navigation extends React.Component{
  constructor(props) {
    super(props);
    this.state = {page: 1};
  }

  handleSelect(eventKey){
    console.log(eventKey);
    if (eventKey === 1) {
      this.setState({
        page: 1
      });
    }
    else if (eventKey === 2) {
      this.setState({
        page: 2
      });
    }
    else {
      this.setState({
        page: 3
      });
    }

  };

  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">EtherQuiz.io</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav onSelect={this.handleSelect.bind(this)}>
            <NavItem eventKey={1}>Home</NavItem>
            <NavItem eventKey={2}>Example</NavItem>
            <NavItem eventKey={3}>Claim Prize</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
         <AllTogether page={this.state.page}/>
         </div>
    );
  }
}

export default Navigation;
