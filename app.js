populate()

async function populate() {
  const requestFILE = './data.json'
  const request = new Request(requestFILE)

  const response = await fetch(request)
  const ACTIVITY_TIMEFRAMES = await response.json()
  // console.log(ACTIVITY_TIMEFRAMES)

  // SIMPLIFY TO ARRAYS
  const ACTIVITIES = []
  ACTIVITY_TIMEFRAMES.forEach((element, index) => {
    ACTIVITIES[index] = [element.title, element.timeframes]
  })
  const DAILY = []
  ACTIVITIES.forEach((element, index) => {
    DAILY[index] = element[1].daily
  })
  const WEEKLY = []
  ACTIVITIES.forEach((element, index) => {
    WEEKLY[index] = element[1].weekly
  })
  const MONTHLY = []
  ACTIVITIES.forEach((element, index) => {
    MONTHLY[index] = element[1].monthly
  })

  // GET INJECTION NODES
  const activityHours = document.querySelectorAll('.activity-hrs')
  const activityHoursLastperiod = document.querySelectorAll(
    '.activity-hrs-lastperiod'
  )

  // GET USER SELECTION
  const userSelectsDaily = document
    .getElementById('option-daily')
    .addEventListener('click', () => postTimeframe('daily'))
  const userSelectsWeekly = document
    .getElementById('option-weekly')
    .addEventListener('click', () => postTimeframe('weekly'))
  const userSelectsMonthly = document
    .getElementById('option-monthly')
    .addEventListener('click', () => postTimeframe('monthly'))

  function postTimeframe(selection) {
    clearPostings()
    if (selection === 'daily') {
      activityHours.forEach(
        (element, index) => (element.textContent = `${DAILY[index].current}hrs`)
      )
      activityHoursLastperiod.forEach(
        (element, index) =>
          (element.textContent = `Yesterday - ${DAILY[index].previous}hrs`)
      )
      setActive(selection)
    } else if (selection === 'weekly') {
      activityHours.forEach(
        (element, index) =>
          (element.textContent = `${WEEKLY[index].current}hrs`)
      )
      activityHoursLastperiod.forEach(
        (element, index) =>
          (element.textContent = `Last Week - ${WEEKLY[index].previous}hrs`)
      )
      setActive(selection)
    } else if (selection === 'monthly') {
      activityHours.forEach(
        (element, index) =>
          (element.textContent = `${MONTHLY[index].current}hrs`)
      )
      activityHoursLastperiod.forEach(
        (element, index) =>
          (element.textContent = `Last Month - ${MONTHLY[index].previous}hrs`)
      )
      setActive(selection)
    }

    function clearPostings() {
      activityHours.forEach((element, index) => (element.textContent = ''))
      activityHoursLastperiod.forEach(
        (element, index) => (element.textContent = '')
      )
    }

    function setActive(selection) {
      document
        .querySelectorAll('.timeperiod-option')
        .forEach((element) => element.classList.remove('active'))
      document.getElementById(`option-${selection}`).classList.add('active')
    }
  }
}
