import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  createNewStudent,
  deleteStudent,
  getAllStudent,
  updateStudent,
} from "./api/student";
import Table from "./components/Table";

const schema = yup
  .object()
  .shape({
    first_name: yup
      .string()
      .required()
      .matches(
        /^[^\d\s!@#$%^&*()]+$/,
        "First name must not contain numbers or special characters"
      ),
    last_name: yup
      .string()
      .required()
      .matches(
        /^[^\d\s!@#$%^&*()]+$/,
        "Last name must not contain numbers or special characters"
      ),
    email: yup.string().email().required(),
  })
  .required();

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formMode, setFormMode] = useState("create");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllStudent();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // handleCreateNewStudent
  const handleCreateStudent = async (newStudent) => {
    await createNewStudent(newStudent);
  };

  const handleUpdateStudent = async (studentId, updatedStudent) => {
    await updateStudent(studentId, updatedStudent);
  };

  //FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    if (formMode === "update") {
      await handleUpdateStudent(selectedStudent.id, data);
      fetchData();
      reset();
      setFormMode("create");
    } else {
      await handleCreateStudent(data);
      fetchData();
      reset();
    }
  };

  const handleUpdate = (row) => {
    console.log(row);
    setSelectedStudent(row.original);
    reset(row.original);
    setFormMode("update");
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchData();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "FIRST NAME",
        accessor: "first_name",
      },
      {
        Header: "LAST NAME",
        accessor: "last_name",
      },
      {
        Header: "EMAIL",
        accessor: "email",
      },
      {
        Header: "FUNCTION",
        Cell: ({ row }) => (
          <div>
            <button
              class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handleUpdate(row)}
            >
              UPDATE
            </button>
            <button
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => handleDelete(row.original.id)}
            >
              DELETE
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <form class="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
              <input
                {...register("first_name")}
                onBlur={() => trigger("first_name")}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_first_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
              {errors.first_name && <span>{errors.first_name.message}</span>}
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <input
                {...register("last_name")}
                onBlur={() => trigger("last_name")}
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />

              <label
                for="floating_last_name"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
              {errors.last_name && <span>{errors.last_name.message}</span>}
            </div>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="email"
              {...register("email")}
              onBlur={() => trigger("email")}
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {formMode === "create" ? "Submit" : "Update"}
          </button>
        </form>

        <div className="mt-4">
          <Table columns={columns} data={students} />
        </div>
      </main>
    </div>
  );
}

export default App;
