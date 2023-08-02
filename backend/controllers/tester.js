

const getNumStudentsByClass = async (classrooms) => {
  let countPerRoom = { infants: 0, crawlers: 0, toddlers: 0, twos: 0 };

    classrooms.forEach((classroom) => {
      const roomName = classroom.roomName
      console.log(roomName)
      countPerRoom[roomName] += classroom.students.reduce(
        (acc, student) => {
          return acc + 1;
        },
        0
      );
    });

    return countPerRoom;
};

console.log(getNumStudentsByClass(classrooms))