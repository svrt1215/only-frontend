import { Link } from "react-router-dom";
import Logo from "../assets/clglogo.png"

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/result">Results</Link></li>
          <li><Link to="/facilities">Facilities</Link></li>
            <li>
              <details className="relative">
              <summary>Program And Course</summary>
              <ul className="absolute z-50 mt-2 bg-base-100 shadow-lg rounded-box w-60">
                <li><Link to="/programs/btech">B.Tech (Bachelor of Technology)</Link></li>
                <li><Link to="/programs/diploma">Diploma</Link></li>
                <li><Link to="/programs/ba">B.A. (Bachelor of Arts)</Link></li>
                <li><Link to="/programs/bsc">B.Sc. (Bachelor of Science)</Link></li>
                <li><Link to="/programs/iti">I.T.I. (Industrial Training Institute)</Link></li>
                <li><Link to="/programs/bed">B.Ed. (Bachelor of Education)</Link></li>
                <li><Link to="/programs/msc">M.Sc. (Master of Science)</Link></li>
                <li><Link to="/programs/ma">M.A. (Master of Arts)</Link></li>
              </ul>
              </details>
            </li>

            {/* <li>
              <details className="relative">
              <summary>Institutional</summary>
                <ul className="absolute z-50 mt-2 bg-base-100 shadow-lg rounded-box w-52">
                  <li><a>Institutional 1</a></li>
                  <li><a>Institutional 2</a></li>
                </ul>
              </details>
            </li> */}
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <Link to="/" className="flex items-center px-2">
          <div className="flex items-center h-16">
            <img
              src={Logo}
              alt="University Logo"
              className="h-full w-auto max-w-[160px] object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/result">Results</Link></li>
          <li><Link to="/facilities">Facilities</Link></li>
          <li>
            <details className="relative">
            <summary>Program And Course</summary>
            <ul className="absolute z-50 mt-2 bg-base-100 shadow-lg rounded-box w-60">
              <li><Link to="/programs/btech">B.Tech (Bachelor of Technology)</Link></li>
              <li><Link to="/programs/diploma">Diploma</Link></li>
              <li><Link to="/programs/ba">B.A. (Bachelor of Arts)</Link></li>
              <li><Link to="/programs/bsc">B.Sc. (Bachelor of Science)</Link></li>
              <li><Link to="/programs/iti">I.T.I. (Industrial Training Institute)</Link></li>
              <li><Link to="/programs/bed">B.Ed. (Bachelor of Education)</Link></li>
              <li><Link to="/programs/msc">M.Sc. (Master of Science)</Link></li>
              <li><Link to="/programs/ma">M.A. (Master of Arts)</Link></li>
            </ul>
            </details>
          </li>
          {/* <li>
            <details className="relative">
              <summary>Institutional</summary>
                <ul className="absolute z-50 mt-2 bg-base-100 shadow-lg rounded-box w-52">
                  <li><a>Institutional 1</a></li>
                  <li><a>Institutional 2</a></li>
                </ul>
              </details>
          </li> */}
<li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="navbar-end">
        <Link to="/result"className="btn">Search Result</Link>
      </div>
    </div>
  );
};

export default Navbar;
