import { useEffect, useContext } from "react";
import Logo from "../../assets/Group 496.svg";
import { Link, useNavigate } from "react-router";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../context/authContext";

import supabase from "../../services/supabaseClient";

const schema = z.object({
  name: z.string().nonempty("O campo Nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo Email é obrigatório"),

  password: z
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const { handleInfoUser, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogout() {
      await supabase.auth.signOut();
    }

    handleLogout();
  }, []);

  async function onSubmit(dataRegister: FormData) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: dataRegister.email,
        password: dataRegister.password,
        options: {
          data: {
            name: dataRegister.name,
          },
        },
      });

      if (error) {
        console.log("Erro ao cadastrar", error.message);
        return;
      }

      handleInfoUser({
        email: data.user?.email || null,
        name: data.user?.user_metadata.name || null,
        id: user?.id || "",
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log("ERRO AO CADASTRAR USUÀRIO", error);
    }
  }

  return (
    <main className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center px-2">
      <Link to="/">
        <img src={Logo} alt="logo do site web carros" className="mb-11 w-sm" />
      </Link>

      <form
        className="flex flex-col bg-white p-5 rounded-md w-full max-w-xl gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          name="name"
          placeholder="Digite seu nome Completo"
          register={register}
          error={errors.name?.message}
        />

        <Input
          type="email"
          name="email"
          placeholder="Digite o email.."
          register={register}
          error={errors.email?.message}
        />

        <Input
          type="password"
          name="password"
          placeholder="Digite a Senha.."
          register={register}
          error={errors.password?.message}
        />

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
        Já possui uma conta? Faça login
      </Link>
    </main>
  );
};

export default Register;
