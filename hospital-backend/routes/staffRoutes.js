const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.post('/', staffController.createStaff);
router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.put('/:id', staffController.updateStaff);     // 👈 new
router.delete('/:id', staffController.deleteStaff);  // 👈 new

module.exports = router;
