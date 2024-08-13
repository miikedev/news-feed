import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
    },
  })
}

export const fetchPosts = async () => {
    const {data} = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    console.log('fetch posts', data)
    return data;
};



