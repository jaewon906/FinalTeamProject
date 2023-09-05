import React, { useEffect, useState } from 'react'
import styles from "../css/Common/Loading.module.css";

function Loading() {

  return (
   
    <div className={styles.imgBox}>
      <img className={styles.loadingImg} src="https://cdn-icons-png.flaticon.com/512/3296/3296160.png" width="150px" height="150px" alt="loading" />
      <p className={styles.loadingText}>불러오는 중!</p>
    </div>
  )
}

export default Loading