import { Link, useNavigate } from "react-router";
import Logo from "../../assets/Group 496.svg";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import supabase from "../../services/supabaseClient";

const schema = z.object({
  email: z
    .string()
    .email("Insira um Email válido")
    .nonempty("O campo email é obrigatório"),

  password: z.string().nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(dataLogin: FormData) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: dataLogin.email,
        password: dataLogin.password,
      });

      console.log("Logado com sucesso");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log("Erro ao fazer login", error);
    }
  }

  return (
    <main className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center px-2">
      <Link to="/">
        <img src={Logo} alt="logo do site web carros" className="mb-11 w-sm" />
      </Link>

      <form
        className="flex flex-col w-full max-w-xl gap-3 bg-white p-5 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          placeholder="Digite o email.."
          name="email"
          error={errors.email?.message}
          register={register}
        />

        <Input
          type="password"
          placeholder="Digite a Senha.."
          name="password"
          error={errors.password?.message}
          register={register}
        />

        <button
          type="submit"
          className="bg-black text-white font-medium p-2 cursor-pointer rounded-md hover:bg-gray-700 transition ease-in-out"
        >
          Acessar
        </button>
      </form>

      <Link
        to="/register"
        className="mt-10 text-gray-600 font-light hover:font-medium transition ease text-sm md:text-base"
      >
        Ainda não possui uma conta? Cadastre-se
      </Link>
    </main>
  );
};

export default Login;
