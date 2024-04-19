import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Repository = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const { id } = useParams();
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(10);

  // console.log({ totalPagenations });
  useEffect(() => {
    const getUserRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${id}/repos`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRepos(response?.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    getUserRepos();
  }, []);
  return (
    <main className="min-h-[100vh] w-full bg-[#010409] text-white">
      <div className="min-h-[100vh] max-w-6xl mx-auto pt-20 p-5 w-full">
        <h2 className="font-semibold text-2xl">
          <span className="capitalize">{id}&apos;s</span> repositories
        </h2>
        <div className="flex flex-wrap gap-5 justify-between items-center w-full text-white mt-5">
          <div className="max-w-2xl min-w-72 bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center">
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search repositories"
              className="focus:outline-none p-1 px-4 w-full rounded-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button
              className={`bg-[#292E36] h-full rounded-tr-md rounded-br-md p-1 w-40 text-white text-center border font-medium text-lg border-[#30363D] ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => getUserDetails()}
            >
              {loading ? "Searching..." : "Search"}
            </button> */}
          </div>
          <div
            className={`bg-[#292E36] h-full rounded-md p-1 w-40 text-white text-center border font-medium text-lg border-[#30363D] cursor-pointer`}
            // onClick={() => setUser(null)}
          >
            Filter By
          </div>
        </div>
        {search.length < 1 ? (
          <div className="mt-5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {repos.map((item, index) => {
                const startIndex = (currentPage - 1) * reposPerPage;
                const endIndex = startIndex + reposPerPage;
                if (index >= startIndex && index < endIndex) {
                  return <div key={item?.id}>hello</div>;
                }
                return null;
              })}
            </div>
            <div className="flex justify-center items-center w-full">
              <button
                disabled={currentPage === 1}
                className="p-2 px-4 border border-[#30363D]  rounded-tl-lg rounded-bl-lg"
                onClick={() =>
                  setCurrentPage(currentPage > 1 && currentPage - 1)
                }
              >
                Prev
              </button>
              {Array.from(
                { length: Math.ceil(repos.length / reposPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    className={`p-2 px-4 border border-[#30363D] ${
                      i + 1 === currentPage && "bg-[#0D1117]"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                disabled={
                  currentPage === Math.ceil(repos.length / reposPerPage)
                }
                className="p-2 px-4 border border-[#30363D] rounded-tr-lg rounded-br-lg"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <>
            <div></div>
          </>
        )}
      </div>
    </main>
  );
};

export default Repository;
