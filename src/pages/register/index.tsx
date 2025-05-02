import Logo from "../../assets/Group 496.svg";
import { Link } from "react-router";
import { Input } from "../../components/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("O campo Nome é obrigatório"),
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo Email é obrigatório"),

  password: z.string().nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
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
          type="text"
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
        <span>Já possui uma conta? Faça login</span>
      </Link>
    </main>
  );
};

export default Register;
