const about_html = `
<p>هذه الإصدار من البرنامج يحتوى على<br>كتاب المعاصر الصف الأول الثانوى الترم الأول 2020 </p>
<fieldset>
    <legend>
    <h4>تواصل معنا</h4>
    </legend>
    <div class="form-item">
        <div>     
            <a onclick="eel.python_open_social('facebook')();" href="#"><img src='./assets/icons/fb.png'> Facebook</a>
        </div>
        <label id='HFCGDFGD' class="form-item__label"><small>(تواصل مع المطور)</small> فيسبوك</label>
    </div>
    <div class='line'></div>
    <div class="form-item">
        <div>
            <a onclick="eel.python_open_social('whatsapp')()" href="#" style='color:green;' style='margin-right:auto;'><img src='./assets/icons/wt.png'> Whatsapp</a>
        </div>
        <label id='HFCGDFGD' class="form-item__label"><small>(تواصل مع المطور)</small> واتساب</label>
    </div>
    <div class='line'></div>
    <div class="form-item">
        <div>
            <a onclick="eel.python_open_social('youtube')()" href="#" style='color:red;' style='margin-right:auto;'><img src='./assets/icons/yt.png'> Youtube</a>
        </div>
        <label id='HFCGDFGD' class="form-item__label">يوتيوب <small>(فديوهات شرح للبرنامج)</small></label>
    </div>
</fieldset>
<p>هذه الإصدار خاص بالإستاذ/صلاح سرور</p>
<p>© Ahmed Shokry</p>
`
               
// about mathar - modal
$('.about-btn').on('click', function(){
    Swal.fire({
        title: "<h1>Mathar 1.0.0</h1>",
        html: "<small><q>The teacher's tool to innovate</q></small><br>"+about_html,
        showConfirmButton: false,
    })
});