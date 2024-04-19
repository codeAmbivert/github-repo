import { useState } from "react";
import githubLogo from "../assets/images/githubLogo.svg";
import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const Home = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const getUserDetails = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] w-full bg-[#010409]">
      <ToastContainer />
      <div className="min-h-[100vh] max-w-6xl mx-auto pt-20 p-5 w-full">
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-wrap gap-5 justify-between items-center w-full text-white">
            <div className="max-w-2xl min-w-72 bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center">
              <input
                type="text"
                name="userName"
                value={username}
                placeholder="Input Github Username"
                className="focus:outline-none p-1 px-4 w-full rounded-tl-md rounded-bl-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                className={`bg-[#292E36] h-full rounded-tr-md rounded-br-md p-1 w-40 text-white text-center border font-medium text-lg border-[#30363D] ${
                  loading ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                disabled={loading ? true : false}
                onClick={() => getUserDetails()}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
            <div
              className={`bg-[#292E36] h-full rounded-md p-1 w-40 text-white text-center border font-medium text-lg border-[#30363D] cursor-pointer`}
              onClick={() => setUser(null)}
            >
              Clear User
            </div>
          </div>

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
                  <div>
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
                <div className="mt-5 flex flex-col gap-2 text-[#656E76]">
                  <Link
                    to={`/repositories/${user?.data?.login}`}
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
