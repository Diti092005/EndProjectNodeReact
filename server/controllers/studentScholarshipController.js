const StudentScholarship = require("../models/StudentScholarship")

const getAllStudentScholarships = async (req, res) => {
    const studentScholarships = await StudentScholarship.find().lean()
    if (!studentScholarships?.length) {
        return res.status(400).json({ message: 'No cashregistersatus found' })
    }
    res.json(studentScholarships)
}

const getStudentScholarshipById = async (req, res) => {
    const { id } = req.params
    const studentScholarships = await StudentScholarship.find().lean()
    if (!studentScholarships?.length)
        return res.status(400).send("No studentScholarships exists")
    if (!id)
        return res.status(400).send("Id is required")
    const studentScholarship = await StudentScholarship.findById(id).lean()
    if (!studentScholarship)
        return res.status(400).send("This studentScholarship isn't exists")
    res.json(studentScholarship)
}

const addStudentScholarship = async (req, res) => {
    const { sumMoney, numHours, date, student } = req.body
    if (!sumMoney || !numHours || !date || !student)
        return res.status(400).send("All fields are required!!")
    const studentScholarship = await StudentScholarship.create({ currentSum, sumPerAction, action })
    res.json(studentScholarship)
}

const updateStudentScholarship = async (req, res) => {
    const { sumMoney, numHours, date, student, id } = req.body
    const studentScholarships = await StudentScholarship.find().lean()
    if (!studentScholarships?.length)
        return res.status(400).send("No studentScholarships exists")
    if (!id)
        return res.status(400).send("Id is required")
    const studentScholarship = await StudentScholarship.findById(id).exec()
    if (!studentScholarship)
        return res.status(400).send("studentScholarship is not exist!!")
    if (sumMoney)
        studentScholarship.sumMoney = sumMoney
    if(numHours)
        studentScholarship.numHours=numHours
    if(date)
        studentScholarship.date=date
    if(date)
        studentScholarship.date=date
}
