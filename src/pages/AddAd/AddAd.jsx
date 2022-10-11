//React
import { useState, useRef, useEffect } from 'react';
//Templat
import TemplatePage from '../../components/TemplatePage/TemplatePage';
//Api
import OlxAPI from '../../helpers/OlxAPI';
//Css
import styles from './AddAd.module.css';
//Mask input
import { NumericFormat } from 'react-number-format';
//React router
import {useNavigate} from 'react-router-dom';

const AddAd = () => {

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const fileField = useRef();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const getCategories = async () => {
            let cats = await OlxAPI.getCategories();
            setCategories(cats);
        };
        getCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisable(true);
        setError('');
        let errors = [];

        if(!title.trim()){
            errors.push('Digite o titulo');
        };
        if(!category){
            errors.push('Selecione a categoria');
        };

        if(errors.length === 0){
            const fData = new FormData();
            fData.append('title',title);
            fData.append('price',price);
            fData.append('priceneg',priceNegotiable);
            fData.append('desc',desc);
            fData.append('cat',category);

            if(fileField.current.files.length > 0){
                for(let i = 0; i < fileField.current.files.length; i++){
                    fData.append('img',fileField.current.files[i]);
                };
            };
            
            const json = await OlxAPI.addAd(fData);
            if(!json.error){
                navigate(`/ad/${json.id}`);
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


    return (
        <TemplatePage title='Postar Anúncio' errorMessage={error}>
            <div className={styles.pageArea}>
                <form onSubmit={handleSubmit}>

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
                                <option></option>
                                {categories && categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
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
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
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
                            <button disabled={disable}>Adicionar Anúncio</button>
                        </div>
                    </label>

                </form>
            </div>

        </TemplatePage>
    );
};

export default AddAd;