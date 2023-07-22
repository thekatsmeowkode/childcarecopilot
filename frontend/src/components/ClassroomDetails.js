const ClassroomDetails = ({classroom}) => {
    return (
        <div className="classroom-details">
            <h4>{classroom.roomName}</h4>
            {classroom.students.map((student) => (<p>{student.name}</p>))}
        </div>
    )
}

export default ClassroomDetails