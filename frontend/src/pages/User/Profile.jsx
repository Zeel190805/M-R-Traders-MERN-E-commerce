import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="flex justify-center md:flex md:space-x-4">
          <div className="w-full md:w-1/3 p-6 bg-gray-900 rounded-lg shadow-xl animate-slideInLeft">
            <h2 className="text-3xl font-bold text-primary mb-6 text-center">Update Profile</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-lightText text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lightText text-sm font-bold mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-lightText text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <label className="block text-lightText text-sm font-bold mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-lightText border-gray-600 focus:ring-2 focus:ring-primary"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-primary text-white py-2 px-4 rounded-full shadow-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Update
                </button>

                <Link
                  to="/user-orders"
                  className="bg-secondary text-white py-2 px-4 rounded-full shadow-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                >
                  My Orders
                </Link>
              </div>
              {loadingUpdateProfile && <Loader />}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
