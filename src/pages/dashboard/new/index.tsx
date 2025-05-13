import Container from "../../../components/container";
import { Input } from "../../../components/input";
import { DashboardHeader } from "../../../components/painelheader";
import { FiUpload } from "react-icons/fi";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";
import supabase from "../../../services/supabaseClient";

const schema = z.object({
  name: z.string().nonempty("O nome é obrigatório"),
  model: z.string().nonempty("O modelo do carro é obrigatório"),
  year: z.string().nonempty("O ano é obrigatório"),
  km: z.string().nonempty("O km do carro é obrigatório"),
  price: z.string().nonempty("O preço é obrigatório"),
  city: z.string().nonempty("A cidade é obrigatória"),
  whatsapp: z
    .string()
    .min(1, "O telefone é obrigatório")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Numero de telefone inválido",
    }),

  description: z.string().nonempty("A descrição do carro é obrigatória"),
});

type FormData = z.infer<typeof schema>;

const New = () => {
  const { user } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <Container>
      <DashboardHeader />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 flex items-center justify-center w-48 rounded-lg cursor-pointer border-gray-600 h-32">
          <div className="absolute cursor-pointer p-2">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
            />
          </div>
        </button>
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full">
          <div className="flex flex-col gap-1">
            <p>Nome do carro</p>

            <Input
              type="text"
              name="name"
              placeholder="Porsche 911"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="mt-2">Modelo</p>

            <Input
              type="text"
              name="model"
              placeholder="Porsche automatica flex"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex w-full justify-between gap-2">
            <div className="mt-2 flex-1">
              <p>Ano</p>

              <Input
                type="text"
                name="year"
                placeholder="2018"
                register={register}
                error={errors.name?.message}
              />
            </div>
            <div className="flex-1">
              <p className="mt-2">Km Rodados</p>

              <Input
                type="text"
                name="km"
                placeholder="113.400"
                register={register}
                error={errors.name?.message}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="mt-2">Preço</p>

            <Input
              type="text"
              name="price"
              placeholder="R$ 120.200"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="mt-2">Cidade</p>

            <Input
              type="text"
              name="city"
              placeholder="Mogi Guaçu - SP"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="mt-2">Whatsapp</p>

            <Input
              type="text"
              name="whatsapp"
              placeholder="19 000000000"
              register={register}
              error={errors.name?.message}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="mt-2">Descrição</p>

            <textarea
              className="resize-none w-full h-30 border border-gray-200 rounded-lg outline-none focus:border-gray-500 focus:outline p-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite a descrição que complemente o carro"
            >
              {errors.description && (
                <p className="mb-1 text-red-500">
                  {errors.description.message}
                </p>
              )}
            </textarea>
          </div>

          <button className="w-full bg-black text-white p-1 font-medium cursor-pointer my-10 hover:bg-gray-700 transition ease-in-out">
            Cadastrar Carro
          </button>
        </form>
      </div>
    </Container>
  );
};

export default New;
