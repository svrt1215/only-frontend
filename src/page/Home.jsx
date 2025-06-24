import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroBg from '../assets/photo1.avif'; // Replace with your background image path
import { GraduationCap, Sparkles, Users, Smile } from 'lucide-react';
import imgSrc from '../assets/degree.jpg'
import { Link } from 'react-router-dom';

const stats = [
  { value: '15000+', label: 'Happy Students', icon: <GraduationCap size={32} /> },
  { value: '99%', label: 'Creative Mindset', icon: <Sparkles size={32} /> },
  { value: '99%', label: 'Build Unity', icon: <Users size={32} /> },
  { value: '99%', label: 'Student Satisfaction', icon: <Smile size={32} /> },
];

const courseData = [
  { title: 'B.Tech (Bachelor of Technology)', img: imgSrc, link: '/programs/btech' },
  { title: 'Diploma', img: imgSrc, link: '/programs/diploma' },
  { title: 'B.A. (Bachelor of Arts)', img: imgSrc, link: '/programs/ba' },
  { title: 'B.Sc. (Bachelor of Science)', img: imgSrc, link: '/programs/bsc' },
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <section
        className="h-screen bg-cover bg-center text-white flex flex-col items-center justify-center text-center px-4 relative"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
          Knowledge is Power, Education is Freedom
        </h1>
        <h2 className="text-2xl mb-2 drop-shadow-md">Swami Vivekananda Research and Technology Center</h2>
        <p className="mb-1 drop-shadow">(AFFILIATED TO VEER BAHADUR SINGH PURVANCHAL UNIVERSITY)</p>
        <p className="mb-4 drop-shadow">(Approved By The U.G.C. Act 1956 & AICTE)</p>
        <h3 className="text-lg font-semibold animate-pulse mb-6">Learn • Lead • Inspire</h3>
       <div className="animate-bounce w-10 h-10 border border-white text-white rounded-full flex items-center justify-center cursor-none hover:bg-white hover:text-black">
          ↓
        </div>
      </section>

      <section className="py-16 px-6 bg-base-100 text-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto">
          Swami Vivekananda Research and Technology Center has been a beacon of knowledge since its inception, empowering thousands of students across various disciplines. We are committed to delivering quality education that transforms individuals into leaders of tomorrow.
        </p>
      </section>

      <section className="py-16 px-6 bg-base-200 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="max-w-3xl mx-auto">
          We focus on holistic development, advanced teaching methods, a nurturing environment, and high placement support. Join a community that values education, discipline, and innovation.
        </p>
      </section>

      <section className="py-16 px-6 bg-black text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center border border-gray-700 p-6 rounded-lg text-white">
              <div className="text-4xl text-primary mb-2">{stat.icon}</div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-base-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Brighter Together: Courses</h2>
        <p className="max-w-2xl mx-auto mb-10">
          Gain a strong foundation in historical knowledge and analysis. Develop critical thinking, research, and writing skills.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courseData.map((course, i) => (
            <CourseCard key={i} title={course.title} imgSrc={course.img} link={course.link}/>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              What courses are offered at AHM?
            </div>
            <div className="collapse-content">
              <p>AHM offers undergraduate programs in Arts, Commerce, and Science with various specializations.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="checkbox" />
            <div className="collapse-title font-medium">
              How can I apply for admission?
            </div>
            <div className="collapse-content">
              <p>You can apply online via the official admissions page or visit the college in person for guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Motivation / Marketing Section */}
      <section className="py-16 px-6 bg-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us on Your Educational Journey</h2>
        <p className="max-w-3xl mx-auto mb-6">
          Swami Vivekananda Research and Technology Center is more than just a college; it's a community where students, faculty, and staff come together to learn, grow, and make a difference.
          We invite you to explore our website and discover how AHM can empower you to achieve your academic goals and build a brighter future.
        </p>
        <button className="btn btn-secondary">Visit Admissions Page</button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

const CourseCard = ({ title, imgSrc,link }) => {
  return (
    <div className="bg-base-200 rounded-lg shadow p-4 text-center">
      <img src={imgSrc} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <Link to={link} className="btn btn-primary">
        View More
      </Link>
    </div>
  );
};
