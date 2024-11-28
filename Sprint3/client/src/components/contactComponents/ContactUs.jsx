import { useState, useEffect } from 'react';
import contactData from './data';
import carImage from '../../assets/images/car-w-charger.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.content) {
      alert('Please fill in all fields');
      return;
    }
    const newContactForm = {
      name: formData.name,
      email: formData.email,
      content: formData.content,
    };
    addContactForm(newContactForm);
    //reset form
    setFormData({ name: '', email: '', content: '' });
  };

  const addContactForm = async (newContactForm) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContactForm),
      });
      if (response.ok) {
        console.log('Form data sent successfully');
      } else {
        alert('Failed to send form data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center mb-16 mt-8">
      <div className="font-Roboto">
        <h1 className="text-3xl font-bold text-eGreen mb-4 font-Orbitron ">
          Contact Us
        </h1>

        <div className="text-white flex flex-col mb-2">
          <h2 className="font-bold">Customer Support</h2>
          <p>{contactData.customerSupport}</p>
        </div>
        <div className="flex flex-row items-center relative justify-center">
          {/* Contact info section */}
          <div className="bg-white p-4 rounded-xl w-64 h-64 justify-center absolute -translate-x-1/2 left-[-20px] hidden sm:block">
            <div>
              <h2 className="font-bold">Email Us</h2>
              <p className="mb-4">
                <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
              </p>
            </div>

            <div>
              <h2 className="font-bold">Phone Support</h2>
              <p className="mb-4">
                <a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
              </p>
            </div>
            <div className="mb-2">
              <h2 className="font-bold">Office Location</h2>
              <p>{contactData.officeLocation}</p>
            </div>
          </div>

          {/* image section */}
          <div>
            <img
              src={carImage}
              alt="Car with charger"
              className="h-[355px] rounded-l-xl"
            />
          </div>

          {/* Contact for section */}
          <div className="bg-white rounded-r-xl h-[355px]">
            <form onSubmit={handleSubmit} className="p-4 ">
              <h2 className="font-bold mb-4">Contact Form</h2>

              {/* Name Field */}
              <div>
                <label>Name: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-lilac bg-opacity-50 w-full rounded-lg text-xs p-1 text:pl-2 placeholder:text-xs mb-2"
                />
              </div>

              {/* Email Field */}
              <div>
                <label>Email: </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                  className="bg-lilac bg-opacity-50 w-full rounded-lg text-xs p-1 text:pl-2 placeholder:text-xs mb-2"
                />
              </div>

              {/* Content Field */}
              <div>
                <label>Content:</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Your message"
                  required
                  className="bg-lilac bg-opacity-50 w-full rounded-lg text-xs p-1 text:pl-2 placeholder:text-xs mb-2"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="p-2 text-sm rounded-3xl font-bold bg-gradient-to-r from-eGreen to-eGreenDark hover:bg-darkGreen hover:text-white transition-all duration-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Contact info for small screens */}
        <div className="text-white mt-4 rounded-xl w-64 h-64justify-center hidden sm:hidden xs:block">
          <div>
            <h2 className="font-bold">Email Us</h2>
            <p className="mb-4">
              <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
            </p>
          </div>

          <div>
            <h2 className="font-bold">Phone Support</h2>
            <p className="mb-4">
              <a href={`tel:${contactData.phone}`}>{contactData.phone}</a>
            </p>
          </div>
          <div className="mb-2">
            <h2 className="font-bold">Office Location</h2>
            <p>{contactData.officeLocation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
