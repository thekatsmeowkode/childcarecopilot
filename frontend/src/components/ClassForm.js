import { useState } from 'react'
import { useClassroomContext } from '../hooks/useClassroomContext'

const ClassForm = () => {
    const {dispatch} = useClassroomContext()
    const [roomName, setRoomName] = useState('')
    const [students, setStudents] = useState([])
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const classroom = {roomName, students}

        const response = await fetch('/api/classes', {
            method: 'POST',
            body: JSON.stringify(classroom),
            headers: {'Content-Type': 'application/json'}
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setRoomName('')
            setError(null)
            console.log('new class added')
            dispatch({type:'CREATE_CLASSROOM', payload: json})
        }
    }

    return (
        <form className='create-class' onSubmit={handleSubmit}>
            <label>Classroom Name:</label>
            <input type='text' onChange={(e) => setRoomName(e.target.value)} value={roomName}/>
            <button>Add class</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ClassForm