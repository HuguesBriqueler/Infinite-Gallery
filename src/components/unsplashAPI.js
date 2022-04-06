import { v4 as uuidv4 } from "uuid";

// Fetch data from unsplash API and dispatch to imgData state
const fetchImages = (imgData, setImgData, pageIndex, searchTerm) => {
  fetch(
    `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${searchTerm}&client_id=${process.env.REACT_APP_API_KEY}`
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

export default fetchImages;
