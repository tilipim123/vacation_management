import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const CollaboratorForm = () => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/api/v1/collaborators', { name, position, hire_date: hireDate })
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    setFormErrors(error.response.data);
                } else {
                    console.error('Error creating collaborator:', error);
                    // You can handle other errors here if needed
                }
            });
    };

    return (
        <div className="container">
            <div className="py-4">
                <h1 className="display-4">New Collaborator</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Position:</label>
                        <input
                            type="text"
                            className={`form-control ${formErrors.position ? 'is-invalid' : ''}`}
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                        {formErrors.position && <div className="invalid-feedback">{formErrors.position}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hire Date:</label>
                        <input
                            type="date"
                            className={`form-control ${formErrors.hire_date ? 'is-invalid' : ''}`}
                            value={hireDate}
                            onChange={(e) => setHireDate(e.target.value)}
                        />
                        {formErrors.hire_date && <div className="invalid-feedback">{formErrors.hire_date}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
                <br />
                <Link to="/" className="btn btn-secondary">
                    Back to Collaborators
                </Link>
            </div>
        </div>
    );
};

export default CollaboratorForm;
