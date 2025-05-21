import { ChangeEvent, useContext, useState } from "react";
import Container from "../../../components/container";
import { Input } from "../../../components/input";
import { DashboardHeader } from "../../../components/painelheader";
import { FiUpload, FiTrash } from "react-icons/fi";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";
import { AuthContext } from "../../../context/authContext";
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

export interface ImageProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
  path: string;
}

interface CarData {
  name: string;
  model: string;
  year: string;
  km: string;
  price: string;
  city: string;
  whatsapp: string;
  description: string;
  images: ImageProps[];
  owner?: string;
  user_id: string;
  created_at: string;
}

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

  const [images, setImages] = useState<ImageProps[]>([]);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        console.log("Envie uma imagem JPEG ou PNG");
        return null;
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.id) {
      console.error("Usuário não autenticado");
      return null;
    }

    try {
      const currentUid = user?.id;
      const uidImage = uuidV4();
      const uploadRef = `images/${user.id}/${uidImage}`;

      const { error } = await supabase.storage
        .from("images")
        .upload(uploadRef, image);

      if (error) {
        console.error("Erro ao enviar imagem:", error);
        return null;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(uploadRef);

      const imageItem = {
        name: uidImage,
        uid: currentUid,
        previewUrl: URL.createObjectURL(image),
        url: publicUrl,
        path: uploadRef,
      };

      setImages((allImages) => [...allImages, imageItem]);
    } catch (error) {
      console.error("Erro durante o upload:", error);
      return null;
    }
  }

  async function onSubmit(data: FormData) {
    if (images.length === 0) {
      alert("Insira uma imagem para continuar");
      return;
    }

    if (!user?.id) {
      alert("Usuário não autenticado");
      return;
    }

    try {
      const carPayload: CarData = {
        name: data.name.trim(),
        model: data.model.trim(),
        year: data.year.trim(),
        km: data.km.trim(),
        price: data.price.trim(),
        city: data.city.trim(),
        whatsapp: data.whatsapp.trim(),
        description: data.description.trim(),
        created_at: new Date().toISOString(),
        owner: user?.name?.trim() || "Anônimo",
        user_id: user.id,
        images: images.map((img) => ({
          uid: img.uid,
          url: img.url,
          path: img.path,
          name: img.name,
          previewUrl: img.previewUrl,
        })),
      };

      const { data: newCar, error } = await supabase
        .from("cars")
        .insert(carPayload)
        .select()
        .single();

      if (error || !newCar) {
        console.log("erro ao cadastrar o carro", error);
        return;
      }

      reset();
      setImages([]);
    } catch (err) {
      console.log("Erro ao cadastrar carro", err);
      return;
    }
  }

  async function handleDeleteImage(image: ImageProps) {
    const imagePath = `images/${image.uid}/${image.name}`;

    try {
      await supabase.storage.from("images").remove([imagePath]);

      setImages((prevImages) => {
        return prevImages.filter((item) => item.url !== image.url);
      });
    } catch (err) {
      console.log("Erro ao deletar imagem", err);
    }
  }
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
              onChange={handleFile}
            />
          </div>
        </button>

        {images.map((image) => (
          <div
            key={image.name}
            className="w-full flex justify-center items-center h-32 relative"
          >
            <button
              className="cursor-pointer absolute"
              onClick={() => handleDeleteImage(image)}
            >
              <FiTrash size={28} color="#fff" />
            </button>
            <img
              src={image.previewUrl}
              className="rounded-lg w-full h-32 object-cover"
              alt="Foto do carro"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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

          <button
            type="submit"
            className="w-full h-10 bg-black text-white p-1 font-medium cursor-pointer mt-10 mb-5 hover:bg-gray-700 transition ease-in rounded-lg"
          >
            Cadastrar Carro
          </button>
        </form>
      </div>
    </Container>
  );
};

export default New;
