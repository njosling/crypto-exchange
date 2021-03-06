import {useEffect, useState} from 'react'


function Newsfeed() {

   const [articles, setArticles] = useState(null)

   useEffect(() => {
      const axios = require("axios");

      const options = {
        method: 'GET',
        url: 'https://crypto-news-live3.p.rapidapi.com/news',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
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
        <h2 className='heading'>News Feed</h2>
        {firstSevenArticles?.map((article, _index) => (
        <div key={_index}>
         <a className="links" href={article.url}><p>- {article.title}</p></a>
         </div>))}
     </div>
    )
  }
  
  export default Newsfeed
  