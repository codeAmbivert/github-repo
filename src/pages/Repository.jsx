import axios from "axios";
import { useEffect, useState } from "react";
import githubLogo from "../assets/images/githubLogo.svg";
import { Link, useParams } from "react-router-dom";
import forkIcon from "../assets/images/code-fork-svgrepo-com.svg";
import starIcon from "../assets/images/star-svgrepo-com.svg";
// import DeleteRepoModal from "../components/DeleteRepoModal";
import UpadateRepoModal from "../components/UpdateRepoModal";
import { toast } from "react-toastify";

const Repository = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const { id } = useParams();
  const [repo, setRepo] = useState({});
  const [openUpdate, setOpenUpdate] = useState(false);
  // const [openDelete, setOpenDelete] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");
  console.log(repo);

  const getRepo = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/codeAmbivert/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRepo(response?.data);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getRepo();
  }, []);
  return (
    <div className="min-h-[100vh] w-full bg-[#010409]">
      <div className="flex justify-between">
        <Link to="/" className="text:lg sm:text-xl text-blue-400">
          &lt;ALT/SOE/023/2353.&gt;
        </Link>
      </div>
      <div className="min-h-[100vh] max-w-6xl mx-auto pt-20 w-full">
        <div className="w-full flex gap-5 mt-10">
          <div className="hidden sm:block w-1/4">
            <div className="w-full h-auto rounded-full border-2 border-[#31343A] overflow-hidden">
              <img
                src={repo?.owner?.avatar_url || githubLogo}
                alt="user"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="w-full border-2 border-[#30363D] rounded-xl p-5 text-white">
            <div className="flex justify-between items-center flex-wrap gap-5">
              <div className="text-start flex gap-5">
                <div className="h-16 w-16 block sm:hidden rounded-full border-2 border-[#31343A] overflow-hidden">
                  <img
                    src={repo?.owner?.avatar_url || githubLogo}
                    alt="user"
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  <h1 className="font-semibold text-3xl">Titilope Chisom</h1>
                  <p className="text-lg font-medium text-[#31343A]">
                    {repo?.owner?.login}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-start mt-5 flex flex-col gap-2 text-[#656E76]">
              <Link to={`/repositories`} className="text-blue-400 font-medium">
                Goto Repositories
              </Link>
              <p>
                <span className="font-medium">Email:</span>{" "}
                titilopechisom20@gmail.com
              </p>

              <Link to={repo?.html_url}>
                <span className="font-medium">Repo Github link:</span>{" "}
                {repo?.html_url}
              </Link>
            </div>
          </div>
        </div>
        <div className="text-start border-2 border-[#30363D] p-3 rounded-lg block mb-4 mt-5 text-white">
          <div className="flex justify-between items-center">
            <Link
              to={repo?.html_url}
              className="text-blue-400 text-lg font-semibold"
            >
              {repo?.name}
            </Link>
            {repo?.visibility && (
              <p className="p-1 px-4 text-xs border border-[#30363D] rounded-full capitalize">
                {repo?.visibility}
              </p>
            )}
          </div>
          <p>Date created: {new Date(repo?.created_at).toLocaleDateString()}</p>
          <p>Date updated: {new Date(repo?.updated_at).toLocaleDateString()}</p>
          <p>Date pushed: {new Date(repo?.pushed_at).toLocaleDateString()}</p>
          <div className="mt-2 flex gap-5 items-center">
            {repo?.language && <p>{repo?.language}</p>}
            <div className="text-white flex items-center">
              <img src={forkIcon} alt="fork" className="h-4 mr-1" />{" "}
              {repo?.forks_count}
            </div>
            <div className="text-white flex items-center">
              <img src={starIcon} alt="star" className="h-4 mr-1" />{" "}
              {repo?.stargazers_count}
            </div>
          </div>
          <div className="flex gap-2 mt-4 font-medium">
            <div
              className="text-white bg-blue-500 py-1 px-2 text-sm rounded-lg cursor-pointer"
              onClick={() => {
                setOpenUpdate(true);
                setSelectedRepo(repo?.name);
              }}
            >
              Update
            </div>
            <div
              className="text-white bg-red-500 py-1 px-2 text-sm rounded-lg cursor-pointer"
              // onClick={() => {
              //   setOpenDelete(true);
              //   setSelectedRepo(repo?.name);
              // }}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
      {/*      <DeleteRepoModal
       open={openDelete}
        onClose={setOpenDelete}
        repo={selectedRepo}
        updateRepo={setSelectedRepo}
       refreshRepos={getRepo}
     /> */}
      <UpadateRepoModal
        open={openUpdate}
        onClose={setOpenUpdate}
        repo={selectedRepo}
        updateRepo={setSelectedRepo}
        refreshRepos={getRepo}
      />
    </div>
  );
};

export default Repository;
