import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import ApiService from "../../api/authApi";
import {setUser} from "../../store/userSlice";
import {useDispatch} from 'react-redux';

interface FormData {
	email: string;
	password: string;
}

const LogIn: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: ''
	});

	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		await ApiService.login(formData).then((response) => {
			const {email, firstname, surname, id} = response.data.data.user;
			const {token} = response.data.data;
			dispatch(setUser({user: {email, firstname, surname, id}, token}));
			navigate('/');
		}).catch((error) => {
			setError(error.response.data.errors);
		})
	}

	return (
		<div className="min-h-screen min-w-screen p-8 bg-slate-100">
			<p className={"font-satisfy text-4xl text-center mt-16 text-slate-700 mb-24"}>
				Welcome
			</p>
			<div className="signup-form">
				<h2 className={"text-2xl font-satisfy"}>Log In</h2>
				{error && (
					<p className={"text-red-500 text-center"}>{error}</p>
				)}
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="email" className={"text-2xl font-satisfy"}>Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password" className={"text-2xl font-satisfy"}>Password:</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
						/>
					</div>

					<div className={"grid grid-cols-2 gap-2"}>
						<Link to="/" className={"mt-12 block w-100 bg-cyan-300 p-4 text-center rounded cursor-pointer"}>Sign up</Link>
						<button type="submit" className={"mt-12 bg-emerald-300 rounded cursor-pointer"}>Log In</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LogIn;

