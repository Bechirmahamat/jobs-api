const Job = require('../Models/Jobs')
const CustomAPIError = require('../errors/CustomAPIError')

const getAllJobs = (req, res) => {
    res.send('Get All Jobs')
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const newJob = await Job.create(req.body)
    res.status(201).json(newJob)
}
const updateJob = (req, res) => {
    res.send('update a  job')
}
const deleteJob = (req, res) => {
    res.send('deleteJob a  job')
}
const getJob = (req, res) => {
    res.send('getJob a  job')
}

module.exports = { getAllJobs, createJob, deleteJob, updateJob, getJob }
