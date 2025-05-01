import { Link } from "react-router";
import Logo from "../../assets/Group 496.svg";

const Login = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-2">
      <Link to="/">
        <img src={Logo} alt="logo do site web carros" className="mb-11 w-sm" />
      </Link>
 
      <form className="flex flex-col w-full max-w-xl gap-3">
        <input
          type="text"
          placeholder="Digite o email.."
          className="border-1 border-gray-200 rounded-md w-full h-10 p-2 outline-none focus:outline focus:border-gray-500"
        />
        <input
          type="password"
          placeholder="Digite a senha..."
          className="border-1 border-gray-200 rounded-md w-full h-10 p-2 outline-none focus:outline  focus:border-gray-500"
        />
        <button
          type="submit"
          className="bg-black text-white font-medium p-2 cursor-pointer rounded-md"
        >
          Acessar
        </button>
      </form>

      <Link to="/register" className="mt-10 text-gray-600 font-light">
        <span>Ainda não possui uma conta? Cadastre-se</span>
      </Link>
    </main>
  );
};

export default Login;
