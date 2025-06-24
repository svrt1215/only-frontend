import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import photo1 from '../assets/photo1.avif';
import photo2 from '../assets/photo2.avif';
import photo3 from '../assets/photo3.avif';
import photo4 from '../assets/photo4.avif';
import photo5 from '../assets/photo5.avif';
import photo6 from '../assets/photo6.avif';
import photo7 from '../assets/photo7.avif';
import photo8 from '../assets/photo8.avif';
import photo9 from '../assets/photo9.avif';
import photo10 from '../assets/photo10.avif';

const images = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10];

const Facilities = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [current]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + length) % length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % length);
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-base-200 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">College Facilities</h1>
          <p className="text-lg mb-6">
            At Swami Vivekananda Research and Technology Center, we believe a great learning environment goes beyond classrooms.
            Our state-of-the-art infrastructure and well-maintained facilities ensure that every student
            receives a holistic education and has access to resources that support their academic, social,
            and personal development.
          </p>
        </div>
      </section>

      {/* Facilities List Section */}
      <section className="container mx-auto px-6 py-8 flex flex-col items-center bg-base-100">
        <h2 className="text-3xl font-semibold mb-6">Facilities We Offer</h2>
        <ul className="list-disc pl-5 space-y-3 text-lg">
          <li>Smart classrooms with modern teaching aids</li>
          <li>Library with a wide collection of academic books and e-resources</li>
          <li>Well-equipped computer and science laboratories</li>
          <li>Indoor and outdoor sports facilities</li>
          <li>On-campus cafeteria with hygienic food options</li>
          <li>Separate hostel facilities for boys and girls</li>
          <li>24/7 Wi-Fi enabled campus</li>
          <li>Medical facilities and health center</li>
          <li>Common rooms and reading spaces</li>
          <li>Seminar halls and auditorium for cultural and academic events</li>
        </ul>
      </section>

      {/* Custom Image Carousel */}
      <section className="px-6 py-10 bg-base-100">
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-2xl font-bold mb-6 text-center">Explore Our Campus</h2>

          <div className="relative w-full h-64 overflow-hidden rounded-xl shadow-lg">
            <img
              src={images[current]}
              alt={`Campus facility ${current + 1}`}
              className="w-full h-full object-cover transition duration-1000"
            />

            <button
  onClick={prevSlide}
  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-100 w-10 h-10 rounded-full shadow-md text-white cursor-pointer flex items-center justify-center"
>
  ❮
</button>


           <button
  onClick={nextSlide}
  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 hover:bg-opacity-100 w-10 h-10 rounded-full shadow-md text-white cursor-pointer flex items-center justify-center"
>
  ❯
</button>

          </div>

          <div className="flex justify-center mt-4 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  index === current ? 'bg-primary' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default Facilities;
