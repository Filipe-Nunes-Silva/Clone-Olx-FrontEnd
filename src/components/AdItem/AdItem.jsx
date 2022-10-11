//Css
import styles from './AdItem.module.css';
//React router
import { Link } from 'react-router-dom';
//React
import { useState, useRef, useEffect } from 'react';
//Mask input
import { NumericFormat } from 'react-number-format';
//Template
import TemplatePage from '../TemplatePage/TemplatePage';

//React Modal
import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = {
    content: {
      width:'80%',
      height:'90%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};


const AdItem = (props) => {

    
    //Modal
    const [title, setTitle] = useState(props.data.title);
    const [category, setCategory] = useState(props.data.category);
    const [priceModal, setPriceModal] = useState(props.data.price);
    const [priceNegotiable, setPriceNegotiable] = useState(props.data.priceNegotiable);
    const [desc, setDesc] = useState(props.data.description);
    const [disableAd,setDisableAd] = useState(props.data.status == 'true' ? true : false);
    const [idAds,setIdAds] = useState('');
    const fileField = useRef();

    const [categories, setCategories] = useState(props.cat);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleModal = (id) =>{
        setModalIsOpen(!modalIsOpen);
        setIdAds(id);
    };

    //Verificando se tem preço ou se recebe propostas
    const convertPrice = ()=>{
        if(props.data.priceNegotiable){
            return 'Preço a negociar'
        }
        else{
            return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(props.data.price);
        };
    };
    let price = convertPrice();

    //Colocando a categoria do anuncio como primeira do array
    if(props.isModal){
        useEffect(()=>{
            let cats = [];
            categories.forEach((item) => {
                if(item.slug === props.data.category){
                    cats.unshift(item);
                }
                else{
                    cats.push(item);
                };
            });
            setCategories(cats);
        },[]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let data = {
            title,
            category,
            priceModal,
            priceNegotiable,
            desc,
            fileField,
            idAds,
            status:disableAd,
        };
        props.submit(data,setError,setDisable,handleModal);
    };

  return (
    <>
        {!props.isModal? (

            <>
                {/* MODELO DE LINK QUE MANDA PARA A PAGINA DO ANUNCIO */}
                <div className={styles.item} style={{width:`${props.width}`}} onClick={props.click}>
                    <Link to={`/ad/${props.data.id || props.data._id}`}>

                        <div className={styles.itemImage}>
                            <img src={props.data.image} alt={props.data.title}/>
                        </div>

                        <div className={styles.itemName}>
                            {props.data.title}
                        </div>

                        <div className={styles.itemPrice}>
                            {price}
                        </div>

                    </Link>
                </div>
            
            </>
        ) : 
        (   
            <>
                {/* MODELO QUE USA O MODAL E ABRE PARA EDIÇÃO DO ANUNCIO */}
                <div className={styles.item} style={{width:`${props.width}`}} onClick={()=>handleModal(props.data._id)}>
                    <div className={styles.itemDiv}>

                        <div className={styles.itemImage}>
                            <img src={props.data.image} alt={props.data.title}/>
                        </div>

                        <div className={styles.itemName}>
                            {props.data.title}
                        </div>

                        <div className={styles.itemPrice}>
                            {price}
                        </div>

                    </div>
                </div>
            </>
        )}


        <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleModal}//closeModal
            style={customStyles}
        >
            <div className={styles.closeModal}>
                <button onClick={handleModal} className={styles.btnCloseModal}>Fechar</button>
            </div>
            <TemplatePage title='Editar anúncio' errorMessage={error}>
                <div className={styles.pageArea}>
                    <form onSubmit={handleSubmit}>

                    <label className='area'>
                            <div className='area--title'>Anúncio ativo?</div>
                            <div className='area--input'>
                                <input
                                    type="checkbox"
                                    disabled={disable}
                                    checked={disableAd}
                                    value={disableAd}
                                    onChange={(e)=>setDisableAd(e.target.checked)}
                                />
                            </div>
                        </label>

                        <label className='area'>
                            <div className='area--title'>Titulo</div>
                            <div className='area--input'>
                                <input
                                    type="text"
                                    placeholder='Titulo do anúncio'
                                    disabled={disable}
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    required
                                />
                            </div>
                        </label>

                        <label className='area'>
                            <div className='area--title'>Categoria</div>
                            <div className='area--input'>
                                <select
                                    onChange={(e) => setCategory(e.target.value)}
                                    className={styles.category}
                                    disabled={disable}
                                    required
                                >
                                    {categories && categories.map((cat) => (
                                        <option key={cat._id} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </label>

                        <label className='area'>
                            <div className='area--title'>Preço</div>
                            <div className='area--input'>
                                <NumericFormat 
                                    thousandSeparator={'.'} 
                                    decimalSeparator=',' 
                                    decimalScale={2}
                                    prefix='R$ '
                                    placeholder='R$'
                                    disabled={disable || priceNegotiable}
                                    value={priceModal}
                                    onChange={(e)=>setPriceModal(e.target.value)}
                                />
                            </div>
                        </label>

                        <label className='area'>
                            <div className='area--title'>Preço Negociável</div>
                            <div className='area--input'>
                                <input
                                    type="checkbox"
                                    disabled={disable}
                                    checked={priceNegotiable}
                                    onChange={(e) => setPriceNegotiable(e.target.checked)}
                                />
                            </div>
                        </label>

                        <label className='area'>
                            <div className='area--title'>Descrição</div>
                            <div className='area--input'>
                                <textarea
                                    disabled={disable}
                                    placeholder='Descrição do anúncio'
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                ></textarea>
                            </div>
                        </label>

                        <label className='area'>
                            <div className='area--title'>Imagens</div>
                            <div className='area--input'>
                                <input
                                    type="file"
                                    multiple
                                    disabled={disable}
                                    ref={fileField}
                                />
                            </div>
                        </label>

                        <label className='area'>
                            <div className='area--title'></div>
                            <div className='area--input'>
                                <button disabled={disable}>Salvar anúncio</button>
                            </div>
                        </label>
                    </form>
                </div>
            </TemplatePage>

        </Modal>



    </>

  );
};

export default AdItem;