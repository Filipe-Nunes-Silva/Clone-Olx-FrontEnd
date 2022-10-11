//css
import styles from './OthersArea.module.css';
//components
import AdItem from '../AdItem/AdItem';

const OthersArea = ({data,title}) => {

  return (
    <div className={styles.container}>
        <h2>{title}</h2>
        <div className={styles.list}>
            {data.map((item,index)=>(
                <AdItem data={item} key={index} />
            ))}
        </div>
    </div>
  );
};

export default OthersArea;