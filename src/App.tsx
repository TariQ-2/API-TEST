import { useState, useEffect } from "react";
import axios from "axios";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};


function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        setPosts(res.data)
        setLoading(false)
    }).catch(err => 
        console.error(err)
      );
  }, []);

  return (
    <div className="h-screen w-screen bg-slate-950 p-10">

      <h1 className="text-2xl text-gray-300 font-bold text-center mb-8">
        Posts from JSONPlaceholder – API #{posts.length}
      </h1>

      <div className="bg-slate-900 text-white rounded-2xl overflow-hidden shadow-md text-center h-[700px] p-4 overflow-y-auto flex flex-col">
          
          {posts.length === 0 && (
            <div className="flex-1 flex justify-center items-center">
              <span className="text-gray-400 text-2xl">{loading ? "Loading..." : "No posts found."}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <div key={post.id} className="bg-slate-800 text-white rounded-2xl overflow-hidden shadow-md text-center">
                <div className="p-4 ">
                  <h3 className="text-slate-100 font-bold text-sm line-clamp-2 ">
                    {post.title}
                  </h3>
                </div>

                <div className="text-slate-400 p-4 text-sm text-gray-200">
                  {post.body}
                </div>
              </div>
            ))}
        </div>
      </div>
      <p className="text-gray-400 text-center mt-8">API TEST PROJECT BY <span className="font-bold">TariQ</span></p>
    </div>
  );
}

export default App;