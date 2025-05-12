import { useRoutes } from 'react-router';
import { routes } from './Routes/Routes';

export default function App() {
  const routing = useRoutes(routes);

  return <main className="main-content">{routing}</main>;
}
