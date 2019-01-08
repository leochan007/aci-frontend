import moment from 'moment-timezone';

function ts2Dt(timestamp) {
  return moment(timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
}

function toLocalTime(datetime, locale) {
  return moment(datetime).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}

function daysBefore(days) {
  return moment().subtract(days, 'days');
}

export {
  ts2Dt,
  toLocalTime,
  daysBefore,
};
