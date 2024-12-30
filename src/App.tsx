import { useState } from 'react'
import { useQuery, useMutation  } from '@tanstack/react-query'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const POSTS = [
  { id: 1, title: 'Post 1'},
  { id: 2, title: 'Post 2'}
]

function App() {
  // useQuery and useMutation are 2 hooks available from the library
  // useQuert is used to get/fetch data and useMutation is used to change data
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS])
  })

  const newPostMutation = useMutation({
    mutationFn: () => {
      return wait(1000).then(() => POSTS.push())
    }
  })

  const [count, setCount] = useState(0)

  if(postsQuery.isLoading) return <h1>Loading...</h1>
  if(postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>

  return (
    <>
    <div>
      {postsQuery.data!.map(post => 
        <div key={post.id} >{post.title}</div>
      )}
    </div>
    
    </>
  )
}

function wait(duration: any) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default App
