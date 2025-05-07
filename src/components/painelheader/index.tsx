import { Link } from "react-router";

import supabase from "../../services/supabaseClient";

export function DashboardHeader() {
  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.log("erro ao deslogar", error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full items-center flex h-10 bg-red-500 text-white rounded-lg font-medium gap-4 px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Cadastrar Carro</Link>
      <button onClick={handleLogout} className="cursor-pointer ml-auto">
        Sair da Conta
      </button>
    </div>
  );
}
