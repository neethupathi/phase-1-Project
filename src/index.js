let addFlavor = false

document.addEventListener("DOMContentLoaded", () => {
  //access id new-flavor-btn using querySelector
  const addBtn = document.querySelector("#new-flavor-btn");
  //access form container using the class container
  const flavorFormContainer = document.querySelector(".container");
  //event listener for the form
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addFlavor = !addFlavor;
    if (addFlavor)
    {
      flavorFormContainer.style.display = "block";
    }
    else
    {
      flavorFormContainer.style.display = "none";
    }
  });

  const newFlavorForm = document.querySelector('form.add-flavor-form')
  newFlavorForm.addEventListener('submit', (event) => {
     event.preventDefault();
     handleAdd(event);
     document.querySelector('form.add-flavor-form').reset();
   })


  fetchFlavors();
});
//access data from the json server
function fetchFlavors() {
  return fetch('http://localhost:3000/IceCream')
  .then(res=>res.json())
  .then(flavorData=>flavorData.forEach(flavor=>renderCard(flavor))
    )

}



function renderCard(flavor) {
  //create contents for the app
  const flavorDiv = document.querySelector('#flavor-collection')
    let card = document.createElement('div');
    let img = document.createElement('img');
    let h2 = document.createElement('h2');
    let h4=document.createElement('h4');
    let p = document.createElement('p');
    let likeBtn = document.createElement('button');

    let url = flavor.image;
    let name = flavor.name;
    let top = flavor.top;
    let likes = flavor.likes;
    let id = flavor.id

    flavorDiv.appendChild(card);
    card.classList.add("card");
    card.setAttribute('id', id)

    card.appendChild(h2)
    h2.innerHTML = name;
    card.appendChild(h4)
    h4.innerHTML = top;

    card.appendChild(img);
    img.classList.add('flavor-avatar');
    img.src = url;

    card.appendChild(p);
    p.innerHTML = `${likes} likes`

    card.appendChild(likeBtn);
    likeBtn.classList.add("like-btn");
    likeBtn.innerHTML = 'like';
//likes for the icecream
    likeBtn.addEventListener('click', function(){
      p.innerHTML = (likes+= 1) + ' likes';
      fetch(`http://localhost:3000/IceCream/${flavor.id}`, {
        method : 'PATCH',
        headers : {
          'Content-Type' : 'application/JSON',
          'Accept' : 'application/JSON'
        },
        body : JSON.stringify({
          'likes' : `${likes}`
        })
      })
    })

}

function handleAdd(event){
  let imgInput = event.target['image'].value;
    let nameInput = event.target['name'].value;
    let topInput = event.target['top'].value;
    fetch('http://localhost:3000/IceCream', {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/JSON',
        'Accept' : 'application/JSON'
      },
      body : JSON.stringify({
        "name" : nameInput,
        "image" : imgInput,
        "top"   : topInput,
        "likes" : 0
      })
    }).then(res=>res.json())
    .then(flavor=>renderCard(flavor))


}