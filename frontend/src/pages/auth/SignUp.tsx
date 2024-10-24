import React, {useState} from 'react';
import './Auth.css';
import ApiService from '../../api/authApi';
import {setUser} from '../../store/userSlice';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

interface FormData {
	firstname: string;
	surname: string;
	email: string;
	password: string;
}

interface FormErrors {
	firstname?: string;
	surname?: string;
	email?: string;
	password?: string;
}

const SignUp: React.FC = () => {
	const dispatch = useDispatch();

	const [formData, setFormData] = useState<FormData>({
		firstname: '',
		surname: '',
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState<FormErrors>({});
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validateForm = (): FormErrors => {
		const newErrors: FormErrors = {};
		if (!formData.firstname) newErrors.firstname = 'First name is required';
		if (!formData.surname) newErrors.surname = 'Surname is required';
		if (!formData.email) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}
		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters long';
		}
		return newErrors;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setErrors({});

		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length === 0) {

			await ApiService.signUp(formData).then((response) => {
				const {email, firstname, surname, id} = response.data.data.user;
				const {token} = response.data.data;
				dispatch(setUser({user: {email, firstname, surname, id}, token}));
			}).catch((error) => {
				setError(error.response.data.errors || error.response.data.status.message);
			})
		} else {
			setErrors(validationErrors);
		}
	};

	return (
		<div className="min-h-screen min-w-screen p-8 bg-slate-100">
			<p className={"font-satisfy text-4xl text-center mt-16 text-slate-700 mb-24"}>
				Welcome
			</p>
			<div className="signup-form">
				<h2 className={"text-2xl font-satisfy"}>Sign Up</h2>
				{error && (
					<p className={"text-red-500 text-center"}>{error}</p>
				)}
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="firstname" className={"text-2xl font-satisfy"}>First name:</label>
						<input
							type="text"
							id="firstname"
							name="firstname"
							value={formData.firstname}
							onChange={handleChange}
						/>
						{errors.firstname && <p className="error">{errors.firstname}</p>}
					</div>

					<div className="form-group">
						<label htmlFor="name" className={"text-2xl font-satisfy"}>Surname:</label>
						<input
							type="text"
							id="surname"
							name="surname"
							value={formData.surname}
							onChange={handleChange}
						/>
						{errors.surname && <p className="error">{errors.surname}</p>}
					</div>

					<div className="form-group">
						<label htmlFor="email" className={"text-2xl font-satisfy"}>Email:</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
						{errors.email && <p className="error">{errors.email}</p>}
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
						{errors.password && <p className="error">{errors.password}</p>}
					</div>

					<div className={"grid grid-cols-2 gap-2"}>
						<Link to="/login" className={"mt-12 block w-100 bg-cyan-300 p-4 text-center rounded cursor-pointer"}>Log in</Link>
						<button type="submit" className={"mt-12 bg-emerald-300 rounded cursor-pointer"}>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
