import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/albums").then((res) =>
        res.json()
      ),
  });

  console.log("🚀 ~ App ~ data:", data);

  if (isLoading) return <h1>... Loading</h1>;
  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <div className="App">
      <h2>List </h2>
      {data?.map((post) => {
        return <div key={post.id}>{post.title}</div>;
      })}
    </div>
  );
}

export default App;
