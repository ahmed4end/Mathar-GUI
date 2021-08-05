'use luck';
'use strict';

// disable dev buttons
//disable_dev_buttons()

// stop input fro submitting on enter.
$(window).keydown(function(event){
    if(event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
});

//preloader config
$(window).load(function() {
    $(".preloader").delay(0).fadeOut("smooth");
});

/* init public powerfull funcs */

function text(txt){ // [DEV] remove it - no need for it.
    return `<div id="textCell">${txt}</div>`;
};

//swal - welcome message
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//table funcs.
function table_image_wrapper(image){
    return `<img class="lazyload table_image" data-sizes="auto" data-srcset='./assets/icons/table/${image}.png' alt='${image}'>`
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

function table_col3(arr) {
    // arr = [unit, lesson, page, prob, node]
    var res = []
    if (arr[0]) {res.push(`ص${arr[0]}`)};
    if (arr[1]) {res.push(`س${arr[1]}`)};
    if(res.length>0){
        return res.join('<br>')
    }else{
        return '<span class="silver">—</span>'
    }   
}

function table_col_last(data, type){
    return data+"<form></form><button class='to_table2 btn_1 icon-plus'><span>أختر</span></button>";
}

const audio = new Audio("assets/btn.wav"); 

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

    //table 1
    var table1 = $('#table1').DataTable( {

        data: dataset,
        columns: [
            { title: "i.", width: '1%'},
            { title: "id", render: table_id_parser, width: '1%'},
            { title: "المسئلة", width:'55%', render: table_image_wrapper},
            { title: icon_book, render: table_col3, width:'2%'},
            { 
                title: "نوع",
                render: function(data, type){return vertical_wrapper(data);},
                width:'2%'
            },
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

    // prepare filter options - using lessons var form dataset.js
    var fiter_data = '';
    for (var key in lessons) {
        fiter_data = fiter_data +`<option value='${lessons[key]}'>${lessons[key]}</option>`
    }

    $('.table1_fcon .left').html(
        `
<select id='slecet_filter'>
<option value='ALL'>الكل</option>
${fiter_data}
</select>
`
    );

    $('.table1_fcon .left').hover(function(){
        tippy(this, {
            content: 'أختر الفلتر المناسب من هنا',
        });
    });

    $('#slecet_filter').on('change', function() {
        if (this.value=='ALL'){
            table1.columns().search("").draw();
            Toast.fire({
                icon: 'success',
                title: "عرض كل المسائل"
            });
        }else{
            table1.columns(4).search('^'+this.value+'$',true,false).draw(); 
            Toast.fire({
                icon: 'success',
                title: `عرض ${this.value} فقط`
            });
        }
    });


    // tooltips config.
    tippy.setDefaultProps({delay: [400, 150]});
    tippy('[data-tippy-content]'); // [BUG]table 1 pages other than 1 does not work with tippy
    //////////////////

    //table1.on( 'page.dt', function () {  });

    //add placeholder to filter.
    $('#table1_filter input').attr('placeholder', 'البحث');

    //table pages
    var table1_nodes = table1.rows().nodes();
    const table1_images = $('.lazyload', table1_nodes);

    // column 0 - table 1  - draw index increament.
    function enumerate_table1(){
        table1.on('order.dt search.dt', function () {
            table1.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                cell.innerHTML = i+1;
            });
        }).draw(); 
    }
    enumerate_table1()

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
            { title: "i.", width: '1%' },
            { title: "id", width: '1%' },
            { title: "المسئلة", width:'55%'},
            { title: icon_book, width:'2%'},
            { title: "نوع", width:'2%' },
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
            title: "! تفريغ الجدول",
            icon: "warning",
            confirmButtonText: 'تأكيد',
            showCancelButton: true,
            cancelButtonText: 'إلغاء'
        })
            .then((result) => {
            if (result.isConfirmed) {
                table2.clear().draw();
                Swal.fire({
                    text:"تم تفريغ الجدول بنجاح", 
                    icon: "success",
                    showConfirmButton:false,
                    timer:2000

                });
            }
        });
    }
});

// License

var attempts = 0 // var to count how many times user tries to enter serial num.
const license_dict = {
    0: 'مجانى',
    1: '★ مدفوع',
}

function unlock_table1(){ // replace table1 pro btns with to_table2 btns.
    Swal.fire({
        title: '<h1 class="azure">جارى ترقية البرنامج للنسخة المدفوعة</h1>',
        text: 'شكراً لشرائك البرنامج, لقد ساهمت بإستمرار تطويره ',
        timer: 2000,
        didOpen: ()=>{
            Swal.showLoading();
            // update table 
            table1.rows().remove().draw();
            table1.rows.add(dataset).draw();
        },
    });
    // empty demos
    demos = [];
}

