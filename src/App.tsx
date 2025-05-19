import { useRoutes } from 'react-router';
import { routes } from './Routes/Routes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ScrollToTop from './ux/ScrollToTop';

export default function App() {
  const routing = useRoutes(routes);

  // useEffect(() => {
  //   const fetchTest = async () => {
  //     try {
  //       const data = await getTestGamer();
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchTest();
  // }, []);

  return (
    <div className="app-container">
      <Header />
      <ScrollToTop />
      <main className="main-content">{routing}</main>
      <Footer />
    </div>
  );
}
