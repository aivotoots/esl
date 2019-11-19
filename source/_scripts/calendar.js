var Calendar = function (o) {
  //Store div id
  this.divId = o.ParentID;

  // Days of week, starting on Sunday
  this.DaysOfWeek = o.DaysOfWeek;
  // Months, stating on January
  this.Months = o.Months;
  // Set the current month, year
  var d = new Date();
  this.CurrentMonth = d.getMonth();
  this.CurrentYear = d.getFullYear();

  var f = o.Format;

  if (typeof (f) == 'string') {
    this.f = f.charAt(0).toUpperCase();
  } else {
    this.f = 'E';
  }

  this.data = o.Data;
};

Calendar.prototype.getData = function () {
  return this.data;
}

// Goes to next month
Calendar.prototype.nextMonth = function () {

  if (this.CurrentMonth == 11) {

    this.CurrentMonth = 0;
    this.CurrentYear = this.CurrentYear + 1;

  } else {

    this.CurrentMonth = this.CurrentMonth + 1;

  }

  this.showCurrent();
};

Calendar.prototype.getMonth = function () {
  return this.CurrentMonth;
}

Calendar.prototype.getYear = function () {
  return this.CurrentYear;
}

// Goes to previous month
Calendar.prototype.previousMonth = function () {

  if (this.CurrentMonth == 0) {

    this.CurrentMonth = 11;
    this.CurrentYear = this.CurrentYear - 1;

  } else {

    this.CurrentMonth = this.CurrentMonth - 1;

  }

  this.showCurrent();
};

// 
Calendar.prototype.previousYear = function () {

  this.CurrentYear = this.CurrentYear - 1;

  this.showCurrent();
}

// 
Calendar.prototype.nextYear = function () {

  this.CurrentYear = this.CurrentYear + 1;

  this.showCurrent();
}

// Show current month
Calendar.prototype.showCurrent = function () {

  this.Calendar(this.CurrentYear, this.CurrentMonth);

};

// Show month (year, month)
Calendar.prototype.Calendar = function (y, m) {

  typeof (y) == 'number' ? this.CurrentYear = y : null;

  typeof (y) == 'number' ? this.CurrentMonth = m : null;


  // 1st day of the selected month
  var firstDayOfCurrentMonth = new Date(y, m, 1).getDay();

  // Last date of the selected month
  var lastDateOfCurrentMonth = new Date(y, m + 1, 0).getDate();

  // Last day of the previous month
  var lastDateOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

  // Write selected month and year. This HTML goes into <div id="month"></div>
  var monthandyearhtml = '<span id="monthandyearspan">' + this.Months[m] + ' - ' + y + '</span>';

  var html = '<table>';

  // Write the header of the days of the week
  html += '<tr>';

  for (var i = 0; i < 7; i++) {

    html += '<th class="daysheader" style="width:25px;text-align:center">' + this.DaysOfWeek[i] + '</th>';
  }

  html += '</tr>';

  var p = dm = this.f == 'M' ? 1 : firstDayOfCurrentMonth == 0 ? -5 : 2;

  var cellvalue;

  for (var d, i = 0, z0 = 0; z0 < 6; z0++) {
    html += '<tr>';

    for (var z0a = 0; z0a < 7; z0a++) {

      d = i + dm - firstDayOfCurrentMonth;

      // Dates from prev month
      if (d < 1) {

        cellvalue = lastDateOfLastMonth - firstDayOfCurrentMonth + p++;

        html += '<td id="prevmonthdates" style="text-align:center">' +
          '<span id="cellvaluespan">' + (cellvalue) + '</span><br/>' +
          '</td>';

        // Dates from next month
      } else if (d > lastDateOfCurrentMonth) {

        html += '<td id="nextmonthdates" style="text-align:center">' + (p++) + '</td>';

        // Current month dates
      } else {
        var day = d;
        var currentDate = new Date()
        if (currentDate.getDate() == d && currentDate.getMonth() == this.getMonth() && currentDate.getFullYear() == this.getYear()) {
          day = '<span style="color:red"><b>' + d + '</b></span>';
        }
        var yearData = this.getData()[this.getYear()];
        if (yearData) {
          for (var k = 0; k < yearData.length; k++) {
            var array = yearData[k].paev;
            array = array instanceof Array ? array : [array];
            if (array.indexOf(d) > -1 && (yearData[k].kuu-1) == this.getMonth() && yearData[k].aasta == this.getYear()) {
              day = '<a href="/yritused/yritus/' + yearData[k].id + '">' + day + '</a>';
            }
          }
        }
        html += '<td id="currentmonthdates" style="text-align:center">' + (day) + '</td>';

        p = 1;

      }

      if (i % 7 == 6 && d >= lastDateOfCurrentMonth) {

        z0 = 10; // no more rows
      }

      i++;

    }

    html += '</tr>';
  }

  // Closes table
  html += '</table>';


  document.getElementById("monthandyear").innerHTML = monthandyearhtml;

  document.getElementById(this.divId).innerHTML = html;
};

// Get element by id
function getId(id) {
  return document.getElementById(id);
}