import React from 'react';
import './UserComment.css';
import { Trash } from './MdPlay';
const UserComment = ({ id, username, content, timestamp, usercheck, deleteFunction }) => {
  // const { user, content, timestamp } = comment;
  const handleDeleteClick = () => {
    deleteFunction(id)
  };
  return (
    <>
    <div className="user-comment">
      <div className="comment-header">
        <span className="comment-username">{username}</span>
        <span className="comment-timestamp">{timestamp}</span>
      </div>
      <div className="comment-text">
        <p className="comment-content">{content}</p>
        {(usercheck) && (
          <div className="delete-comment-button waves-effect waves-light"  onClick={handleDeleteClick}>
            <Trash/>
          </div>
        )}
      </div>
        </div>
        </>
  );
};

export default UserComment;
