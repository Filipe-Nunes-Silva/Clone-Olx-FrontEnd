//Css
import styles from './MyAccount.module.css';
//Api
import OlxAPI from '../../helpers/OlxAPI';
import { BASEAPI } from '../../helpers/OlxAPI';
//React
import { useState, useEffect } from 'react';
//React router dom
import { useNavigate, Link } from 'react-router-dom';
//Componentes
import TemplatePage from '../../components/TemplatePage/TemplatePage';
import AdItem from '../../components/AdItem/AdItem';


const MyAccount = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [categories,setCategories] = useState([]);

    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');

    const [userInfo, setUserInfo] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [adsList, setAdsList] = useState([]);

    //Envia a requisição
    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisable(true);
        setError('');

        let data = {};
        if (name) {
            data.name = name;
        };
        if (email && email !== userInfo.email) {
            data.email = email;
        };
        if (stateLoc && stateLoc !== userInfo.state) {
            stateList.forEach((item) => {
                if (item.name === stateLoc) {
                    data.state = item._id;
                };
                return;
            });
        };
        if (password) {
            if (password !== confirmPassword) {
                setError('Nova senha e confirmação precisam ser iguais!');
                return;
            };
            data.password = password;
        };

        const json = await OlxAPI.updateUser(data);

        if (json.erros) {
            setError(json.erros[0].msg);
            setDisable(false);
        }
        else {
            setDisable(false);
            navigate('/');
            if (json.msg) {
                alert('Dados atualizados com sucesso!');
            };
        };
    };

    const handleSubmitAd = async (data, setError, setDisable, handleModal) => {
        setDisable(true);
        setError('');
        let errors = [];
        let { title, category, priceModal, priceNegotiable, desc, fileField, idAds , status } = data;

        if (!title.trim()) {
            errors.push('Digite o titulo');
        };
        if (!category) {
            errors.push('Selecione a categoria');
        };
  
        if(errors.length === 0){
            const fData = new FormData();
            fData.append('title',title);
            fData.append('price',priceModal);
            fData.append('priceneg',priceNegotiable);
            fData.append('desc',desc);
            fData.append('cat',category);
            fData.append('status',status);

            if(fileField.current.files.length > 0){
                for(let i = 0; i < fileField.current.files.length; i++){
                    fData.append('img',fileField.current.files[i]);
                };
            };
            
            const json = await OlxAPI.updateAd(idAds,fData);
            if(!json.error){
                setDisable(false);
                handleModal();
                navigate('/');
                return;
            }
            else{
                setError(json.error);
            };

        }
        else{
            setError(errors.join(" / "));
        };
        setDisable(false);
    };

    //Pagar informações do usuario e preenche variaveis
    useEffect(() => {
        setDisable(true);
        const getUserInfo = async () => {
            const json = await OlxAPI.getUserInfo();
            setUserInfo(json);
            setName(json.name);
            setEmail(json.email);
            setStateLoc(json.state);
            setAdsList(json.ads);
        };
        getUserInfo();

        setDisable(false);
    }, []);

    //Pega informações dos estados
    useEffect(() => {
        setDisable(true);

        const getStates = async () => {
            const json = await OlxAPI.getStates();
            let data = [];
            json.forEach(item => {
                if (item.name == stateLoc) {
                    data.unshift(item);
                }
                else {
                    data.push(item);
                };
            });
            setStateList(data);
        };
        getStates();
        setDisable(false);
    }, [stateLoc]);

    //Modificando a estrutura dos dados de anuncios para o AdItem achar a imagem de capa 
    useEffect(() => {

        let temp = [...adsList];

        temp.forEach((item, i) => {
            if (item.images.length === 0) {
                item.images.push({ url: `default.jpg`, default: true });
            };
            temp[i].image = `${BASEAPI}/media/${item.images[0].url}`;
        });

        setAdsList(temp);
    }, [stateLoc]);

    useEffect(() => {
        const getCategories = async () => {
            let cats = await OlxAPI.getCategories();
            setCategories(cats);
        };
        getCategories();
    }, []);


    return (
        <TemplatePage title='Seus dados' errorMessage={error}>
            <div className={styles.topArea}>

                <form onSubmit={handleSubmit}>

                    <label className='area'>
                        <div className='area--title'>Nome Completo</div>
                        <div className='area--input'>
                            <input
                                type="text"
                                placeholder='Digite seu nome'
                                disabled={disable}
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setStateLoc(e.target.value)}
                                disabled={disable}
                            >
                                {stateList && stateList.map((state, index) => (
                                    <option key={index} value={state.name}>{state.name}</option>
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
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <span className={styles.msgPass}>*Insira uma nova senha abaixo caso queira mudar, ou deixe em branco para continuar com a senha atual</span>
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>Alterar senha</div>
                        <div className='area--input'>
                            <input
                                type="password"
                                disabled={disable}
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'>Confirme nova senha</div>
                        <div className='area--input'>
                            <input
                                type="password"
                                disabled={disable}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                            />
                        </div>
                    </label>
                    <label className='area'>
                        <div className='area--title'></div>
                        <div className='area--input'>
                            <button disabled={disable} onClick={handleSubmit}> Alterar Dados </button>
                        </div>
                    </label>

                </form>
            </div>

            <div className={styles.bottomArea}>

                <h1>Seus anúncios</h1>

                {adsList.length > 0 ?

                    <div className={styles.list}>
                        {adsList.map((ad, index) => (
                            <AdItem key={index} data={ad} cat={categories} isModal={true} submit={handleSubmitAd}/>
                        ))}
                    </div>
                    :
                    <span>Você não tem anuncios, <Link to='/post-an-ad'>clique aqui</Link> para adicionar um.</span>
                }
            </div>

        </TemplatePage>
    );
};

export default MyAccount;
