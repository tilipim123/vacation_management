import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';

const VacationForm = ({ collaboratorId }) => {
    const { id } = useParams();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`/api/v1/collaborators/${id}/vacations`, { start_date: startDate, end_date: endDate })
            .then((response) => {
                console.log('Vacation created:', response.data);
                // You can add a redirect or show a success message here
                navigate(`/collaborators/${id}`);
            })
            .catch((error) => {
                if (error.response && error.response.status === 422) {
                    // Validation errors returned from the server
                    setFormErrors(error.response.data);
                } else {
                    console.error('Error creating vacation:', error);
                    // You can handle other errors here if needed
                }
            });
    };

    return (
        <div className="container">
            <div className="py-4">
                <h2>New Vacation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">
                            Start Date:
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            className={`form-control ${formErrors.start_date ? 'is-invalid' : ''}`}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        {formErrors.start_date && <div className="invalid-feedback">{formErrors.start_date}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">
                            End Date:
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            className={`form-control ${formErrors.end_date ? 'is-invalid' : ''}`}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        {formErrors.end_date && <div className="invalid-feedback">{formErrors.end_date}</div>}
                    </div>
                    {formErrors.base && <div className="alert alert-danger">{formErrors.base}</div>}
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
                <br />
                <Link to={`/collaborators/${id}`} className="btn btn-secondary">
                    Back to Collaborator Details
                </Link>
            </div>
        </div>
    );
};

export default VacationForm;
