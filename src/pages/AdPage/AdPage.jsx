//Css
import styles from './AdPage.module.css';
//API
import OlxAPI from '../../helpers/OlxAPI';
//Template
import TemplatePage from '../../components/TemplatePage/TemplatePage';
//React DOM
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
//React
import { useState,useEffect } from 'react';
//Components
import FakeLoading from '../../components/FakeLoading/FakeLoading';
import OthersArea from '../../components/OthersArea/OthersArea';
import BreadChumb from '../../components/BreadChumb/BreadChumb';

//Sliders
import { Slide } from 'react-slideshow-image';  // Referente ao react-slideshow
import 'react-slideshow-image/dist/styles.css'; // Referente ao react-slideshow

const AdPage = () => {
    const { id } = useParams();

    const [loading,setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

    const formatDate = (date) =>{
        let cDate = new Date(date);

        let cDay = ()=>{
            let d = cDate.getDate();
            return d < 10 ? `0${d}` : d;
        };
        let cMonth = ()=>{
            let months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
            let m = parseInt( cDate.getMonth() );
            return months[m+1];
        };
        let cYaer = cDate.getFullYear();

        return `${cDay()} de ${cMonth()} de ${cYaer}`;
    };

    useEffect(()=>{
        const getAdInfo = async (id)=>{
            const json = await OlxAPI.getAd(id,true);
            setAdInfo(json);
            setLoading(false);
        };
        getAdInfo(id);
    },[]);

    useEffect(()=>{ //Esse 2º useEffect monitorando a variavel ID, p/ quando navegar entre anuncios do mesmo vendedor funcionar ok
        const getAdInfo = async (id)=>{
            const json = await OlxAPI.getAd(id,true);
            setAdInfo(json);
            setLoading(false);
        };
        getAdInfo(id);
    },[id]);

    return (

        <TemplatePage>
            {adInfo.category &&
                <BreadChumb>
                Você está aqui: <Link to='/'>Home</Link> /  
                <Link to={`/ads?state=${adInfo.stateInfo}`}>{adInfo.stateInfo}</Link> /  
                <Link to={`/ads?state=${adInfo.stateInfo}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link> / {adInfo.title}
                </BreadChumb>
            }
            

            <div className={styles.pageArea}>
                <div className={styles.leftSide} >
                    <div className={styles.box}>
                        <div className={styles.adImage}>

                           {loading && <FakeLoading height={300}/>}
                           {adInfo.images &&
                            <Slide>
                                {adInfo.images.map((img,index)=>(
                                    <div key={index} className={styles.each_slide}>
                                        <img src={img} alt="Imagens do produto" />
                                    </div>
                                ))}
                            </Slide>
                           }

                        </div>
                        <div className={styles.adInfo}>
                            <div className={styles.adName}>
                                {loading && <FakeLoading height={20}/>}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criando em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className={styles.adDescription}>
                                {loading && <FakeLoading height={100}/>}
                                {adInfo.description}
                                <hr />
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>  {/*{styles.rightSide},{styles.boxPadding} */}

                <div className={styles.rightSide}>

                    <div className={`${styles.box} ${styles.boxPadding}`}>
                        {loading && <FakeLoading height={20}/>}
                        {adInfo.priceNegotiable &&
                            "Preço Negociavel"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className={styles.price}>
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        }
                    </div>

                    {loading && <FakeLoading height={50}/>}
                    {adInfo.userInfo &&
                        <>
                            <a 
                                href={`mailto:${adInfo.userInfo.email}`}
                                target="_blank" 
                                className={styles.contactSellerLink}
                            >Fale com o vendedor</a>

                            <div className={`${styles.box} ${styles.boxPadding}`}>
                                <div className={styles.createdBy}>
                                    <strong>{adInfo.userInfo.name}</strong>
                                    <small>E-mail: {adInfo.userInfo.email}</small>
                                    <small>Estado: {adInfo.stateInfo}</small>
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>

            {adInfo.others ?
                <OthersArea title='Outras ofertas do vendedor' data={adInfo.others} /> :
                <FakeLoading height={50}/>
            }

        </TemplatePage>

    );
};

export default AdPage;