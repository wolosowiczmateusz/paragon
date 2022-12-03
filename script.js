let table = document.getElementById("receipt-table")

const addForm = document.getElementById("add-form")
const deleteForm = document.getElementById("delete-form")
const editForm = document.getElementById("edit-form")

function getId(){
  let finalId = -1
  let tmpProducts = [...products]
  tmpProducts.sort((a,b) =>  a.id - b.id)
  if(tmpProducts.length === 0){
    finalId = 1
  }
  else{
    if(tmpProducts[0].id != 1){
      finalId = 1
    }
    else{
      for(let i = 0; i<tmpProducts.length; i++){
        const thisID = tmpProducts[i].id
        if(i+1 === tmpProducts.length){
          finalId = thisID + 1
          break
        }
        const nextID = tmpProducts[i+1].id
        if((nextID - thisID)>1){
          finalId = (thisID+1)
          break;
        }
      }
    }

  }
  if(finalId != -1){
    return finalId
  }
  else{return 1}
}

class Product{
  constructor(id, name, count, price)
  {
    this.id = id
    this.name = name
    this.count = count
    this.price = price
  }

  sum() {
    return this.count * this.price  
  }
}


function initTable(){
  while (table.firstChild) {
    table.removeChild(table.lastChild)
  }
  let tr = document.createElement("tr")
  let th = document.createElement("th")
  let th1 = document.createElement("th")
  let th2 = document.createElement("th")
  let th3 = document.createElement("th")
  let th4 = document.createElement("th")
  th.innerHTML = "LP"
  th1.innerHTML = "NAZWA"
  th2.innerHTML = "ILOSC"
  th3.innerHTML = "CENA"
  th4.innerHTML = "SUMA"
  tr.append(th)
  tr.append(th1)
  tr.append(th2)
  tr.append(th3)
  tr.append(th4)
  table.append(tr)
}

function addProduct(name,count,price){
  let p = new Product(getId(),name,count,price)
  products.push(p)
}

function showProducts(){
  for(let product of products){
    let tr2 = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let td5 = document.createElement("td")
    td1.innerHTML = product.id
    td2.innerHTML = product.name
    td3.innerHTML = product.count
    td4.innerHTML = product.price
    td5.innerHTML = product.sum()
    tr2.append(td1)
    tr2.append(td2)
    tr2.append(td3)
    tr2.append(td4)
    tr2.append(td5)
    table.append(tr2)
  }
}

let products = []


addForm.addEventListener(
  "submit",
  (event) =>{
    let addName = document.getElementById("add-name").value
    let addCount = document.getElementById("add-count").value
    let addPrice = document.getElementById("add-price").value
    initTable()
    addProduct(addName,addCount,addPrice)
    showProducts()

    event.preventDefault()
  },
  false
)


deleteForm.addEventListener(
  "submit",
  (event) =>{
    let deleteId = document.getElementById("delete-id").value

    products = products.filter(e =>{
      return e.id != deleteId
    })

    initTable()
    showProducts()

    event.preventDefault()
  },
  false
)

editForm.addEventListener(
  "submit",
  (event) =>{
    let editId = document.getElementById("edit-id").value
    let editName = document.getElementById("edit-name").value
    let editCount = document.getElementById("edit-count").value
    let editPrice = document.getElementById("edit-price").value

    for(let i of products){
      console.log(editId)
      console.log(i.id)
      if(i.id == editId){
        i.name = editName
        i.count = editCount
        i.price = editPrice
        console.log("aa")
      }
    }

    initTable()
    showProducts()

    event.preventDefault()
  },
  false
)





