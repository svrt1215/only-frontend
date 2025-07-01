import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';

const Result = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [enrollment, setEnrollment] = useState('');
  const [dob, setDob] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [semester, setSemester] = useState('');
  const [modeOfStudy, setModeOfStudy] = useState('Year');
  const semesterOptions = ['I Sem', 'II Sem', 'III Sem', 'IV Sem', 'V Sem', 'VI Sem', 'VII Sem', 'VIII Sem'];
  const yearOptions = ['I Year', 'II Year', 'III Year', 'IV Year'];
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const handleSearch = async () => {
  if (!enrollment || !dob || !semester) {
    toast.error('Please fill all fields including semester');
    return;
  }

  setIsSearching(true); 
  try {
    const formattedDob = formatDateToDDMMYYYY(dob);
    const res = await fetch(
      `${VITE_BASE_URL}/api/results?enrollment=${enrollment.trim().toLowerCase()}&dob=${formattedDob}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch results');
    }

    const data = await res.json();

    // Check if student exists and has the requested semester
    if (data && data.semesterResults && data.semesterResults[semester]) {
      setStudentData({
        ...data,
        currentSemester: semester,
        currentResult: data.semesterResults[semester],
      });
      setError('');
      toast.success('Result found successfully');
    } else {
      setStudentData(null);
      setError(data.semesterResults ? 
        `No results found for ${semester}` : 
        'No results found for the entered details');
      toast.error('No result found for given details');
    }
  } catch (err) {
    console.error('Search Error:', err);
    setStudentData(null);
    setError('Server error while searching. Please try again later.');
    toast.error('Server error occurred');
  } finally{
    setIsSearching(false);
  }
};
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
        <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-md mt-5">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-50">Search Your Result</h1>
          <input
            type="text"
            placeholder="Enrollment Number"
            className="input input-bordered w-full mb-4"
            value={enrollment}
            // onChange={(e) => setEnrollment(e.target.value)}
            // onChange={(e) => setEnrollment(e.target.value.toLowerCase())}
            onChange={(e) => setEnrollment(e.target.value.toLowerCase().trim())}
          />
          <input
            type="date"
            className="input input-bordered w-full mb-4"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <select
            className="select select-bordered w-full mb-4"
            value={modeOfStudy}
            onChange={(e) => setModeOfStudy(e.target.value)}
          >
            <option value="Year">Year-wise</option>
            <option value="Semester">Semester-wise</option>
          </select>

          <select
            className="select select-bordered w-full mb-4"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select {modeOfStudy === 'Semester' ? 'Semester' : 'Year'}</option>
            {(modeOfStudy === 'Semester' ? semesterOptions : yearOptions).map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>

         <button
  className={`btn btn-primary w-full ${isSearching ? 'btn-disabled cursor-not-allowed' : ''}`}
  onClick={handleSearch}
  disabled={isSearching}
>
  {isSearching ? "Searching..." : "Search"}
</button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
        {studentData && (
  <>
    <div id="printArea" className="bg-white text-black mt-8 p-6 shadow-lg rounded-lg w-full max-w-2xl border">
      <h2 className="text-xl font-bold text-center text-blue-600 border-b pb-2 mb-4">
        STUDENT VERIFICATION
      </h2>
      <p className="text-center text-sm mb-4">
        Swami Vivekananda Research and Technology Center
        <br />
        (Approved By The U.G.C. Act 1956 & AICTE)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
  <p><strong>Name:</strong> {studentData.name}</p>
  <p><strong>Father Name:</strong> {studentData.fatherName}</p>
  <p><strong>Mother Name:</strong> {studentData.motherName}</p>
  <p><strong>Student Type:</strong> {studentData.studentType}</p>
  <p><strong>Date Of Birth:</strong> {new Date(studentData.dob).toLocaleDateString('en-IN')}</p>
  <p><strong>Institute:</strong> {studentData.institute}</p>
  <p><strong>Religion:</strong> {studentData.religion}</p>
  <p><strong>Enrollment No.:</strong> {studentData.enrollment}</p>
  <p><strong>Course Name:</strong> {studentData.course}</p>
  <p><strong>Result:</strong> {studentData.result}</p>
  <p><strong>Gender:</strong> {studentData.gender}</p>
  <p><strong>Session:</strong> {studentData.session}</p>
</div>


      <div className="mt-8">
  <h3 className="font-bold text-center text-blue-600 border-b pb-2 mb-4">
    CURRENT SEMESTER MARKS – {studentData.currentSemester}
  </h3>
  <div className="overflow-x-auto">
    <table className="w-full text-sm border">
      <thead className="bg-gray-200 text-black text-lg">
        <tr>
          <th className="p-2 border">Subject</th>
          <th className="p-2 border">Marks</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(studentData.currentResult.marks).map(([subject, mark], idx) => (
          <tr key={subject} className={idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="p-2 border">{subject}</td>
            <td className="p-2 border">{mark}</td>
          </tr>
        ))}
        <tr className="bg-yellow-100 font-semibold">
          <td className="p-2 border">Total</td>
          <td className="p-2 border">{studentData.currentResult.total} ({studentData.currentResult.status})</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


      <p className="text-xs mt-4 text-justify text-gray-600">
        Note:- Swami Vivekananda Research and Technology Center is not responsible for any inadvertent error
        that may have crept in the result being published on NET. The result published
        on net are for immediate information to the examinees. These cannot be treated
        as original mark sheets.
      </p>
    </div>

    <div className="text-center mt-6">
      <button
        className="btn btn-warning mr-4"
        onClick={() => {
          const content = document.getElementById('printArea');
          const printWindow = window.open('', '', 'width=800,height=600');
          printWindow.document.write('<html><head><title>Student Result</title>');
          printWindow.document.write('<style>body{font-family:sans-serif;padding:20px;} table{width:100%;border-collapse:collapse;} td,th{border:1px solid #ccc;padding:8px;text-align:left;} tr:nth-child(even){background-color:#f9f9f9;}</style>');
          printWindow.document.write('</head><body >');
          printWindow.document.write(content.innerHTML);
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          printWindow.print();
        }}
      >
        Print Result
      </button>
    </div>
  </>
)}
        {studentData === null && (
          <p className="text-red-500 mt-4 text-center">No results found for the entered details.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Result;

function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}