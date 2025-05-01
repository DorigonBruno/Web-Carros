import { Link } from "react-router";
import Logo from "../../assets/Group 496.svg";
import { Input } from "../../components/input";

const Login = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center px-2">
      <Link to="/">
        <img src={Logo} alt="logo do site web carros" className="mb-11 w-sm" />
      </Link>

      <form className="flex flex-col w-full max-w-xl gap-3 bg-white p-5 rounded-md">
        <Input type="text" placeholder="Digite o email.." name="email" />

        <Input type="password" placeholder="Digite a Senha.." name="senha" />

        <button
          type="submit"
          className="bg-black text-white font-medium p-2 cursor-pointer rounded-md hover:bg-gray-700 transition ease-in-out"
        >
          Acessar
        </button>
      </form>

      <Link
        to="/register"
        className="mt-10 text-gray-600 font-light hover:font-medium transition ease"
      >
        <span>Ainda não possui uma conta? Cadastre-se</span>
      </Link>
    </main>
  );
};

export default Login;
