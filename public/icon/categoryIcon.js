const CATEGORY = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}

const categoryNameJSON = JSON.stringify(CATEGORY).split('"')
let categoryobj = []
for (let i = 1; i < categoryNameJSON.length; i++) {
  let categoryArr = []
  categoryArr.push(categoryNameJSON[i])
  categoryArr.push(categoryNameJSON[i + 2])
  categoryobj.push({ id: `${i}`, name: categoryArr[0], icon: categoryArr[1] })
  categoryArr = []
  i += 3
}
const categoryIconUrl = categoryobj

module.exports = categoryIconUrl

