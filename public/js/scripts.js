const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!")
}

const getCardDetails  = () => {
    $.get('/api/projects', (response)=>{
        if(response.statusCode === 200){
            addCards(response.data)
        }

        
    })
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.image+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.link+'</a></p></div>'+
    '<div class="card-reveal">'+
        '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
        '<p class="card-text">'+item.description+'</p>'+
      '</div></div></div>';
      $("#card-section").append(itemToAppend)
    });
}

const submitForm = () => {
    let formData = {};
    let error = false;
    formData.title = $('#title').val();
    formData.description = $('#description').val();
    formData.image = "images/sample.jpg";
    formData.link = `About ${formData.title}`;
    if(!formData.title) {
         document.getElementById('title').classList.remove("valid");
         document.getElementById('title').classList.add("invalid");
        error=true;
      } 
    if(!formData.description) {
         document.getElementById('description').classList.remove("valid");
         document.getElementById('description').classList.add("invalid");
        error=true;
      } 
      if(!error){
         $.post('/api/projects', formData, (response)=>{

            getCardDetails();
            $('.modal').modal('close');
        })
      }
   
}

// connecting to the socket event
 const socketConnection = () => {
    let socket = io();
    socket.on('Number Event', (msg) => {
    console.log('Random number from socket : ' + msg);
})
 }


$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip();
    getCardDetails();
    $('.modal').modal();
    $('#formSubmit').click(()=>{
        submitForm();
    })
    $("select[required]").css({
        display: "inline",
        height: 0,
        padding: 0,
        width: 0
      });
      socketConnection();  
  });
