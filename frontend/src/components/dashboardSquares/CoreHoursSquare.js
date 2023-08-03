import {Table} from 'react-bootstrap'

const CoreHoursSquare = ({coreData}) => {
    const {staffCoreHours: {crawlers, infants, schoolTotal, title, toddlers, twos}} = coreData

    return (
        <>
       <Table>
              <thead>
                <th>{title}</th>
                <th>☕</th>
                <th>🍼</th>
              </thead>
              <tr>
                <td>{infants.message}</td>
                <td>{infants.numTeachers}</td>
                <td>{infants.numStudents}</td>
              </tr>
              <tr>
                <td>{crawlers.message}</td>
                <td>{crawlers.numTeachers}</td>
                <td>{crawlers.numStudents}</td>
              </tr>
              <tr>
                <td>{toddlers.message}</td>
                <td>{toddlers.numTeachers}</td>
                <td>{toddlers.numStudents}</td>
              </tr>
              <tr>
                <td>{twos.message}</td>
                <td>{twos.numTeachers}</td>
                <td>{twos.numStudents}</td>
              </tr>
              <tr>
                <td>{schoolTotal.message}</td>
                <td colSpan={2}>{schoolTotal.numTeachers}</td>
              </tr>
            </Table>
        </>
    )
}

export default CoreHoursSquare