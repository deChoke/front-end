import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    submit: ""
  });

  const validationRules = {
    firstName: (value: string) => value.length >= 50 ? "Maximum 50 karakters toegestaan" : "",
    lastName: (value: string) => value.length >= 50 ? "Maximum 50 karakters toegestaan" : "",
    email: (value: string) => {
      if (value.length >= 100) return "Maximum 100 karakters toegestaan";
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Voer een geldig e-mailadres in";
      return "";
    },
    phone: (value: string) => value && !/^[0-9+\-\s()]*$/.test(value) ? "Voer een geldig telefoonnummer in" : "",
    message: (value: string) => value.length >= 750 ? "Maximum 750 karakters toegestaan" : "",
  };

  const validateField = (name: string, value: string) => {
    return validationRules[name as keyof typeof validationRules]?.(value) || "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      message: validateField("message", formData.message),
      submit: ""
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else if (response.status === 429) {
        setErrors(prev => ({
          ...prev,
          submit: "Te veel verzoeken. Probeer het over een uur opnieuw."
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          submit: data.error || "Er is een fout opgetreden bij het verzenden van het formulier."
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: "Er is een fout opgetreden. Probeer het later opnieuw."
      }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-primary">Bedankt!</h1>
          <p className="text-gray-600 mb-8">
            Uw bericht is succesvol verzonden.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/80 focus:ring-4 focus:ring-blue-300 transition duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Terug naar Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sm:p-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">
        Neem Contact Op
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              Voornaam <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              maxLength={50}
              className={`w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Naam <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              maxLength={50}
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={100}
            className={`w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefoonnummer (optioneel)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Bericht <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
            maxLength={750}
            className={`w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
          )}
        </div>

        {errors.submit && (
          <p className="text-center text-red-500 mb-4">{errors.submit}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/80 focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          Verzenden
        </button>
      </form>
    </motion.div>
    </div>
  );
};

export default Contact;
