import { useState, useEffect, useRef } from "react";
import styles from "./InfiniteScroll.module.css";
import { v4 as uuidv4 } from "uuid";

function InfiniteScroll() {
  const [imgData, setImgData] = useState([[], [], []]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("random");
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const searchRef = useRef();

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Votre recherche</label>
        <input type="text" id="search" ref={searchRef} />
      </form>
      <div className={styles.cardList}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default InfiniteScroll;
