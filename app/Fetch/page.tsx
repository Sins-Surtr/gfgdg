
import Image from "next/image"

interface PostType {
    id: number
    title: string
    author: string
    category: string
}

interface ProfileType {
    login: string
    id: number
    avatar_url: string
}
       
export default async function FetchAPI() {

    let data = await fetch('https://api.vercel.app/blog')
    const posts = await data.json()

    data = await fetch('https://api.github.com/users/wwarodom')
    const profile: ProfileType = await data.json()

    return (
        <div>
            <h1>FetchAPI</h1>

            <div className="flex mt-4 border-2 border-black m-2 p-2 rounded-xl shadow-lg">
                <div className="mr-4">
                    <Image 
                        className="rounded-xl"
                        src={profile.avatar_url} 
                        alt="avatar"
                        height={100} width={100} />
                </div>
                <div className="mt-4">
                    <h2>Profile</h2>
                    <div>Login: {profile.login}</div>
                    <div>Id: {profile.id}</div>
                </div>

            </div>


            <h2 className="mt-4">Posts</h2>
            <ul>
                {posts.map((post: PostType) => (
                    <li key={post.id}
                        className="border-2 border-black m-2 p-2 rounded-xl shadow-lg"
                    >
                        {post.id}. {post.title}
                        <div>
                            Category: {post.category}
                        </div>
                        <div>
                            By: {post.author}
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}
