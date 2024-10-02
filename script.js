// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
const proxyUrl = "";
const date = document.querySelector(".date");
const selectElement = document.querySelector("select[name='lessons']");
const lesson = document.querySelector("textarea");
const classes = document.querySelector(".scheduleContainer");
let SCHEDULE = [];
let targetUrl = "https://www.vgtk.by/schedule/lessons/day-today.php";
let isToday = true;

const userTarification = [
  {
    groupName: "ВР-21",
    lesson: "Основы инф.безопасности",
    lecture: true,
    labs: true,
  },
  {
    groupName: "ЖБИ-11",
    lesson: "Информатика",
    lecture: false,
    labs: true,
  },
  {
    groupName: "ПКО-11",
    lesson: "Информатика",
    lecture: false,
    labs: true,
  },
  {
    groupName: "ПФЭ-16",
    lesson: "Информатика",
    lecture: false,
    labs: true,
  },
  {
    groupName: "ПСЭ-11",
    lesson: "Информатика",
    lecture: false,
    labs: true,
  },
  {
    groupName: "ПЭС-115",
    lesson: "Информатика",
    lecture: false,
    labs: true,
  },
  {
    groupName: "ПЭС-25",
    lesson: "Математика",
    lecture: true,
    labs: false,
  },
  {
    groupName: "М-11",
    lesson: "Математика",
    lecture: true,
    labs: false,
  },
  {
    groupName: "ВС-31",
    lesson: "ТР ПО",
    lecture: false,
    labs: true,
  },
  {
    groupName: "ЭМ-32",
    lesson: "ПЦУ",
    lecture: false,
    labs: true,
  },
  {
    groupName: "ЭМ-42",
    lesson: "ПЦУ",
    lecture: false,
    labs: true,
  },
  // {
  //   groupName: "ВС-41",
  //   lesson: "Основы веб-програм.",
  //   lecture: false,
  //   labs: true,
  // },
  // {
  //   groupName: "ВС-21",
  //   lesson: "ИТ",
  //   lecture: false,
  //   labs: true,
  // },
];

const lessonsTime = {
  1: "09.00 - 09.45",
  2: "09.55 - 10.40",
  3: "10.50 - 11.35",
  4: "11.45 - 12.30",
  5: "12.40 - 13.25",
  6: "13.35 - 14.20",
  7: "14.30 - 15.15",
  8: "15.25 - 16.10",
  9: "16.20 - 17.05",
  10: "17.15 - 18.00",
  11: "18.10 - 18.55",
};

const allGroups = [
  "А-11",
  "А-21",
  "А-31",
  "А-41",
  "Д-11",
  "Д-31",
  "ЖБИ-11",
  "ЖБИ-21",
  "С-11",
  "С-21",
  "С-31",
  "С-41",
  "С-42",
  "ТС-11",

  "Б-31",
  "ВР-11",
  "ВР-21",
  "ВС-21",
  "ВС-31",
  "ВС-41",
  "ИТ-11",
  "ИТ-21",
  "М-11",
  "М-21",
  "Э-11",
  "Э-21",
  "Э-32",
  "Э-42",
  "ТЭ-11",

  "АС-22",
  "АС-32",
  "АС-42",
  "ОС-11",
  "ОС-21",
  "ОС-32",
  "ОС-42",
  "ЭМ-11",
  "ЭМ-21",
  "ЭМ-32",
  "ЭМ-42",

  "ПКО-11",
  "ПКО-21",
  "ПКО-31",
  "ПКЭ-39",
  "ПСМ-13",
  "ПСМ-23",
  "ПСМ-33",
  "ПСМ-33",
  "ПФЭ-16",
  "ПФЭ-26",
  "ПФЭ-36",

  "ПОО-14",
  "ПОО-24",
  "ПОО-34",
  "ПТЭ-111",
  "ПМЭ-18",
  "ПМЭ-28",
  "ПМЭ-38",

  "ПТС-17",
  "ПТС-27",
  "ПТС-217",
  "ПТС-37",
  "ПТС-317",
  "ПФС-32",
  "ПСЭ-11",

  "ПЭС-15",
  "ПЭС-115",
  "ПЭС-25",
  "ПЭС-35",
  "ПЭС-315",
  "ПКМ-12",
  "ПКМ-22",
  "ПМР-19",
  "ПМР-119",
  "ПМР-29",
];
allGroups.forEach((group) => {
  selectElement.appendChild(new Option(group, group));
});

function getGroups() {
  userTarification.push({
    groupName: selectElement.value,
    lesson: lesson.value,
  });
  filterschedule();
}

