const data = [
    {id : 1, item : "aloo", img : "Aloo-Parantha.jpg", desc : "Aloo Paratha"},
    {id : 2, item : "dhokla", img : "dhokla.jpg", desc : "dhokla"},
    {id : 3, item : "biryani", img : "Kunda Biriyani.jpg", desc : "Kunda Biriyani"},
    {id : 4, item : "thali", img : "Great Indian Thali.jpg", desc : "Great Indian Thali"},
    {id : 5, item : "puri", img : "puri.jpg", desc : "puri"},
    {id : 6, item : "meals", img : "Half meals.jpeg", desc : "Half meals"},
]

const sectionEle = document.getElementById("items");
const searchButtonEle = document.getElementById("search-button");
 
searchButtonEle.onclick = () => {
    const inputEle = document.getElementById("input-box");
    const searchItem = inputEle.value;
    // console.log(searchItem);
    const displayItems = data.filter(each => each.item === searchItem);
    console.log(displayItems);

    const divContainer = document.getElementById("items");
    
    displayItems.map(each => {
        const imgEle = document.createElement("img");
        imgEle.src = each.img;
        imgEle.alt = each.img;
        const paraEle = document.createElement("p");
        paraEle.textContent = each.desc;
        const itemDiv = document.createElement("div");
        divContainer.appendChild(itemDiv);
        itemDiv.append(imgEle);
        itemDiv.appendChild(paraEle);
        itemDiv.classList.add("fksdn");
    })

    displayItems = [];




}
