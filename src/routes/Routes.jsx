//React Router
import { Routes, Route } from 'react-router-dom';
//Components
import { Autentic } from '../components/Autentic/Autentic';
//Pages
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';
import SingIn from '../pages/SingIn/SingIn';
import SingUp from '../pages/SingUp/SingUp';
import AdPage from '../pages/AdPage/AdPage';
import AddAd from '../pages/AddAd/AddAd';
import Ads from '../pages/Ads/Ads';
import MyAccount from '../pages/MyAccount/MyAccount';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sobre' element={<About />} />
      <Route path='/signin' element={<SingIn />} />
      <Route path='/signup' element={<SingUp />} />
      <Route path='/ad/:id' element={<AdPage />} />
      <Route path='/post-an-ad' element={ <Autentic> <AddAd /> </Autentic>} />
      <Route path='/ads' element={<Ads />} />
      <Route path='/my-account' element={ <Autentic> <MyAccount /> </Autentic> } />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;