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

$(() => {

  // $.ajax({
  //     url: 'http://www.omdbapi.com/?apikey=53aa2cd6&t=The*'
  //   }
  //   ).then(
  //     (data) => {
  //         console.log(data);
  //       //  $('#name').html(data.Title)
  //     },
  //     () => {
  //       console.log('bad request');
  //     }
  //
  //   )

    //on click event of  next button-
    //get the id of last image and change the ids of images forward 1-2, 2-3 ,3-4, 4-5 so on to give an effect of corousel
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
    //get the id of last image and change the ids of images backward 5-4 , 4-3, 3-2, 2-1 so on to give an effect of corousel
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
