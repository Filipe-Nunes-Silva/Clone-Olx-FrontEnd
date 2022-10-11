//Css
import './App.css';
//Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
//Router Pages
import MainRoutes from './routes/Routes';

function App() {

  return (
    <div className='mainTemplate'>
      <Header/>
      <MainRoutes/>
      <Footer/>
    </div>
  );
};

export default App;