function license_update(level=0) {
    license_value = level;
    $('#license_status').text(license_dict[level]);
    if (level>=1) {
        $('#license_status').addClass('orange'); 
        unlock_table1()
    }
}

async function license_swal() {
    const { value: serial } = await Swal.fire({
        title: 'ترقية البرنامج',
        text: "— لشراء سيريال تواصل مع مطور البرنامج —",
        input: 'text',
        inputLabel: 'السيريال',
        inputPlaceholder: 'رقم السيريال',
        confirmButtonText: 'تأكيد',
        inputAttributes: {
            maxlength: 20,
            autocapitalize: 'off',
            autocorrect: 'off'
        }
    })

    try {
        var validation = await eel.python_validate_serial(serial)();
    } catch (error) {
        console.error(error);
        var validation = 0
        }

    if (validation) { 
        license_update(1);
        Swal.fire({
            icon: 'success',
            title: 'السيريال صحيح',
            html: 'تم ترقية البرنامج للنسخة المدفوعة بنجاح<br>يمكنك الأن إستخدام كل المسائل/المميزات بالبرنامج',
            confirmButtonText:'حسناً',
        });
        unlock_table1()

    } else if(!validation && serial) {

        attempts = attempts+1

        if (attempts<5) {
            Swal.fire({
                icon: 'error',
                title: 'عفواَ هذا السيريال خاطئ',
                text: 'تواصل مع مطور البرنامج لشراء سيريال لتفعيل البرنامج',
                confirmButtonText:'حاول مرة آخرى',
                cancelButtonText: 'حسناً',
                showCancelButton: true,
                footer: modal_footer,
            }).then(function(result){
                if (result.value){
                    license_swal()  
                }
            });
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'لقد حاولت كثيراً رجاءاً تمهل',
                text: 'رجاءاً قدر جهود صانع البرنامج وقم بشراء سيريال لتفعيل البرنامج بشكل قانونى فهذا يساهم فى إستمرار صناعة نسخ آخرى من البرنامج',
                showConfirmButton: false,
                footer: modal_footer,
            })
            attempts = 0
        }
    } else {
        // exit serial val here.
    }
}

async function init_license(){
    // call python to get license status
    try { 
        license_value = await eel.python_get_serial_status()(); 
    } catch {
        license_value = 0;
}
        // refresh license status
        license_update(license_value);

    $(document).on('click', '#license',function(){
        if (license_value==0){
            license_swal();
        }
        if (license_value==1){
            Swal.fire({
                icon: 'success',
                html:`— لقد قمت بترقية البرنامج بالفعل —<br><small>شكراً لشرائك البرنامج, دعمك يساهم فى إستمرار صناعة نسخ أخرى</small>`,
                footer: modal_footer,
                showConfirmButton: false,
            });
        }
    })

    // pro btn event
    table1.on('click', 'button', function () {
        if ($(this).hasClass('btn_1-pro')){
            Swal.fire({
                title: '—ترقية البرنامج—',
                text: '',
                html: `
<p>يرجى شراء سيريال لتفعيل البرنامج للتمكن من أستخدام كافة المسائل والمميزات</p>
<small><q>المسائل ذات اللون الذهبى تحتاج لترقية البرنامج لإستخدامها</q></small>
`,
                confirmButtonText: 'إدخل السيريال',
                cancelButtonText: 'حسناً',
                showCancelButton: true,
                footer: modal_footer,
            }).then(function(res){
                if(res.isConfirmed){
                    license_swal()
                }
            })
        }
        if ($(this).hasClass('to_table2')){
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
        }
    });
}

// init License func
init_license()

// END - license

// remove row - table 2
$('#table2 tbody').on( 'click', '.btn_1', function () {
    table2
        .row( $(this).parents('tr') )
        .remove()
        .draw()
});

// python spawn func .
async function _python_openFileLoaction() {
    await eel.python_openFileLoaction();
};

