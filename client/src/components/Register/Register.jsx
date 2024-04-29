import React, { useState } from 'react';
import { register } from '../../redux/Action';
import { useDispatch } from 'react-redux';
import './Register.css'; // Importa los estilos CSS

export default function Register() {
    const dispatch = useDispatch();
   
    const [formData, setFormData] = useState({
        name: '', 
        lastName: '',
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
            await dispatch(register(formData));
            setFormData({
                name: '',
                lastName: '',
                email: '',
                password: '',
            });
        } catch (error) {
            console.error('Error during registration:', error.message);
        }
    };
    
    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Nombre: 
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Apellido: 
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Correo electrónico:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}
