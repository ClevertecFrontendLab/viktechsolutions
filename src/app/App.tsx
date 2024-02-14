import useNavbarHeight from '@hooks/useNavbarHeight.ts';
import { Suspense } from 'react';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import AppRouter from './providers/router/AppRouter.tsx';
import './styles/index.scss';


export const App = () => {
    useNavbarHeight();

  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
           <Sidebar/>
        <div className="content-page">
          <Navbar  className="header"/>
          <AppRouter className="page"/>
        </div>
      </Suspense>
    </div>
  );
};

export default App;
