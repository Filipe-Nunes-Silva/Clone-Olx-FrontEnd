//Css
import styles from './SingUp.module.css';
//React
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
//Templat
import TemplatePage from '../../components/TemplatePage/TemplatePage';
//Api
import OlxAPI from '../../helpers/OlxAPI';
//Cookie
import {doLogin} from '../../helpers/AuthHandler';

const SingUp = () => {

    const [name,setName] = useState('');
    const [stateLoc,setStateLoc] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const [disable,setDisable] = useState(false);
    const [error,setError] = useState('');
    const [stateList,setStateList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const getStates = async ()=>{
            const sList = await OlxAPI.getStates();
            setStateList(sList);
        };
        getStates();
    },[]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setDisable(true);

        if(password !== confirmPassword){
            setError('Senha e confirmação de senha não são iguais!');
            setDisable(false);
            return;
        };
        const json = await OlxAPI.register(name,email,password,stateLoc);

        if(json.erros){
            setError(json.erros[0].msg);
        }
        else{
            doLogin(json.token);
            navigate('/');
        };
        setDisable(false);
    };


  return (
    <TemplatePage title='Cadastro' errorMessage={error}>

        <div className={styles.pageArea}>
            <form onSubmit={handleSubmit}>

                <label className='area'>
                    <div className='area--title'>Nome Completo</div>
                    <div className='area--input'>
                        <input 
                            type="text" 
                            placeholder='Digite seu nome' 
                            disabled={disable}
                            onChange={(e)=>setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                </label>
                <label className='area'>
                    <div className='area--title'>Estado</div>
                    <div className='area--input'>
                        <select 
                            required
                            value={stateLoc}
                            onChange={(e)=>setStateLoc(e.target.value)}
                        >
                            <option></option>
                        {stateList.map((state,index)=>(
                            <option key={index} value={state._id}>{state.name}</option>
                        ))}
                        </select>
                    </div>
                </label>
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
                    <div className='area--title'>Confirmar Senha</div>
                    <div className='area--input'>
                        <input 
                            type="password" 
                            placeholder='Digite a senha novamente'
                            disabled={disable}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </div>
                </label>
                <label className='area'>
                    <div className='area--title'></div>
                    <div className='area--input'>
                        <button 
                            disabled={disable} 
                        >Fazer Cadastro</button>
                    </div>
                </label>

            </form>
        </div>
    </TemplatePage>
  );
};

export default SingUp;