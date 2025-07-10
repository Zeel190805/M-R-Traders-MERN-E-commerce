import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
// ⚠️⚠️⚠️ don't forget this ⚠️⚠️⚠️⚠️
// import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-darkBackground text-lightText min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">Users</h1>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden animate-slideInRight">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">NAME</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">EMAIL</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">ADMIN</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-primary">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map((user, index) => (
                    <tr 
                      key={user._id}
                      className="hover:bg-gray-800 transition-colors duration-200"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="px-6 py-4 text-sm text-lightText">{user._id}</td>
                      <td className="px-6 py-4 text-sm">
                        {editableUserId === user._id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) => setEditableUserName(e.target.value)}
                              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lightText focus:outline-none focus:border-primary"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="bg-primary hover:bg-primary/80 text-white p-2 rounded-lg transition-colors duration-200"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-lightText">{user.username}</span>
                            <button
                              onClick={() => toggleEdit(user._id, user.username, user.email)}
                              className="text-primary hover:text-primary/80 transition-colors duration-200"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {editableUserId === user._id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editableUserEmail}
                              onChange={(e) => setEditableUserEmail(e.target.value)}
                              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-lightText focus:outline-none focus:border-primary"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="bg-primary hover:bg-primary/80 text-white p-2 rounded-lg transition-colors duration-200"
                            >
                              <FaCheck />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <a 
                              href={`mailto:${user.email}`}
                              className="text-lightText hover:text-primary transition-colors duration-200"
                            >
                              {user.email}
                            </a>
                            <button
                              onClick={() => toggleEdit(user._id, user.username, user.email)}
                              className="text-primary hover:text-primary/80 transition-colors duration-200"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {user.isAdmin ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {!user.isAdmin && (
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
