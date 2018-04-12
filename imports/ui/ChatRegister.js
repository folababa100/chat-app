import React from 'react';
import CreateChat from './CreateChat';
import PrivateHeader from './PrivateHeader'
import JoinChat from './JoinChat'

export default () => {
  return (
    <div>
      <PrivateHeader title="Chat" />
      <div className="page-content1">
        {/* <JoinChat />
        <CreateChat /> */}
      </div>
    </div>
  )
}