import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import {
  ControlledFormPage,
  UncontrolledFormPage,
  MainPage,
  NotFoundPage,
} from './pages';
import './App.css';
import { RootLayout } from './layouts/rootLayout';
// import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<MainPage />} />
      <Route path="uncontrolled" element={<UncontrolledFormPage />} />
      <Route path="controlled" element={<ControlledFormPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
export const App = () => <RouterProvider router={router} />;
