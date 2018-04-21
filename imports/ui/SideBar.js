import React from "react";
import ChatSidebar from './ChatSidebar';
import SearchBar from './SearchBar';
import SideBarHeader from "./SideBarHeader";

export default SideBar = () => {
  return (
    <div>
      <div className="sidebar__content">
        <SideBarHeader/>
        <SearchBar />
        <ChatSidebar />
      </div>
    </div>
  )
}
