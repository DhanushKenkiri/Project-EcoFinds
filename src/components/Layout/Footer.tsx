import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-2 gap-6 md:gap-8">
          <div className="flex flex-col space-y-3 md:space-y-4 col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-full p-1 bg-eco text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                  <path d="M8.5 8.5v.01"></path>
                  <path d="M16 15.5v.01"></path>
                  <path d="M12 12v.01"></path>
                  <path d="M11 17v.01"></path>
                  <path d="M7 14v.01"></path>
                </svg>
              </div>
              <span className="font-bold text-lg md:text-xl">EcoFinds</span>
            </Link>
            <p className="text-gray-600 text-xs md:text-sm">
              A sustainable second-hand marketplace empowering conscious consumption.
            </p>
            <div className="flex space-x-4 mt-1 md:mt-2">
              <a href="#" className="text-gray-500 hover:text-eco">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-eco">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-eco">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="col-span-2 sm:col-span-1 grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 md:mb-4">Marketplace</h3>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base">
                <li><Link to="/explore" className="text-gray-600 hover:text-eco">Explore</Link></li>
                <li><Link to="/categories" className="text-gray-600 hover:text-eco">Categories</Link></li>
                <li><Link to="/trending" className="text-gray-600 hover:text-eco">Trending Items</Link></li>
                <li><Link to="/sell" className="text-gray-600 hover:text-eco">Sell an Item</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 md:mb-4">Account</h3>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base">
                <li><Link to="/profile" className="text-gray-600 hover:text-eco">My Profile</Link></li>
                <li><Link to="/my-listings" className="text-gray-600 hover:text-eco">My Listings</Link></li>
                <li><Link to="/orders" className="text-gray-600 hover:text-eco">Order History</Link></li>
                <li><Link to="/settings" className="text-gray-600 hover:text-eco">Settings</Link></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1 mt-4 md:mt-0">
              <h3 className="font-semibold text-sm sm:text-base md:text-lg mb-2 md:mb-4">Help</h3>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base">
                <li><Link to="/faq" className="text-gray-600 hover:text-eco">FAQ</Link></li>
                <li><Link to="/blockchain-info" className="text-gray-600 hover:text-eco">Blockchain Verification</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-eco">Contact Us</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-eco">About EcoFinds</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 md:pt-6 mt-6 md:mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs md:text-sm">© 2025 EcoFinds. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3 md:mt-0">
              <Link to="/terms" className="text-gray-500 text-xs md:text-sm hover:text-eco">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-500 text-xs md:text-sm hover:text-eco">Privacy Policy</Link>
              <Link to="/cookies" className="text-gray-500 text-xs md:text-sm hover:text-eco">Cookie Policy</Link>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-2 mt-4">
            <div className="h-5 md:h-6">
              <svg width="36" height="22" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M38 0H2C0.8 0 0 0.8 0 2V22C0 23.2 0.8 24 2 24H38C39.2 24 40 23.2 40 22V2C40 0.8 39.2 0 38 0Z" fill="#252525"/>
                <path d="M23.3 11.6H16.7V12.4H23.3V11.6Z" fill="#FF5F00"/>
                <path d="M17.3 8.7C17.3 6.5 18.5 4.6 20.2 3.5C19.1 2.7 17.8 2.3 16.4 2.3C12.5 2.3 9.39999 5.4 9.39999 9.3C9.39999 13.2 12.5 16.3 16.4 16.3C17.8 16.3 19.1 15.9 20.2 15.1C18.5 14 17.3 12.1 17.3 9.9V8.7Z" fill="#EB001B"/>
                <path d="M30.6 9.3C30.6 13.2 27.5 16.3 23.6 16.3C22.2 16.3 20.9 15.9 19.8 15.1C21.5 14 22.7 12.1 22.7 9.9V8.7C22.7 6.5 21.5 4.6 19.8 3.5C20.9 2.7 22.2 2.3 23.6 2.3C27.5 2.3 30.6 5.4 30.6 9.3Z" fill="#F79E1B"/>
            </svg>
            </div>
            <div className="h-5 md:h-6">
              <svg width="36" height="22" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M38 0H2C0.8 0 0 0.8 0 2V22C0 23.2 0.8 24 2 24H38C39.2 24 40 23.2 40 22V2C40 0.8 39.2 0 38 0Z" fill="#1434CB"/>
                <path d="M16.3 14.7L17.4 9.2H15.1L14 14.7H16.3ZM25.8 9.4C25.2 9.2 24.3 9 23.2 9C21 9 19.4 10.1 19.4 11.8C19.4 13.1 20.5 13.8 21.4 14.2C22.3 14.6 22.6 14.9 22.6 15.2C22.6 15.7 22 15.9 21.4 15.9C20.6 15.9 19.7 15.7 19 15.4L18.7 15.3L18.4 17.2C19.1 17.5 20.3 17.7 21.5 17.7C23.9 17.7 25.5 16.6 25.5 14.8C25.5 13.8 24.8 13 23.5 12.5C22.7 12.1 22.2 11.9 22.2 11.5C22.2 11.2 22.5 10.9 23.3 10.9C24 10.9 24.5 11 25 11.2L25.2 11.3L25.5 9.5L25.8 9.4ZM31.2 9.2H29.5C29 9.2 28.5 9.4 28.3 9.9L25.6 17.6H27.9L28.4 16.1H31.1L31.4 17.6H33.5L31.2 9.2ZM29 14.5C29.2 14 30 12 30 12C30 12 30.3 11.3 30.4 11L30.5 11.9C30.5 11.9 31 14 31.1 14.5H29ZM12.9 9.2L10.8 15.1L10.6 14L9.6 9.8C9.5 9.4 9.1 9.2 8.7 9.2H5.1L5 9.4C5.8 9.6 6.5 9.8 7.1 10.1C7.4 10.2 7.5 10.4 7.6 10.6L9.5 17.6H11.9L15.3 9.2H12.9Z" fill="white"/>
              </svg>
            </div>
            <div className="h-5 md:h-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"></path>
              </svg>
            </div>
            <div className="h-5 md:h-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#F7931A" stroke="#F7931A" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.06 11.57c.59-3.91-2.38-6.01-6.43-7.41l1.31-5.26-3.21-.8-1.28 5.14-2.56-.64-1.28 5.14 2.56.64-.73 2.94-1.84-.46-.93 3.72 6.95 1.73-.6 2.41 3.21.8.6-2.41.64.16-.6 2.4 3.21.8.6-2.41c4.44-1.01 7.35-3.74 6.58-7.86zm-1.78 5.33c-.36 1.45-2.99 2.04-5.73 1.36l-2.73-.68.97-3.88 2.73.68c2.74.68 5.12-.06 4.76-1.5-.35-1.45-2.98-2.04-5.72-1.36l-2.73-.68.97-3.88 2.73.68c2.74.68 5.12-.06 4.76-1.5-.35-1.45-2.98-2.04-5.72-1.36l-2.73-.68.97-3.88 2.73.68c2.74.68 5.12-.06 4.76-1.5-.35-1.45-2.98-2.04-5.72-1.36l-1.36-.34-1.31 5.27c3.4.84 5.8 2.33 5.4 5.19-.28 1.94-1.35 3.14-3.04 3.57l.6-2.4-3.21-.8-.6 2.4-1.08-.27.6-2.4-3.21-.8-.6 2.4-.64-.16.93-3.72 1.84.46.73-2.94-2.56-.64 1.28-5.14 2.56.64 1.28-5.14 3.21.8-1.31 5.26c4.05 1.4 7.52 3.5 6.93 7.41z"></path>
              </svg>
            </div>
            <div className="h-5 md:h-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#627EEA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" fill="#627EEA" stroke="none"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
