import React, { useEffect, useState } from 'react';
import EconomyBooks from './EconomyBooks';
import ScienceBooks from './ScienceBooks';
import Novel from './Novel';
import SelfDevelopmentBook from './SelfDevelopment';
import styles from '../../../css/MainPage/Main.module.css';
import Loading from '../../../js/Loading';
import BestSeller from './BestSeller';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingChange = (isLoading) => {
    if (!isLoading) {      
      setIsLoading(false);   
    }
  };

  return (
    <div className={styles.main}>
      {isLoading && <Loading />}
      <BestSeller handleLoadingChange={handleLoadingChange} />
      <EconomyBooks handleLoadingChange={handleLoadingChange} />
      <ScienceBooks handleLoadingChange={handleLoadingChange} />
      <Novel handleLoadingChange={handleLoadingChange} />
      <SelfDevelopmentBook handleLoadingChange={handleLoadingChange} />
    </div>
  );
}

export default Home;