import "./App.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    // staleTime: 4000,
    // refetchInterval: 2000,
  });

  const { mutate, isError, isPending } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
    onSuccess: (newPost) => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueriesData(["posts"], (oldPosts) => [
        ...oldPosts,
        newPost,
      ]);
    },
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error || isError) {
    return <pre>There is an error</pre>;
  }

  return (
    <div className="App">
      <h2>Posts </h2>
      {isPending && <p>Post is being added...</p>}
      <button
        onClick={() =>
          mutate(
            { id: 999, userId: 1000, title: "New Post", body: "HELLO WORLD" } // for test
          )
        }
      >
        Add New Post
      </button>

      {data?.map((post, idx) => {
        return (
          <div key={post.id}>
            {/* <h2>User: {post.userId}</h2> */}
            No.{idx + 1} - {post.title}
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
