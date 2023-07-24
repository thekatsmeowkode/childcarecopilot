import { useClassroomContext } from "../hooks/useClassroomContext"

const ClassroomDetails = ({classroom}) => {
    const {dispatch} = useClassroomContext()

    const handleDeleteClick = async() => {
        const response = await fetch('/api/classes/' + classroom._id, {
            method: 'DELETE'
        })
        //document that was just deleted
        const json = await response.json()

        if (response.ok) {
            dispatch({type:'DELETE_CLASSROOM', payload:json})
        }
    }

    return (
        <div className="classroom-details">
            <h4>{classroom.roomName}</h4>
            {classroom.students.map((student) => (<p>{student && student.name}</p>))}
            <span onClick= {handleDeleteClick} className='material-symbols-outlined'>delete</span>
        </div>
    )
}

export default ClassroomDetails