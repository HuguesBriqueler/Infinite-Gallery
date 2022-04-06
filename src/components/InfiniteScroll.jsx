import { useState, useEffect, useRef } from "react";
import styles from "./InfiniteScroll.module.css";
import SearchBar from "./SearchBar";
import fetchImages from "./unsplashAPI";

function InfiniteScroll() {
  const [imgData, setImgData] = useState([[], [], []]);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("random");
  const isSearching = useRef(false);

  // Call fetchImages function on component mount and on pageIndex change
  useEffect(() => {
    fetchImages(imgData, setImgData, pageIndex, searchTerm);
  }, [pageIndex, searchTerm]);

  // Setting up scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // calculating scroll position and checking if we reached the bottom of the page
  // using ref 'isSearching' to prevent jumping to pageIndex 2 when re-rendering trigger scroll event
  // (was not effective with a useState)
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollHeight - scrollTop, clientHeight);
    if (scrollHeight - scrollTop <= clientHeight && !isSearching.current) {
      setPageIndex((PageIndex) => PageIndex + 1);
    }
    if (scrollHeight - scrollTop > clientHeight) {
      isSearching.current = false;
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar
        isSearching={isSearching}
        setSearchTerm={setSearchTerm}
        setImgData={setImgData}
        setPageIndex={setPageIndex}
      />
      <div className={styles.cardList}>
        <div>
          {imgData[0].map((image) => (
            <img key={image.id} src={image.img} alt={image.alt} />
          ))}
        </div>
        <div>
          {imgData[1].map((image) => (
            <img key={image.id} src={image.img} alt={image.alt} />
          ))}
        </div>
        <div>
          {imgData[2].map((image) => (
            <img key={image.id} src={image.img} alt={image.alt} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfiniteScroll;
