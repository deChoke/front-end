import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Contact = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    phonenumber: '',
    message: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { email, firstname, lastname, phonenumber, message: userMessage } = formData;

    try {
      const { error } = await supabase.from('Inzending').insert([
        { email, firstname, lastname, phonenumber, message: userMessage },
      ]);

      if (error) {
        setMessage('Er is een fout opgetreden bij het verzenden.');
      } else {
        setMessage('Formulier succesvol verzonden!');
        setFormData({ email: '', firstname: '', lastname: '', phonenumber: '', message: '' });
      }
    } catch (error) {
      setMessage('Er is een fout opgetreden.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium">Voornaam</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="lastname" className="block text-sm font-medium">Achternaam</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="phonenumber" className="block text-sm font-medium">Telefoonnummer</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Bericht</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Verzenden
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default Contact;
