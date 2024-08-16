import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
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
 export const useUpdatePostLikes = async(data) => {
  useMutation({
    mutationFn: await updateLikes(data)
  })
 }

export const fetchPosts = async () => {
    const {data} = await axios.get(
      'http://localhost:3000/posts'
    );
    console.log('fetch posts', data)
    return data;
};

// export const updateLikes = async (data) => {
//   console.log('update likes in axios', data)
//   const {data} = await axios.patch(
//     'http://localhost:3000/posts/' + data.id
//   ,{
//     likes: data.likes
//   })
//   return data;
// }



