import moment from 'moment';

function getNextDates(type, time) {
  const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const weekend = ['Sat', 'Sun'];

  const dates = [];
  const days = type === 'weekday' ? weekday : weekend;

  days.forEach(day => {
    var weekDayToFind = moment().day(day).weekday(); //change to searched day name
    var searchDate = moment(time); //now or change to any date
    while (searchDate.weekday() !== weekDayToFind) {
      searchDate.add(1, 'day');
    }
    dates.push(searchDate.toDate().getTime());
  });

  return dates;
}

export default getNextDates;
