import Image from "next/image";

export default function Home()
{
  const testdata = fetch("http://localhost:3100/route1/test").then(res => res.json()); 
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="badge badge-outline badge-secondary">Secondary</div>
      {testdata ? JSON.stringify(testdata) : "Loading..."}
    </div>
  );
}
