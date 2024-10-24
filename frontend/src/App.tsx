import './App.css';
import SignUp from "./pages/auth/SignUp";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/home/HomePage";
import {useSelector} from 'react-redux';
import {RootState} from './store';
import LogIn from "./pages/auth/LogIn";

function App() {
	const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

	return (
		<Router>
			<Routes>
				{isAuthenticated ? (
					<Route
						path="/"
						element={
							<PrivateRoute>
								<HomePage/>
							</PrivateRoute>}/>
				) : (
					<>
						<Route path="/" element={<SignUp/>}/>
						<Route path="/login" element={<LogIn/>}/>
					</>
				)}
			</Routes>
		</Router>
	);
}

export default App;
