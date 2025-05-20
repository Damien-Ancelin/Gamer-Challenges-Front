import { useRoutes } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { routes } from './Routes/Routes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ScrollToTop from './ux/ScrollToTop';

export default function App() {
  const routing = useRoutes(routes);

  return (
    <div className="app-container">
      <Header />
      <ScrollToTop />
      <main className="main-content">{routing}</main>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        stacked
      />
      <Footer />
    </div>
  );
}
