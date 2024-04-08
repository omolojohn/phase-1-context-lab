// Function to create an employee record
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays
function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

// Function to create a time in event for an employee
function createTimeInEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Function to create a time out event for an employee
function createTimeOutEvent(employee, dateTime) {
    const [date, hour] = dateTime.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Function to calculate hours worked on a specific date for an employee
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

// Function to calculate wages earned on a specific date for an employee
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate all wages earned by an employee for all dates
function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    return dates.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
}

// Function to find an employee by their first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate payroll for all employees
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
