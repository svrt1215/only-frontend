import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const OurFaculty = () => {
  return (
    <div>
        <Navbar/>
        <section className="py-16 px-6 bg-base-100 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Faculty</h2>
          <p className="max-w-3xl mx-auto">
            Our faculty members are the backbone of our institution, dedicated to nurturing the next generation of leaders. With a diverse range of expertise and a commitment to excellence, they inspire students to achieve their full potential.
          </p>
        </section>              
        <Footer/>
    </div>
  )
}

export default OurFaculty