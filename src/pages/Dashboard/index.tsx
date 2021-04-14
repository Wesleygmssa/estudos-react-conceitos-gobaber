import React from "react";
import { useAuth } from "../../hooks/AuthContext";

const Dashborad: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <>
      <h1>Dasboard</h1>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sair
      </button>
    </>
  );
};

export default Dashborad;
