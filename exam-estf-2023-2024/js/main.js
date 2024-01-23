const authorInput=document.getElementById("authorInput")
const authorError = document.getElementById('authorError')
const joketxt = document.getElementById('joketxt')
const jokeError = document.getElementById("jokeError")
const btnreset = document.getElementById('btnreset')
const btngenerate = document.getElementById('btngenerate')
const btnsubm = document.getElementById("btnsubm")
const nbjokes = document.getElementById('nbjokes')
const jokeslist =document.getElementById('jokeslist')
const sp =document.createElement('span')
const url = "http://localhost:3000/jokes"
const urljokes = "https://api.chucknorris.io/jokes/random"

btnsubm.setAttribute("disabled","")
jokeError.innerText=""
authorError.innerText=""
authorInput.addEventListener("input", () => {
  let value = authorInput.value;
  if (!value) {
    authorError.innerText = "author is required";
    return btnsubm.setAttribute("disabled", "");
  }

  if (value.length <= 4) {
    authorError.innerText =
      "author must contains at least 4 caracters";
    return btnsubm.setAttribute("disabled", "");
  }
  authorError.innerText = "";
  submitBtn.removeAttribute("disabled");
});

joketxt.addEventListener("input", () => {
  let value = joketxt.value;
  if (!value) {
    jokeErrorError.innerText = "author is required";
    return btnsubm.setAttribute("disabled", "");
  }

  if (value.length <= 3) {
    jokeError.innerText =
      "joke must contains at least 3 caracters";
    return btnsubm.setAttribute("disabled", "");
  }
  jokeError.innerText = "";
  submitBtn.removeAttribute("disabled");
});
const loadjokes = () => {
  jokeslist.innerHTML = "";
  const xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.addEventListener("load", () => {
    if (xhr.status != 200) return alert("error" + xhr.response);
    let data = JSON.parse(xhr.response);
    data.forEach((ele) => addjoke(ele));
    nbjokes.innerText =data.length
  });
  xhr.addEventListener("error", () => {
    alert("error");
  });
  xhr.send();
};
loadjokes();
const addjoke=(joke)=>{
  const li = document.createElement('li')
  const divlikes = document.createElement('div')
  const divjoke = document.createElement('div')
  const author = document.createElement('h3')
  const jokep = document.createElement('p')
  const divcontrols= document.createElement('div')
  const btndelete= document.createElement('button')
  const btnlike = document.createElement('button')
  

  divlikes.classList.add('likes')
  divlikes.appendChild(sp)
  divjoke.classList.add('content')
  divcontrols.classList.add('btns')
  btndelete.classList.add('delete')
  btndelete.innerText = 'delete'
  btnlike.classList.add('likeBtn')
  btnlike.innerText= 'like'

  divjoke.appendChild(author)
  divjoke.appendChild(jokep)

  divcontrols.appendChild(btndelete)
  divcontrols.appendChild(btnlike)

  li.appendChild(divlikes)
  li.appendChild(divjoke)
  li.appendChild(divcontrols)
  jokeslist.appendChild(li)
  sp.innerText= joke.likes
  divlikes.innerText = sp.innerText + "likes"
  author.innerText= joke.author
  jokep.innerText = joke.joke

  btndelete.addEventListener('click',()=>{
    const xhr = new XMLHttpRequest();
    xhr.open("delete", url + "/" + joke.id, true);
    xhr.addEventListener("load", () => {
      if (xhr.status != 200) return alert("error" + xhr.response);
      li.remove()
      nbjokes.innerText = parseInt(nbjokes.innerText)-1
    });
    xhr.addEventListener("error", () => {
      alert("error");
    });
    xhr.send()
  })
  btnlike.addEventListener('click',()=>{
    
    const xhr = new XMLHttpRequest();
    xhr.open("put", url + "/" + joke.id, true);
    xhr.setRequestHeader("Content-Type","application/json")
    xhr.addEventListener("load", () => {
      if (xhr.status != 200) return alert("error" + xhr.response);
    });
    sp.innerText= parseInt(sp.innerText) +1
    xhr.addEventListener("error", () => {
      alert("error");
    });
    let dataPutToSend = {
        author:joke.author,
        joke:joke.joke,
        likes:joke.likes
    }
    divlikes.innerText= sp.innerText  + "likes"
    xhr.send(JSON.stringify(dataPutToSend))
  })

}
btnreset.addEventListener('click',()=>{
  authorInput.value=""
  joketxt.value=""
})
btngenerate.addEventListener('click',()=>{
  const xhr = new XMLHttpRequest();
  xhr.open("get", urljokes, true);
  xhr.addEventListener("load", () => {
    if (xhr.status != 200) return alert("error" + xhr.response);
    let data = JSON.parse(xhr.response);
    const newjoke = data.value
    joketxt.value=newjoke
    authorInput.value = "chucknorris"
  });
  xhr.addEventListener("error", () => {
    alert("error");
  });
  xhr.send();
  btnsubm.removeAttribute("disabled")
})
btnsubm.addEventListener('click',()=>{
  let authorValue = authorInput.value;
    let jokeValue = joketxt.value ;
    let dataToSend = {
      author: authorValue,
      joke: jokeValue,
      likes:0
    };
    dataToSend = JSON.stringify(dataToSend);
    const xhr = new XMLHttpRequest();
    xhr.open("post",url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", () => {
      if (xhr.status == 201) {
        let data = JSON.parse(xhr.response);
        addjoke(data);
        authorInput.value = "";
        joketxt.value = "";
        nbjokes.innerText = parseInt(nbjokes.innerText)+1
      } else {
        alert(xhr.response);
      }
    });
    xhr.addEventListener("error", () => {
      alert("error");
    });
    xhr.send(dataToSend);
})