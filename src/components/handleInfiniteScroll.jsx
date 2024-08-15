import { useGetPosts } from "@/api/posts";
import Comment from "@/components/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import React, { useEffect, useState } from "react";
import { QueryInfiniteScroll } from "react-query-infinite-scroll";

const HandleInfiniteScroll = ({currentUserId}) => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      // Shuffle and set your items after 1 second
      setItems(_.shuffle(Array.from({ length: 10 })));
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [loading]);
  const handleCommentClick = () => {
    console.log("click");
  };
  console.log('current user id', currentUserId);
  return (
    <QueryInfiniteScroll
      query={useGetPosts()}
      loading={
        <div className="flex items-center flex-col">
          {Array.from({ length: 10 }).map((_, i, a) => (
            <Card key={i} className="w-[350px] mb-3">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-4 w-[80px] relative top-3" />
                </div>
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[150px] w-full" />
              </CardContent>
              <CardFooter className="relative flex justify-between border-1 border-slate-200 ">
                <Skeleton className="h-4 w-[80px] relative top-3" />
                <Skeleton className="h-4 w-[80px] relative top-3" />
                <Skeleton className="h-4 w-[80px] relative top-3" />
              </CardFooter>
            </Card>
          ))}
        </div>
      }
      error={<h1>Error on fetch data...</h1>}
      observer={<h1 className="text-slate-600">loading...</h1>}
    >
      {/* <div className='flex items-center flex-col mt-10'> */}
      {(res) => {
        if (res === undefined) return null; 
        const sliceData = res && _.shuffle(res?.slice(0, 10));
        return sliceData.map((page, index) => {
          const photoUrl = page.profile_photo+page.userId;
          return(
          <Card key={index} className="w-[350px] mb-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="inline">
                    <AvatarImage
                      src={photoUrl}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <small className="text-slate-600 font-semibold">
                    user:{page.author}
                  </small>
                </div>
                <small className="text-slate-600">date: 8-8-2024</small>
              </div>
              <CardTitle className="relative top-3">{page.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{page.body}</p>
            </CardContent>
            <div className="w-[88%] mx-auto px-2 flex justify-between">
              <div className="flex items-center text-slate-900 text-opacity-50">
                <small className="text-slate-900 text-opacity-50">
                  like:{page.likes}
                </small>
              </div>
              <small className="text-cyan-600">{page.comments_count}comments</small>
            </div>
            <CardFooter className="flex justify-between py-1 border border-slate-200 w-[88%] mx-auto my-2">
              {/* like */}
              <Toggle disabled={page.userId == currentUserId ? true: false} aria-label="Toggle italic" size="sm" className="h-5 text-slate-600">
                like
              </Toggle>
              {/* comment */}
              <Dialog className="flex">
                <DialogTrigger
                  className="relative right-3 hover:cursor-pointer hover:text-cyan-600"
                  onClick={() => handleCommentClick(page.id)}
                >
                  <small>comment</small>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Avatar className="inline">
                          <AvatarImage
                            src={photoUrl}
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <small className="text-slate-600 font-semibold ml-2">
                          user:{page.author}
                        </small>
                      </div>
                      <small className="text-slate-600 relative right-7">
                        date: 8-8-2024
                      </small>
                    </div>
                    <DialogTitle className="relative">{page.title}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>{page.body}</DialogDescription>
                  <DialogFooter className="">
                    <div className="w-full px-5 py-2 flex justify-between">
                      <div className="flex items-center text-slate-900 text-opacity-50">
                        <small className="text-slate-900 text-opacity-90">
                          <Toggle disabled={page.userId == currentUserId ? true: false} aria-label="Toggle italic" size="sm" className="h-5 text-slate-600 hover:bg-cyan-300">like</Toggle>:<span className="text-slate-900 text-opacity-50">{page.likes}</span>
                        </small>
                      </div>
                      <small className="text-cyan-600">{page.comments_count}comments</small>
                      <Dialog>
                        <DialogTrigger>
                          <small className="relative right-5 text-slate-900 hover:text-cyan-600 text-opacity-90 cursor-pointer">
                            share
                          </small>
                        </DialogTrigger>
        
                          <DialogContent className="w-[300px]">
                            <DialogTitle>Are you sure to share this post?</DialogTitle>
                            <div className="flex gap-3 justify-center">
                            <Button className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 text-[.8rem] min-w-1/3">
                              Share
                            </Button>
                            </div>
  
                        </DialogContent>
                      </Dialog>
                    </div>
                  </DialogFooter>
                  <div className="min-h-[300px] h-[400px] overflow-y-scroll border border-slate-200 p-3">
                    {loading ? (
                      <div className="flex justify-center items-center h-full">
                        <div
                          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                          role="status"
                        >
                          <span className="hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      page.comments.map((comment, index) => (
                        <Comment index={index} comment={comment} currentUserId={currentUserId} key={index}/>
                      ))
                    )}
                  </div>
                  <div className="h-auto border border-slate-200 p-3 relative ">
                    <div className="w-full gap-2 flex">
                      <Textarea
                        placeholder="Type your message here."
                        className="active:ring-0 placeholder:text-slate-900 placeholder:text-opacity-60 outline-none"
                      />
                      <Button className="min-w-[60px] bg-cyan-500 hover:bg-cyan-600 text-[.8rem]">
                        Send
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              {/* share */}
              <Dialog>
                <DialogTrigger>
                  <small className="relative right-5 text-slate-900 hover:text-cyan-600 text-opacity-90 cursor-pointer">
                    share
                  </small>
                </DialogTrigger>
                  <DialogContent className="w-[300px]">
                    <Textarea placeholder="what's on your mind?" className="relative top-[20px]"/>
                    <div className="flex gap-3 justify-center">
                    <Button className="w-full mt-2 bg-cyan-500 hover:bg-cyan-600 text-[.8rem] min-w-1/3">
                      Share
                    </Button>
                    </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        )});
      }}
    </QueryInfiniteScroll>
  );
};

export default HandleInfiniteScroll;
