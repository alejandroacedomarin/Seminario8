import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from '../modules/user'
import { Post } from '../modules/post'
import GetUsers from '../GET/getUsers';
import PostInfo from '../GET/getPosts';
import PropExemple from '../GET/getUser';
import CreateUser from '../POST/createUser';
import '@fontsource/inter';
import CreatePost from '../POST/createPost';


function AppUser() {

  const [usersUpdated, setUsersUpdated] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [postsUpdated, setPostsUpdated] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const updateUserList = () => {
      setUsersUpdated(!usersUpdated);
  };
  const updatePostList = () => {
    setPostsUpdated(!postsUpdated);
};
const resetUser = () => {
  setSelectedUser(null);
}
  return (
    <div className="container" >
      <div className="title">
        <h1 >Seminario 8</h1>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="component">
        <h2>Get Users Component</h2>
        <GetUsers usersUpdated={usersUpdated} setSelectedUser={setSelectedUser}/>
      </div>
      {/* <div className="component">
        <h2>Get Post Component</h2>
        <GetPosts postsUpdated={postsUpdated} setSelectedPost={setSelectedUser}/>
      </div> */}
      <div className="component">
        <h2>Prop Example</h2>
        <PropExemple user={selectedUser} updateUserList={updateUserList} resetUser={resetUser} />
      </div>
      <div className="component">
        <h2>Create Post Component</h2>
        <CreatePost updatePostList={updatePostList} />
      </div>
      <div className="component">
        <h2>GET POST Component</h2>
        <PostInfo  />
      </div>
      <div className="component">
        <h2>Create User Component</h2>
        <CreateUser updateUserList={updateUserList} />
      </div>
    </div>
);

}

export default AppUser;
