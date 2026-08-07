import axios from "axios";
async function getData() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  return res.data;
}
export default async function Home() {
  const data = await getData();

  return (
    <div>
      <h1 className="text-4xl font-bold text-center font-mono">Posts</h1>
      <ul className="pl-5">
        {data.map((post: any) => (
          <li key={post.id} className="mb-2 capitalize bg-amber-50 p-2 rounded-md">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
