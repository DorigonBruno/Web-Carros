import Container from "../../../components/container";
import { DashboardHeader } from "../../../components/painelheader";
import { FiUpload } from "react-icons/fi";
const New = () => {
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
        <h1>Teste</h1>
      </div>
    </Container>
  );
};

export default New;
