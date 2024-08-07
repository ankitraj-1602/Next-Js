
import { Suspense } from "react";
import styles from "./singlePost.module.css";
import PostUser from "@/components/postUser/postUser";


// FETCH DATA WITH AN API
const getData = async(slug) =>{
  // console.log(slug)
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`)

  if(!res.ok){
    throw new Error("not found")
  }
  // console.log(res.json())
  return res.json()
}


const SinglePostPage = async ({ params }) => {
  const { slug } = params;
  // console.log(slug)


  // FETCH DATA WITH AN API
  const post = await getData(slug)
// console.log(post)

  // FETCH DATA WITHOUT AN API
  // const post = await getPost(slug);

  return (
    <div className={styles.container}>
      {/* {post.img && (
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="" fill className={styles.img} />
        </div>
      )} */}
      <div className={styles.textContainer}>
        {/* <h1 className={styles.title}>{post.title}</h1> */}
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          {/* <PostUser userId = {post.userId}/> */}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            {/* <span className={styles.detailValue}>
              {post.createdAt.toString().slice(4, 16)}
            </span> */}
          </div>
        </div>
        <div className={styles.content}>{post.body}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;