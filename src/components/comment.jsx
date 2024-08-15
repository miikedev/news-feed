"use client"
import React,{ useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toggle } from "@/components/ui/toggle"
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
const Comment = ({ index, comment, currentUserId }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);  
  const handleToggleReplies = () => {  
    setShowReplies(prev => !prev);  
  };  

  const handleLike = () => {  
    onLike(comment.id);  
  };  
  const handleCommentAvatarClick = () => {
    console.log('handleCommentAvatarClick')
  }
  const handleReplyClick = () => {
    setShowReplyInput(prev => !prev)
  }
  console.log('comment user id',comment.userId)
  console.log('current user id', currentUserId)

  return (
    <div className="flex gap-3 mb-2" key={index}>
      <Avatar className="inline cursor-pointer" onClick={handleCommentAvatarClick}>
        <AvatarImage src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${comment.userId}`} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="p-3 rounded-md bg-cyan-300 bg-opacity-35 text-[#212121] text-opacity-70 mix-w-[300px]">
          <small className="font-semibold text-md cursor-default">{comment.author}</small>
          <small className="block">{comment.content}</small>
        </div>
        <div className="flex justify-between px-2 py-1 items-center text-[14px]">
          <div className="flex gap-6 items-center">
            <small className='cursor-default'>date</small>
            <Toggle disabled={comment.userId == currentUserId ? true: false} aria-label="Toggle italic" size="sm" className="hover:bg-cyan-200 h-4">
              <small>like</small>
            </Toggle>
            <div className='cursor-pointer text-[14px]' onClick={handleReplyClick}>
              <small className='cursor-pointer'>reply</small>
            </div>
            <div> 
              <small className='cursor-default'>{`like:${comment.likes}`}</small>
            </div>
            {
            comment.comments && comment.comments.length > 0 && 
            <div className='cursor-pointer text-[14px]' onClick={handleToggleReplies}>
              <small>{showReplies ? 'Hide Replies' : 'Show Replies'} ({comment.comments.length})</small>
            </div>
            }
            
          </div>
          
          
        </div>
        {showReplyInput && (  
            <div className="relative flex gap-2 my-1">  
              <div>
              <Avatar className="cursor-pointer" onClick={handleCommentAvatarClick}>
                <AvatarImage src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${comment.userId}`} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </div>
              <Textarea placeholder="enter your reply text"/>  
              <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">Send</Button>
            </div>  
        )} 
        {showReplies && comment.comments && (  
            <div className="relative">  
              {comment.comments.map((reply,i) => (  
                <Comment index={reply.id} comment={reply} key={i} currentUserId={currentUserId}/>  
              ))}  
            </div>  
        )}
         
      </div>
    </div>
  )
}

export default Comment