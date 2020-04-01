import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { Student } from './student.js';

import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByCreditRank: HTMLElement = document.getElementById("button-filterByCreditRank")!;
const inputSearchBoxLR: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxLR")!;
const inputSearchBoxHR: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxHR")!;


btnfilterByName.onclick = () => applyFilterByName();

btnfilterByCreditRank.onclick = () => applyFilterByCreditRank();

renderCoursesInTable(dataCourses);

renderStudentInfoInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInfoInTable(students: Student[]): void {
  console.log('Desplegando info estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.nombre}</td>
                           <td>${student.codigo}</td>
                           <td>${student.cedula}</td>
                           <td>${student.edad}</td>
                           <td>${student.direccion}</td>
                           <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement);
  });
}
 
function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

function searchCoursesByCredits(lowRank: number, highRank: number, courses: Course[]) {
  return (lowRank === 0 && highRank === 0) ? dataCourses : courses.filter( c => 
    ((c.credits>=(lowRank)) && (c.credits<=(highRank))));
}

function applyFilterByCreditRank(){
  let lowRank  = inputSearchBoxLR.valueAsNumber;
  let highRank = inputSearchBoxHR.valueAsNumber;
  lowRank = (lowRank == null) ? 0 : lowRank;
  highRank = (highRank == null) ? 0 : highRank;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCoursesByCredits(lowRank, highRank, dataCourses);
  renderCoursesInTable(coursesFiltered);
}