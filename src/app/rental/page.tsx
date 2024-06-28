// pages/index.tsx

import SearchBar from "@/components/Home/SearchBar";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar Renta de Motocicletas</h1>
      <SearchBar />
    </div>
  );
};

export default HomePage;
