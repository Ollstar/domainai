import React from 'react';
import styles from '@/styles/index.module.css';
import { NoSsr } from '@mui/material';

const Message = ({ author, text, timestamp }) => (
  <div className={author === 'User' ? styles.messageLeft : styles.messageRight}>
    {text}
      <div className={styles.subtext}>
      {timestamp ? <NoSsr>timestamp</NoSsr> : <NoSsr>timestamp</NoSsr>} - {author}
      </div>

  </div>
);

export default Message;
