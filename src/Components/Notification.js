import React, { useEffect } from 'react';
import styles from './Notification.module.css';

export const Notification = ({ message, messageColor, duration, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onDismiss]);

  return <div className={styles.notification} style = {{backgroundColor:`${messageColor}`}}>{message}</div>;
};

