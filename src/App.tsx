import { useRoutes } from 'react-router';
import { routes } from './Routes/Routes';
import Footer from './components/Footer';
import Header from './components/Header';

export default function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <Header />
      <main className="main-content">{routing}</main>
      <Footer />
    </>
  );
}
