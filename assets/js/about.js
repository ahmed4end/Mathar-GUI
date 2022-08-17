const about_html = `
<p>هذه الإصدار  يحتوى على أسئلة كتاب المعاصر<br>الصف الثالث الإعدادى فى <b>الجبر</b></p>
<div class='line'></div>
<fieldset>
	<legend>
		<h5>تواصل مع أحمد شكرى</h5>
	</legend>
	<div class='flex-row flex-even'>
		<a onclick="eel.python_open_social('youtube')()" href="#" style='color:#FF0000;' title='فديوهات شرح البرنامج' class='flex-col flex-center'>
			<img src='./assets/icons/yt.png'><span> Youtube</span>
		</a>
		<a onclick="eel.python_open_social('telegram')()" href="#" style='color:#0088cc;' title='تواصل معى عبر تليجرام' class='flex-col flex-center'>
			<img src='./assets/icons/tg.png'><span> Telegram</span>
		</a>
		<a onclick="eel.python_open_social('facebook')();" href="#" title='تواصل معى عبر فيسبوك' class='flex-col flex-center'>
			<img src='./assets/icons/fb.png'><span style='color:#3b5998'> Facebook</span>
		</a>
	</div>
</fieldset>
<a id='about_toggle' href='#'>عرض المزيد</a>
<div id='about_more' style='display:none;'>
	<div class='line'></div>
	<p>هذا البرنامج يتكون من خوارزميات لرسم المعادلات الرياضية بالنسق الحديث المستخدم فى الكتب المعاصرة للرياضيات</p>
</div>
<div class='line'></div>
<a id='about_devo_toggle' href='#'>من هو مطور البرنامج ؟</a>
<div id='about_devo' style='display:none;'>
	<div class='line'></div>
	<p dir="rtl">
	أسمى أحمد شكرى خريج قسم رياضيات (2021) ومبرمج بلغة python ، أبحث عن فرصة لتطوير برامج تعليمية متعلقة بالرياضيات تواصل معى فى حالة أمامك فرصة ما.
	</p>
</div>
`

// about mathar - modal
$('#about').on('click', function(){
	Swal.fire({
		title  : "<h1 class='azure' title='Mather = Math(Mathematics) + Ar(Arabic)'>—Mathar 1.2.0—</h1>",
		html   : about_html,
		footer : modal_footer,
		showConfirmButton: false,
		didOpen: () =>{
			$('#about_toggle').on('click',function(){
				audio.play();
				$('#about_more').slideToggle('fast')
				$("#about_toggle").text() ===  'عرض المزيد' ? $(this).text('عرض أقل'): $(this).text('عرض المزيد');
			});
			$('#about_devo_toggle').on('click',function(){
				audio.play();
				$('#about_devo').slideToggle('fast')
			});
		}
	})
});
