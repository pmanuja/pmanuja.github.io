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

//const arr


$(() => {

  const $moviestableDiv = $('.moviesTable');
  const $modal = $('.modal');


  const createTableHeader = () => {
    const $table = $('<table>').addClass('mtable');
    const $thead = $('<thead>');
    const $thTitle = $('<th>').text('Title');
    const $thCategory = $('<th>').text('Overview');
    const $thRating = $('<th>').text('Popularity');
    const $thYear = $('<th>').text('Release Date');

    $thead.append($thTitle).append($thCategory).append($thRating).append($thYear);

    $table.append($thead);
    return $table;
  }



  const createTableRows = (table, data) => {

    let $table = table;
    $('.mtable tr').remove();
    console.log(data);
    for (let i = 0; i < 5; i++) {
        const title = data.results[i].title;
        console.log(title);

        //get poster path
        posterPath = posterBasePath + data.results[i].poster_path;
        console.log(posterPath);

        //add movie title to the title column
        const $tr = ($('<tr>')).append($('<td>').html('<a href="#" >' + title + '</a> <p>' + posterPath + '</p>').addClass('openModal').css('font-size','18px'));

        // if the length of overview of the title is too big add [read more link]
        if(data.results[i].overview.toString().length > 100){

            let overviewText = data.results[i].overview.toString().substring(0, 100);
            $tr.append($('<td>').text(overviewText).append($('<a href="#">[Read more...]</a> <p>' + data.results[i].overview + '</p>').css({'color':'blue'})).addClass('overview'));
        }
        else{
            $tr.append($('<td>').text(data.results[i].overview));
        }

        //add popularity
        $tr.append($('<td>').text(data.results[i].popularity));

        //add release date
        $tr.append($('<td>').text(data.results[i].release_date));

        console.log($tr);
        $table.append($tr);
      }

      $('body').on('click', '.openModal', function(event) {
        //on click event of the title in the table
        //open modal - that shows details of the movies
          console.log('clicked a');
          console.log(event.currentTarget.children);
          let children = event.currentTarget.children;
          console.log(children[0], children[1]);
          console.log(children[0].text);
          console.log(children[1].innerHTML);

          $('.modal-textbox').empty();
          $('.modal-textbox').append($('<a id="close" href="#">[X]</a>'));
          //$('.modal-textbox').append($('<a>').text('[X]').attr('href','#').attr('id','close'));
          $('.modal-textbox').append($('<h2>').text(children[0].text));
          $('.modal-textbox').append($('<img>').attr('src',children[1].innerHTML));


          $modal.css('display', 'block');


        $('body').on('click', '#close', function(event) {
              $modal.css('display', 'none');

        });



      });

      $('body').on('click', '.overview', function(event) {

        console.log('clicked overview link');
        console.log(event.currentTarget.children);
        let children = event.currentTarget.children;
        console.log(children[0], children[1]);
        //console.log(children[0].text);
        console.log('this is overview : ' , children[1].innerHTML);
        $('.modal-textbox-overview').empty();

        $('.modal-textbox-overview').append($('<a id="close" href="#">[X]</a>'));

        $('.modal-textbox-overview').append($('<p>').text(children[1].innerHTML));
      //  $('.modal-textbox').append($('<img>').attr('src',children[1].innerHTML));
        $('.modal-overview').css('display', 'block');

        $('body').on('click', '#close', function(event) {
              $('.modal-overview').css('display', 'none');

        });

      });

    return $table;
  }


const loadMoviestable = (userInputYear) => {

  let $inputYear = userInputYear;
  if($inputYear === ''){
    $inputYear = '2019';
  }

  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/discover/movie?api_key=6dfdfe59bd50dab0c7b14c12429fd96e&primary_release_year='+ $inputYear +'&with_original_language=hi&sort_by=popularity.desc'
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
