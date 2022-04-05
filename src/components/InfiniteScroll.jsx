import { useState, useEffect, useRef } from "react";
import styles from "./InfiniteScroll.module.css";
import { v4 as uuidv4 } from "uuid";

function InfiniteScroll() {
  const [imgData, setImgData] = useState([[], [], []]);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("random");
  const isSearching = useRef(false);

  // Fetch data from unsplash API and dispatch to imgData state
  const fetchImages = () => {
    fetch(
      `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchTerm}&client_id=UczR6L8gY0VghRj-fq77O6E4MY3pKKUmfXcQVjZBacc`
    )
      .then((res) => res.json())
      .then((data) => {
        const dataRecieved = [];
        data.results.forEach((item) => {
          dataRecieved.push({
            id: uuidv4(),
            img: item.urls.regular,
            alt: item.alt_description,
          });
        });
        const newImgData = [
          [...imgData[0], ...dataRecieved.slice(0, 10)],
          [...imgData[1], ...dataRecieved.slice(10, 20)],
          [...imgData[2], ...dataRecieved.slice(20, 30)],
        ];
        setImgData(newImgData);
      });
  };

  // Call fetchImages function on component mount and on pageIndex change
  useEffect(() => {
    fetchImages();
  }, [pageIndex, searchTerm]);

  // Managing search field
  const searchRef = useRef();
  const handleSearch = (e) => {
    e.preventDefault();
    isSearching.current = true;
    setSearchTerm(searchRef.current.value);
    setImgData([[], [], []]);
    setPageIndex(1);
  };

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
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Votre recherche</label>
        <input type="text" id="search" ref={searchRef} />
      </form>
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
