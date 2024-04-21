import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import diconnectedImg from "../assets/images/disconnected.svg";
const ErrorPage = () => {
  const history = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    let interval;
    if (count) {
      interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      history("/");
    }

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  console.log({ count });
  return (
    <main className="text-white min-h-[100vh] max-w-6xl mx-auto pt-20 p-5 w-full">
      <h1 className="text-4xl font-bold">
        What did you do!!???? You&apos;ve definitely broken something.
      </h1>
      <h2 className="mt-5 text-2xl font-bold">
        Just kidding. 404 Error page not found
      </h2>

      <img src={diconnectedImg} alt="error" className="mx-auto mt-5" />
      <p className="text-xl mt-10">Returning you to the homepage in {count}</p>
    </main>
  );
};

export default ErrorPage;
