import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const history = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    console.log(count + 1);
  }, [time]);

  // useEffect(() => {
  //   if (count === 0) {
  //     history("/");
  //   }
  // }, [count]);

  return (
    <main className="text-white">
      <h1 className="text-4xl font-bold">
        Omoo E be like you don enter wrong lungu.
      </h1>
      <p>I dey return you go homepage in {count}</p>
    </main>
  );
};

export default ErrorPage;
