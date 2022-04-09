const indexSelectForm = document.querySelector('.indexSelectForm')
const indexSelect = document.querySelector('.indexSelect')


// indexSelect.addEventListener('change', () => {
//   const selectedIndex = indexSelect.iselectedIndex
//   indexSelect[selectedIndex].selected = true
//   indexSelectForm.submit()
// })

indexSelectForm.addEventListener('submit',  (event) => {
  event.stopPropagation()
  event.preventDefault()
})