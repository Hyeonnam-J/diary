import Home from './Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import Write from './pages/Write';
import Read from './pages/Read';
import Reply from './pages/Reply';

interface RouteConfig {
    path: string;
    element: React.ReactNode;
}

const routes: RouteConfig[] = [
    { path: '/', element: <Home /> },   
    { path: '/signIn', element: <SignIn /> },
    { path: '/signUp', element: <SignUp /> },
    { path: '/board', element: <Board /> },
    { path: '/write', element: <Write /> },
    { path: '/read', element: <Read /> },
    { path: '/reply', element: <Reply /> },
];

export type { RouteConfig };
export default routes;