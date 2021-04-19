"use strict";
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


$(window).load(function() {
    $(".preloader").delay(1000).fadeOut("smooth");
});


/* init public powerfull funcs */
var btn_select_row = "<form></form><button class='btn_1 icon-plus'><span>أختر</span></button>";


function text(txt){ // [DEV] remove it - no need for it.
    return `<div id="textCell">${txt}</div>`;
};

// id_col_icon vars
var dynamicT = 'هذه المسئلة ديناميكة'
var staticT = 'هذه المسئلة إستاتيكية'
//


const icon_book = `<svg width="25" height="25" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
<path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>`

const icon_search = `<svg width="24" height="24" viewBox="0 0 48 48" fill="rgba(22, 24, 35, 0.34)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"></path></svg>`

//swal - welcome message
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//table funcs.

function table_image_wrapper(image){
    return `<img class='imgc lozad' data-src='./images/${image}.png' loading='lazy' alt='${image}'>`
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
                tooltip = dynamicT;
                break;
            case 's':
                icon='static_lamp';
                tooltip= staticT;
                break;
        }
    } 
    return  `<div style="writing-mode: tb-rl;display:inline-block;">
                <div style="text-align: center;margin-bottom:5px;" class="${icon}">
            </div>
            <div style="display: inline-block;" id="table1Id">${data[1]}</div>`
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
        "autoWidth":false,
        "lengthChange":true,
        "paging":true,
        "pageLength": 25,
        "lengthMenu": [ 25, 50, 100, 200, 800 ],
        "bPaginate":false,
        "order": [],
        "bAutoWidth": false,
        "bInfo":true,
        "dom": '<"top"><f><t><"#margin5px"><"clear"><"footerContainer"lp>',
        rowReorder:false,
        data: dataSet,
        fixedHeader: {
            header: false,
            footer: false
        },
        columns: [
            { title: "i."},
            {   
                title: "id",
                render: table_id_parser,
            },
            { title: "المسئلة", width:'50%', render: table_image_wrapper},
            { title: icon_book, render: table_col3},
            { 
                title: "نوع",
                render: function(data, type){return vertical_wrapper(data);}

            },
            { title: "مفتاح"},
            { title: "إعدادات", render: table_col_last}
        ],
        "columnDefs": [{
            "searchable": true,
            "orderable": false,
            "targets": 0,
            "className": "dt-center", 
            "targets": "_all"
        }], 
        "language": {
            "sLengthMenu": "أظهر _MENU_ مدخلات",
            "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
            "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
            "sInfoPostFix": "",
            "sSearch": "ابحث:",
            "search": "_INPUT_"+`<div class='search-icon'>${icon_search}</div>`,
            "sUrl": "",
            "oPaginate": {
                "sFirst": "الأول",
                "sPrevious": "السابق",
                "sNext": "التالي",
                "sLast": "الأخير"
            }
        },

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

    //add placeholder to filter.
    $('#table1_filter input').attr('placeholder', 'أبحث عن ...');

    //table pages
    var table1_nodes = table1.rows().nodes();

    // tooltip - table 1
    tippy(`.dynamic_lamp`, {
        content: dynamicT,
    });
    tippy(`.static_lamp`, {
        content: staticT,
    });

    //lazy loader - table 1.
    const table1_images = $('.lozad', table1_nodes);
    for (var i = 0; i < table1_images.length; i++) {
        const observer = lozad(table1_images[i]); 
        observer.observe();
    };
    
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
        rowReorder:true,
        "lengthChange":false,
        "bFilter": false,
        "bLengthChange": false,
        "bAutoWidth": false,
        "bPaginate": false,
        "bInfo":false,
        data: [],
        columns: [
            { title: "i." },
            { title: "id" },
            { title: "المسئلة", width:'50%'},
            { title: icon_book},
            { title: "نوع" },
            { title: "مفتاح" },
            { title: "إعدادات" }
        ],
        "columnDefs": [{
            "searchable": true,
            "orderable": false,
            "targets": 0,
            "className": "dt-center reorder", //row reorder - class 'reorder' changes cursor icon on hover.
            "targets": "_all"
        }],
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
        id: "wheelzoom.exe",
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
            $("#resultLoaderContainer").fadeIn("slow");
            $('#collectData').prop('disabled', true)
            $('#toggleImages').fadeOut();
            $('#saveImage').fadeOut();
            $('.notYet').fadeOut();
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
                $("#resultLoaderContainer").fadeOut("slow");
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
    
    $('#font_size').on('change', function(){
        font_size = this.value
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
        //eel.update_config(settings_config)();
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
    eel.expose(failed_queue_js)
    function failed_queue_js(queue){
        var con = `
        <p>قد قمت بإختيار عدد كبير من الأسئلة والورقة المكونة مساحتها لا تكفى فتم تجاهل</p>
        <ol>
        `
        for (i = 0; i < queue.length; i++) {
            con = con + `<li>${queue[i]}</li>`
        }
        con = con + `
        </ol>
        <small class='text-danger'>يرجى حذف بعض المسائل من جدول المختارات ليتناسب عدد الأسئلة مع حجم الورقة أو قم بتصغير حجم الخط من الإعدادات لتسع الورقة مسائل أكثر</small>
        `

         swal_modals = []; // clear swal modals
        // push swal modal
        if (queue.length>0){
            swal_modals.push({title: 'تحذير', html: con, timer:15000})
        }
    }

    // tooltips config.
    tippy.setDefaultProps({
        delay: [100, 50],
        theme: 'light center-align'
    });
    tippy('[data-tippy-content]');

}); 


// tab4 - settings - checkbox & color picker - handler


//toggle steps - event - tab3
$('.toggleT3Steps').on('click', function(){
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

const fd = `
<p>
هذه الإصدار من البرنامج يشمل فقط كتاب المعاصر الصف الأول الثانوى الترم الأول
</p>
<fieldset>
    <legend>
    <h3>تواصل معنا</h3>
    </legend>
    <div class="form-item">
        <img src='./assets/icons/facebook.png'>
        <div class="form-item__control">     
            <a onclick="eel.open_social('youtube')();" href="#">Facebook</a>
        </div>
        <label id='HFCGDFGD' class="form-item__label">:فيسبوك</label>
    </div>
    <div class='line'></div>
    <div class="form-item">
        <img src='./assets/icons/youtube.png'>
        <div class="form-item__control">
            <a onclick="eel.open_social('facebook')()" href="#" style='color:red;' style='margin-right:auto;'>Youtube</a>
        </div>
        <label id='HFCGDFGD' class="form-item__label">:يوتيوب</label>
    </div>
</fieldset>
`
               
// about mathar - modal
$('.about-btn').on('click', function(){
    Swal.fire({
        title: "<h1>Mathar 1.0</h1>",
        icon: 'info',
        html: "The teacher's tool to innovate.<br>"+fd,
        showConfirmButton: false,
        showCloseButton: true
    })
});


