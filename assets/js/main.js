"use strict";
"use luck";

/*

// Diable F5 Button
function disableButtonsDown(e) { 
    if ((e.which || e.keyCode) == 116) e.preventDefault(); 
};
$(document).on("keydown", disableButtonsDown);


// Disable Right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable some short keys
document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

*/

//preloader config
$(window).load(function() {
    $(".preloader").delay(1000).fadeOut("smooth");
});


/* init public powerfull funcs */
var btn_select_row = "<form></form><button class='btn_1 icon-plus'><span>أختر</span></button>";


function text(txt){ // [DEV] remove it - no need for it.
    return `<div id="textCell">${txt}</div>`;
};


//swal - welcome message
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//table funcs.

function table_image_wrapper(image){
    return `<img class='lozad' data-src='./images/${image}.png' loading='lazy' alt='${image}'>`
};

function vertical_wrapper(txt){
    return `<div style="writing-mode: vertical-lr;display:inline-block;">${txt}</div>`
}

//table 1 -<col1:id>- id parser.
function table_id_parser(data, type ){
    var icon = '';
    var tooltip ='';
    var data = data.split(' ')
    if (data.length==1){data = ['d', data]}
    if (type=='display'){
        switch(data[0]){
            case 'd':
                icon='dynamic_lamp';
                break;
            case 's':
                icon='static_lamp';
                break;
        }
    } 
    return  `<div style="writing-mode: tb-rl;display:inline-block;">
                <div style="text-align: center;margin-bottom:5px;" class="${icon}">
            </div>
            <div style="display: inline-block;color:grey;" id="table1Id">${data[1]}</div>`
}

function table_col_last(data, type){
    return data+btn_select_row
}

function table_col3(arr) {
    // arr = [unit, lesson, page, prob, node]
    var res = []
    if (arr[0]) {res.push(`و${arr[0]}`)};
    if (arr[1]) {res.push(`د${arr[1]}`)};
    if (arr[2]) {res.push(`ص${arr[2]}`)};
    if (arr[3]) {res.push(`س${arr[3]}`)};
    if (arr[4]) {res.push(`م${arr[4]}`)};
    return res.join('<br>')
}


