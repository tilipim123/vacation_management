import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CollaboratorsList = () => {
    const [collaborators, setCollaborators] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/collaborators')
            .then((response) => {
                setCollaborators(response.data);
            })
            .catch((error) => {
                console.error('Error fetching collaborators:', error);
            });
    }, []);

    return (
        <div className="container">
            <div className="py-4">
                <h1 className="display-4">Collaborators</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {collaborators.map((collaborator) => (
                        <div className="col mb-3" key={collaborator.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{collaborator.name}</h5>
                                    <p className="card-text">{collaborator.position}</p>
                                    <Link to={`/collaborators/${collaborator.id}`} className="btn btn-primary">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/new_collaborator" className="btn btn-primary mt-4">New Collaborator</Link>
            </div>
        </div>
    );
};

export default CollaboratorsList;
