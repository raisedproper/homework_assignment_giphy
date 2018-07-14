$(document).ready(function() {
    
    var topics = ['fail', 'money', 'seinfield', 'kids'];
    var animateImgUrl = '';
    var stillImgUrl = '';
    var gifCondition = '';
    var stillUrl = '';
    var animateUrl = '';
   
    var createBtn = function() {
        
        $('#btn-section').empty();
        
        for (var i = 0; i < topics.length; i++) {
            
            var newBtn = $('<button>');
            
            newBtn.attr('data-name', topics[i]);
            
            newBtn.attr('class', 'gif');
            
            newBtn.text(topics[i]);
            
            $('#btn-section').append(newBtn);
        }
    }


$('#submit-btn').on('click', function(event) {
    submit();
});


$(".search").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.search').val("");
        return false
    }
});


    var submit = function() {
            event.preventDefault();
            
            var inputVal = $('#userInput').val();
          
            topics.push(inputVal);

            createBtn();
      
            console.log(inputVal);
            console.log(topics);
    }
    var displayGif = function() {
   
        var btnVal = $(this).data('name');

        var apiKey = 'dc6zaTOxFJmzC';
        var apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function(response) {
            
            $('.gifSection').empty();
            let newH1 = $('<h1>');
                newH1.html(btnVal);
                newH1.attr('class', 'text-center');
            $('.gifSection').append(newH1);

            for (var i = 0; i < 10; i++) {
               
                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
               
                var rating = response['data'][i]['rating'];
                
                var newDiv = $('<div>'); 
                var newP = $('<p>'); 
                var newImg = $('<img>');
               
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');
               
                newP.html('Giphy Rating: ' + rating);
                $(newP).appendTo(newDiv)
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv); 
            }
        });
    }
    var gifAnimate = function() {
        
        gifCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (gifCondition === 'still') {
            
            $(this).attr('src', animateUrl);
            
            $(this).data('type', 'animate');
            //Testing
            console.log(gifCondition);
        } else if (gifCondition === 'animate') {
            
            $(this).attr('src', stillUrl);
           
            $(this).data('type', 'still');
            //Testing
            console.log(gifCondition);
        }
    }

    createBtn();
    // submit();
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', gifAnimate);
});