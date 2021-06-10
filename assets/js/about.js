const about_html = `
<p>هذه الإصدار من البرنامج يحتوى على<br>كتاب المعاصر الصف الأول الثانوى الترم الأول 2020 </p>
<fieldset>
    <legend>
    <h4>تواصل معنا</h4>
    </legend>
    <div class="form-item">
        <div class='form-item-left2'>     
            <a onclick="eel.python_open_social('facebook')();" href="#"><img src='./assets/icons/fb.png'> Facebook</a>
        </div>
        <div class="form-item-middle">:</div>
        <label id='HFCGDFGD' class="form-item-right"><small>(تواصل مع المطور)</small> فيسبوك</label>
    </div>
    <div class='line'></div>
    <div class="form-item">
        <div class="form-item-left2">
            <a onclick="eel.python_open_social('whatsapp')()" href="#" style='color:green;' style='margin-right:auto;'><img src='./assets/icons/wt.png'> Whatsapp</a>
        </div>
        <div class="form-item-middle">:</div>
        <label id='HFCGDFGD' class="form-item-right"><small>(تواصل مع المطور)</small> واتساب</label>
    </div>
    <div class='line'></div>
    <div class="form-item">
        <div class="form-item-left2">
            <a onclick="eel.python_open_social('youtube')()" href="#" style='color:red;' style='margin-right:auto;'><img src='./assets/icons/yt.png'> Youtube</a>
        </div>
        <div class="form-item-middle">:</div>
        <label id='HFCGDFGD' class="form-item-right">يوتيوب <small>(فديوهات شرح للبرنامج)</small></label>
    </div>
</fieldset>
<p>هذه الإصدار خاص بالأستاذ/<b>صلاح سرور</b></p>
<small>© Ahmed Shokry</small>
`
               
// about mathar - modal
$('.about-btn').on('click', function(){
    Swal.fire({
        title: "<h1>Mathar 1.0.1</h1>",
        html: about_html,
        showConfirmButton: false,
    })
});