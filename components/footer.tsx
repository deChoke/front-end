import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';
import BackToTop from './back-to-top';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <BackToTop />
      <footer className="bg-[rgb(147,4,4)] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-6 px-2">
            <div className="text-sm text-white">
              © {currentYear} Jeugdhuis De Choke | All Rights Reserved
            </div>
            <div className="flex space-x-6">
              <a 
                href="https://www.facebook.com/JeugdhuisDeChoke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/jhdechoke" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;