$(document).ready(function(){
    // tooltips config.
    tippy.setDefaultProps({delay: [100, 50]});
    tippy('[data-tippy-content]');
    // swal var.
    var swal_modals = []
    // swal toastr.
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: false,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            toast.addEventListener('click', Swal.close)
        }
    })

    // INIT vars 
    var increament_var = 1
    const audio = new Audio("assets/btn2.wav"); 

    //table 1
    var table1 = $('#table1').DataTable( {
        
        data: dataSet,
        columns: [
            { title: "i."},
            { title: "id", render: table_id_parser},
            { title: "المسئلة", width:'55%', render: table_image_wrapper},
            { title: icon_book, render: table_col3},
            { 
                title: "نوع",
                render: function(data, type){return vertical_wrapper(data);}
            },
            { title: "وصف"},
            { title: "إعدادات", render: table_col_last, width:'20%'}
        ],
        
        ...table1_args, // vars.js
        
        //table column 0 filter.
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select><option value=""></option></select>')
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );
                    column
                        .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                } );
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' );
                } );
            } );
        },

    });
    
    // pagination change event - force load all images in the page.
    //table1.on( 'page.dt', function () {  });

    //add placeholder to filter.
    $('#table1_filter input').attr('placeholder', 'البحث');

    //table pages
    var table1_nodes = table1.rows().nodes();
    const table1_images = $('.lozad', table1_nodes);
    
    // column 0 - table 1  - draw index increament.
    table1.on('order.dt search.dt', function () {
        table1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        });
    }).draw();  

    //btn click sound - table 1.
    table1.on('click', 'button', function() {
        audio.play();
    });
    //button sound on click - public declare for the rest of mathar.
    $('button').on('click', function () {
        audio.play();
    });

    //table 2
    var table2 = $('#table2').DataTable({
    
        columns: [
            { title: "i." },
            { title: "id" },
            { title: "المسئلة", width:'55%'},
            { title: icon_book},
            { title: "نوع" },
            { title: "وصف" },
            { title: "إعدادات", width:'20%' }
        ],

        ...table2_args, // vars.js
        
    });

    // reorder column 1 indexes when swaping any rows.
    table2.on( 'order.dt', function () {
        table2.column(0, {order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    // Show alert if the table is empty when clicked on the Clear Table button
    $( "#clearTable" ).click(function() {
        if (table2.data().count() == 0) {
            Swal.fire({
                text: "الجدول فارغ بالفعل",
                showConfirmButton:false,
                timer: 2000
            });              
        } else {
            Swal.fire({
                title: "هل متأكد من هذه الخطوة ؟",
                text: "أنت الأن على وشك القيام بتفريغ الجدول",
                icon: "warning",
                confirmButtonText: 'موافق',
                showCancelButton: true,
                cancelButtonText: 'إلغاء'
            })
                .then((result) => {
                if (result.isConfirmed) {
                    table2.clear().draw();
                    Swal.fire({
                        text:"! تم تفريغ الجدول بنجاح", 
                        icon: "success",
                        showConfirmButton:false,
                        timer:2000

                    });
                }
            });
        }
    });
    
    // move row from table 1 to table 2 
    table1.on('click', '.btn_1', function () {

        var row = $(this).closest('tr').clone();

        //get row id.
        var rowId = row.find('#table1Id').html();
        //get user input values from form.
        var userInputValues = JSON.stringify({[rowId] : $('form', row).serializeJSON()})
        //store user input values in form tag.
        $('form', row).attr('data-dict', userInputValues);

        //fire toast.
        Toast.fire({
            icon: 'info',
            title: `لجدول المختارات ${rowId} تم إضافة`
        });

        //remove button of row.
        var optionsT1 = row.find('td:last-child');
        optionsT1.find('button').remove();

        // convert inputs to <p> -> table 2.
        $('input', optionsT1).each(function() {
            $(this).replaceWith('<label id="'+this.id+'">'+this.value+'</label>');
        });
        optionsT1 = optionsT1.html();

        //remove options cell before adding the row to table 2.
        row.find('td:last-child').remove();
        row.find('td:first-child').html(increament_var);
        increament_var = increament_var + 1

        //processing the row then adding it to table 2 .
        row = row.append('<th>'+optionsT1+'<button class="r_b_s btn_1 icon-remove"><span>إزالة</span></button></th>');
        row  = row.html();
        table2.row.add($('<tr>'+row+'</tr>')).draw();

        //button sound on click - table 2.
        $(".r_b_s").on('click', function() { 
            audio.play();
        });
    });


    // remove row - table 2
    $('#table2 tbody').on( 'click', '.btn_1', function () {
        table2
            .row( $(this).parents('tr') )
            .remove()
            .draw()
    });

    // python spawn func .
    async function _openFileLoaction() {
        await eel.openFileLoaction();
    };

    // saveImage Button event
    $('#saveImage').on('click', function () {
        _openFileLoaction();
    });


    // image viewer - tap 3
    var viewer = OpenSeadragon({
        id: "openseadragon.exe",
        immediateRender: true,
        prefixUrl: './assets/icons/openseadrag-icons/', /* icons path */
        buildPyramid: true, 
        useCanvas:false
    });
    // hide viewer for now.
    viewer.setVisible(false);

    var index = 0;

    // python - call to fetch data function.
    async function callPython(data) {
        // fetch images from python server.
        var tileSources = await eel.getImages(data)();
        // hide viewer for now.
        viewer.setVisible(false);
        // remove prev tiles/images and add newer ones. 
        viewer.addTiledImage({
            tileSource: {url: tileSources[0], type: 'image'},
            index: 1,
            replace: true,
            preload: true
        });
        viewer.addTiledImage({
            tileSource: {url: tileSources[1], type: 'image'},
            index: 0,
            replace:true,
            preload: true,
        });
        index = 1
    }

    // toggle between images inside viewer.
    $('#toggleImages').on('click', function () {
        //twiggle show/hide answer btn text.
        if (index==1){
            $(this).text('إخفاء الإجابة')
        }
        else{
            $(this).text('إظهار الإجابة')
        }

        var oldTiledImage = viewer.world.getItemAt(index);
        index = (index + 1) % 2;
        var nextIndex = (index + 1) % 2;
        var newTiledImage = viewer.world.getItemAt(index);
        var nextTiledImage = viewer.world.getItemAt(nextIndex);
        oldTiledImage.setOpacity(0);
        newTiledImage.setOpacity(1);
        nextTiledImage.setPreload(true);
    }); 

    // collect data - table 2 - when button is clicked.
    $( "#collectData" ).click(function() {
        audio.play()
        if (table2.data().count() == 0) {
            Swal.fire({
                text:"يرجى اختيار مسائل اولاً", 
                showConfirmButton: false,
                timer: 2000
            });
        } 
        else {
            //hide stuff while waiting for python.
            $("#tap3_loader_con").fadeIn("slow");
            $('#collectData').prop('disabled', true)
            $('#toggleImages').fadeOut();
            $('#saveImage').fadeOut();
            $('.tap3_not_yet').fadeOut();
            viewer.setVisible(false);

            // collect data from table 2             
            var rowOptions = table2.column(6).nodes();

            rowOptions = rowOptions.toArray().map(ele=>$('form', ele).first().data('dict'))

            viewer.addHandler('tile-loaded', function(){
                //show stuff cuz python sent data.
                viewer.setVisible(true);
                $('#collectData').prop('disabled', false)
                $('#toggleImages').fadeIn();
                $('#saveImage').fadeIn();
                $("#tap3_loader_con").fadeOut("slow");
                //fire toast.
                Toast.fire({icon: 'success', title: 'تم التكوين - إذهب لنافذة المعاينة لرؤية النتيجة'});
                // run swal queue modals
                Swal.queue(Array.from(swal_modals));
            });

            //console.log(RowOptions)
            callPython(rowOptions);

            Toast.fire({
                icon: 'info',
                title: 'جارى التكوين - إذهب لنافذة المعاينة لإنتظار النتيجة'
            });
            
        }

    });


    // tap 4 - settings.

    /* checkboxes status text - update event */
    $('.form-item__control input').click(function(){
        if ( $(this).is(':checked') ){
            $('span', $(this).parent()).text('مفعل');
        }
        else {
            $('span', $(this).parent()).text('غير مفعل');
        }
    });

    // tap 1 start zooming event.
    $('#switch_zoom').click(function(){
        if ( $(this).is(':checked') ){
            console.log('on');
            // toast
            Toast.fire({
                    icon: 'info',
                    title: 'الأن يمكنك تكبير المسائل فى الجدول بتحريك الماوس فوقها',
            });
            for (var i = 0; table1_images.length > i; i++) {
                table1_images[i].classList.toggle('zoomEffect');
            }
        }
        else {
            console.log('off');
            // toast
            Toast.fire({
                    icon: 'info',
                    title: 'تم إلغاء تكبير المسائل فى الجدول بتحريك الماوس فوقها',
            });
            for (var i = 0; table1_images.length > i; i++) {
                table1_images[i].classList.toggle('zoomEffect');
                console.log(table1_images)
            }
        }
    });


    // settings vars 
    var font_name = 'Yakout';
    var font_size = 70;
    var paper_count = 1;
    var is_random = 0;
    var color_title = 'black';
    var color_probs = 'black';
    var color_answer = 'green';

    
    $('#font_name').on('change', function(){
        font_name = this.value
    });
    
    $('#font_size').on('change paste', function(){
        if (this.value>120){ // validate max value
            $('#font_size').prop('value', '120');
        };
        if (this.value<40){ // validate min value
            $('#font_size').prop('value', '40');
        };
        font_size = this.value;
    });

    $('#paper_count').on('change', function(){
        paper_count = this.value
    });

    $('#is_random').click(function(){
        if ( $(this).is(':checked') ){
            console.log('is_random: on');
            is_random = 1;
        }
        else {
            console.log('is_random: off');
            is_random = 0;
        }
    });

    $('#color_title').on('change', function(){
        color_title = this.value
    });

    $('#color_probs').on('change', function(){
        color_probs = this.value
    });

    $('#color_answer').on('change', function(){
        color_answer = this.value;
    });
    
    async function update_config_js(config){
        await eel.update_config(config)
    };

    //save settings button - event
    $('.save_settings').on('click', function(){
        var settings_config = {
            'font_name': font_name,
            'font_size': font_size,
            'paper_count': paper_count,
            'is_random': is_random,
            'color_title': color_title,
            'color_probs': color_probs,
            'color_answer': color_answer
        };

        Swal.fire({
            title: "جارى حفظ الإعدادات", 
            timer: 500,
            didOpen: () => {
                Swal.showLoading();
                update_config_js(settings_config);
            }
        });
    });


    // expose func ro python for failed queue.
    eel.expose(failed_queue_js);
    function failed_queue_js(queue){
        var con = `
        <p class='text-danger'>قد قمت بإختيار عدد كبير من الأسئلة والورقة المكونة مساحتها لا تكفى فتم تجاهل</p>
        <ul style='overflow-y:scroll;height:30vh;' class='bg-light'>`;
        con = con + queue.map((x) => `<li>${x}</li>`).join('');        
        con = con + "</ul><small class='text-danger'>يرجى حذف بعض المسائل من جدول المختارات ليتناسب عدد الأسئلة مع حجم الورقة أو قم بتصغير حجم الخط من الإعدادات لتسع الورقة مسائل أكثر</small>";
        swal_modals = []; // clear swal modals
        // push swal modal
        if (queue.length>0){swal_modals.push({title: 'تحذير', html: con, timer:40000})};
    }
}); 


//toggle steps - event - tab3
$('.tap3_toggle_steps').on('click', function(){
    if ($('.tap3_instructions').css('display')=='none'){
        $('.tap3_instructions').animate({height:'toggle'});
    } else {
        $('.tap3_instructions').animate({height:'toggle'});
    }
});

// tabs - swap active class.
$('.tabs li').on('click', function(tab){
    const currentTab = $(this).closest('li');
    currentTab.siblings().removeClass('active');
    currentTab.addClass('active');
    const index = $(currentTab).parent().children().toArray().indexOf(...currentTab);

    $(".tabs-panel").removeClass("active");
    $(`.tabs-panel[data-index="${index}"]`).addClass("active");
});

const about_modal = `
<p>
هذه الإصدار من البرنامج يحتوى على<br>كتاب المعاصر الصف الأول الثانوى الترم الأول
</p>
<fieldset>
    <legend>
    <h3>تواصل معنا</h3>
    </legend>
    <div class="form-item">
        <div>     
            <img src='./assets/icons/facebook.png'>
            <a onclick="eel.open_social('youtube')();" href="#">Facebook</a>
        </div>
        <label id='HFCGDFGD' class="form-item__label">:فيسبوك</label>
    </div>
    <div class='line'></div>
    <div class="form-item">
        <div>
            <img src='./assets/icons/whatsapp.png'>
            <a onclick="eel.open_social('facebook')()" href="#" style='color:red;' style='margin-right:auto;'>Whatsapp</a>
        </div>
        <label id='HFCGDFGD' class="form-item__label">:واتساب</label>
    </div>
    <div class='line'></div>
    <div class="form-item">
        <div>
            <img src='./assets/icons/youtube.png'>
            <a onclick="eel.open_social('facebook')()" href="#" style='color:red;' style='margin-right:auto;'>Youtube</a>
        </div>
        <label id='HFCGDFGD' class="form-item__label">:يوتيوب</label>
    </div>
</fieldset>
`
               
// about mathar - modal
$('.about-btn').on('click', function(){
    Swal.fire({
        title: "<h1>Mathar</h1>",
        icon: 'info',
        html: "<small><q>The teacher's tool to innovate</q></small><br>"+about_modal,
        showConfirmButton: false,
        showCloseButton: true
    })
});


