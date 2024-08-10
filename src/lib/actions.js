"use server"

import { revalidatePath } from "next/cache"
import { connectToDb } from "./utils"
import { Post, User } from "./models"
import { signIn, signOut } from "./auth"
import bcrypt from 'bcrypt'

export const addPost = async (formdata) => {
    const { title, desc, slug, userId } = Object.fromEntries(formdata)

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
        return { error: 'something went wrong' }
    }

}

export const deletePost = async (formdata) => {
    const { id } = Object.fromEntries(formdata)

    try {
        connectToDb()
        await Post.findByIdAndDelete(id)
        console.log('post deleted')
        revalidatePath('/blog')

    } catch (error) {
        console.log(error)
        return { error: 'something went wrong' }
    }
}

export const handleGithubLogin = async () => {
    "use server"
    await signIn("github")
}

export const handleGithubLogout = async () => {
    "use server"
    await signOut()
}

export const register = async (formdata) => {

    const {username,email,password,img,passwordRepeat} = Object.fromEntries(formdata)

    if(password!==passwordRepeat){
        return {error:'password not match'}
    }

    try {
        connectToDb()
        const user = await User.findOne({username})
        if(user){
            return {error:'user already exists'}
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            img
        })
        await newUser.save()
        console.log('saved to db')
        return {success:true}

    } catch (error) {
        console.log(error)
        return {error:'something went wrong'}
    }
}