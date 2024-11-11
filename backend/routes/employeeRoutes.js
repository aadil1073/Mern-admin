const express = require('express');
const multer = require('multer');
const { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create Employee Route
router.post('/create', upload.single('f_Image'), createEmployee);

// Get All Employees Route
router.get('/', getEmployees);

// Get Single Employee by ID Route
router.get('/:id', getEmployeeById);

// Update Employee Route
router.put('/:id', upload.single('f_Image'), updateEmployee);

// Delete Employee Route
router.delete('/:id', deleteEmployee);

module.exports = router;
