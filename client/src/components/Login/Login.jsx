import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/Action';
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'; 

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(formData));
            setFormData({
                email: '',
                password: '',
            });
            navigate('/home')
        } catch (error) {
            console.error('Error during login:', error.message);
        }
    };
    
    
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            <div className="register-link">
                ¿No estás registrado? <Link to="/register">Regístrate aquí</Link>
            </div>
        </div>
    );
}
