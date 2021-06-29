const about_html = `
<p>هذه الإصدار  يحتوى على كتاب المعاصر<br>الصف الثالث الثانوى فى <q>الجبر</q> الترم الأول 2021</p>
<div class='line'></div>
<fieldset>
    <legend>
        <h5>تواصل معنا</h5>
    </legend>
    <div style='display:flex;padding:0.3em 0;justify-content:space-evenly;'>
        <a onclick="eel.python_open_social('youtube')()" href="#" style='color:#FF0000;'>
            <img src='./assets/icons/yt.png'><span> Youtube</span>
        </a>
        <a onclick="eel.python_open_social('whatsapp')()" href="#" style='color:#25D366;'>
            <img src='./assets/icons/wt.png'><span> Whatsapp</span>
        </a>
        <a onclick="eel.python_open_social('facebook')();" href="#">
            <img src='./assets/icons/fb.png'><span style='color:#3b5998'> Facebook</span>
        </a>
    </div>
</fieldset>
`

// about mathar - modal
$('#about').on('click', function(){
    Swal.fire({
        title  : "<h1 class='azure'>Mathar 1.1.0</h1>",
        html   : about_html,
        footer : modal_footer,
        showConfirmButton: false,
    })
});