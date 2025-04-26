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
        <button className="bg-red-500 w-full sm:w-32 md:w-42 h-9 px-8 rounded-md text-white cursor-pointer font-bold text-lg">
          Buscar
        </button>
      </section>
    </Container>
  );
};

export default Home;
