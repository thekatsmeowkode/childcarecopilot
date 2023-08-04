const WaitlistDetails = ({student}) => {
    <>
      <tr>
        <td>{student.name}</td>
        <td>
          <ul>
            <li>{formatDate(student.birthdate)}</li>
            <li>{formatAge(student.birthdate)}</li>
          </ul>
        </td>
        <td>
          <ol>
            {student.programs.map((program) => (
              <li>{formatProgramName(program)}</li>
            ))}
          </ol>
        </td>
        <td>{student.allergies}</td>
        <td>{student.classroomName}</td>
        <td>
          <button
            onClick={handleEditClick}
            className="material-symbols-outlined"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDeleteClick(student.id, student.classroomName)}
            className="material-symbols-outlined"
          >
            Delete
          </button>
        </td>
      </tr>

      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setSelectedStudent={setSelectedStudent}
          setSelectedStudents={setSelectedStudents}
        />
      )}
    </>
}