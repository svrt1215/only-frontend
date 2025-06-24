import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div>
        <Navbar />
        {/* about us details */}
        <section className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              className="w-full max-w-lg rounded-lg shadow-2xl"
              alt="College Campus"
            />
            <div>
              <h1 className="text-5xl font-bold">About Us</h1>
              <p className="py-6">
                Swami Vivekananda Research and Technology Center, established with a vision to impart quality higher education,
                stands as a pillar of academic excellence and holistic development in Mau, Uttar Pradesh.
                Our institution fosters a vibrant learning environment where students are encouraged to
                explore, innovate, and excel in their chosen fields.
              </p>
              <button className="btn btn-primary">Explore Courses</button>
            </div>
          </div>
        </section>


      {/* Director's Message */}
      <section className="py-16 px-6 bg-base-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">Director's Message</h2>
          <p className="text-lg text-justify">
            Welcome to Swami Vivekananda Research and Technology Center. Our mission is not just to educate minds, but to shape future citizens who will contribute positively to society. We believe in instilling values, ethics, and responsibility while also providing a strong academic foundation. I invite all students to take full advantage of the opportunities we provide and emerge as leaders in their respective domains.
          </p>
          <p className="mt-4 font-semibold text-right">— Dr. XYZ, Director</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-base-200 py-16 px-6">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p>
              To provide inclusive, value-based, and accessible higher education to students from diverse backgrounds. We aim to equip learners with knowledge, skills, and the ethical grounding needed to address real-world challenges and build a better future.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p>
              To become a leading educational institution recognized for academic excellence, innovation, and community impact, nurturing future professionals and responsible citizens.
            </p>
          </div>
        </div>
      </section>

      {/* Aims & Objectives */}
      <section className="bg-base-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Aims & Objectives</h3>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>Promote academic excellence through a learner-centric approach.</li>
            <li>Encourage research, innovation, and critical thinking.</li>
            <li>Provide a platform for cultural, sports, and community development activities.</li>
            <li>Foster a safe and inclusive campus environment for all students.</li>
            <li>Build strong industry-academia partnerships for career opportunities.</li>
            <li>Empower students to become self-reliant and socially responsible individuals.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
