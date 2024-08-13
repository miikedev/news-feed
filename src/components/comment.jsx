import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toggle } from "@/components/ui/toggle"

const Comment = ({index}) => {
    const handleCommentAvatarClick = () => {
        console.log('handleCommentAvatarClick')
    }
  return (
    <div className="flex gap-3 mb-2" key={index}>  
        <Avatar className="inline cursor-pointer" onClick={handleCommentAvatarClick}>  
          <AvatarImage src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${index}`} alt="@shadcn" />  
          <AvatarFallback>CN</AvatarFallback>  
        </Avatar>  
        <div>  
            <div className="p-3 rounded-md bg-cyan-300 bg-opacity-35 text-[#212121] text-opacity-70">  
                <small className="font-semibold text-md cursor-default">user-{index}</small>  
                <small className="block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam natus soluta fuga totam magnam possimus dignissimos, mollitia, eveniet itaque fugit odit quo accusantium minima voluptate. Molestiae rem deleniti recusandae iusto.</small>  
            </div>  
            <div className="flex justify-between px-2 py-1 text-[14px]">  
                <div className="flex gap-6 items-center">  
                <small className='cursor-default'>date</small> 
                <Toggle aria-label="Toggle italic" size="sm">
                <small>like</small>  
                </Toggle>
                <small className='cursor-pointer'>reply</small>  
                </div>  
                <small className='cursor-default'>{`like:2${index}0`}</small>  
            </div>  
        </div>  
    </div>  
  )
}

export default Comment