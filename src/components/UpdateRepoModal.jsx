import closeIcon from "../assets/images/close-svgrepo-com.svg";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import PropTypes from "prop-types";

const UpdateRepoModal = ({ open, onClose, repo, updateRepo, refreshRepos }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateRepo = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `https://api.github.com/repos/codeAmbivert/${repo}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Repo updated successfully");
      setTimeout(() => {
        refreshRepos();
        onClose(false);
        setLoading(false);
        setNewName("");
      }, 500);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };
  if (!open) return;
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
      <ToastContainer />
      <div className="p-3 max-w-3xl w-full bg-white rounded-lg m-5">
        <img
          src={closeIcon}
          alt="close"
          className="ml-auto h-6 w-6 cursor-pointer"
          onClick={() => {
            onClose(false);
            updateRepo("");
          }}
        />

        <p className="text-center text-black mb-5 text-lg font-medium">
          Input the new name for {repo} repo?
        </p>
        <div className="max-w-2xl min-w-72 bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center mx-auto">
          <input
            type="text"
            name="name"
            value={newName}
            placeholder="Input repository name"
            className="focus:outline-none px-4 w-full rounded-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white"
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <button
          className={`relative overflow-hidden bg-[#0D1117] mt-5 h-full rounded-md p-1 w-40 text-white text-center border font-medium text-lg border-[#30363D] ${
            loading || newName.length === 0
              ? "cursor-not-allowed"
              : "cursor-pointer"
          } `}
          disabled={loading || newName.length === 0}
          onClick={handleUpdateRepo}
        >
          Update Repo
          {(loading || newName.length === 0) && (
            <div className="absolute w-full h-full top-0 left-0 bg-white bg-opacity-45" />
          )}
        </button>
      </div>
    </div>
  );
};

UpdateRepoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  repo: PropTypes.string.isRequired,
  updateRepo: PropTypes.func.isRequired,
  refreshRepos: PropTypes.func.isRequired,
};

export default UpdateRepoModal;
