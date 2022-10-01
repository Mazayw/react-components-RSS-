import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default class NotFound extends PureComponent {
  render() {
    return (
      <div className={`${styles.main} ${styles.dotted}`}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page not found</h2>
        <Link to={'/'} className={styles.link}>
          Back to main page
        </Link>
      </div>
    );
  }
}

// <Link to={`contacts/1`}>Your Name</Link>
