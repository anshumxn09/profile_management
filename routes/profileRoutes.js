const profileController = require('../controllers/profileController');
const router = require('express').Router();

router.route('/profiles')
    .post(profileController.createMyProfile)
    .get(profileController.readMyProfile)

router.route('/profiles/:id')
    .patch(profileController.updateMyProfile)
    .delete(profileController.deleteMyProfile)

router.route('/profiles/search').get(profileController.getSearchProfile);

module.exports = router;