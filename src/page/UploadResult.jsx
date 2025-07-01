import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {toast} from 'react-hot-toast';

const UploadResult = () => {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [modeOfStudy, setModeOfStudy] = useState('Year');
  const [isUploading, setIsUploading] = useState(false);



  const yearOptions = ['I Year', 'II Year', 'III Year', 'IV Year'];
  const semesterOptions = ['I Sem', 'II Sem', 'III Sem', 'IV Sem', 'V Sem', 'VI Sem', 'VII Sem', 'VIII Sem'];

  const correctKey = import.meta.env.VITE_ADMIN_KEY;
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [student, setStudent] = useState({
    name: '', enrollment: '', dob: '', fatherName: '', motherName: '',
    gender: '', session: '', religion: '', studentType: '', institute: '',
    course: '', result: '', semester: '', marks: {}
  });

  const [subjectMarks, setSubjectMarks] = useState([{ subject: '', mark: '', back: false }]);


  const handleAuth = () => {
    if (adminKey === correctKey) {
      setIsAuthenticated(true);
      toast.success('Admin verified successfully');
    } else {
      toast.error('Invalid Credential Key!');
    }
  };

  const handleAddSubject = () => setSubjectMarks([...subjectMarks, { subject: '', mark: '', back: false }]);

  const handleRemoveSubject = (index) => {
    const updated = [...subjectMarks];
    updated.splice(index, 1);
    setSubjectMarks(updated);
  };

const handleSubjectChange = (index, field, value) => {
  const updated = [...subjectMarks];
  updated[index][field] = value;

  const hasBacklog = updated.some(item => item.back === true);

  setSubjectMarks(updated);
  setStudent(prev => ({
    ...prev,
    result: hasBacklog ? 'Failed' : 'Passed'
  }));
};

const handleSubmit = async () => {
  setIsUploading(true);
  const formattedMarks = {};
  let hasBacklog = false;

  subjectMarks.forEach((s) => {
    if (s.subject && s.mark) {
      formattedMarks[s.subject] = parseInt(s.mark);
      if (s.back) hasBacklog = true;
    }
  });

  const resultStatus = hasBacklog ? 'Failed' : 'Passed';
const formattedDob = formatDateToDDMMYYYY(student.dob);
  const finalData = {
    ...student,
    dob: formattedDob,
    result: resultStatus,
    semesterResults: {
      [student.semester]: {
        marks: formattedMarks,
        total: '0/0',
        status: resultStatus,
      },
    },
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/results`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(finalData),
});


    if (!res.ok) {
      throw new Error('Failed to upload result');
    }

    const responseData = await res.json();
    console.log('Server Response:', responseData);

    toast.success(`Result Uploaded Successfully. Final Status: ${resultStatus}`);
    setShowPreview(false);
  } catch (err) {
    console.error('Upload Error:', err);
    toast.error('Something went wrong while uploading the result.');
  }
  finally{
    setIsUploading(false);
  }
};

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-6 flex items-center justify-center">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-black">
            <h2 className="text-xl font-bold mb-4 text-center">Admin Access</h2>
            <input
              type="password"
              className="input input-bordered w-full mb-4 text-black"
              placeholder="Enter Credential Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
            />
            <button onClick={handleAuth} className="btn btn-primary w-full">Verify</button>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-6 text-center text-black">Upload Student Result</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Name', 'name'], ['Enrollment No.', 'enrollment'], ['Date of Birth', 'dob', 'date'],
                ['Father Name', 'fatherName'], ['Mother Name', 'motherName'],
                ['Gender', 'gender', 'select', ['Male', 'Female', 'Other']],
                ['Session', 'session'],
                ['Religion', 'religion', 'select', ['HINDU', 'MUSLIM', 'CHRISTIAN', 'SIKH']],
                ['Student Type', 'studentType', 'select', ['Regular', 'Private']],
                ['Institute', 'institute'], ['Course Name', 'course'],
                ['Result Status', 'result', 'select', ['Passed', 'Failed']]
              ].map(([label, key, type = 'text', options]) => (
                type === 'select' ? (
                  <select
                    key={key}
                    className="select select-bordered w-full"
                    value={student[key]}
                    onChange={(e) => setStudent({ ...student, [key]: e.target.value })}
                  >
                    <option value="">{label}</option>
                    {options.map((option, i) => <option key={i} value={option}>{option}</option>)}
                  </select>
                ) : (
                  <input
                    key={key}
                    type={type}
                    className="input input-bordered w-full"
                    placeholder={label}
                    value={student[key]}
                    onChange={(e) => setStudent({ ...student, [key]: e.target.value })}
                  />
                )
              ))}

              {/* New Mode of Study Selector */}
              <select
                className="select select-bordered w-full"
                value={modeOfStudy}
                onChange={(e) => setModeOfStudy(e.target.value)}
              >
                <option value="Year">Year-wise</option>
                <option value="Semester">Semester-wise</option>
              </select>

              {/* Dynamic Semester/Year Selector */}
              <select
                className="select select-bordered w-full"
                value={student.semester}
                onChange={(e) => setStudent({ ...student, semester: e.target.value })}
              >
                <option value="">Select {modeOfStudy === 'Semester' ? 'Semester' : 'Year'}</option>
                {(modeOfStudy === 'Semester' ? semesterOptions : yearOptions).map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-black">Enter Subject Marks:</h3>
              {subjectMarks.map((item, index) => (
                <div key={index} className="flex flex-wrap gap-2 mb-2 items-center">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="input input-bordered flex-1 min-w-[120px]"
                    value={item.subject}
                    onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Marks"
                    className="input input-bordered flex-1 min-w-[100px]"
                    value={item.mark}
                    onChange={(e) => handleSubjectChange(index, 'mark', e.target.value)}
                  />
                  <label className="flex items-center gap-2 text-sm text-black">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm border-gray-400 bg-gray-100 text-blue-600"
                      checked={item.back || false}
                      onChange={(e) => handleSubjectChange(index, 'back', e.target.checked)}
                    />
                    <span className="text-gray-700">Back Log</span>
                  </label>

                  <button
                    onClick={() => handleRemoveSubject(index)}
                    className="btn btn-error btn-sm"
                  >✕</button>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="btn btn-secondary btn-sm" onClick={handleAddSubject}>+ Add Subject</button>
                <button className="btn btn-info btn-sm" onClick={() => setShowPreview(true)}>Preview Result</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showPreview && (
        <dialog id="previewModal" className="modal modal-open">
          <div className="modal-box max-w-3xl text-black bg-white">
            <h3 className="font-bold text-lg text-center mb-4">Preview Student Result</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-4">
              {Object.entries(student).filter(([key]) => key !== 'marks').map(([key, val]) => (
                <p key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {val}</p>
              ))}
            </div>

            <table className="w-full text-sm mb-4 border border-gray-300 rounded-md overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="border border-gray-300 px-4 py-2 text-left">Subject</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Marks</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Back</th>
                </tr>
              </thead>
              <tbody>
                {subjectMarks.map((subj, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{subj.subject}</td>
                    <td className="border border-gray-300 px-4 py-2">{subj.mark}</td>
                    <td className="border border-gray-300 px-4 py-2">{subj.back ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-action flex flex-wrap justify-center gap-2">
              <button className="btn" onClick={() => setShowPreview(false)}>Back / Edit</button>
              <button  className={`btn btn-success ${isUploading ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`} disabled={isUploading} onClick={handleSubmit}>{isUploading ? "Uploading..." : "Confirm & Upload"}</button>
            </div>
          </div>
        </dialog>
      )}

      <Footer />
    </div>
  );
};

export default UploadResult;

function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}