'use client'

import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { QueryInfiniteScroll } from "react-query-infinite-scroll";
import HandleInfiniteScroll from '@/components/handleInfiniteScroll';
import { useGetPosts } from '../api/posts'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
const Home = () => {
  const [loading, setLoading] = useState(true);  
  const [showModal, setShowModal] = useState(false);  
  const [selectedPost, setSelectedPost] = useState(null); 
  const [items, setItems] = useState([]);
  useEffect(() => {  
    const timer = setTimeout(() => {  
      // Shuffle and set your items after 1 second  
      setItems(_.shuffle(Array.from({ length: 10 })));  
      setLoading(false);  
    }, 1000);  

    return () => clearTimeout(timer); // Cleanup the timer  
  }, [loading]);
  const handleCommentClick = () => {
    console.log('click')
  }
  return (
    <div className='flex flex-col items-center'>
        <QueryClientProvider client={queryClient}>
          <HandleInfiniteScroll />
        </QueryClientProvider>
      </div>
  )
}

export default Home