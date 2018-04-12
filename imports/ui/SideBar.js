import React from "react";
import ChatSidebar from './ChatSidebar';
import SearchBar from './SearchBar'

export default () => {
  return (
    <div>
      <div className="sidebar__content">
        <SearchBar />
        <ChatSidebar />
      </div>
    </div>
  )
}
