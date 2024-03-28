const Job = require('../Models/Jobs')
const CustomAPIError = require('../errors/CustomAPIError')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
        'createdAt'
    )
    res.status(200).json({ jobs, meta: { count: jobs.length, page: 1 } })
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const newJob = await Job.create(req.body)
    res.status(201).json(newJob)
}
const updateJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
        body: { company, position },
    } = req

    if (company === '' || position === '') {
        throw new CustomAPIError('Company or Position can not be empty', 400)
    }
    const job = await Job.findOneAndUpdate(
        { _id: jobId, createdBy: userId },
        { company, position },
        { new: true, runValidators: true }
    )

    if (!job) {
        throw new CustomAPIError(
            `Job with id '${jobId}' is not found or doesn't exit`,
            404
        )
    }
    res.status(200).json({ job })
}
const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req

    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId })
    if (!job) {
        throw new CustomAPIError(
            `Job with id '${jobId}' is not found or doesn't exit`,
            404
        )
    }
    res.status(200).json({ success: true, msg: 'job deleted' })
}
const getJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req
    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new CustomAPIError(
            `Job with id '${jobId}' is not found or doesn't exit`,
            404
        )
    }
    res.status(200).json({ job })
}

module.exports = { getAllJobs, createJob, deleteJob, updateJob, getJob }
