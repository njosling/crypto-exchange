import {useEffect, useState} from 'react'
import axios from 'axios'

function Newsfeed() {

   const [articles, setArticles] = useState(null)

   useEffect(() => {
      const axios = require("axios");

      const options = {
        method: 'GET',
        url: 'https://crypto-news-live3.p.rapidapi.com/news',
        headers: {
          'X-RapidAPI-Key': 'e53b9f3b34msh800a751ec6b5494p1004adjsnaec83c9c9d83',
          'X-RapidAPI-Host': 'crypto-news-live3.p.rapidapi.com'
        }
      };
      
      axios.request(options).then((response) => {
         console.log(response.data);
         setArticles(response.data)
      }).catch((error) => {
         console.error(error);
      });

   }, [])

   console.log(articles)

   const firstSevenArticles = articles?.slice(0,7)

    return (
     <div className = "news-feed">
        <h2>News Feed</h2>
        {firstSevenArticles?.map((article, _index) => (
        <div key={_index}>
         <a href={article.url}><p>{article.title}</p></a>
         </div>))}
     </div>
    )
  }
  
  export default Newsfeed
  