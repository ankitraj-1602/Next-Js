import { Post, User } from "./models"
import { connectToDb } from "./utils"
import { unstable_noStore as noStore } from "next/cache"

export const getPosts = async () => {

    try {

        connectToDb()
        const posts = await Post.find()
        console.log(posts)
        return posts


    } catch (err) {

        console.log(err)
        throw new Error(err)

    }
}


export const getPost = async (slug) => {
    noStore()
    try {

        connectToDb()
        const post = await Post.findOne({slug:slug})
        return post

    } catch (err) {

        console.log(err)
        throw new Error(err)

    }
}

export const getUsers = async () =>{

    try {

        connectToDb()
        const users = await User.find()
        return users

    } catch (error) {

        console.log(error)
        throw new Error(error)

    }
}


export const getUser = async (id) =>{
    noStore()
    try {

        connectToDb()
        const user = await User.findById(id)
        return user

    } catch (error) {

        console.log(error)
        throw new Error(error)

    }
}