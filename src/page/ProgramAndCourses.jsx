import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const courseData = {
  btech: {
    title: 'B.Tech (Bachelor of Technology)',
    image: 'https://img.freepik.com/free-photo/happy-graduate-student-with-diploma_23-2149056374.jpg',
    description:
      'B.Tech is a 4-year professional undergraduate engineering degree. It emphasizes theoretical and practical knowledge in technical fields such as Computer Science, Electronics, Mechanical, Civil, and Electrical Engineering. The course curriculum is industry-oriented and prepares students for various engineering roles.',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (PCM)',
    coreSubjects: [
      'Engineering Mathematics',
      'Data Structures & Algorithms',
      'Thermodynamics',
      'Digital Electronics',
      'Control Systems',
    ],
    careerOptions: [
      'Software Engineer',
      'Mechanical Design Engineer',
      'Civil Site Engineer',
      'Electrical Systems Engineer',
      'Research & Development (R&D)',
    ],
  },

  diploma: {
    title: 'Diploma in Engineering',
    image: 'https://img.freepik.com/free-photo/student-with-books_1098-17455.jpg',
    description:
      'Diploma is a 3-year technical program after Class 10th, focusing on hands-on training and foundational engineering knowledge. It is ideal for early entry into the workforce or further studies like B.Tech via lateral entry.',
    duration: '3 Years',
    eligibility: '10th Pass',
    coreSubjects: [
      'Engineering Drawing',
      'Basic Electronics',
      'Machine Tools',
      'Surveying',
      'Electrical Measurements',
    ],
    careerOptions: [
      'Junior Engineer',
      'Technical Assistant',
      'Field Technician',
      'CAD Designer',
      'Lateral Entry into B.Tech',
    ],
  },

  ba: {
    title: 'B.A. (Bachelor of Arts)',
    image: 'https://img.freepik.com/free-photo/students-taking-notes-university-lecture_23-2149309642.jpg',
    description:
      'B.A. is a 3-year undergraduate program in Humanities, Liberal Arts, and Social Sciences. It includes disciplines like History, English, Sociology, Political Science, Psychology, and Philosophy. It builds a strong foundation in analytical thinking and communication.',
    duration: '3 Years',
    eligibility: '10+2 in any stream',
    coreSubjects: [
      'Political Theory',
      'History of India',
      'Psychology Basics',
      'English Literature',
      'Sociology & Society',
    ],
    careerOptions: [
      'Civil Services',
      'Teaching',
      'Content Writing',
      'Research Assistant',
      'Journalism',
    ],
  },

  bsc: {
    title: 'B.Sc. (Bachelor of Science)',
    image: 'https://img.freepik.com/free-photo/laboratory-scientist-doing-research_23-2150788914.jpg',
    description:
      'B.Sc. is a science-based undergraduate program offering in-depth studies in Physics, Chemistry, Biology, Mathematics, and Computer Science. It builds analytical and problem-solving skills necessary for research and development roles.',
    duration: '3 Years',
    eligibility: '10+2 with Science stream',
    coreSubjects: [
      'Mechanics',
      'Organic Chemistry',
      'Calculus',
      'Genetics',
      'Statistics',
    ],
    careerOptions: [
      'Laboratory Assistant',
      'Data Analyst',
      'Research Associate',
      'Healthcare Technician',
      'Further Study in M.Sc./Ph.D.',
    ],
  },

  bcom: {
    title: 'B.Com (Bachelor of Commerce)',
    image: 'https://img.freepik.com/free-photo/business-people-meeting_53876-14423.jpg',
    description:
      'B.Com is a commerce-oriented degree focusing on accounting, finance, taxation, economics, and business law. It’s one of the most popular undergraduate courses in India, ideal for a career in banking, finance, or business management.',
    duration: '3 Years',
    eligibility: '10+2 in Commerce or any stream',
    coreSubjects: [
      'Financial Accounting',
      'Business Economics',
      'Corporate Law',
      'Income Tax',
      'Auditing',
    ],
    careerOptions: [
      'Accountant',
      'Banking Officer',
      'CA/CS/CMA (with further exams)',
      'Business Analyst',
      'Financial Consultant',
    ],
  },

  ma: {
    title: 'M.A. (Master of Arts)',
    image: 'https://img.freepik.com/free-photo/young-graduate-student-holding-her-degree-diploma_23-2148204852.jpg',
    description:
      'M.A. is a 2-year postgraduate program for deep specialization in subjects like History, Political Science, Literature, and Philosophy. It’s ideal for academic, administrative, and civil service-oriented careers.',
    duration: '2 Years',
    eligibility: 'Graduation in any discipline',
    coreSubjects: [
      'Advanced Literary Theory',
      'Modern Indian Politics',
      'Philosophy of Mind',
      'Contemporary History',
    ],
    careerOptions: [
      'Professor',
      'Researcher',
      'Government Services',
      'Writer/Editor',
      'NGO Sector',
    ],
  },

  msc: {
    title: 'M.Sc. (Master of Science)',
    image: 'https://img.freepik.com/free-photo/scientific-researcher-lab_1098-15794.jpg',
    description:
      'M.Sc. is a postgraduate program for students who want to specialize in science subjects. It builds on B.Sc. foundations and leads to careers in research, data analysis, teaching, and science-based industries.',
    duration: '2 Years',
    eligibility: 'B.Sc. in relevant discipline',
    coreSubjects: [
      'Quantum Mechanics',
      'Analytical Chemistry',
      'Molecular Biology',
      'Mathematical Modelling',
    ],
    careerOptions: [
      'Research Scientist',
      'Biotech Analyst',
      'Lecturer',
      'Lab Technician',
      'Ph.D. Aspirant',
    ],
  },

  mtech: {
    title: 'M.Tech (Master of Technology)',
    image: 'https://img.freepik.com/free-photo/engineer-holding-blueprint-helmet_23-2148741205.jpg',
    description:
      'M.Tech is a 2-year postgraduate program that provides advanced knowledge and research skills in engineering and technology. It’s aimed at industry experts, teaching professionals, and researchers.',
    duration: '2 Years',
    eligibility: 'B.Tech or equivalent',
    coreSubjects: [
      'Advanced Computer Architecture',
      'Finite Element Methods',
      'Embedded Systems',
      'Power Systems Analysis',
    ],
    careerOptions: [
      'R&D Engineer',
      'Professor/Lecturer',
      'Project Manager',
      'Tech Consultant',
      'Ph.D. Researcher',
    ],
  },
};

const ProgramAndCourses = () => {
  const { programId } = useParams();
  const course = courseData[programId?.toLowerCase()];

  if (!course) {
    return <div className="p-6 text-red-600">❌ Course not found!</div>;
  }

  return (
    <div>
      <Navbar/>
      <div className="max-w-4xl mx-auto p-6">
        {/* <img src={course.image} alt={course.title} className="w-full rounded-lg mb-6" /> */}
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="mb-4">{course.description}</p>
        <ul className="list-disc ml-6 space-y-1">
          <li><strong>Duration:</strong> {course.duration}</li>
          <li><strong>Eligibility:</strong> {course.eligibility}</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Core Subjects</h2>
        <ul className="list-disc ml-6 space-y-1">
          {course.coreSubjects.map((subject, idx) => (
            <li key={idx}>{subject}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Career Opportunities</h2>
        <ul className="list-disc ml-6 space-y-1">
          {course.careerOptions.map((career, idx) => (
            <li key={idx}>{career}</li>
          ))}
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

export default ProgramAndCourses;
