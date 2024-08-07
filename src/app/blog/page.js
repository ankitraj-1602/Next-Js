import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";

// FETCH DATA WITH AN API
const getData = async()=>{
  const data = await fetch('https://jsonplaceholder.typicode.com/posts',{next:{revalidate:3600}})
  if(!data.ok){
    throw new Error("not found")
  }
  return data.json()
}

const BlogPage = async () => {

  // FETCH DATA WITH AN API
  const posts = await getData()

  // FETCH DATA WITHOUT AN API
  // const posts = await getPosts();

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogPage;