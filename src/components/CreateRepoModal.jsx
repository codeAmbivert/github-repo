import { useState } from "react";
import closeIcon from "../assets/images/close-svgrepo-com.svg";
import axios from "axios";
import { data } from "autoprefixer";

const CreateRepoModdal = ({ open }) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(value);

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateRepo = async () => {
    try {
      const response = await axios.post(
        `https://api.github.com/user/repos`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data);
      open().refreshRepos();
    } catch (error) {
      console.log(error?.response);
    }
  };

  console.log(formData);

  if (!open().openState) return;
  return (
    <div className="fixed top-0 left-0 h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
      <div className="p-3 max-w-3xl w-full bg-white rounded-lg m-5">
        <img
          src={closeIcon}
          alt="close"
          className="ml-auto h-6 w-6 cursor-pointer"
          onClick={() => open().setOpenState(false)}
        />

        <div className="flex flex-col justify-center items-center gap-3 mt-5">
          <div className="max-w-2xl min-w-72 bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Input repository name"
              className="focus:outline-none p-1 px-4 w-full rounded-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white"
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="max-w-2xl min-w-72 bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center">
            <input
              type="text"
              name="description"
              value={formData.description}
              placeholder="Input repository description"
              className="focus:outline-none p-1 px-4 w-full rounded-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white"
              onChange={(e) => handleInput(e)}
            />
          </div>

          <div
            className={`bg-[#0D1117] mt-5 h-full rounded-md p-1 w-40 text-white text-center border font-medium text-lg border-[#30363D] cursor-pointer`}
            onClick={handleCreateRepo}
          >
            Create Repo
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRepoModdal;
