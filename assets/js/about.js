const about_html = `
<p>هذه الإصدار  يحتوى على بنك أسئلة كتاب المعاصر<br>الصف الثالث الثانوى فى <q><b>الجبر</b></q> لعام 2021</p>
<div class='line'></div>
<fieldset>
<legend>
<h5>تواصل معنا</h5>
</legend>
<div style='display:flex;padding:0.3em 0;justify-content:space-evenly;'>
<a onclick="eel.python_open_social('youtube')()" href="#" style='color:#FF0000;' title='فديوهات شرح البرنامج'>
<img src='./assets/icons/yt.png'><span> Youtube</span>
</a>
<a onclick="eel.python_open_social('whatsapp')()" href="#" style='color:#25D366;' title='تواصل معى عبر واتساب'>
<img src='./assets/icons/wt.png'><span> Whatsapp</span>
</a>
<a onclick="eel.python_open_social('facebook')();" href="#" title='تواصل معى عبر فيسبوك'>
<img src='./assets/icons/fb.png'><span style='color:#3b5998'> Facebook</span>
</a>
</div>
</fieldset>
<a id='about_toggle' href='#'>عرض المزيد</a>
<div id='about_more' style='display:none;'>
<div class='line'></div>
<p>هذا البرنامج يتكون من خوارزميات لرسم المعادلات الرياضية بالنسق الحديث المستخدم فى الكتب المعاصرة للرياضيات</p>
</div>

`

// about mathar - modal
$('#about').on('click', function(){
    Swal.fire({
        title  : "<h1 class='azure' title='Mather = Math(Mathematics) + Ar(Arabic)'>—Mathar 1.1.0—</h1>",
        html   : about_html,
        footer : modal_footer,
        showConfirmButton: false,
        didOpen: () =>{
            $('#about_toggle').on('click',function(){
                audio.play();
                $('#about_more').slideToggle('fast')
                $("#about_toggle").text() ===  'عرض المزيد' ? $(this).text('عرض أقل'): $(this).text('عرض المزيد');
            })
            
        }
    })
});
