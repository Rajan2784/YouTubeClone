import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { context } from '../context/contextApi';
import { fetchDataFromApi } from '../utils/api';
import LeftNav from './LeftNav';
import SearchResultVideo from './SearchResultVideo';

const SearchResult = () => {

  const [result,setResult] = useState();
  const {searchQuery} = useParams();
  const {setLoading} = useContext(context);

  useEffect(()=>{
    document.getElementById("root").classList.remove("custom-h")
    fetchSearchResults();
  },[searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res)=>{
      setResult(res?.contents);
    })
  }

  return (
    <div className='flex h-[calc(100%-56px)]'>
      <LeftNav />

      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 p-5">
          {result?.map((item)=>{
            if(item?.type !== "video") return false;
            let video = item?.video;
            return (
              <SearchResultVideo key={video?.videoId} video={video} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchResult
