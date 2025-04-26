import Logo from "../../assets/Group 496.svg";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full h-18 border-b-1 border-gray-300 flex items-center mb-4">
      <nav className="flex w-full max-w-5xl m-auto justify-between items-center">
        <img src={Logo} alt="logo web carros" />
        <button className="cursor-pointer border p-2 rounded-full">
          <FaUser size={22} color="#000" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
