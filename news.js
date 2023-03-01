const fetchCategories = async()=>{
 const url = `https://openapi.programming-hero.com/api/news/categories`
 const res = await fetch(url);
 const data = await res.json();
 showCategories(data.data.news_category);
}

const showCategories = data => {
const categoriesContainer = document.getElementById('categories_container')
data.forEach(singleCategories => {
    categoriesContainer.innerHTML += `
    <p onclick = "fetchCategoryNews('${singleCategories.category_id}','${singleCategories.category_name}')" > <a href="#" >${singleCategories.category_name}</a> </p>
    `
});
}

const fetchCategoryNews = async(category_id,category_name) => {
    console.log(category_id);
 const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
 console.log(url);
 const res = await fetch(url);
 const data = await res.json();
 showCategoryNews(data.data,category_name);
};

const showCategoryNews = (category_id,category_name) => {
 const newsCount = document.getElementById('news-count');
 newsCount.innerText = category_id.length;

 const newsName = document.getElementById('news-name');
 newsName.innerText = category_name;
 const newsContainer = document.getElementById('all-news');
 newsContainer.innerHTML = '';
 category_id.forEach(singleNews => {
console.log(singleNews);
const {_id,image_url,title,details,author,total_view} = singleNews;
    newsContainer.innerHTML += `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img src=${image_url } class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
        ${details.slice(0,200) }......
        </div>

        <div class="card-footer borde-0 bg-body d-flex justify-content-between">
        <div class="d-flex gap-2">
            <img src=${author.img} alt="" height ="40" width ="40">
            <div>
                <p class="m-0 p-0 "> ${author.name}</p>
                <p class="m-0 p-0 "> ${author.published_date}</p>
            </div>
        </div>
  
        <div>
            <p><i class="fa-solid fa-eye"></i></p>
            <p class="m-0 p-0 "> ${total_view
            }</p>
        </div>
        <div>
            <p><i class="fa-solid fa-eye"></i></p>
        </div>
        <div>
            <p data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchNewsDetails('${_id}')"><i class="fa-solid fa-arrow-right"></i></p>
        </div>
    </div>

      </div>
     
    </div>
  </div>
    `
    
 })
}


const fetchNewsDetails = async(news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    showNewsDetails(data.data[0]);

}

const showNewsDetails = news_id => {
    console.log(news_id);
    const modalBody =  document.getElementById('modal-body');
    modalBody.innerHTML = '';
    const {_id,image_url,title,details,author,total_view} = news_id;
    modalBody.innerHTML += `
    <div class="card mb-3">
    <div class="row g-0">
      <div class="col-12">
        <img src=${image_url } class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-12 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
        ${details }
        </div>

        <div class="card-footer borde-0 bg-body d-flex justify-content-between">
        <div class="d-flex gap-2">
            <img src=${author.img} alt="" height ="40" width ="40">
            <div>
                <p class="m-0 p-0 "> ${author.name}</p>
                <p class="m-0 p-0 "> ${author.published_date}</p>
            </div>
        </div>
  
        <div>
            <p><i class="fa-solid fa-eye"></i></p>
            <p class="m-0 p-0 "> ${total_view}</p>
        </div>
        <div>
            <p><i class="fa-solid fa-eye"></i></p>
        </div>
        <div>
            <p data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchNewsDetails('${_id}')"><i class="fa-solid fa-arrow-right"></i></p>
        </div>
    </div>

      </div>
     
    </div>
  </div>
    `
}