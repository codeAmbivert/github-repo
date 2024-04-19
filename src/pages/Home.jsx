import { useEffect, useState } from "react";
import githubLogo from "../assets/images/githubLogo.svg";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const Home = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const [user, setUser] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/codeAmbivert`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  console.log(user  );

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-[100vh] w-full bg-[#010409]">
      <ToastContainer />
      <div className="min-h-[100vh] max-w-6xl mx-auto pt-20 p-5 w-full">
        <div className="w-full flex flex-col items-center">
          {user ? (
            <div className="w-full flex gap-5 mt-10">
              <div className="w-1/4">
                <div className="w-full h-auto rounded-full border-2 border-[#31343A] overflow-hidden">
                  <img
                    src={user?.data?.avatar_url || githubLogo}
                    alt="user"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="w-full border-2 border-[#30363D] rounded-xl p-5 text-white">
                <div className="flex justify-between items-center flex-wrap gap-5">
                  <div className="text-start">
                    <h1 className="font-semibold text-3xl">
                      {user?.data?.name}
                    </h1>
                    <p className="text-lg font-medium text-[#31343A]">
                      {user?.data?.login}
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <div>Followers: {user?.data?.followers}</div>
                    <div>Following: {user?.data?.following}</div>
                  </div>
                </div>
                <div className="text-start mt-5 flex flex-col gap-2 text-[#656E76]">
                  <Link
                    to={`/repositories`}
                    className="text-blue-400 font-medium"
                  >
                    Goto Repositories
                  </Link>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {user?.data?.email}
                  </p>
                  {user?.data?.bio && (
                    <p>
                      <span className="font-medium">Bio:</span>{" "}
                      {user?.data?.bio}
                    </p>
                  )}
                  {user?.data?.location && (
                    <p>
                      <span className="font-medium">Location:</span>{" "}
                      {user?.data?.location}
                    </p>
                  )}

                  <p>
                    <span className="font-medium">Public repositories:</span>{" "}
                    {user?.data?.public_repos}
                  </p>
                  {user?.data?.total_private_repos && (
                    <p>
                      <span className="font-medium">Private repositories:</span>{" "}
                      {user?.data?.total_private_repos}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <img
              src={githubLogo}
              alt="github"
              className="max-w-md w-full h-auto mt-20"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
