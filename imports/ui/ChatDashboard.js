import React from 'react';

import Chat from './Chat';
import ChatInput from './ChatInput';
import SideBar from './SideBar'

export default ChatDashboard = () => {
  return (
    <div>
      <div className="chat-container__fluid">
        <SideBar />
        <div className="page-content">
          <div className="page-content__flex">
            <Chat />
          </div>
          <ChatInput />
        </div>
      </div>
    </div>
  );
};
