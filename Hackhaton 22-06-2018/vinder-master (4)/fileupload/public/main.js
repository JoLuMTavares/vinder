var currentViewedUser = null;

$(() => {

    function like() {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/like',
            data: JSON.stringify({ userto: currentViewedUser.username }),
            success: function(data) {
                console.log(data);
                showDiscovery();
            },
            dataType: 'json'
        });        
    }

    function dislike() {
        showDiscovery();
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    
    if(getParameterByName('p') === 'discover') {
        $('.movieupload').hide();
        showDiscovery();
    }
    else {
        $('.discovery').hide();
        $('.movieupload').hide();
    }

    function showDiscovery() {
        $('.discovery').show();
        $('.auth').hide();
        $('#moviediv').empty();
     
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8000/nextuser',
            success: function(data) {
                currentViewedUser = data;
                // $('#moviediv').append(`<video controls muted src="./files/${videourl}" width="500" heigth="200"></video>`);        
                $('#moviediv').append('<h1>'+currentViewedUser.username+'</h1>');
                $('#moviediv').append(`<video class="movieitem" autoplay src="./files/${currentViewedUser.videourl}" width="500" heigth="200"></video>`);                
                
            }
        })
    }

    function showMovieUpload() {
        
        $('.auth').hide();        
        $('.movieupload').show();
    }

    $('#login').on('submit', ((e) => {
        console.log(e);
        e.preventDefault();
        
        console.log($('#usernameInput').val());
        let data = JSON.stringify({username: $('#usernameInput').val()});

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/login',
                data: data,
                success: function(data) {
                    console.log(data);
                    showDiscovery();
                },
                dataType: 'json'
            });
    }));

    $('#signupBtn').on('click', ((e) => {
        console.log(e);
        e.preventDefault();
        
        let data = JSON.stringify({
            username: $('#usernameInput-signup').val(),
            profiletext: $('#profile-text').val()
        });

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: '/signup',
                data: data,
                success: function(data) {
                    console.log(data);
                    showMovieUpload();
                },
                dataType: 'json'
        });
    }));

    $('.like').on('click', ((e) => {
        console.log(e);
        e.preventDefault();
        like(); 
    }));    

    $('.dislike').on('click', ((e) => {
        console.log(e);
        e.preventDefault();
        dislike(); 
    }));    

    $("#moviediv").on("swipeleft", ".movieitem", function() {
        alert('foofoofoo left');
    });

    $("#moviediv").on("swiperight", ".movieitem", function() {
        alert('foofoofoo right');
    });    
})

    