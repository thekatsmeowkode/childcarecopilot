import { useEffect, useState } from 'react'
//components
import ClassroomDetails from '../components/ClassroomDetails'

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
                    <ClassroomDetails key={classroom._id} classroom={classroom}/>
                ))}
            </div>
        </div>
    )
}

export default Home