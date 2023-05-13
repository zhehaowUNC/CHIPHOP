import React, { useState } from 'react';
import './ScrollableBox.css';

export const ScrollableBox = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Generate some content for the scrollable box
  const content = Array.from({ length: 50 }).map((_, i) => (
    <p key={i}>This is some sample content in the scrollable box.</p>
  ));

  const handleClose = () => {
    setIsVisible(false);
  };

  return isVisible ? (
    <div className="scrollable-box">
      <span className="close-icon" onClick={handleClose}>&times;</span>

      <div className="scrollable-box-content-container">
        <div className="scrollable-box-content">{content}</div>
      </div>
    </div>
  ) : null;
};

