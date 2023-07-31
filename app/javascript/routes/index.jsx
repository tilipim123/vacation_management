import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollaboratorsList from "../components/CollaboratorsList";
import CollaboratorDetails from "../components/CollaboratorDetails";
import CollaboratorForm from "../components/CollaboratorForm";
import VacationForm from "../components/VacationForm";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<CollaboratorsList />} />
            <Route path="/collaborators/:id" element={<CollaboratorDetails />} />
            <Route path="/new_collaborator" element={<CollaboratorForm />} />
            <Route path="/collaborators/:id/new_vacation" element={<VacationForm />} />
        </Routes>
    </Router>
);