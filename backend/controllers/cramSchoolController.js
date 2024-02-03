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
      include: {
        model: Subject,
        required: true
      }
    })

    console.log(todayHomework)
    // res.render('todayHomework', { student, subject, todayHomework })

    res.status(200).json(todayHomework)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  findAllStudents, editStudentHomework
}