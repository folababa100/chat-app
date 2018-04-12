import React from 'react';
import PropTypes from 'prop-types'
import { Accounts } from 'meteor/accounts-base';
import Ionicon from 'react-ionicons';
import Header from './Header'

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <Header/>
      </div>
    </div>
  );
};

export default PrivateHeader;
