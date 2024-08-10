import { handleGithubLogin } from "@/lib/actions"

const Login = async() => {


  
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login With GitHub</button>
      </form>
    </div>
  )
}

export default Login