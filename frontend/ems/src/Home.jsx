import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
   Address: "",
phone: "" ,
 });

  const handleChnage = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(inputUser);
    const res = await axios.post("http://localhost:5000/createuser", inputUser);
    console.log(res);
    fetchAllUser();
  };

  // data fetching all
  const [userData, setUserData] = useState([]);
  const fetchAllUser = async () => {
    const res = await axios.get("http://localhost:5000/readalluser");
    console.log(res);
    setUserData(res.data);
  };
  useEffect(() => {
    fetchAllUser();
  }, []);

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/deleteuser/${id}`);
    if (res.status === 200) {
      fetchAllUser();
    }
  };
  return (
  
    <div className="w-2/3 mx-auto mt-5">
      {/* creating form */}
      <form class="p-8 bg-white rounded shadow-md outline outline-2 outline-black outline-offset-2"  onSubmit={handleSubmit}>
        <div className="">
          <h2 className="text-3xl font-bold text-center">Enter Employee Details</h2>
          <label className=" text-1xl  font-bold text-gray-500 ">Name</label>
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm font-bold text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChnage}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 font-bold ">Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter email "
            required
            value={inputUser.email}
            onChange={handleChnage}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 font-bold ">Address</label>
          <input
            type="text"
            name="Address"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Address "
            required
            value={inputUser.Address}
            onChange={handleChnage}
          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 font-bold ">Phone Number</label>
          <input
            type="number"
            name="phone"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Phone number "
            required
            value={inputUser.phone}
            onChange={handleChnage}
          />
        </div>
        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Add User
          </button>
         
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md mt-6">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
              Address
              </th>
              <th scope="col" className="px-6 py-3">
              Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, i) => (
           <tr key={item._id} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                   <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                <td className="px-6 py-4"> {item?.email}</td>
                <td className="px-6 py-4"> {item?.Address}</td>
                <td className="px-6 py-4"> {item?.phone}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <NavLink
                      to={`/readuser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                    >
                      Read
                    </NavLink>
                    <NavLink
                      to={`/updateuser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500  hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default Home;