const apiKey = `fbf2296821a41e8efd5a0c5f4bc6a94c`,
      api = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

fetch(api)
.then( resp => resp.json() )
.then( data => {

  let movies = data.results;

  return movies.map( movie => {

    let star = Math.ceil(movie.vote_average),
        excerpt = movie.overview.substr(0, 50);

    const numberStars = a => {
      let starNumber = [];
      for (let i = 0; i < star; i++) {
        starNumber.push(i);
      }
      return starNumber.join(' ').toString();
    }

    // return all datas from api
    let slider = document.querySelector('.slider');
    slider.innerHTML += `
      <div class="slide fade">
        <img src="https://image.tmdb.org/t/p/w500${ movie.backdrop_path }" alt="${ movie.title }" class="slide-img" />
        <div class="slide-content">
          <h1>${ movie.title }</h1>
          <p>${ excerpt }...</p>
          <span>${ numberStars() }</span>
        </div>
      </div>
    `;

    // Slider
    let slide = document.querySelectorAll('.slide'),
      arrL    = document.querySelector('.arrow-left'),
      arrR    = document.querySelector('.arrow-right'),
      current = 0;

    const reset = () => {
      for (let i = 0; i < slide.length; i++) {
        slide[i].style.display = 'none';
      }
    }

    const startSlide = () => {
      reset();
      slide[0].style.display = 'block';
    }

    const prev = () => {
      reset();
      slide[current - 1].style.display = 'block';
      current--;
    }

    const next = () => {
      reset();
      slide[current + 1].style.display = 'block';
      current++;
    }

    arrL.addEventListener('click', () => {
      if (current === 0) current = slide.length;
      prev();
    });

    arrR.addEventListener('click', () => {
      if (current === slide.length - 1) current = -1;
      next();
    });

    startSlide();

  });

})
.catch( error => {
  console.log(error);
});