// saveImage Button event
$('#saveImage').on('click', function () {
    _python_openFileLoaction();
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

var queue_break = true

viewer.addHandler('tile-loaded', function(){
    // show stuff cuz python sent data.
    viewer.setVisible(true);
    $('#create').prop('disabled', false)
    $('#toggle_images').fadeIn();
    $('#saveImage').fadeIn();
    $("#tap3_loader_con").fadeOut("slow");
    $('#toggle_images').find('h5').text('إظهار الإجابة')

    if(queue_break && swal_modals.length>0){
        // fire queue swals
        Swal.queue(Array.from(swal_modals));
    } 
    if(swal_modals.length==0) {
        // fire toast.
        Toast.fire({icon: 'success', title: 'تم التكوين - إذهب لنافذة المعاينة لرؤية النتيجة'});
    }
    queue_break = !queue_break
});

var index = 0;

// python - call to fetch data function.
async function callPython(data) {
    // fetch images from python server.
    var tileSources = await eel.python_getImages(data)();
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

    queue_break = true
}

// toggle between images inside viewer.
$('#toggle_images').on('click', function () {
    // twiggle show/hide answer btn text.
    if (index==1){
        $(this).find('h5').text('إخفاء الإجابة')
    }
    else{
        $(this).find('h5').text('إظهار الإجابة')
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
$( "#create" ).click(function() {
    audio.play()
    if (table2.data().count() == 0) {
        Swal.fire({
            text:"يرجى إختيار مسائل أولاً من جدول المسائل", 
            showConfirmButton: false,
            timer: 3000
        });
    } 
    else {

        // hide stuff while waiting for python.
        $("#tap3_loader_con").fadeIn("slow");
        $('#create').prop('disabled', true)
        $('#toggle_images').fadeOut();
        $('#saveImage').fadeOut();
        $('.tap3_not_yet').fadeOut();
        viewer.setVisible(false);
        // show and refresh papar counter.
        refresh_paper_count()
        if (paper_count>1){$('#paper_counter').fadeIn('slow')};

        // collect data from table 2             
        var rowOptions = table2.column(5).nodes();

        rowOptions = rowOptions.toArray().map(ele=>$('form', ele).first().data('dict'))

        //console.log(RowOptions)
        callPython(rowOptions);
        // clear modals queue.
        swal_modals = [];

        Toast.fire({
            icon: 'info',
            title: 'جارى التكوين - إذهب لنافذة المعاينة لإنتظار النتيجة'
        });


    }

});

const zoom = mediumZoom()
//table pages
const table2_images = $('.lazyload', table2.rows().nodes());

// tap 1 start zooming event.
$('#switch_zoom').click(function(){
    if ( $(this).is(':checked') ){
        console.log('zoom: on');
        // toast
        Toast.fire({
            icon: 'info',
            title: 'الأن يمكنك تكبير المسائل فى الجدول بالضغط على صورة المسئلة',
        });
        // enable zoom on table 1
        for (var i = 0; table1_images.length > i; i++) {
            zoom.attach(table1_images[i])
        }
    }
    else {
        console.log('zoom: off');
        // toast
        Toast.fire({
            icon: 'info',
            title: 'تم إلغاء تكبير المسائل فى الجدول',
        });
        // disable zoom on table 1
        for (var i = 0; table1_images.length > i; i++) {
            zoom.detach(table1_images[i]) 
        }
        // diable zoom on table 2
        for (var i = 0; table2_images.length > i; i++) {
            zoom.detach(table2_images[i]) 
        }
    }
});

// expose func ro python for failed queue.
eel.expose(js_failed_queue_js);
function js_failed_queue_js(queue){
    var con = `
<p class='text-danger bold'>قد قمت بإختيار عدد كبير من الأسئلة والورقة المكونة مساحتها لا تكفى فتم تجاهل ${queue.length} أسئلة</p>
<ul style='overflow-x:scroll;height:10vh;list-style-type: decimal;' class='bg-light'>`;
    con = con + queue.map((x) => `<li style='display:inline;margin:0px 1px;'>${x} ،</li>`).join('');        
    con = con + "</ul><small class='text-danger bold'>يرجى حذف بعض المسائل من جدول المختارات ليتناسب عدد الأسئلة مع حجم الورقة أو قم بتصغير 'حجم الخط' من الإعدادات او قم بإلغاء 'الخط الفاصل' لتسع الورقة مسائل أكثر</small>";
    swal_modals = []; // clear swal modals
    // push swal modal
    if (queue.length>0){swal_modals.push({title: 'تحذير', html: con, confirmButtonText:'حسناً', timer:40000})};
};

// expose func ro python for failed queue.
eel.expose(js_increment_paper_counter);
function js_increment_paper_counter(){
    increment_paper_counter()
};

// ptyohn - toast - paper count is more than 1.
eel.expose(js_alert_paper_count);
function js_alert_paper_count(){
    setTimeout(() => { 
        Toast.fire({
            icon: 'info',
            title: 'تم عرض تكوين واحد، اضغط على فتح مكان الحفظ لرؤية البقية.'
        });
    }, 1000);
};

}); 

/* checkboxes status text - update event */
$('.form-item-left input').click(function(){
    if ( $(this).is(':checked') ){
        $('span', $(this).parent()).text('مفعل');
    }
    else {
        $('span', $(this).parent()).text('غير مفعل');
    }
});

// toggle steps - event - tab3
$('#tap3_toggle_steps').on('click', function(){
    if ($('.tap3_instructions').css('display')=='none'){
        $('.tap3_instructions').slideToggle();
    } else {
        $('.tap3_instructions').slideToggle();
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


$('input').submit(function(e) {
    if(e.keyCode == 13) {
        alert($(this).val());
    }
});
