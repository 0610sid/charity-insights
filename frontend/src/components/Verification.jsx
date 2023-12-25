import React from 'react';
import styles from '../stylesheets/Login.module.css';

const Verification = () => {
  return (
    <div className={styles.mainErrorPage} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="290"
        viewBox="0 0 470 290"
        className={styles.svg}
      >
        {/* ... (SVG paths and elements) */}
      </svg>

      <h1 className={styles.errorTitle}>Woops! <br />Something went wrong :(</h1>
      <h2 className={styles.errorSubtitle}>Have you tried turning it off and on again?</h2>
    </div>
  );
};

export default Verification;
