import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardHome from './modules/DashboardHome';
import PageOne from 'modules/PageOne';
import PageTwo from 'modules/PageTwo';
import './common/styles.css';
import PageThree from 'modules/PageThree/index.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardHome> </DashboardHome>,
    },
    {
      path: '/page-one',
      element: <PageOne></PageOne>,
    },
    {
      path: '/page-two',
      element: <PageTwo></PageTwo>,
    },
    {
      path: '/page-three',
      element: <PageThree></PageThree>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
