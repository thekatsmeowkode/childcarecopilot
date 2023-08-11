import ClassForm from "../components/adminTools/ClassForm";

const DeveloperTools = () => {
  return (
    <>
      <ClassForm />
        <h3>Classroom Routes</h3>

        <h5>Get All Classrooms</h5>
        <p>
          <strong>URL:</strong> <code>GET /api/classrooms</code>
        </p>
        <p>
          <strong>Response:</strong> Returns an array of classroom objects.
        </p>

        <h5>Get Classroom by ID</h5>
        <p>
          <strong>URL:</strong> <code>GET /api/classrooms/:id</code>
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>id</code>: ID of the classroom to retrieve.
          </li>
        </ul>
        <p>
          <strong>Response:</strong> Returns a single classroom object or an
          error if not found.
        </p>

        <h5>Create Classroom</h5>
        <p>
          <strong>URL:</strong> <code>POST /api/classrooms</code>
        </p>
        <p>
          <strong>Request Body:</strong>
        </p>
        <ul>
          <li>
            <code>roomName</code>: Name of the classroom (required).
          </li>
          <li>
            <code>students</code>: Array of student objects.
          </li>
        </ul>
        <p>
          <strong>Response:</strong> Returns the created classroom object or an
          error if validation fails.
        </p>

        <h5>Update Classroom</h5>
        <p>
          <strong>URL:</strong> <code>PUT /api/classrooms/:id</code>
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>id</code>: ID of the classroom to update.
          </li>
        </ul>
        <p>
          <strong>Request Body:</strong> Updated classroom object.
        </p>
        <p>
          <strong>Response:</strong> Returns the updated classroom object or an
          error if not found or validation fails.
        </p>

        <h5>Delete Classroom</h5>
        <p>
          <strong>URL:</strong> <code>DELETE /api/classrooms/:id</code>
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>id</code>: ID of the classroom to delete.
          </li>
        </ul>
        <p>
          <strong>Response:</strong> Returns the deleted classroom object or an
          error if not found.
        </p>

        <h3>Student Routes</h3>

        <h5>Update Student</h5>
        <p>
          <strong>URL:</strong>{" "}
          <code>PUT /api/classrooms/:classId/students/:studentId</code>
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>classId</code>: ID of the classroom containing the student.
          </li>
          <li>
            <code>studentId</code>: ID of the student to update.
          </li>
        </ul>
        <p>
          <strong>Request Body:</strong> Updated student object.
        </p>
        <p>
          <strong>Response:</strong> Returns the updated classroom object or an
          error if not found or validation fails.
        </p>

        <h5>Add Student to Class</h5>
        <p>
          <strong>URL:</strong>{" "}
          <code>POST /api/classrooms/:classId/students</code>
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>classId</code>: ID of the classroom to add the student to.
          </li>
        </ul>
        <p>
          <strong>Request Body:</strong> Student object.
        </p>
        <p>
          <strong>Response:</strong> Returns the updated classroom object or an
          error if not found or validation fails.
        </p>

        <h5>Delete Student from Class</h5>
        <p>
          <strong>URL:</strong>{" "}
          <code>DELETE /api/classrooms/:classId/students/:studentId</code>
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>classId</code>: ID of the classroom containing the student.
          </li>
          <li>
            <code>studentId</code>: ID of the student to delete.
          </li>
        </ul>
        <p>
          <strong>Response:</strong> Returns the updated classroom object or an
          error if not found.
        </p>

        <h5>Get Student from Class</h5>
        <p>
          <strong>URL:</strong>{" "}
          <code>GET /api/classrooms/:classId/students/:studentId</code>
        </p>
        <p>
          <strong>Parameters:</strong>
        </p>
        <ul>
          <li>
            <code>classId</code>: ID of the classroom containing the student.
          </li>
          <li>
            <code>studentId</code>: ID of the student to retrieve.
          </li>
        </ul>
        <p>
          <strong>Response:</strong> Returns the student object or an error if
          not found.
        </p>
    </>
  );
};

export default DeveloperTools;
