const Student = require('../models/Student');


const handleCreateStudent = async (req, res) => {

    const { name, age, mark, gender, city } = req.body;

    if(!name || !age || !mark || !gender || !city) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameter'
        })
    }else{
        try {
            const newStudent = new Student({
                name: name,
                age: age,
                mark: mark,
                gender: gender,
                city: city
            })

            await newStudent.save();

            return res.status(200).json({
                success: true,
                message: 'Create student successfuly',
                newStudent
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error '
            })
        }
    }
}

const handleUpdateStudent = async (req, res) => {
    const { name, age, mark, gender, city } = req.body;

    if(!name || !age || !mark || !gender || !city) {
        return res.status(400).json({
            success: false,
            message: 'Missing parameter'
        })
    }else{
        try {
            let updatedStudent = {
                name: name,
                age: age,
                mark: mark,
                gender: gender,
                city: city
            }

            updatedStudent = await Student.findByIdAndUpdate(
                req.params.id,
                updatedStudent,
                { new: true }
            );

            if(updatedStudent) {
                return res.status(200).json({
                    success: true,
                    message: 'Student update successfully',
                    student: updatedStudent
                })
            }else{
                return res.status(401).json({
                    success: false,
                    message: 'Student not found',
                })
            }


        } catch (error) {
            console.log('error',error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error',
            })
        }
    }
}

const handleFetchStudent = async (req, res) => {
    try {
        const students = await Student.find();
        if(students) {
            return res.status(200).json({
                success: true,
                students
            })
        }
    } catch (error) {
        console.log('error',error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const handleDeleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id)

        if(deletedStudent) {
            return res.status(200).json({
                success: true,
                message: "Delete student successfully"
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Student is not found',
            })
        }
    } catch (error) {
        console.log('error',error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}

const handleFindStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(student) {
            return res.status(200).json({
                success: true,
                student
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Student is not found',
            })
        }
    } catch (error) {
        console.log('error',error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
        })
    }
}


module.exports = {
    handleCreateStudent,
    handleUpdateStudent,
    handleFetchStudent,
    handleDeleteStudent,
    handleFindStudent
}