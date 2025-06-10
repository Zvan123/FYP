const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.post('/', departmentController.createDepartment);
router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);        // GET /api/patients/:id
router.put('/:id', departmentController.updateDepartment);         // PUT /api/patients/:id
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
