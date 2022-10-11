import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

//Cookies
import { isLogged,doLogout } from '../../helpers/authHandler';

const Header = () => {
  const logged = isLogged();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    doLogout();
    navigate('/');
  };

  return (
    <div className={styles.headerArea}>
      <div className={styles.container}>

        
        <div className={styles.logo}>
          <Link to='/'>
            <span className={styles.logo1}>O</span>
            <span className={styles.logo2}>L</span>
            <span className={styles.logo3}>X</span>
          </Link>
        </div>

        <nav>
          <ul>

            {logged &&
              <>
                <li>
                  <Link to='/my-account'>Minha conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
                <li>
                  <Link to='post-an-ad' className={styles.button}>Poste um anúncio</Link>
                </li>
              </>
            }

            {!logged &&
              <>
                <li>
                  <Link to='/signin'>Login</Link>
                </li>
                <li>
                  <Link to='/signup'>Cadastrar</Link>
                </li>
                <li>
                  <Link to='/signin' className={styles.button}>Poste um anúncio</Link>
                </li>
              </>
            }
          </ul>
        </nav>
        
        
      </div>
    </div>
  );
};

export default Header;