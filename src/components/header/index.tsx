import { useContext } from "react";
import { Link } from "react-router";
import Logo from "../../assets/Group 496.svg";
import { FaUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { AuthContext } from "../../context/authContext";

const Header = () => {
  const { signed, loadingAuth } = useContext(AuthContext);

  return (
    <header className="w-full h-18 border-b-1 border-gray-300 flex items-center mb-4 px-6">
      <nav className="flex w-full m-auto justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="logo web carros" />
        </Link>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <button className="cursor-pointer border p-2 rounded-full">
              <FaUser size={22} color="#000" />
            </button>
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="/login">
            <button className="cursor-pointer border p-2 rounded-full">
              <CiLogin size={22} color="#000" />
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
