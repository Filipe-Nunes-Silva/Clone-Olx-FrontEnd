import styles from './TemplatePage.module.css';

const TemplatePage = ({children,title,errorMessage}) => {

  return (
    <div className={styles.pageContainer}>
      {errorMessage &&
        <div className={styles.error}>
          {errorMessage}
        </div>
      }
      
      {title &&
        <h1 className={styles.pageTitle} > {title} </h1>
      }
        <>
            {children}
        </>
    </div>
  );
};
export default TemplatePage;