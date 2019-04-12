console.log('up n running');

$(() => {

  $.ajax({
      url: 'http://www.omdbapi.com/?apikey=53aa2cd6&t=The*'
    }
    ).then(
      (data) => {
          console.log(data);
        //  $('#name').html(data.Title)
      },
      () => {
        console.log('bad request');
      }

    )

});
