$(() => {

    function like() {

    }

    function dislike() {

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
        showDiscovery();
    }
    else {
        $('.discovery').hide();
        $('.movieupload').hide();
    }

    function showDiscovery() {
        $('.auth').hide();
        $('#moviediv').empty();
     
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8000/nextuser',
            success: function(data) {
                alert('foo');
                // $('#moviediv').append(`<video controls muted src="./files/${videourl}" width="500" heigth="200"></video>`);        
                $('#moviediv').append(`<video controls muted src="./files/michael.mp4" width="500" heigth="200"></video>`);                        
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
    }

))
})

    