import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import forkIcon from "../assets/images/code-fork-svgrepo-com.svg";
import starIcon from "../assets/images/star-svgrepo-com.svg";
import CreateRepoModdal from "../components/CreateRepoModal";
// import DeleteRepoModal from "../components/DeleteRepoModal";
import UpadateRepoModal from "../components/UpdateRepoModal";

const Repositories = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const reposPerPage = 10;

  // console.log({ totalPagenations });

  const getUserRepos = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/codeAmbivert/repos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRepos(response?.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserRepos();
  }, []);
  return (
    <main className="min-h-[100vh] w-full bg-[#010409] text-white">
      <div className="flex justify-start">
        <Link to="/" className="text:lg sm:text-xl text-blue-400">
          &lt;ALT/SOE/023/2353.&gt;
        </Link>
      </div>
      <div className="min-h-[100vh] max-w-6xl mx-auto pt-20 w-full">
        <h2 className="font-semibold text-2xl">
          <span className="capitalize">Titilope Chisom&apos;s</span>{" "}
          repositories
        </h2>
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap sm:justify-between sm:items-center w-full text-white mt-5 mb-8">
          <div className="max-w-2xl bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center">
            <input
              type="text"
              name="search"
              value={search}
              placeholder="Search repositories"
              className="focus:outline-none p-1 px-4 w-full rounded-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            className={`bg-[#292E36] h-full rounded-md p-1 flex justify-center items-center w-full sm:w-40 mt-4 sm:mt-5 ml-auto text-white text-center border font-medium sm:text-lg border-[#30363D] cursor-pointer`}
            onClick={() => setOpenCreate(true)}
          >
            Create New Repo
          </div>
        </div>

        {search.length < 1 ? (
          <div className="mt-5 w-full">
            <p className="text-lg font-bold">{loading && "Loading..."}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {repos.map((item, index) => {
                const startIndex = (currentPage - 1) * reposPerPage;
                const endIndex = startIndex + reposPerPage;
                if (index >= startIndex && index < endIndex) {
                  return (
                    <div
                      key={item?.id}
                      className="text-start border-2 border-[#30363D] p-3 rounded-lg"
                    >
                      <div className="flex gap-5 justify-between flex-wrap">
                        <Link
                          to={`/repository/${item?.name}`}
                          className="text-blue-400 text-lg font-semibold hover:underline"
                        >
                          {item?.name}
                        </Link>
                        <p className="p-1 px-4 text-xs border border-[#30363D] rounded-full capitalize">
                          {item?.visibility}
                        </p>
                      </div>
                      <div className="mt-5 flex gap-5 items-center">
                        {item?.language && <p>{item?.language}</p>}

                        <div className="text-white flex items-center">
                          <img src={forkIcon} alt="fork" className="h-4" />:{" "}
                          {item?.forks_count}
                        </div>
                        <div className="text-white flex items-center">
                          <img src={starIcon} alt="fork" className="h-4" />:{" "}
                          {item?.stargazers_count}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 font-medium">
                        <div
                          className="text-white bg-blue-500 py-1 px-2 text-sm rounded-lg cursor-pointer"
                          onClick={() => {
                            setOpenUpdate(true);
                            setSelectedRepo(item?.name);
                          }}
                        >
                          Update
                        </div>
                        <div
                          className="text-white bg-red-500 py-1 px-2 text-sm rounded-lg cursor-pointer"
                          // onClick={() => {
                          //   setOpenDelete(true);
                          //   setSelectedRepo(item?.name);
                          // }}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="flex justify-center items-center w-full mt-5">
              <button
                disabled={currentPage === 1}
                className="p-2 px-4 border border-[#30363D]  rounded-tl-lg rounded-bl-lg cursor-pointer"
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
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                disabled={
                  currentPage === Math.ceil(repos.length / reposPerPage)
                }
                className="p-2 px-4 border border-[#30363D] rounded-tr-lg rounded-br-lg cursor-pointer"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {repos
                .filter((item) =>
                  item?.name?.toLowerCase().includes(search.toLocaleLowerCase())
                )
                .map((item) => (
                  <div
                    key={item?.id}
                    className="text-start border-2 border-[#30363D] p-3 rounded-lg block mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/repository/${item?.name}`}
                        className="text-blue-400 text-lg font-semibold"
                      >
                        {item?.name}
                      </Link>
                      {item?.visibility && (
                        <p className="p-1 px-4 text-xs border border-[#30363D] rounded-full capitalize">
                          {item?.visibility}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex gap-5 items-center">
                      {item?.language && <p>{item?.language}</p>}
                      <div className="text-white flex items-center">
                        <img src={forkIcon} alt="fork" className="h-4 mr-1" />{" "}
                        {item?.forks_count}
                      </div>
                      <div className="text-white flex items-center">
                        <img src={starIcon} alt="star" className="h-4 mr-1" />{" "}
                        {item?.stargazers_count}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 font-medium">
                      <div
                        className="text-white bg-blue-500 py-1 px-2 text-sm rounded-lg cursor-pointer"
                        onClick={() => {
                          setOpenUpdate(true);
                          setSelectedRepo(item?.name);
                        }}
                      >
                        Update
                      </div>
                      <div
                        className="text-white bg-red-500 py-1 px-2 text-sm rounded-lg cursor-pointer"
                        // onClick={() => {
                        //   setOpenDelete(true);
                        //   setSelectedRepo(item?.name);
                        // }}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {/*    <DeleteRepoModal
        open={openDelete}
       onClose={setOpenDelete}
        repo={selectedRepo}
        updateRepo={setSelectedRepo}
        refreshRepos={getUserRepos}
      /> */}
      <CreateRepoModdal
        open={openCreate}
        onClose={setOpenCreate}
        refreshRepos={getUserRepos}
      />
      <UpadateRepoModal
        open={openUpdate}
        onClose={setOpenUpdate}
        repo={selectedRepo}
        updateRepo={setSelectedRepo}
        refreshRepos={getUserRepos}
      />
    </main>
  );
};

export default Repositories;
