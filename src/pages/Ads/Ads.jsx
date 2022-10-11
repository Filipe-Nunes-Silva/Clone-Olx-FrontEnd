//Css
import styles from './Ads.module.css';
//Components
import TemplatePage from '../../components/TemplatePage/TemplatePage';
import AdItem from '../../components/AdItem/AdItem';
//API
import OlxAPI from '../../helpers/OlxAPI';
//React
import { useEffect, useState } from 'react';
//React Router DOM
import { useSearchParams } from 'react-router-dom';

let timer;

const Ads = () => {

  const [query, setQuery] = useSearchParams();

  const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');
  const [categ, setCateg] = useState(query.get('cat') != null ? query.get('cat') : '');
  const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');

  const [adsTotal , setAdsTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList, setAdList] = useState([]);
  const [resultOpacity, setResultOpacity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ widthScreen , setWidthScreen] = useState(window.screen.width < 600 ? true : false);

  const getAdsList = async () => {
    
    setLoading(true);
    let offset = 0;
    offset = (currentPage-1) * 3;//alterar para 9 tambem

    const json = await OlxAPI.getAds({
      sort: 'desc',
      limit: 3,//alterar para 9
      q,
      cat: categ,
      state,
      offset,
    });

    console.log('offset:',offset);
    console.log('currentPage: ',currentPage);
    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  };

  useEffect(()=>{

    if(adList.length > 0){
      let totalPages = (Math.ceil(adsTotal / adList.length));
      setPageCount(totalPages);
    }
    else{
      setPageCount(0);
    };
  },[adsTotal]);

  useEffect(()=>{
    setResultOpacity(0.3);
    getAdsList();
  },[currentPage])

  useEffect(()=>{

    if(categ){
      query.set('cat',categ);
      setQuery(query);
    };

    if(q){
      query.set('q',q);
      setQuery(query);
    }
    else{
      query.delete('q');
      setQuery(query);
    };

    if(state){
      query.set('state',state);
      setQuery(query);
    }
    else{
      query.delete('state');
      setQuery(query);
    };

    if(timer){
      clearTimeout(timer);
    };

    setCurrentPage(1);
    setResultOpacity(0.3);
    timer = setTimeout(()=>getAdsList(),2000);

  },[q,categ,state]);

  useEffect(()=>{
    const getStates = async ()=>{
      const sList = await OlxAPI.getStates();
      setStateList(sList);
    };
    getStates();
  },[]);

  useEffect(()=>{
    const getCategories = async ()=>{
      const cats = await OlxAPI.getCategories();
      setCategories(cats);
    };
    getCategories();
  },[]);

  let pagination = [];
  for(let i = 1; i <= pageCount; i++){
    pagination.push(i);
  };

  return (
    <TemplatePage>
      <div className={styles.pageArea}>

        <div className={styles.leftSide}>
          <form method="get">

            <input 
              type="text" 
              name="q" 
              placeholder='O que você procura?'
              value={q}
              onChange={(e)=>setQ(e.target.value)}
            />

            <div className={styles.filterName}>Estado:</div>

            <select name="state" value={state} onChange={(e)=>setState(e.target.value)}>

              <option></option>
              {stateList.map((state,index)=>(
                <option value={state.name} key={index}>{state.name}</option>
              ))}

            </select>

            <div className={styles.filterName}>Categoria:</div>
            <ul>

              {categories.map((cat,index)=>(
                <li 
                  key={index} 
                  className={categ == cat.slug ? `${styles.categoryItem} ${styles.active}`: styles.categoryItem}
                  onClick={()=>setCateg(cat.slug)}
                >
                  <img src={cat.img} alt={cat.name}/>
                  <span>{cat.name}</span>
                </li>
              ))}

            </ul>

          </form>
        </div>

        <div className={styles.rightSide}>

          <h2>Resultados</h2>
          {loading && adList.length === 0 &&
            <div className={styles.listWarning}>Carregando...</div>
          }
          {!loading && adList.length === 0 &&
            <div className={styles.listWarning}>Não encontramos resultados.</div>
          }
          

          <div className={styles.list} style={{opacity:resultOpacity}} >
            {adList.map((item,index)=>(
              <AdItem key={index} data={item} width={widthScreen ? '50%' : '33%'}/>
            ))}
          </div>
          
          <div className={styles.pagination}> 
              {pagination.map((pag,index)=>(
                <div 
                  className={pag === currentPage ? `${styles.pagItem} ${styles.active}`: styles.pagItem} 
                  key={index}
                  onClick={()=>setCurrentPage(pag)}
                >
                  {pag}
                </div>
              ))}
          </div>
        </div>

      </div>
    </TemplatePage>
  );
};

export default Ads;