export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">SneakerHub</h3>
            <p className="text-sm">Your ultimate destination for sneakers.</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/sneakers" className="hover:text-gray-300">Sneakers</a></li>
              <li><a href="/about" className="hover:text-gray-300">About</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">
              123 Sneaker Street<br />
              Shoe City, SC 12345<br />
              Phone: (123) 456-7890<br />
              Email: info@sneakerhub.com
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">Facebook</a>
              <a href="#" className="text-white hover:text-gray-300">Twitter</a>
              <a href="#" className="text-white hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; 2023 SneakerHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}