function filterschedule() {
  const newSchedule = [];
  classes.innerHTML = "";

  userTarification.forEach((item) => {
    const { groupName, lesson, labs, lecture } = item;

    const scheduleItem = SCHEDULE.find(
      (schedule) =>
        schedule.groupName === groupName &&
        schedule.lessons.some(
          (l) =>
            l.lessonName === lesson &&
            ((labs && l.isLab) || (!l.isLab && lecture))
        )
    );

    if (scheduleItem) {
      newSchedule.push(
        ...scheduleItem.lessons.filter((l) => l.lessonName === lesson)
      );
    }
  });

  const scheduleContainer = document.createElement("div");

  newSchedule.sort(
    (a, b) => parseFloat(a.lessonNumber) - parseFloat(b.lessonNumber)
  );

  let prevLessonNumber = 0;

  newSchedule.forEach((lesson) => {
    console.log(lesson.lessonNumber);

    if (lesson.lessonNumber !== prevLessonNumber + 1) {
      const scheduleItem = document.createElement("div");
      const subjectElement = document.createElement("div");
      const lessonNumberElement = document.createElement("div");
      const timeElement = document.createElement("div");

      scheduleItem.classList.add("schedule");
      lessonNumberElement.classList.add("lesson");
      timeElement.classList.add("time");
      subjectElement.classList.add("subject");

      lessonNumberElement.textContent = prevLessonNumber + 1;
      timeElement.textContent = lessonsTime[prevLessonNumber + 1];
      subjectElement.textContent = "ОБЕД";

      scheduleItem.appendChild(lessonNumberElement);
      scheduleItem.appendChild(timeElement);
      scheduleItem.appendChild(subjectElement);
      scheduleContainer.appendChild(scheduleItem);
    }

    const scheduleItem = document.createElement("div");
    const lessonNumberElement = document.createElement("div");
    const timeElement = document.createElement("div");
    const subjectElement = document.createElement("div");
    const groupElement = document.createElement("div");
    const cabinetElement = document.createElement("div");

    lessonNumberElement.classList.add("lesson");
    timeElement.classList.add("time");
    subjectElement.classList.add("subject");
    groupElement.classList.add("group");
    cabinetElement.classList.add("cabinet");
    scheduleItem.classList.add("schedule");

    lessonNumberElement.textContent = lesson.lessonNumber;
    timeElement.textContent = lessonsTime[lesson.lessonNumber];
    subjectElement.textContent = lesson.lessonName;
    groupElement.textContent = lesson.groupName;
    cabinetElement.textContent = lesson.cabinet;

    scheduleItem.appendChild(lessonNumberElement);
    scheduleItem.appendChild(timeElement);
    scheduleItem.appendChild(subjectElement);
    scheduleItem.appendChild(groupElement);
    scheduleItem.appendChild(cabinetElement);

    scheduleContainer.appendChild(scheduleItem);

    prevLessonNumber = lesson.lessonNumber;
  });

  classes.appendChild(scheduleContainer);
}

function splitRowspan2TD(tableElement) {
  for (let i = 0; i < tableElement.rows.length; i++) {
    let row = tableElement.rows[i];
    for (let j = 0; j < row.cells.length; j++) {
      let cell = row.cells[j];
      if (
        cell.hasAttribute("rowspan") &&
        parseInt(cell.getAttribute("rowspan")) === 2
      ) {
        let newCell = cell.cloneNode(true);
        cell.removeAttribute("rowspan");
        newCell.removeAttribute("rowspan");
        if (row.nextElementSibling) {
          let nextRow = row.nextElementSibling;
          let nextCell = nextRow.insertCell(j);
          nextCell.innerHTML = newCell.innerHTML;
        }
      }
    }
  }
}

function getVGTK(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      SCHEDULE = [];
      const tempElement = document.createElement("div");
      tempElement.innerHTML = data;
      const tableElement = tempElement.querySelector("table");
      date.innerText = tableElement.rows[0].innerText.trim();

      splitRowspan2TD(tableElement);

      for (let i = 0; i < tableElement.rows.length - 11; i++) {
        const row = tableElement.rows[i];
        if (row.cells.length > 1) {
          Array.from(row.cells).forEach((cell, j) => {
            let cellValue = cell.innerText.trim();
            if (allGroups.includes(cellValue)) {
              const groupSchedule = {
                groupName: cellValue,
                lessons: Array.from({ length: 11 }, (_, index) => ({
                  lessonName:
                    tableElement.rows[i + index + 1].cells[j]?.innerText.trim(),
                  cabinet:
                    tableElement.rows[i + index + 1].cells[
                      j + 1
                    ]?.innerText.trim(),
                  lessonNumber: index + 1,
                  groupName: cellValue,
                  isLab: tableElement.rows[i + index + 1].cells[
                    j + 1
                  ]?.innerText
                    .trim()
                    .includes("/"),
                })),
              };
              SCHEDULE.push(groupSchedule);
            }
          });
        }
      }
      filterschedule();
    })
    .catch((error) => console.error("Ошибка:", error));
}
getVGTK(proxyUrl + targetUrl);

function changeDay() {
  isToday = !isToday;
  targetUrl = isToday
    ? "https://www.vgtk.by/schedule/lessons/day-today.php"
    : "https://www.vgtk.by/schedule/lessons/day-tomorrow.php";
  getVGTK(proxyUrl + targetUrl);
}
