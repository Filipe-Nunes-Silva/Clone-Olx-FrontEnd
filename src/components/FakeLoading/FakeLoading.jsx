import styles from './FakeLoading.module.css';

import React from 'react'

const FakeLoading = ({height}) => {

  let heightComp = height ? height : 20;
  return (
    <div style={{backgroundColor:'#ddd',height:`${heightComp}px`}}></div>
  );
};

export default FakeLoading;