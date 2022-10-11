import styles from './BreadChumb.module.css';


const BreadChumb = ({children}) => {
  return (
    <div className={styles.container}>
        {children}
    </div>
  );
};

export default BreadChumb;