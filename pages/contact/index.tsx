import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://formspree.io/f/xjkaravr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bedankt!</h1>
        <p>Uw bericht is succesvol verzonden. We nemen snel contact met u op.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Neem Contact Op</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
            Voornaam: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
            Naam: <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email: <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
            Telefoonnummer (optioneel):
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
            Bericht: <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          Verzenden
        </button>
      </form>
    </div>
  );
};

export default Contact;