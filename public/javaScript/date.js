function dateTimes() {

  function newDate() {
    let today = new Date()
    return today
  }

  const year = newDate().getFullYear()
  let month = newDate().getMonth() + 1
  if (Number(month) < 10) {
    month = '0' + month
  }
  let day = newDate().getDate()
  if (Number(day) < 10) {
    day = '0' + day
  }
  let hour = newDate().getHours().toString()
  if (Number(hour) < 10) {
    hour = '0' + hour
  }
  let minutes = newDate().getMinutes().toString()
  if (Number(minutes) < 10) {
    minutes = '0' + minutes
  }
  let second = newDate().getSeconds().toString()
  if (Number(second) < 10) {
    second = '0' + second
  }
  const dateTimeFormats = `${year}-${month}-${day} `
  return dateTimeFormats
}

module.exports = dateTimes