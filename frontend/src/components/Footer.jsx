import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-darkBackground text-lightText py-6 mt-auto border-t border-gray-800 animate-fadeIn">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} MR Treders. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a 
            href="https://github.com/mr-treders" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a 
            href="https://linkedin.com/in/mr-treders" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href="https://twitter.com/mr_treders" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 