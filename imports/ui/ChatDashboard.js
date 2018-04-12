import React from 'react';

import PrivateHeader from './PrivateHeader';
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import SideBar from './SideBar'

export default () => {
  return (
    <div>
      <PrivateHeader title="Chat"/>
      <div className="chat-container__fluid">
        <SideBar/>
        <div className="page-content">
          <div className="page-content__flex">
            <ChatList/>
          </div>
          <ChatInput/>
        </div>
      </div>
    </div>
  );
};
