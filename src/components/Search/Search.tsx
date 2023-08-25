import { UserPlus2, Search as SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className="flex flex-row gap-4 w-full mt-8">
      <div className="w-full flex flex-row gap-2 border-2 border-grayLight px-4 rounded-lg h-12 items-center text-black text-xs md:text-sm xxl:text-base font-medium focus:outline-none">
        <SearchIcon className="w-[20px] h-[20px] text-secondary" />

        <input type="text" className="border-none focus:outline-none pr-2" />
      </div>

      <button className="flex items-center justify-center w-[250px] h-[45px] px-2 gap-2 py-2 text-white bg-primary rounded-md hover:bg-opacity-80">
        <UserPlus2 className="w-[20px] h-[20px]" />
        <span className="text-xs md:text-sm xxl:text-base font-medium">
          Novo Usuário
        </span>
      </button>
    </div>
  );
};

export default Search;
