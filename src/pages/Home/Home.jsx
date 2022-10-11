//React
import {useEffect,useState} from 'react';
//React Router DOM
import {Link} from 'react-router-dom';
//Css
import styles from './Home.module.css';
//Components
import  TemplatePage from '../../components/TemplatePage/TemplatePage';
import AdItem from '../../components/AdItem/AdItem';
//API
import OlxAPI from '../../helpers/OlxAPI';

const Home = () => {

  const [stateList,setStateList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adList,setAdList] = useState([]);


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

  useEffect(()=>{
    const getRecentAds = async ()=>{
      const json = await OlxAPI.getAds({
        sort:'desc',
        limit:12,
      });
      setAdList(json.ads);
    };
    getRecentAds();
  },[]);

  return (
    <>
    
      <div className={styles.searchArea}>
        <TemplatePage>

          <div className={styles.searchBox}>
            <form action="/ads" method="get">
              <input type="text" name="q" placeholder='Oque você procura' />
              <select name="state">
                <option></option>
                {stateList.map((state,index)=>(
                  <option key={index} value={state.name}>{state.name}</option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>

          <div className={styles.categoryList}>
                  {categories.map((cat,index)=>(
                    <Link key={index} to={`/ads?cat=${cat.slug}`} className={styles.categoryItem}>
                      <img src={cat.img} alt="" />
                      <span>{cat.name}</span>
                    </Link>
                  ))}
          </div>

        </TemplatePage>
      </div>

      <TemplatePage>
        <div className={styles.pageArea}>
          <h2>Anúncios Recentes</h2>
          <div className={styles.list}>
            {adList.map((ad,index)=>(
              <AdItem key={index} data={ad}/>
            ))}
          </div>
          <Link to='/ads' className={styles.seeAllLink}>Ver todos</Link>

          <hr />

          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium debitis vero obcaecati maiores, reiciendis repellendus soluta vel illum corrupti deleniti blanditiis quis, aut consequuntur quas enim facere impedit quaerat tempora? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam quia aspernatur voluptates, consequuntur iusto enim repellat delectus? Consequuntur excepturi facilis a delectus eveniet, architecto animi in pariatur quod rem minima.

        </div>
      </TemplatePage>
    
    </>
    
  );
};

export default Home;