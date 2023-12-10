import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/HoverBlur.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, updateUserDetails } from "../../redux/slicers/USER/useServices";
import md5 from "md5";

export default function Profile() {
  const [userInfo, setUserInfo] = useState();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  useEffect(() => {
    if (user) {
      setUserInfo({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        user_name: user.user_name || "",
        user_image: user.user_image || "",
        role: user.role,
      });
    }
  }, [user]);

  const handleFieldChange = (fieldName, value) => {
    
    setUserInfo({ ...userInfo, [fieldName]: value });
    console.log(userInfo.password);
  };
  const handlePasswordChange = (value) => {
  const password = md5(value);
  // console.log(password)
  // console.log(user.password)
      if(password === user.password)
     { return;}else {
        alert('Wrong password');
     }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFields = { ...userInfo, Id: user._id }; 
    console.log(userInfo.Id);
    dispatch(updateUserDetails(updatedFields));
    notify();
  };

  const notify = () => {
    toast.success("User Updated Successfully!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserInfo({
          ...userInfo,
          user_image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = (event) => {
    event.preventDefault();
    // Trigger the hidden file input when the div is clicked
    fileInputRef.current.click();
  };
  const fileInputRef = React.createRef();

  if (!userInfo) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="">
      <div className=" max-w-4xl mx-auto  p-4 bg-white shadow-md rounded-lg">
        <div className="flex justify-center text-xl text-cyan-500 font-bold ">
          <h2>My Profile</h2>
        </div>
        <div className="flex flex-col justify-center p-10 pb-5 mb-5 border rounded-xl">
          <div className="flex  flex-row justify-around ">
            <div className="flex py-2 justify-center">
              <div className="profile w-48 h-48 flex justify-center">
                <label
                  htmlFor="fileInput"
                  className=" flex second-col profile-img w-48 h-48 bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${userInfo.user_image})`,
                    cursor: "pointer",
                  }}
                  onClick={handleDivClick}
                ></label>
                <RiEdit2Fill
                  className="icon text-white w-5 h-5 cursor-pointer  "
                  onClick={handleDivClick}
                />
                {/* Hidden file input */}
                <input
                  type="file"
                  name="user_image"
                  id="user_image"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="first-row  flex justify-center">
              <table className="editUser">
                <tbody>
                  <tr>
                    <td>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="userName"
                      >
                        User Name
                      </label>
                    </td>
                    <td>
                      <input
                        className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        type="text"
                        name="UserName"
                        id="UserName"
                        onChange={(e) =>
                          handleFieldChange("user_name", e.target.value)
                        }
                        required
                        placeholder={userInfo.user_name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                    </td>
                    <td>
                      <input
                        className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={(e) =>
                          handleFieldChange("first_name", e.target.value)
                        }
                        required
                        placeholder={userInfo.first_name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                    </td>
                    <td>
                      <input
                        className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        type="text"
                        name="lastName"
                        id="lastName"
                        onChange={(e) =>
                          handleFieldChange("last_name", e.target.value)
                        }
                        required
                        placeholder={userInfo.last_name}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                    </td>
                    <td>
                      <input
                        className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                        required
                        placeholder={userInfo.email}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                       New Password
                      </label>
                    </td>
                    <td>
                      <input
                        className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) =>
                          handleFieldChange("password", e.target.value)
                        }
                        required
                        placeholder={"Enter Your New Password"}
                        onFocus={() => setShowOldPassword(true)}
                        
                      />
                    </td>
                  
                  {/* {showOldPassword && (
                    <td>
                      <input
                        className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        onChange={(e) =>
                            handlePasswordChange(e.target.value)
                        }
                        required
                        placeholder={"Enter Your Old Password"}
                        onFocus={() => setShowOldPassword(true)}
                        // onBlur={() => setShowOldPassword(false)}
                        
                      />
                    </td>
                  )} */}
                  </tr>

                  <tr>
                    <td>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="firstName"
                      >
                        Role
                      </label>
                    </td>
                    <td>
                      <select
                        className="w-full px-3 py-2 placeholder-gray-300 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        name="roles"
                        id="role"
                        value={userInfo.role}
                        onChange={(e) =>
                          handleFieldChange("role", e.target.value)
                        }
                      >
                        {userInfo.role && (
                          <option key={userInfo.role} value={userInfo.role}>
                            {userInfo.role}
                          </option>
                        )}
                        {userInfo.role !== "Admin" && (
                          <option value="Admin">Admin</option>
                        )}
                        {userInfo.role !== "Manager" && (
                          <option value="Manager">Manager</option>
                        )}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-cyan-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring focus:ring-blue-300"
            type="submit"
            onClick={handleSubmit}
          >
            Update Profile
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
