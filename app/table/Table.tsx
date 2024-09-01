"use client";
import React, { useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser, addUser } from "@/store/dataTableSlice";
import { User } from "@type"; // Import the User type

const Table = (): JSX.Element => {
  const [selectedUser, setSelectedUser] = useState<Partial<User>>({});

  const users = useSelector(
    ({ dataTable }: { dataTable: User[] }) => dataTable
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser.id) setSelectedUser({});
  }, [users]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser.id) {
      dispatch(updateUser(selectedUser as User));
    } else {
      const newUser = { ...selectedUser, id: users.length + 1 } as User;
      dispatch(addUser(newUser));
    }
    setSelectedUser({});
  };

  const handleEdit = (user: User) => setSelectedUser(user);

  const handleDelete = (id: number) => {
    if (window.confirm(`Are you sure you want to delete Sr.${id}?`)) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      <div className="flex justify-between items-center pt-4">
        <h1 className="text-2xl font-semibold text-cyan-600">Users List</h1>
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="First Name"
            value={selectedUser.firstName || ""}
            required
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, firstName: e.target.value })
            }
            className="border outline-cyan-400 border-cyan-300 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            value={selectedUser.lastName || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, lastName: e.target.value })
            }
            className="border outline-cyan-400 border-cyan-300 p-2 rounded-md"
          />
          <input
            className="border outline-cyan-400 border-cyan-300 p-2 rounded-md capitalize"
            type="number"
            placeholder="Age"
            min={1}
            value={selectedUser.age || ""}
            required
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, age: Number(e.target.value) })
            }
          />
          <button
            type="submit"
            className="w-32 p-2 rounded-md bg-cyan-400 text-white "
          >
            {selectedUser.id ? "Update" : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setSelectedUser({})}
            className="w-32 p-2 rounded-md bg-red-500 text-white "
          >
            Clear
          </button>
        </form>
      </div>
      <table className="table-auto w-full mt-4 border text-center capitalize">
        <thead className="bg-cyan-400 text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              SR
            </th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td className="flex gap-2 justify-center p-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="p-2 rounded-full text-cyan-300 bg-gray-50 hover:bg-gray-100"
                >
                  <FaPen />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-2 rounded-full text-red-500 bg-gray-50 hover:bg-gray-100"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
