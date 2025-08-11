const helpmodel = require('../model/helpmodel')
const notificationmodel = require('../model/notificationmodel')
const sendNotification = require('../utility/sendNotification')
const helpregister = async (req, res) => {
    try {
        const { subject, message } = req.body
        const user = req.user?.id
        if (!subject || !message) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        if (!user) {

            return res.status(401).json({ error: 'Unauthorized' })
        }

        const help = await helpmodel.create({
            user,
            subject,
            message
        })
        res.status(201).json({ message: 'Help request created successfully', help })
        console.log(help);

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' })


    }
}

const getallhelprequest = async (req, res) => {
    try {
        const helpRequests = await helpmodel.find().populate('user')
        res.status(200).json({ message: 'All help requests fetched successfully', helpRequests })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const giveresponse = async (req, res) => {
    const { id } = req.params
    const { response } = req.body
    console.log(id);
    console.log(response);
    try {
        if (!id || !response) {

            return res.status(400).json({ error: 'All fields are required' })
        }
        const help = await helpmodel.findById(id).populate('user')
        if (!help) {
            return res.status(404).json({ error: 'Help request not found' })
        }
        console.log(help);

        help.response = response
        help.isresolved = true;
        help.status = 'resolved'
        await help.save()

        if (help.user?.isActive && help.user?.fcmToken && help.user?.notificationPreferences?.method?.push) {
            await notificationmodel.create({
                user: help.user._id,
                title: "✅ Help Request Resolved",
                body: `Your help request "${help.subject}" has been resolved.`,
                type: "helpResolved",
                isRead: false,
                isPushEligible: true,
                createdAt: new Date(),
            })
            await sendNotification(
                help.user.fcmToken,
                "✅ Help Request Resolved",
                `Your help request "${help.subject}" has been resolved.`
            )



        }

        return res.status(200).json({ message: 'Help request resolved successfully', help })


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' })
    }
}


const deleterequest = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(400).json({ error: 'ID is required' })
        }
        const help = await helpmodel.findByIdAndDelete(id)
        if (!help) {
            return res.status(404).json({ error: 'Help request not found' })
        }

        return res.status(200).json({ message: 'Help request deleted successfully' })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' })
    }
}
module.exports = { helpregister, getallhelprequest, giveresponse, deleterequest }

