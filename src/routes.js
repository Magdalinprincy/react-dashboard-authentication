import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import Dashboard from './components/Dashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/counter" element={<Counter />} />
    <Route path="/user-form" element={<UserForm />} />
    <Route path="/rich-text-editor" element={<RichTextEditor />} />
    <Route path="/dashboard" element={<Dashboard />} /> {/* Added Dashboard Route */}
    <Route path="/" element={<Counter />} />
  </Routes>
);

export default AppRoutes;
