import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import "../styles/AdminUserDashboard.css";

export default function AdminUserDashboard() {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [newRole, setNewRole] = useState('USER');
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function loadUsers() {
            try {
                const { data } = await axios.get('/api/users');
                setUsers(data);
            } catch (err) {
                console.error(err);
            }
        }
        loadUsers();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        setMessage('');
        try {
            const target = users.find(u => u.email === email.trim());
            if (!target) {
                setMessage(`No user found with email "${email}"`);
                return;
            }
            await axios.put(`/api/users/assign-role/${target._id}`, { role: newRole });
            setMessage(`Role for ${email} updated to ${newRole}`);
            // reload
            const { data } = await axios.get('/api/users');
            setUsers(data);
        } catch (err) {
            console.error(err);
            setMessage('Error updating role');
        }
    };

    return (
        <div className="admin-users-container" style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2>Admin: User Management</h2>

            <form onSubmit={onSubmit} style={{ marginBottom: '2rem' }}>
                <div className="form-group">
                    <label>Email of user</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Select role</label>
                    <select
                        value={newRole}
                        onChange={e => setNewRole(e.target.value)}
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Assign Role</button>
            </form>

            {message && <p><em>{message}</em></p>}

            <h3>All Users</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Name</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Email</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '0.5rem' }}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{u.name}</td>
                            <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{u.email}</td>
                            <td style={{ padding: '0.5rem', borderBottom: '1px solid #f0f0f0' }}>{u.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
