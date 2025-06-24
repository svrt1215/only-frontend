import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <div>
      <Navbar />

      {/* Section 1: Contact Info */}
      <section className="py-16 px-6 bg-base-200 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-8">Get in touch Today!<br />Prefer talking it out? Connect with our friendly team. Give us a call today.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Address Card */}
          <div className="bg-black shadow-md p-6 rounded-lg text-left flex items-start space-x-4">
            <MapPin size={32} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Address</h2>
              <p>
                Swami Vivekananda Research and Technology Center<br />
                Chakramji Maunath Bhanjan, Mau Uttar Pradesh<br />
                Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-black shadow-md p-6 rounded-lg text-left flex items-start space-x-4">
            <Mail size={32} className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Email Us</h2>
              <p>
                General Inquiries: <a href="mailto:info@ahmcollege.ac.in" className="text-blue-600">info@ahmcollege.ac.in</a><br />
                Admissions: <a href="mailto:admissions@ahmcollege.ac.in" className="text-blue-600">admissions@ahmcollege.ac.in</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Google Map */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Find Us on the Map</h2>
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              title="College Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6973779642544!2d82.99331227440643!3d26.854503576689385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07148facc7a5%3A0xa90a0dd179e43dc5!2sAzad%20Hind%20Mahavidyalaya!5e0!3m2!1sen!2sin!4v1719069226472!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
