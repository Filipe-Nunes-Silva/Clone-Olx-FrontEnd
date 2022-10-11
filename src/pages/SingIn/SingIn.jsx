//React
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
//Styles
import styles from './SingIn.module.css';
//Templat
import TemplatePage from '../../components/TemplatePage/TemplatePage';
//Api
import OlxAPI from '../../helpers/OlxAPI';
//Cookie
import {doLogin} from '../../helpers/AuthHandler';


const SingIn = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rememberPassword,setRememberPassword] = useState(false);
    const [disable,setDisable] = useState(false);
    const [error,setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setDisable(true);
        setError('');
        const json = await OlxAPI.login(email,password);
        
        if(json.erros){
            setError(json.erros[0].msg);
        }
        else{
            doLogin(json.token,rememberPassword);
            navigate('/');
        };
        setDisable(false);
    };

    return (
        <TemplatePage title='Login' errorMessage={error}>

            <div className={styles.pageArea}>
                <form onSubmit={handleSubmit}>

                    <label className='area'>
                        <div className='area--title'>E-mail</div>
                        <div className='area--input'>
                            <input 
                                type="email" 
                                placeholder='Digite seu e-mail' 
                                disabled={disable}
                                onChange={(e)=>setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>Senha</div>
                        <div className='area--input'>
                            <input 
                                type="password" 
                                placeholder='Digite sua senha' 
                                disabled={disable}
                                onChange={(e)=>setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>Lembrar senha?</div>
                        <div className='area--input'>
                            <input 
                                type="checkbox" 
                                disabled={disable}
                                onChange={(e)=>setRememberPassword(e.target.checked)}
                                checked={rememberPassword}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button 
                                disabled={disable} 
                            >Fazer Login</button>
                        </div>
                    </label>

                </form>
            </div>

        </TemplatePage>
    );
};

export default SingIn;