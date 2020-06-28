const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');


router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Preauth  form"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.nameoftpa = req.body.nameoftpa;
    employee.tpanumber = req.body.tpanumber;
    employee.tpafax = req.body.tpafax;
    employee.nameofhospital = req.body.nameofhospital;
    employee.addressofhospital = req.body.addressofhospital;
    employee.rohiniid = req.body.rohiniid;
    employee.email = req.body.email;
    employee.patientfirstname = req.body.patientfirstname;
    employee.patientmiddlename = req.body.patientmiddlename;
    employee.patientlastname = req.body.patientlastname;
    employee.dateofbirth = req.body.dateofbirth;
    employee.patientnumber = req.body.patientnumber;
    employee.patientattendentnumber = req.body.patientattendentnumber;
    employee.insuranceid = req.body.insuranceid;
    employee.policynumber = req.body.policynumber;
    employee.employeeid = req.body.employeeid;
    
    
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;