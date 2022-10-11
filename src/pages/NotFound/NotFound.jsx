import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.container}>
        <h2>Página não encontrada!</h2>
        <p> Voltar para <Link to='/'>página inicial</Link> </p>
    </div>
  );
};

export default NotFound;