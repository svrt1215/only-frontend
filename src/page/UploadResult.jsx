import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-hot-toast';

const UploadResult = () => {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const yearOptions = ['I Year', 'II Year', 'III Year', 'IV Year'];
  const correctKey = import.meta.env.VITE_ADMIN_KEY;
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

  const [student, setStudent] = useState({
    name: '', enrollment: '', dob: '', fatherName: '', motherName: '',
    gender: '', session: '', religion: '', studentType: '', institute: '',
    course: ''
  });

  const [results, setResults] = useState([{ year: '', obtained: '', outOf: '', status: '' }]);

  const handleAuth = () => {
    if (adminKey === correctKey) {
      setIsAuthenticated(true);
      toast.success('Admin verified successfully');
    } else {
      toast.error('Invalid Credential Key!');
    }
  };

  const handleAddResultRow = () => {
    setResults([...results, { year: '', obtained: '', outOf: '', status: '' }]);
  };

  const handleResultChange = (index, field, value) => {
    const updated = [...results];
    updated[index][field] = value;
    setResults(updated);
  };

  const handleRemoveResult = (index) => {
    const updated = [...results];
    updated.splice(index, 1);
    setResults(updated);
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    const formattedDob = formatDateToDDMMYYYY(student.dob);

  const resultsData = results
  .filter(r => r.year && r.obtained && r.outOf && r.status)
  .map(r => ({
    year: r.year,
    obtained: Number(r.obtained),
    outOf: Number(r.outOf),
    status: r.status
  }));

    const finalData = {
      ...student,
      dob: formattedDob,
      results: resultsData
    };

    try {
      const res = await fetch(`${VITE_BASE_URL}/api/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (!res.ok) throw new Error('Failed to upload result');

      const responseData = await res.json();
      console.log('Server Response:', responseData);
      toast.success('Result uploaded successfully!');
      setShowPreview(false);
    } catch (err) {
      console.error('Upload Error:', err);
      toast.error('Error uploading result.');
    } finally {
      setIsUploading(false);
    }
  };

  const calculatePercentage = (obtained, outOf) => {
    const o = parseFloat(obtained);
    const t = parseFloat(outOf);
    return isNaN(o) || isNaN(t) || t === 0 ? '-' : ((o / t) * 100).toFixed(2);
  };

  const totalObtained = results.reduce((acc, r) => acc + (parseFloat(r.obtained) || 0), 0);
  const totalOutOf = results.reduce((acc, r) => acc + (parseFloat(r.outOf) || 0), 0);
  const overallPercentage = calculatePercentage(totalObtained, totalOutOf);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-base-200 p-6 flex items-center justify-center">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white p-6 rounded shadow text-black">
            <h2 className="text-xl font-bold mb-4 text-center">Admin Access</h2>
            <input
              type="password"
              className="input input-bordered w-full mb-4"
              placeholder="Enter Credential Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
            />
            <button onClick={handleAuth} className="btn btn-primary w-full">Verify</button>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-6 text-center text-black">Upload Final Year-wise Result</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Name', 'name'], ['Enrollment No.', 'enrollment'],
                ['Date of Birth', 'dob', 'date'],
                ['Father Name', 'fatherName'], ['Mother Name', 'motherName'],
                ['Gender', 'gender', 'select', ['Male', 'Female', 'Other']],
                ['Session', 'session'],
                ['Religion', 'religion', 'select', ['HINDU', 'MUSLIM', 'CHRISTIAN', 'SIKH']],
                ['Student Type', 'studentType', 'select', ['Regular', 'Private']],
                ['Institute', 'institute'], ['Course Name', 'course']
              ].map(([label, key, type = 'text', options]) =>
                type === 'select' ? (
                  <select
                    key={key}
                    className="select select-bordered w-full"
                    value={student[key]}
                    onChange={(e) => setStudent({ ...student, [key]: e.target.value })}
                  >
                    <option value="">{label}</option>
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
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
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2 text-black">Enter Year-wise Results:</h3>
              {results.map((item, index) => (
                <div key={index} className="flex flex-wrap gap-2 mb-2 items-center">
                  <select
                    className="select select-bordered min-w-[130px]"
                    value={item.year}
                    onChange={(e) => handleResultChange(index, 'year', e.target.value)}
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Obtained Marks"
                    className="input input-bordered min-w-[120px]"
                    value={item.obtained}
                    onChange={(e) => handleResultChange(index, 'obtained', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Out of Marks"
                    className="input input-bordered min-w-[120px]"
                    value={item.outOf}
                    onChange={(e) => handleResultChange(index, 'outOf', e.target.value)}
                  />
                  <select
                    className="select select-bordered min-w-[100px]"
                    value={item.status}
                    onChange={(e) => handleResultChange(index, 'status', e.target.value)}
                  >
                    <option value="">Status</option>
                    <option value="PASS">PASS</option>
                    <option value="FAIL">FAIL</option>
                  </select>

                  <button onClick={() => handleRemoveResult(index)} className="btn btn-error btn-sm">✕</button>
                </div>
              ))}
              <button className="btn btn-secondary btn-sm mt-3" onClick={handleAddResultRow}>+ Add Year</button>
              <button className="btn btn-info btn-sm mt-3 ml-3" onClick={() => setShowPreview(true)}>Preview Result</button>
            </div>
          </div>
        )}
      </div>

      {showPreview && (
        <dialog id="previewModal" className="modal modal-open">
          <div className="modal-box max-w-3xl text-black bg-white">
            <h3 className="font-bold text-lg text-center mb-4">Preview Student Result</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-4">
              {Object.entries(student).map(([key, val]) => (
                <p key={key}><b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {val}</p>
              ))}
            </div>

            <table className="w-full text-sm mb-4 border border-gray-300 rounded-md overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="border px-4 py-2 text-left">Year</th>
                  <th className="border px-4 py-2 text-left">Obtained</th>
                  <th className="border px-4 py-2 text-left">Out Of</th>
                  <th className="border px-4 py-2 text-left">%</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border px-4 py-2">{res.year}</td>
                    <td className="border px-4 py-2">{res.obtained}</td>
                    <td className="border px-4 py-2">{res.outOf}</td>
                    <td className="border px-4 py-2">{calculatePercentage(res.obtained, res.outOf)}</td>
                    <td className="border px-4 py-2">{res.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-sm text-center text-black font-medium mb-4">
              Overall Percentage: {overallPercentage}%
            </div>

            <div className="modal-action flex flex-wrap justify-center gap-2">
              <button className="btn" onClick={() => setShowPreview(false)}>Back / Edit</button>
              <button
                className={`btn btn-success ${isUploading ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
                disabled={isUploading}
                onClick={handleSubmit}
              >
                {isUploading ? "Uploading..." : "Confirm & Upload"}
              </button>
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
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}
