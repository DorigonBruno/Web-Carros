import Logo from "../../assets/Group 496.svg";
import { Link } from "react-router";
import { Input } from "../../components/input";

const Register = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center px-2">
      <Link to="/">
        <img src={Logo} alt="logo do site web carros" className="mb-11 w-sm" />
      </Link>

      <form className="flex flex-col bg-white p-5 rounded-md w-full max-w-xl gap-3">
        <Input type="text" name="nome" placeholder="Digite seu nome Completo" />

        <Input type="text" name="email" placeholder="Digite o email.." />

        <Input type="password" name="senha" placeholder="Digite a Senha.." />

        <button
          type="submit"
          className="bg-black text-white font-medium p-2 cursor-pointer rounded-md hover:bg-gray-700 transition-all ease-in-out"
        >
          Cadastrar
        </button>
      </form>

      <Link
        to="/login"
        className="mt-10 text-gray-600 font-light hover:font-medium transition ease-in-out text-sm md:text-base"
      >
        <span>Já possui uma conta? Faça login</span>
      </Link>
    </main>
  );
};

export default Register;
