import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var studentTbody = document.getElementById('student');
var btnfilterByCreditRank = document.getElementById("button-filterByCreditRank");
var inputSearchBoxLR = document.getElementById("search-boxLR");
var inputSearchBoxHR = document.getElementById("search-boxHR");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditRank.onclick = function () { return applyFilterByCreditRank(); };
renderCoursesInTable(dataCourses);
renderStudentInfoInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInfoInTable(students) {
    console.log('Desplegando info estudiante');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.nombre + "</td>\n                           <td>" + student.codigo + "</td>\n                           <td>" + student.cedula + "</td>\n                           <td>" + student.edad + "</td>\n                           <td>" + student.direccion + "</td>\n                           <td>" + student.telefono + "</td>";
        studentTbody.appendChild(trElement);
    });
    ;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function searchCoursesByCredits(lowRank, highRank, courses) {
    return (lowRank === 0 && highRank === 0) ? dataCourses : courses.filter(function (c) {
        return ((c.credits >= (lowRank)) && (c.credits <= (highRank)));
    });
}
function applyFilterByCreditRank() {
    var lowRank = inputSearchBoxLR.valueAsNumber;
    var highRank = inputSearchBoxHR.valueAsNumber;
    lowRank = (lowRank == null) ? 0 : lowRank;
    highRank = (highRank == null) ? 0 : highRank;
    clearCoursesInTable();
    var coursesFiltered = searchCoursesByCredits(lowRank, highRank, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
