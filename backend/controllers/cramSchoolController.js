const db = require('../models')
const Student = db.student
const Subject = db.subject
const StudentHomework = db.studentHomework
const Parent = db.Parents
const studentParent = db.studentParent

const findAllStudents = async (req, res) => {
  try {
    //Get from passport expanded req.user
    //const userID = req.user.id

    console.log("Hello")

    const student = await Student.findAll({
      attributes: ['id', 'FiristName', 'LastName'],
      // where: {
      //   userId: userID
      // },
      raw: true
    })

    //console.log(student)

    if (student) {
      //console.log("Hello")
      //console.log(student)
      res.status(200).json(student)
    } else {
      res.status(400).json({ error: error.message })
    }

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const editStudentHomework = async (req, res) => {

  console.log("Req body:", req.body);
  const studentId = req.body.studentID
  //Get from passport expanded req.user
  //const userID = req.user.id

  console.log("StudentID", studentId);

  try {
    // const student = await Student.findOne({
    //   where: {
    //     id: studentId
    //   },
    //   raw: true
    // })

    // if (student) {
    //   if (student.userId !== userID) {
    //     req.flash('error', 'Insufficient permissions!')
    //     return res.redirect('/cramSchool')
    //   }
    // } else {
    //   req.flash('error', 'Do not have this student in the class!')
    //   return res.redirect('/cramSchool')
    // }

    const subject = await Subject.findAll({
      attributes: ['id', 'subjectName'],
      raw: true
    })

    const todayHomework = await StudentHomework.findAll({
      where: {
        studentid: studentId
      },
      raw: true,
      include: [
        {
          model: Subject,
          required: true
        },
        {
          model: Student,
          required: true
        }
      ]
    })

    res.status(200).json({ subject, todayHomework });
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const addStudentHomework = async (req, res) => {
  try {
    const studentID = req.body.studentID
    const subjectID = req.body.subjectID

    const addSpecificSubject = await StudentHomework.create({
      createdAt: new Date(),
      updatedAt: new Date(),
      studentId: studentID,
      subjectId: subjectID
    })

    if (addSpecificSubject) {
      const subject = await Subject.findAll({
        attributes: ['id', 'subjectName'],
        raw: true
      })

      const todayHomework = await StudentHomework.findAll({
        where: {
          studentid: studentID
        },
        raw: true,
        include: [
          {
            model: Subject,
            required: true
          },
          {
            model: Student,
            required: true
          }
        ]
      })

      res.status(200).json({ subject, todayHomework });
    } else {
      res.status(400).json({ error: error.message })
    }
    // .then(() => {
    //   req.flash('success', 'Success to add a subject!')
    //   res.redirect(`/cramSchool/${studentID}/edit/homework`)
    // })
    // .catch((error) => {
    //   console.log(error)
    //   return res.redirect('back')
    // })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteStudent = async (req, res) => {

  try {
    const studentId = req.body.studentID
    //Get from passport expanded req.user
    //const userID = req.user.id

    const findStudent = await Student.findOne({
      where: {
        id: studentId
      }
    })

    if (findStudent) {
      await findStudent.destroy();
      res.status(200).json({ status: "success", message: "Student deleted successfully." });
    } else {
      res.status(400).json({ status: "error", error: "Student not found." });
    }

    //   .then((student) => {
    //   if (!student) {
    //     req.flash('error', 'Do not have this student in the class!')
    //     return res.redirect('/cramSchool')
    //   }

    //   if (student.userId !== userID) {
    //     req.flash('error', 'Insufficient permissions!')
    //     return res.redirect('/cramSchool')
    //   }

    //   return student.destroy()
    //     .then(() => {
    //       req.flash('success', 'Success to DELETE a student!')
    //       res.redirect('/cramSchool')
    //     })
    // })
    // .catch((error) => {
    //   error.errorMessage = 'Fail to DELETE student!'
    // })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

const deleteStudentHomework = async (req, res) => {

  try {
    const studentId = req.body.studentID
    const todayHomeworkId = req.body.studentHomeworkId

    console.log(todayHomeworkId)
    console.log(studentId)

    const findStudentHomework = await StudentHomework.findOne({
      where: {
        id: todayHomeworkId
      }
    })

    if (findStudentHomework) {
      await findStudentHomework.destroy();

      const subject = await Subject.findAll({
        attributes: ['id', 'subjectName'],
        raw: true
      })

      const todayHomework = await StudentHomework.findAll({
        where: {
          studentid: studentId
        },
        raw: true,
        include: [
          {
            model: Subject,
            required: true
          },
          {
            model: Student,
            required: true
          }
        ]
      })

      res.status(200).json({ subject, todayHomework });
    } else {
      res.status(400).json({ status: "error", error: "Student not found." });
    }

  } catch (error) {
    res.status(400).json({ error: error.message })
  }

  //   .then((studentHomework) => {
  //   console.log(studentHomework)
  //   return studentHomework.destroy()
  //     .then(() => {
  //       req.flash('success', 'Success to DELETE the subject!')
  //       res.redirect(`/cramSchool/${studentId}/edit/homework`)
  //     })
  // })
  // .catch((error) => {
  //   error.errorMessage = 'Fail to DELETE student!'
  // })
}

module.exports = {
  findAllStudents, editStudentHomework, addStudentHomework, deleteStudent, deleteStudentHomework
}