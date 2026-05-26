import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center screen-max-width">
      <img
        src={appleImg}
        alt="Apple"
        width={14}
        height={18}
        className="cursor-pointer"
      />

      <nav className="flex-1 flex justify-center items-center max-sm:hidden">
        {navLists.map((list: string) => (
          <a
            href="#"
            key={list}
            className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
          >
            {list}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-7 max-sm:justify-end max-sm:flex-1 ">
        <img src={searchImg} alt="Search" width={18} height={18} />
        <img src={bagImg} alt="Bag" width={18} height={18} />
      </div>
    </header>
  );
};

export default Navbar;
