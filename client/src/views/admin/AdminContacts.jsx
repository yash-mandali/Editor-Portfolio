import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => { fetchContacts(); }, []);

    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/contacts`);
            setContacts(res.data.data || []);
        } catch (err) { console.error(err); }
    };

    const updateStatus = async (id, status) => {
        try { await axios.patch(`${API_URL}/api/contacts/${id}`, { status }); fetchContacts(); } catch (err) { console.error(err); }
    };

    const deleteContact = async (id) => {
        if (!confirm('Delete contact?')) return;
        try { await axios.delete(`${API_URL}/api/contacts/${id}`); fetchContacts(); } catch (err) { console.error(err); }
    };

    return (
        <div className="bg-white dark:bg-neutral-900 p-4 rounded border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-semibold mb-4">Contacts ({contacts.length})</h2>
            {contacts.length === 0 ? <p>No contacts yet</p> : (
                <div className="space-y-3">
                    {contacts.map(c => (
                        <div key={c._id} className="p-3 border rounded bg-neutral-50 dark:bg-neutral-950">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-medium">{c.name}</p>
                                    <p className="text-xs text-neutral-500">{c.email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-neutral-500">{new Date(c.createdAt).toLocaleString()}</p>
                                    <button onClick={() => deleteContact(c._id)} className="mt-2 text-red-600 text-xs flex items-center gap-2"><Trash2 size={14} />Delete</button>
                                </div>
                            </div>
                            <p className="mt-2 text-sm">{c.message}</p>
                            <div className="mt-3">
                                <select value={c.status} onChange={(e) => updateStatus(c._id, e.target.value)} className="px-3 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded">
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminContacts;
