"use server"

import { revalidatePath } from "next/cache"
import { connectToDb } from "./utils"
import { Post } from "./models"

export const addPost = async(formdata) =>{
    const {title,desc,slug,userId} = Object.fromEntries(formdata)

    try {
        connectToDb()
        const newPost = Post({
            title,
            desc,
            slug,
            userId
        })
        await newPost.save()
        console.log('post saved to db')
        revalidatePath('/blog')
        
    } catch (error) {
        console.log(error)
        return {error:'something went wrong'}
    }

}

export const deletePost = async(formdata) =>{
    const {id} = Object.fromEntries(formdata)

    try {
        connectToDb()
        await Post.findByIdAndDelete(id)
        console.log('post deleted')
        revalidatePath('/blog')
        
    } catch (error) {
        console.log(error)
        return {error:'something went wrong'}
    }
}