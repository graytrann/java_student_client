import fetcher from "./fetcher";

// GET ALL STUDENT
export const getAllStudent = async () => {
  try {
    const response = await fetcher.get("/students");
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// CREATE NEW STUDENT
export const createNewStudent = async (newStudent) => {
  try {
    const response = await fetcher.post("/students", newStudent);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateStudent = async (id, student) => {
  try {
    const response = await fetcher.put(`/students/${id}`, student);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await fetcher.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
