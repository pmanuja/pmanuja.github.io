console.log('up n running');

// movies corousel //

//create an array of images from images folder
const imgsArr = [{
                    name:'AndaazApnaApna',
                    id:0
                  },
                  {
                    name:'BajrangiBhaijaan',
                    id: 1
                  },
                  {
                    name:'Ghajni',
                    id:2
                  },
                  {
                    name:'HAHK',
                    id:3
                  },
                  {
                    name:'HeraPheri',
                    id: 4
                  },
                  {
                    name:'dhadak',
                    id:5
                  },
                  {
                    name:'hichki',
                    id:6
                  },
                  {
                    name:'raazi',
                    id:7
                  },
                  {
                    name:'simba',
                    id:8
                  }];
const imgPath = 'images/';

let posterBasePath = 'http://image.tmdb.org/t/p/w185';



$(() => {

  const $moviestableDiv = $('.moviesTable');

  const createTableHeader = () => {
    const $table = $('<table>').addClass('mtable');
    const $thead = $('<thead>');
    const $thTitle = $('<th>').text('Title');
    const $thYear = $('<th>').text('Release Date');
    const $thCategory = $('<th>').text('Overview');
    const $thRating = $('<th>').text('Popularity');

    $thead.append($thTitle).append($thYear).append($thCategory).append($thRating);

    $table.append($thead);
    return $table;
  }

  const createTableRows = (table, data) => {

    let $table = table;
    $('.mtable tr').remove();
    console.log(data);
    for (let i = 0; i < 3; i++) {
      const title = data.results[i].title;
      console.log(title);

      posterPath = posterBasePath + data.results[i].poster_path;
      console.log(posterPath);

      const $tr = ($('<tr>')).append($('<td>').html('<a href='+ posterPath + '>' + title + '</a>'));
      $tr.append($('<td>').text(data.results[i].release_date));
      $tr.append($('<td>').text(data.results[i].overview));
      $tr.append($('<td>').text(data.results[i].popularity));

      console.log($tr);
      $table.append($tr);
    }

    return $table;
  }


const loadMoviestable = (userInputYear) => {

  let $inputYear = userInputYear;
  if($inputYear === ''){
    $inputYear = '2019';
  }

  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/discover/movie?api_key=6dfdfe59bd50dab0c7b14c12429fd96e&year='+ $inputYear +'&with_original_language=hi'
    }
    ).then(
      (data) => {

          $table = createTableRows($table , data);
          $moviestableDiv.append($table);

      },
      () => {
        console.log('bad request');
      }

    )

}



  //create table and its header once on page load
  // $table.empty();
  let $table = createTableHeader();

  //load movies for current year on page load
  loadMoviestable('2019');

    //on click event of 'go' button
    //get the year from input text
    //append year to the api url and get the results
    //display results on UI

    $('.inputYearBtn').on('click',(event) => {
        console.log('u clicked go btn');
        const $inputYear = $('.inputYear').val();
        console.log('input year is ' , $inputYear );
        loadMoviestable($inputYear);

    })



    //on click event of  next button-
    //get the id of last image and change the ids of images forward
    //1-2, 2-3 ,3-4, 4-5 and so on
    //set forward id limit to the length of images array
    $('.next').on('click', (event) => {
        console.log('u clicked on next button!');

        for (let i = 0; i <= 4 ; i++) {
          console.log('current index' , i);
          const childId = $('.moviesCorousel').children().eq(i).attr('id');
          console.log('current child id' , childId);
          nextChild = parseInt(childId) + 1;
          if(nextChild > imgsArr.length - 1){
              nextChild = 0;
          }
          console.log('next child id' , nextChild);
          $('.moviesCorousel').children().eq(i).attr('src' , 'images/' + imgsArr[nextChild].name + '.jpeg').attr('id',imgsArr[nextChild].id);
          console.log($('.moviesCorousel').children().eq(i).attr('src'));

        }

    })

    //on click event of  previous button-
    //get the id of last image and change the ids of images backward
    //5-4 , 4-3, 3-2, 2-1 so on
    //set the backward id limit to 0
    $('.previous').on('click', (event) => {
        console.log('u clicked on previous button!');
        for (let i = 4; i >= 0 ; i--) {
          console.log('current index' , i);
          const childId = $('.moviesCorousel').children().eq(i).attr('id');
          console.log('current child id' , childId);
          previousChild = parseInt(childId) - 1;
          if(previousChild < 0){
              previousChild = imgsArr.length -1;
          }
          console.log('previous child id' , previousChild);
          $('.moviesCorousel').children().eq(i).attr('src' , 'images/' + imgsArr[previousChild].name + '.jpeg').attr('id',imgsArr[previousChild].id);
          console.log($('.moviesCorousel').children().eq(i).attr('src'));

        }



    })


});
