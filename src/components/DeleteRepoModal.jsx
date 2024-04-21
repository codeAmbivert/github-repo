import closeIcon from "../assets/images/close-svgrepo-com.svg";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const DeleteRepoModal = ({ open, onClose, repo, updateRepo, refreshRepos }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const location = useLocation();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log(location);

  const DeleteRepo = async () => {
    setLoading(true);
    try {
      await axios.delete(`https://api.github.com/repos/codeAmbivert/${repo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Repo deleted successfully");
      setTimeout(() => {
        refreshRepos();
        onClose(false);
        setLoading(false);
        if (location.pathname.includes("/repository")) history("/");
      }, 500);
    } catch (error) {
      setLoading(false);
      toast.error(error?.message);
    }
  };
  if (!open) return;
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
      <div className="p-3 max-w-3xl w-full bg-white rounded-lg m-5">
        <ToastContainer />
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
          Are you sure you want to delete {repo} repository?
        </p>

        <div className="flex justify-center items-center gap-3">
          <button
            className={`text-white bg-blue-500 py-2 px-4 rounded-lg ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            disabled={loading}
            onClick={() => DeleteRepo()}
          >
            Yes
            {loading && (
              <div className="absolute w-full h-full top-0 left-0 bg-white bg-opacity-45" />
            )}
          </button>
          <button
            className="text-white bg-red-500 py-2 px-4 rounded-lg"
            onClick={() => {
              onClose(false);
              updateRepo("");
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteRepoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  repo: PropTypes.string.isRequired,
  updateRepo: PropTypes.func.isRequired,
  refreshRepos: PropTypes.func.isRequired,
};

export default DeleteRepoModal;
