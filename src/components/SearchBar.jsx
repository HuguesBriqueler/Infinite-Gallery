import { useRef } from "react";

function SearchBar({ isSearching, setSearchTerm, setImgData, setPageIndex }) {
  // Managing search field
  const searchRef = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    isSearching.current = true;
    setSearchTerm(searchRef.current.value);
    setImgData([[], [], []]);
    setPageIndex(1);
  };

  return (
    <form onSubmit={handleSearch}>
      <label htmlFor="search">Votre recherche</label>
      <input type="text" id="search" ref={searchRef} />
    </form>
  );
}

export default SearchBar;
