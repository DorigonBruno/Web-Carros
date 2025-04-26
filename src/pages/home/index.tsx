import Container from "../../components/container";

const Home = () => {
  return (
    <Container>
      <section className="bg-white w-full max-w-4xl m-auto flex flex-col sm:flex-row gap-2 items-center p-4 rounded-md mt-5 md:mt-10">
        <input
          type="text"
          placeholder="Buscar Carro"
          className="w-full p-2 border-1 border-gray-200 rounded-md outline-gray-400"
        />
        <button className="bg-red-500 w-full sm:w-32 md:w-42 h-9 px-8 rounded-md text-white cursor-pointer font-bold md:text-lg text-base">
          Buscar
        </button>
      </section>

      <h1 className="text-center font-bold text-xl md:text-2xl mt-16">
        Carros novos e usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 md:mt-6 gap-3 mb-4">
        <article className="bg-white w-full rounded-lg flex flex-col gap-2">
          <img
            src="https://s2-autoesporte.glbimg.com/M37DMrQOSTf951wnxsSEHtD777c=/0x0:1920x1280/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2024/Y/y/XNwjUBTzASjHewvmkoVg/pbr24-0209-fine.jpg"
            alt="imagem do carro carregado"
            className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all ease-in-out duration-300 object-cover"
          />
          <h3 className="pl-2 font-bold text-lg">Porsche qualquer coisa</h3>
          <span className="pl-2">2020/2021 - 116300km</span>

          <h2 className="font-bold pl-2 text-2xl">R$ 535.900</h2>
          <hr className="text-gray-200" />

          <span className="pl-2 mb-2">São Paulo - SP</span>
        </article>
      </main>
    </Container>
  );
};

export default Home;
