import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CollaboratorDetails = () => {
    const { id } = useParams();
    const [collaborator, setCollaborator] = useState(null);
    const [vacations, setVacations] = useState([]);

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

    useEffect(() => {
        axios.get(`/api/v1/collaborators/${id}`)
            .then((response) => {
                setCollaborator(response.data);
                if (response.data.vacations) {
                    setVacations(response.data.vacations);
                }
            })
            .catch((error) => {
                console.error('Error fetching collaborator details:', error);
            });
    }, [id]);

    if (!collaborator) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="py-4">
                <h1 className="display-4">{collaborator.name}</h1>
                <p className="lead">Position: {collaborator.position}</p>
                <p className="lead">Hire Date: {collaborator.hire_date}</p>

                <h2>Vacations</h2>
                {vacations.length > 0 ? (
                    <ul>
                        {vacations.map((vacation) => (
                            <li key={vacation.id}>
                                {vacation.start_date} - {vacation.end_date}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No vacations found for this collaborator.</p>
                )}

                <div className="row mt-3">
                    <div className="col">
                        <Link to="/" className="btn btn-secondary">Back to Collaborators</Link>
                    </div>
                    <div className="col">
                        <Link to={`/collaborators/${collaborator.id}/new_vacation`} className="btn btn-primary mr-2">New Vacation</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollaboratorDetails;
