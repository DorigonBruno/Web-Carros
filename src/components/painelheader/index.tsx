import { Link } from "react-router";

import supabase from "../../services/supabaseClient";

export function DashboardHeadr() {
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
    <div>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/new">Cadastrar Carro</Link>
      <button onClick={handleLogout} className="cursor-pointer">
        Sair da Conta
      </button>
    </div>
  );
}
