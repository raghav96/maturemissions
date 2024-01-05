/* 
    File: FAQ.jsx 
    Description: Frequently Asked Questions (FAQ) component.
*/

import React, { Component } from 'react';
import "./index.css";

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  // Function to toggle the FAQ item open or closed
  toggleOpen = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { question, answer } = this.props;
    const { isOpen } = this.state;

    return (
        <div className="faq-item">
            <button className="faq-question" onClick={this.toggleOpen}>
                {isOpen ? '+ '+question : '- '+question}
            </button>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
  }
}

export default FAQ;
