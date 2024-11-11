const Employee = require('../models/employeeModel');

/// Create Employee
const createEmployee = async (req, res) => {
  const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
  const f_Image = req.file ? `uploads/${req.file.filename}` : null; // File path if image is uploaded

  if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingEmployee = await Employee.findOne({ f_Email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }

    const newEmployee = new Employee({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course: f_Course.split(','),  
      f_Image,
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ message: 'Error creating employee' });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

// Get a Single Employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const f_Image = req.file ? `uploads/${req.file.filename}` : updates.f_Image;

  try {
    const employee = await Employee.findByIdAndUpdate(id, { ...updates, f_Image }, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).json({ message: 'Error updating employee' });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
