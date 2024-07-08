// pages/index.tsx

import SearchBar from "@/components/Home/SearchBar";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl lg:text-3xl font-bold mb-1">Encuentra motocicletas para cualquier tipo de viaje</h1>
      <p className="text-sm mb-6">Busca ofertas de renta de motocicletas en diferentes locaciones</p>
      <SearchBar />
    </div>
  );
};

export default HomePage;
