const { userService } = require('../services/user-service')
const router = require('express').Router()
const User = require('../models/user')
const ensureAuthenticated = require('../middleware/ensure-authenticated')

// router.get('/', async (req, res) => {
//     res.send(await userService.load())
// })

router.get('/', async (req, res) => {
    const users = await User.find({})

    res.send(users)
})

router.post('/:userId/followers', async (req, res) => {
    const loggedInUserId = req.user._id // Assuming user is authenticated
    const targetUserId = req.params.userId

    try {
        await User.findByIdAndUpdate(loggedInUserId, {
            $addToSet: { following: targetUserId }
        })

        res.status(201).json({ message: 'Successfully followed the user' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to follow the user' })
    }

})

router.delete('/:userId/followers', ensureAuthenticated, async (req, res) => {
    const loggedInUserId = req.user._id
    const targetUserId = req.params.userId

    try {
        await User.findByIdAndUpdate(loggedInUserId, {
            $pull: { following: targetUserId }
        })

        res.status(200).json({ message: 'Successfully unfollowed the user' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to unfollow the user' })
    }
})

router.get('/following', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId).populate('following', 'handle name profilePicture')

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.status(200).json(user.following)
    } catch (err) {
        console.error('Error fetching following:', err)
        res.status(500).json({ message: 'Error fetching following users' })
    }
}
)

router.get('/followers', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId).populate('followers', 'handle name profilePicture')

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.followers);
    } catch (error) {
        console.error('Error fetching followers:', error);
        res.status(500).json({ message: 'Error fetching followers' });
    }
  }
)
module.exports = router;