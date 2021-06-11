const about_html = `
<p>هذه الإصدار من البرنامج يحتوى على<br>كتاب المعاصر الصف الثالث الثانوى الترم الأول 2021 </p>
<fieldset>
    <legend>
        <h5>تواصل معنا</h5>
    </legend>
    <div class='grid' style='justify-content:space-evenly;'>
        <a onclick="eel.python_open_social('facebook')();" href="#">
            <img src='./assets/icons/fb.png'><span style='color:#3b5998'> Facebook</span>
        </a>
        <a onclick="eel.python_open_social('whatsapp')()" href="#" style='color:green;'>
            <img src='./assets/icons/wt.png'><span> Whatsapp</span>
        </a>
        <a onclick="eel.python_open_social('youtube')()" href="#" style='color:red;'>
            <img src='./assets/icons/yt.png'><span> Youtube</span>
        </a>
    </div>
</fieldset>
`
               
// about mathar - modal
$('.about-btn').on('click', function(){
    Swal.fire({
        title  : "<h1 class='azure'>Mathar 1.1.0</h1>",
        html   : about_html,
        footer : "<span class='azure'>© Ahmed Shokry<span>",
        showConfirmButton: false,
    })
});