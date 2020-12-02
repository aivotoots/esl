
var Calendar2 = function (o) {

  this.data;
  this.lang;

  moment.locale('et');

  this.currentDay = moment().format('D').length == 1 ? "0" + moment().format('D') : moment().format('D');
  this.currentMonth = moment();
  this.currentMonthCopy = moment();
  this.currentYear = moment().format('YYYY');
  this.currentPrevMonth = moment().subtract(1, 'month');
  this.currentNextMonth = moment().add(1, 'month');
};

Calendar2.prototype.init = function () {
  if (this.lang === "/en") {
    this.monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
    this.dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  } else {
    this.monthNames = ["JAANUAR", "VEEBRUAR", "MÄRTS", "APRILL", "MAI", "JUUNI", "JUULI", "AUGUST", "SEPTEMBER", "OKTOOBER", "NOVEMBER", "DETSEMBER"];
    this.dayNames = ["P", "E", "T", "K", "N", "R", "L"];
  }
  var daysInCurMonth = this.currentMonth.daysInMonth();
  var allCurDays = this.getDayNames(this.currentMonth.format("M"), this.currentYear);
  $('.prev-month').text("< " + this.monthNames[this.currentPrevMonth.format("M") - 1]);
  $('.current-month-year').text(this.monthNames[this.currentMonth.format("M") - 1] + " " + this.currentYear);
  $('.next-month').text(this.monthNames[this.currentNextMonth.format("M") - 1] + " >");
  $('.kalender-sisu').html(this.getCalendarList(daysInCurMonth, allCurDays));

  localStorage.removeItem('selectedMonth');
  this.initClickHandlers();

}

Calendar2.prototype.initClickHandlers = function (e) {
  var self = this;
  $(".prev-month").off("click");
  $(".prev-month").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    self.prev();
  });

  $(".next-month").off("click");
  $(".next-month").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    self.next();
  });

  $(".event").off("click");
  $(".event").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    self.showDateEvents(e);
  });

}

Calendar2.prototype.showDateEvents = function (e) {
  var date = $(e.currentTarget).data('val');

  var selectedYear = localStorage.getItem('selectedMonth') ? moment(localStorage.getItem('selectedMonth'), "M-YYYY").format("YYYY") : this.currentYear;

  var data = this.data.syndmused.syndmused;
  var yearData = data[selectedYear];

  var splits = date.split("-");

  var eventsStr = "<h2><strong>" + splits[0] + ". " + this.monthNames[moment(splits[1], "M").format("M") - 1] + " " + splits[2] + "</strong></h2>";
  for (var j = 0; j < yearData.length; j++) {
    var path = yearData[j].path;
    var pealkiri = yearData[j].pealkiri;
    var kuup2evad = yearData[j].kuup2evad;
    for (var k = 0; k < kuup2evad.length; k++) {
      if (kuup2evad[k] == date) {
        eventsStr += '<p><a href="' + path + '">' + pealkiri + '</a><p>';
      }
    }
  }

  $('.kalender').html(eventsStr);

}

Calendar2.prototype.prev = function () {
  var selMonth = localStorage.getItem('selectedMonth') ? moment(localStorage.getItem('selectedMonth'), "M-YYYY").subtract(1, 'month').format("M-YYYY") : this.currentMonthCopy.subtract(1, 'month').format("M-YYYY");
  localStorage.setItem('selectedMonth', selMonth);
  this.updateCalendarHeader();
}

Calendar2.prototype.next = function () {
  var selMonth = localStorage.getItem('selectedMonth') ? moment(localStorage.getItem('selectedMonth'), "M-YYYY").add(1, 'month').format("M-YYYY") : this.currentMonthCopy.add(1, 'month').format("M-YYYY");
  localStorage.setItem('selectedMonth', selMonth);
  this.updateCalendarHeader();
}

Calendar2.prototype.updateCalendarHeader = function () {
  var prevMonthStr = this.monthNames[moment(localStorage.getItem('selectedMonth'), "M-YYYY").subtract(1, 'month').format("M") - 1];
  var selMonthStr = this.monthNames[moment(localStorage.getItem('selectedMonth'), "M-YYYY").format("M") - 1];
  var nextMonthStr = this.monthNames[moment(localStorage.getItem('selectedMonth'), "M-YYYY").add(1, 'month').format("M") - 1];
  var selYearStr = moment(localStorage.getItem('selectedMonth'), "M-YYYY").format("YYYY");
  $('.prev-month').text("< " + prevMonthStr);
  $('.current-month-year').text(selMonthStr + " " + selYearStr);
  $('.next-month').text(nextMonthStr + " >");
  var daysInSelMonth = moment(localStorage.getItem('selectedMonth'), "M-YYYY").daysInMonth();
  var allDays = this.getDayNames(moment(localStorage.getItem('selectedMonth'), "M-YYYY").format("M"), moment(localStorage.getItem('selectedMonth'), "M-YYYY").format("YYYY"));
  $('.kalender-sisu').html(this.getCalendarList(daysInSelMonth, allDays));
  this.initClickHandlers();
}

Calendar2.prototype.getDayNames = function (month, year) {
  if (month.length == 1) {
    month = "0" + month;
  }
  var dateStr = year + "-" + month;
  var daysInMonth = moment(dateStr, 'YYYY-MM').daysInMonth();
  var names = [];

  for (var i = 1; i <= daysInMonth; i++) {
    var dateStrLong = month + "-" + i + "-" + year;
    var date = moment(dateStrLong, 'MM-DD-YYYY');
    var dayName = this.dayNames[date.format('d')];

    names.push({ "name": dayName, "day": date.format('DD'), "month": month, "year": year });
  }

  return names;

}

Calendar2.prototype.getCalendarList = function (daysInSelMonth, allDays) {
  var data = this.data.syndmused.syndmused;
  var selectedYear = localStorage.getItem('selectedMonth') ? moment(localStorage.getItem('selectedMonth'), "M-YYYY").format("YYYY") : this.currentYear;
  var yearData = data[selectedYear];
  var calContent = "";
  for (var i = 0; i < daysInSelMonth; i++) {
    var dayVal = allDays[i].name + allDays[i].day;
    for (var j = 0; j < yearData.length; j++) {
      // var path = yearData[j].path;
      var kuup2evad = yearData[j].kuup2evad;
      for (var kidx = 0; kidx < kuup2evad.length; kidx++) {
        var split = kuup2evad[kidx].split("-");
        var p = split[0];
        var k = split[1];
        var a = split[2];
        if (allDays[i].day == p && allDays[i].month == k && allDays[i].year == a) {
          if (allDays[i].day == this.currentDay && allDays[i].month == this.currentMonth.format("M") && allDays[i].year == selectedYear) {
            dayVal = '<a href="#"><span class="event today"data-val="' + p + "-" + k + "-" + a + '">' + allDays[i].name + allDays[i].day + '</span></a>';
          } else {
            dayVal = '<a href="#"><span class="event" data-val="' + p + "-" + k + "-" + a + '">' + allDays[i].name + allDays[i].day + '</span></a>';
          }
        }
      }
    }
    var dayVal2 = "";
    if (allDays[i].day == this.currentDay && allDays[i].month == this.currentMonth.format("M") && allDays[i].year == selectedYear) {
      dayVal2 = '<span class="today">' + dayVal + '</span>';
    } else {
      dayVal2 = dayVal;
    }
    calContent += "<li><h3>" + dayVal2 + "</h3></li>";
  }
  calContent += "";
  return calContent;

}