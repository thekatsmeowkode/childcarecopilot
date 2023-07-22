import { useEffect, useState } from 'react'

const Home = () => {
    const [classrooms, setClassrooms] = useState(null)

    useEffect(() => {
        const fetchClass = async () => {
            //in production this needs to be changed to correct endpoint
            const response = await fetch('/api/classes')
            const json = await response.json()

            if (response.ok) {
                setClassrooms(json)
            }
        }

        fetchClass()
    }, [])

    return (
        <div className="home">
            <div className='classrooms'>
                {classrooms && classrooms.map((classroom) => (
                    <p key={classroom._id}>{classroom.roomName}</p>
                ))}
            </div>
        </div>
    )
}

export default Home