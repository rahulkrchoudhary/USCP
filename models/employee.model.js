  
const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    nameoftpa: {
        type: String,
        required: 'This field is required.'
    },
    tpanumber: {
        type: Number
    },
    tpafax:{
        type: Number
    },
    nameofhospital: {
        type: String
    },
    
    addressofhospital: {
        type: String
    },
    rohiniid: {
        type: String
    },
    email: {
        type: String
    },
    patientfirstname: {
        type :String
    },
    patientmiddlename: {
        type :String
    },
    patientlastname: {
        type :String
    },
    dateofbirth: {
        type :String
    },
    patientnumber: {
        type :Number
    },
    patientattendentnumber: {
        type :Number
    },
    insuranceid: {
        type :String
    },
    policynumber: {
        type :String
    },
    employeeid: {
        type :String
    }
    
});
employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Employee',employeeSchema)