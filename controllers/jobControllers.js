const getAllJobs = (req, res) => {
    res.send('Get All Jobs')
}
const createJob = (req, res) => {
    res.send('create a  job')
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
