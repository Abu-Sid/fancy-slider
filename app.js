//(Extra feature)=>loading-spinner, carousel closed button, 
//non-match output error massage 

const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">
    `;
    gallery.appendChild(div)
    toggleSpinner(false)
  })
}

const getImages = (query) => {
  toggleSpinner(true)
  toggleMassage(false)
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
   .then(data=>{
    if (data.total > 0) {
      showImages(data.hits)
    } else {
      toggleMassage(true)//show empty output massage from wrong input
    }
  })
    .catch(err => console.log(err))// error massage show in console
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
    element.classList.add('added');
  } else {
    sliders.pop(img)
    element.classList.toggle('added');
  }
}
var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert("Select at least 2 image.");
    return;
  }
    // create slider previous next area
    sliderContainer.innerHTML = "";
    const prevNext = document.createElement("div");
    prevNext.className =
      "prev-next  w-100";
    prevNext.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
    <div> 
    <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span></div>
    <div><span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
    </div>
    </div>
    `;
    sliderContainer.appendChild(prevNext);
    document.querySelector(".main").style.display = "block";
    // hide image aria
    imagesArea.style.display = "none";
    const durationValue = document.getElementById("duration").value
    const duration =  durationValue >0 ? durationValue : 1000;
    sliders.forEach((slide) => {
      let item = document.createElement("div");
      item.className = "slider-item";
      item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
      sliderContainer.appendChild(item);
    });
    changeSlide(0);
    timer = setInterval(function () {
      slideIndex++;
      changeSlide(slideIndex);
    }, duration);
    document.getElementById("duration").value = "";//set duration input field empty
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})
//Enter key event handler
document.getElementById('search').addEventListener('keypress',function(event){
  if(event.key==='Enter')
  searchBtn.click()
})
sliderBtn.addEventListener('click', function () {
  createSlider()
})
//(Extra feature)===loading spinner 
const toggleSpinner=(show)=>{
  const spinner=document.getElementById('loading-spinner');
  if (show){
    spinner.classList.remove('d-none')
  }else{
    spinner.classList.add('d-none')
  }
}
//(Extra feature)===Error massage for empty result
const toggleMassage=(show)=>{
  const massage=document.getElementById('error-massage');
  if (show){
    massage.classList.remove('d-none')
    imagesArea.style.display = 'none';
    document.getElementById('search').value=''
  }else{
    massage.classList.add('d-none')
  }
}
//(Extra feature)===carousel close button
document.getElementById('close-button').addEventListener('click',function(){
  
  document.querySelector('.main').style.display = 'none';
  document.getElementById('search').value=''
})
//set create slide button disable if duration negative
let DurationInput = document.querySelector("#duration");
let button = document.querySelector("#create-slider");
button.disabled = true;
DurationInput.addEventListener("change", stateHandle);
function stateHandle() {
  if (document.querySelector("#duration").value <0) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
}