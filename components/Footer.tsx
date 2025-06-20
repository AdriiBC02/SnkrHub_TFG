// Componente Footer - Pie de página de SneakerHub
// Este componente proporciona información de contacto, enlaces rápidos y redes sociales
// Utiliza un diseño responsive con grid flexible

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Grid principal del footer con 4 columnas en desktop */}
        <div className="flex flex-wrap justify-between">
          {/* Sección de información de la marca */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">SneakerHub</h3>
            <p className="text-sm">Your ultimate destination for sneakers.</p>
          </div>
          
          {/* Enlaces rápidos de navegación */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/sneakers" className="hover:text-gray-300">Sneakers</a></li>
              <li><a href="/about" className="hover:text-gray-300">About</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
            </ul>
          </div>
          
          {/* Información de contacto */}
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">
              123 Sneaker Street<br />
              Shoe City, SC 12345<br />
              Phone: (123) 456-7890<br />
              Email: info@sneakerhub.com
            </p>
          </div>
          
          {/* Enlaces a redes sociales */}
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">Facebook</a>
              <a href="#" className="text-white hover:text-gray-300">Twitter</a>
              <a href="#" className="text-white hover:text-gray-300">Instagram</a>
            </div>
          </div>
        </div>
        
        {/* Copyright y derechos de autor */}
        <div className="mt-8 text-center text-sm">
          &copy; 2024 SneakerHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}