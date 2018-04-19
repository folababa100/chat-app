import React from "react";
import ChatSidebar from './ChatSidebar';
import SearchBar from './SearchBar'

export default SideBar = () => {
  return (
    <div>
      <div className="sidebar__content">
        <SearchBar />
        <ChatSidebar />
      </div>
    </div>
  )
}
