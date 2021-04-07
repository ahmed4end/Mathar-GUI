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
var chooseRowBtn = "<form></form><button class='btn_1 icon-plus'><span>أختر</span></button>";
function image(image){return `<img class='imgc lozad' data-src='./images/${image}.png' loading='lazy' alt='${image}'>`};
function text(txt){return `<div id="textCell">${txt}</div>`;};
function colIcon(icon, title, id){
    return `<div style="writing-mode: tb-rl;display:inline-block;"><div style="text-align: center;margin-bottom:5px;" class="${icon}" data-title="${title}"></div><div style="display: inline-block;" id="table1Id">${id}</div>`
};
function vwrap(txt) {return `<div style="writing-mode: vertical-lr;display:inline-block;">${txt}</div>`}
// colIcon vars
var dynamicT = 'هذه المسئلة ديناميكة'
var staticT = 'هذه المسئلة إستاتيكية'
//

const bookSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>`

const searchSVG = `<svg width="24" height="24" viewBox="0 0 48 48" fill="rgba(22, 24, 35, 0.34)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"></path></svg>`

$(document).ready(function(){

    //swal toastr.
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

    //welcome message
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function welcome() {
        await sleep(1000);
        Swal.fire({
            title: '<h1>Welcome at Mathar</h1>',
            icon: 'info',
            html: 'soon mathar will speak.',
            showConfirmButton: false,
            showCloseButton: true
        });
    }

    //welcome(); //deprecated for now.



    // INIT vars 
    var emptyTableJunkVar = 1
    var audio = new Audio("assets/btn2.wav"); 

    //table 1
    var fullTable = $('#fullTable').DataTable( {
        "autoWidth":false,
        "dom": '<"top"><"fullTableFilter"f><t><"#margin5px"><"clear"><"footerContainer"lp>',
        rowReorder:false,
        data: dataSet,
        fixedHeader: {
            header: false,
            footer: false
        },
        columns: [
            { title: "i." },
            {   
                title: "id",
                render: function(data, type){
                    var icon = '';
                    var title ='';
                    var data = data.split(' ')
                    if (data.length==1){data = ['d', data]}
                    if (type=='display'){
                        switch(data[0]){
                            case 'd':
                                icon='dynamic_lamp';
                                title = dynamicT;
                                break;
                            case 's':
                                icon='static_lamp';
                                title= staticT;
                                break;
                        }
                        return colIcon(icon, title, data[1]);
                    } 
                    return data[1];
                }
            },
            { title: "المسئلة", width:'50%' },
            { },
            { 
                title: "نوع",
                render: function(data, type){return vwrap(data);}

            },
            { title: "مفتاح" },
            { title: "إعدادات" }
        ],
        "columnDefs": [{
            "searchable": true,
            "orderable": false,
            "targets": 0,
            "className": "dt-center", 
            "targets": "_all"
        },
                       { 
                           "targets": 3,
                           "data": 3,
                           "title": bookSVG
                       }], 
        "lengthChange":true,
        "paging":true,
        "pageLength": 25,
        "lengthMenu": [ 25, 50, 100, 200, 800 ],
        "bPaginate":false,
        "order": [],
        "bAutoWidth": false,
        "bInfo":true,
        "language": {
            "sLengthMenu": "أظهر _MENU_ مدخلات",
            "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
            "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
            "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
            "sInfoPostFix": "",
            "sSearch": "ابحث:",
            "search": "_INPUT_"+`<div class='search-icon'>${searchSVG}</div>`,
            "sUrl": "",
            "oPaginate": {
                "sFirst": "الأول",
                "sPrevious": "السابق",
                "sNext": "التالي",
                "sLast": "الأخير"
            }
        },

        // first table coumn filter.
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


    //table pages
    var fullTableNodes = fullTable.rows().nodes();

    //lazy loader for images on table 1.
    const ftImages = $('.lozad', fullTableNodes);
    for (var i = 0; i < ftImages.length; i++) {
        const observer = lozad(ftImages[i]); 
        observer.observe();
    };

    //add placeholder to filter.
    $('#fullTable_filter input').attr('placeholder', 'أبحث عن ...');
    
    // draw temp index increament on column 0.
    fullTable.on('order.dt search.dt', function () {
        fullTable.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        });
    }).draw();

    //button sound on click - table 1.
    fullTable.on('click', 'button', function () {
        audio.play();
    });

    //button sound on click - public declare for the rest of mathar.
    $('button').on('click', function () {
        audio.play();
    });

    //table 2
    var emptyTable = $('#emptyTable').DataTable({
        rowReorder: {
            selector: 'td:not(last)' //reorder row by all cols except last one.
        },
        data: [],
        columns: [
            { title: "i." },
            { title: "id" },
            { title: "المسئلة", width:'50%'},
            { },
            { title: "نوع" },
            { title: "مفتاح" },
            { title: "إعدادات" }
        ],
        "lengthChange":false,
        "bFilter": false,
        "bLengthChange": false,
        "bAutoWidth": false,
        "bPaginate": false,
        "bInfo":false,

        "columnDefs": [{
            "searchable": true,
            "orderable": false,
            "targets": 0,
            "className": "dt-center reorder", //row reorder - class 'reorder' changes cursor icon on hover.
            "targets": "_all"
        },
                       { 
                           "targets": 3,
                           "data": 3,
                           "title": bookSVG
                       }],

    });

    // reorder column 1 indexes when swaping any rows.
    emptyTable.on( 'order.dt', function () {
        emptyTable.column(0, {order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();

    // Show alert if the table is empty when clicked on the Clear Table button
    $( "#clearTable" ).click(function() {
        if (emptyTable.data().count() == 0) {
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
                    emptyTable.clear().draw();
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

    /* move row from table 1 to table 2 */ 
    fullTable.on('click', '.btn_1', function () {

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
        row.find('td:first-child').html(emptyTableJunkVar);
        emptyTableJunkVar = emptyTableJunkVar + 1

        //processing the row then adding it to table 2 .
        row = row.append('<th>'+optionsT1+'<button class="r_b_s btn_1 icon-remove"><span>إزالة</span></button></th>');
        row  = row.html();
        emptyTable.row.add($('<tr>'+row+'</tr>')).draw();

        //button sound on click - table 2.
        $(".r_b_s").on('click', function() { 
            audio.play();
        });

    });


    // remove row - table 2
    $('#emptyTable tbody').on( 'click', '.btn_1', function () {
        emptyTable
            .row( $(this).parents('tr') )
            .remove()
            .draw()
    });

    async function _openFileLoaction() {
        await eel.openFileLoaction();
    };

    //saveImage Button event
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
    //hide viewer for now.
    viewer.setVisible(false);

    var index = 0;

    //python call to fetch data function.
    async function callPython(data) {
        //fetch images from python server.
        var tileSources = await eel.getImages(data)();
        //hide viewer for now.
        viewer.setVisible(false);
        //remove prev tiles/images and add newer ones. 
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

    //switch between images inside viewer.
    $('#ToggleImages').on('click', function () {
        //twiggle show/hide answer btn text.
        if (index==1){$(this).text('إخفاء الإجابة')}
        else{$(this).text('إظهار الإجابة')}

        var oldTiledImage = viewer.world.getItemAt(index);
        index = (index + 1) % 2;
        var nextIndex = (index + 1) % 2;
        var newTiledImage = viewer.world.getItemAt(index);
        var nextTiledImage = viewer.world.getItemAt(nextIndex);
        oldTiledImage.setOpacity(0);
        newTiledImage.setOpacity(1);
        nextTiledImage.setPreload(true);
    }); 



    /* collect data when btn clicked - table 2  */
    $( "#collectData" ).click(function() {
        audio.play()

        if (emptyTable.data().count() == 0) {
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
            $('#ToggleImages').fadeOut();
            $('#saveImage').fadeOut();
            $('.notYet').fadeOut();
            viewer.setVisible(false);


            // collect data from table 2             
            var rowOptions = emptyTable.column(6).nodes();

            rowOptions = rowOptions.toArray().map(ele=>$('form', ele).first().data('dict'))

            viewer.addHandler('tile-loaded', function(){

                //show stuff cuz python sent data.
                viewer.setVisible(true);
                $('#collectData').prop('disabled', false)
                $('#ToggleImages').fadeIn();
                $('#saveImage').fadeIn();
                $("#resultLoaderContainer").fadeOut("slow");

                //fire toast.
                Toast.fire({
                    icon: 'success',
                    title: 'تم التكوين - إذهب لنافذة المعاينة لرؤية النتيجة'
                });

            });

            //console.log(RowOptions)
            callPython(rowOptions);

            Toast.fire({
                    icon: 'info',
                    title: 'جارى التكوين - إذهب لنافذة المعاينة لإنتظار النتيجة'
                });
        }

    });


    //diabled old code for maintance.
    //save user inputs to html interface - temp .
    //$(document).on('keyup', 'table input', function() {
    //    $(this).attr('value',$(this).val());}); 

    //[SETTINGS]

    const fullTableImages = $('.imgc', fullTableNodes)

    /* checkboxes status text - update event */
    $('.form-item__control input').click(function(){
        if ( $(this).is(':checked') ){
            $('span', $(this).parent()).text('مفعل');
        }
        else {
            $('span', $(this).parent()).text('غير مفعل');
        }
    });

    //#tap1_zoom 
    $('#switch4').click(function(){
        if ( $(this).is(':checked') ){
            console.log('on');
            
            Toast.fire({
                    icon: 'info',
                    title: 'الأن يمكنك تكبير المسائل فى الجدول بتحريك الماوس فوقها',
                });
            
            for (var i = 0; fullTableImages.length > i; i++) {
                fullTableImages[i].classList.toggle('zoomEffect');
            }
        }
        else {
            console.log('off');

            Toast.fire({
                    icon: 'info',
                    title: 'تم إلغاء تكبير المسائل فى الجدول بتحريك الماوس فوقها',
                });
            
            for (var i = 0; fullTableImages.length > i; i++) {
                fullTableImages[i].classList.toggle('zoomEffect');
            }
        }
    });

    //#random 
    $('#switch1').click(function(){
        if ( $(this).is(':checked') ){
            console.log('on');
        }
        else {
            console.log('off');
        }
    });

    //#watermark 
    $('#switch2').click(function(){
        if ( $(this).is(':checked') ){
            console.log('on');
            $('#watermark_op').fadeIn();
        }
        else {
            console.log('off');
            $('#watermark_op').fadeOut();
        }
    });


    //settings - checkbox & color picker - handler
    $(document).on('change', 'input.settingsInput[type=color]', function() {
        this.parentNode.style.backgroundColor = this.value;
    });

    //toggle steps - event - tab3
    $('.toggleT3Steps').on('click', function(){
        if ($('.tap3_instructions').css('display')=='none'){
            $('.tap3_instructions').animate({height:'toggle'});
        } else {
            $('.tap3_instructions').animate({height:'toggle'});
        }

    });

    //save settings button - event
    $('.saveSettings').on('click', function(){
        Swal.fire({
            text:"saving settings process", 
            showConfirmButton: false,
            timer: 2000
        });    
    });
    
    const fd = `<div class="book">
  <div class="inner">
    <div class="left"></div>
    <div class="middle"></div>
    <div class="right"></div>
  </div>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</div>`
    
    //about mathar - modal
    $('.about-btn').on('click', function(){
        Swal.fire({
            title: '<h1>About Mathar</h1>',
            icon: 'info',
            html: 'soon mathar will speak.<br>'+fd,
            showConfirmButton: false,
            showCloseButton: true
        })

    });

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

/*
old tabs code.
const tabLinks = document.querySelectorAll(".tabs a");
const tabPanels = document.querySelectorAll(".tabs-panel");

for (let el of tabLinks) {
    el.addEventListener("click", e => {
        e.preventDefault();


        document.querySelector(".tabs li.active").classList.remove("active");
        document.querySelector(".tabs-panel.active").classList.remove("active");

        const parentListItem = el.parentElement;
        parentListItem.classList.add("active");
        const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

        const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
        panel[0].classList.add("active");
    });
}
*/

//init funcs

function parseRef(unit, lesson, page, problem, node='') {
    if (unit==undefined){unit=''}
    else{unit=`و${unit}`}
    if (lesson==undefined){lesson=''}
    else{lesson=`د${lesson}`}
    if (page==undefined){page=''}
    else{page=`ص${page}`}
    if (problem==undefined){problem=''}
    else{problem=`س${problem}`}
    if (node==undefined){node=''}
    else{node=`م${node}`}
    var arr = [unit, lesson, page, problem, node].filter(word=> word.length>1);
    return arr.join('<br>')
}



//dataset - imported from python.
var dataSet = [

    // Title input
    ["عنوان رئيسى", "s title", image('title'),"", "", "عنوان رئيسى",  
     `
<form>
<input name='title' value='عنوان رئيسى' type='text'>
<label>:العنوان</label> 
</form>
`+chooseRowBtn
    ],

    [text(''), 'm0_0_1', image('m0_0_1'), parseRef('', '', 13,1), "graphs", "حل المعادلة", chooseRowBtn],
    [text(''), 'm0_0_2_1', image('m0_0_2_1'), parseRef('', '', 13,1), '', '', chooseRowBtn],
    [text(''), 'm0_0_2_2', image('m0_0_2_2'), parseRef('', '', 13,1), '', '', chooseRowBtn],
    [text(''), 'm0_0_2_3', image('m0_0_2_3'), parseRef('', '', 13,1), '', '', chooseRowBtn],
    [text(''), 'm0_0_2_4', image('m0_0_2_4'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_2_5', image('m0_0_2_5'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_3', image('m0_0_3'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_4', image('m0_0_4'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_5', image('m0_0_5'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_6', image('m0_0_6'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_1', image('m0_0_7_1'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_2', image('m0_0_7_2'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_3', image('m0_0_7_3'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_4', image('m0_0_7_4'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_5', image('m0_0_7_5'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_6', image('m0_0_7_6'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_7', image('m0_0_7_7'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_8', image('m0_0_7_8'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_7_9', image('m0_0_7_9'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_8', image('m0_0_8'), '', '', '', chooseRowBtn],
    [text(''), 'm0_0_9', image('m0_0_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_1', image('m1_1_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_2', image('m1_1_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_3', image('m1_1_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_4', image('m1_1_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_5', image('m1_1_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_6', image('m1_1_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_7', image('m1_1_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_8', image('m1_1_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_1_9', image('m1_1_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_110', image('m1_110'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_1', image('m1_111_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_2', image('m1_111_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_3', image('m1_111_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_4', image('m1_111_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_5', image('m1_111_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_6', image('m1_111_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_7', image('m1_111_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_8', image('m1_111_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_111_9', image('m1_111_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_1', image('m1_113_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_2', image('m1_113_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_3', image('m1_113_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_4', image('m1_113_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_5', image('m1_113_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_6', image('m1_113_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_7', image('m1_113_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_8', image('m1_113_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_113_9', image('m1_113_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_11310', image('m1_11310'), '', '', '', chooseRowBtn],
    [text(''), 'm1_11311', image('m1_11311'), '', '', '', chooseRowBtn],
    [text(''), 'm1_11312', image('m1_11312'), '', '', '', chooseRowBtn],
    [text(''), 'm1_11313', image('m1_11313'), '', '', '', chooseRowBtn],
    [text(''), 'm1_114', image('m1_114'), '', '', '', chooseRowBtn],
    [text(''), 'm1_115', image('m1_115'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_1', image('m1_2_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_2', image('m1_2_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_3', image('m1_2_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_4', image('m1_2_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_5', image('m1_2_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_6', image('m1_2_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_7', image('m1_2_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_8', image('m1_2_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_2_9', image('m1_2_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_210', image('m1_210'), '', '', '', chooseRowBtn],
    [text(''), 'm1_211', image('m1_211'), '', '', '', chooseRowBtn],
    [text(''), 'm1_212', image('m1_212'), '', '', '', chooseRowBtn],
    [text(''), 'm1_213', image('m1_213'), '', '', '', chooseRowBtn],
    [text(''), 'm1_214', image('m1_214'), '', '', '', chooseRowBtn],
    [text(''), 'm1_215', image('m1_215'), '', '', '', chooseRowBtn],
    [text(''), 'm1_216_1', image('m1_216_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_216_2', image('m1_216_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_216_3', image('m1_216_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_216_4', image('m1_216_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_216_5', image('m1_216_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_216_6', image('m1_216_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_216_7', image('m1_216_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_217', image('m1_217'), '', '', '', chooseRowBtn],
    [text(''), 'm1_218', image('m1_218'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_1', image('m1_3_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_1', image('m1_3_2_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_2', image('m1_3_2_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_3', image('m1_3_2_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_4', image('m1_3_2_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_5', image('m1_3_2_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_6', image('m1_3_2_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_7', image('m1_3_2_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_8', image('m1_3_2_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_2_9', image('m1_3_2_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_3', image('m1_3_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_4', image('m1_3_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_5', image('m1_3_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_6', image('m1_3_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_7', image('m1_3_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_8', image('m1_3_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_3_9', image('m1_3_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_310', image('m1_310'), '', '', '', chooseRowBtn],
    [text(''), 'm1_311', image('m1_311'), '', '', '', chooseRowBtn],
    [text(''), 'm1_312', image('m1_312'), '', '', '', chooseRowBtn],
    [text(''), 'm1_313', image('m1_313'), '', '', '', chooseRowBtn],
    [text(''), 'm1_314', image('m1_314'), '', '', '', chooseRowBtn],
    [text(''), 'm1_315', image('m1_315'), '', '', '', chooseRowBtn],
    [text(''), 'm1_316', image('m1_316'), '', '', '', chooseRowBtn],
    [text(''), 'm1_317', image('m1_317'), '', '', '', chooseRowBtn],
    [text(''), 'm1_318', image('m1_318'), '', '', '', chooseRowBtn],
    [text(''), 'm1_319', image('m1_319'), '', '', '', chooseRowBtn],
    [text(''), 'm1_320', image('m1_320'), '', '', '', chooseRowBtn],
    [text(''), 'm1_321', image('m1_321'), '', '', '', chooseRowBtn],
    [text(''), 'm1_322', image('m1_322'), '', '', '', chooseRowBtn],
    [text(''), 'm1_323', image('m1_323'), '', '', '', chooseRowBtn],
    [text(''), 'm1_324', image('m1_324'), '', '', '', chooseRowBtn],
    [text(''), 'm1_325', image('m1_325'), '', '', '', chooseRowBtn],
    [text(''), 'm1_326', image('m1_326'), '', '', '', chooseRowBtn],
    [text(''), 'm1_328_1', image('m1_328_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_328_2', image('m1_328_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_328_3', image('m1_328_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_328_4', image('m1_328_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_328_5', image('m1_328_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_329', image('m1_329'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_1_1', image('m1_4_1_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_1_2', image('m1_4_1_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_1_3', image('m1_4_1_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_1_4', image('m1_4_1_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_2', image('m1_4_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_3', image('m1_4_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_4', image('m1_4_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_5', image('m1_4_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_6', image('m1_4_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_7', image('m1_4_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_8', image('m1_4_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_4_9', image('m1_4_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_410', image('m1_410'), '', '', '', chooseRowBtn],
    [text(''), 'm1_411', image('m1_411'), '', '', '', chooseRowBtn],
    [text(''), 'm1_412', image('m1_412'), '', '', '', chooseRowBtn],
    [text(''), 'm1_413', image('m1_413'), '', '', '', chooseRowBtn],
    [text(''), 'm1_414', image('m1_414'), '', '', '', chooseRowBtn],
    [text(''), 'm1_415', image('m1_415'), '', '', '', chooseRowBtn],
    [text(''), 'm1_416', image('m1_416'), '', '', '', chooseRowBtn],
    [text(''), 'm1_417', image('m1_417'), '', '', '', chooseRowBtn],
    [text(''), 'm1_418', image('m1_418'), '', '', '', chooseRowBtn],
    [text(''), 'm1_419', image('m1_419'), '', '', '', chooseRowBtn],
    [text(''), 'm1_420', image('m1_420'), '', '', '', chooseRowBtn],
    [text(''), 'm1_421', image('m1_421'), '', '', '', chooseRowBtn],
    [text(''), 'm1_422', image('m1_422'), '', '', '', chooseRowBtn],
    [text(''), 'm1_423', image('m1_423'), '', '', '', chooseRowBtn],
    [text(''), 'm1_424', image('m1_424'), '', '', '', chooseRowBtn],
    [text(''), 'm1_425', image('m1_425'), '', '', '', chooseRowBtn],
    [text(''), 'm1_426', image('m1_426'), '', '', '', chooseRowBtn],
    [text(''), 'm1_427', image('m1_427'), '', '', '', chooseRowBtn],
    [text(''), 'm1_428', image('m1_428'), '', '', '', chooseRowBtn],
    [text(''), 'm1_429', image('m1_429'), '', '', '', chooseRowBtn],
    [text(''), 'm1_430', image('m1_430'), '', '', '', chooseRowBtn],
    [text(''), 'm1_431', image('m1_431'), '', '', '', chooseRowBtn],
    [text(''), 'm1_432', image('m1_432'), '', '', '', chooseRowBtn],
    [text(''), 'm1_433', image('m1_433'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_1', image('m1_435_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_2', image('m1_435_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_3', image('m1_435_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_4', image('m1_435_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_5', image('m1_435_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_6', image('m1_435_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_7', image('m1_435_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_8', image('m1_435_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_435_9', image('m1_435_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_436', image('m1_436'), '', '', '', chooseRowBtn],
    [text(''), 'm1_437', image('m1_437'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_1', image('m1_5_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_2', image('m1_5_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_3', image('m1_5_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_4', image('m1_5_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_5', image('m1_5_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_6', image('m1_5_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_7', image('m1_5_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_1', image('m1_5_8_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_2', image('m1_5_8_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_3', image('m1_5_8_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_4', image('m1_5_8_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_5', image('m1_5_8_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_6', image('m1_5_8_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_7', image('m1_5_8_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_8', image('m1_5_8_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_8_9', image('m1_5_8_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_810', image('m1_5_810'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_811', image('m1_5_811'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_812', image('m1_5_812'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_813', image('m1_5_813'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_814', image('m1_5_814'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_815', image('m1_5_815'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_816', image('m1_5_816'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_817', image('m1_5_817'), '', '', '', chooseRowBtn],
    [text(''), 'm1_5_9', image('m1_5_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_510', image('m1_510'), '', '', '', chooseRowBtn],
    [text(''), 'm1_511', image('m1_511'), '', '', '', chooseRowBtn],
    [text(''), 'm1_512', image('m1_512'), '', '', '', chooseRowBtn],
    [text(''), 'm1_513', image('m1_513'), '', '', '', chooseRowBtn],
    [text(''), 'm1_514', image('m1_514'), '', '', '', chooseRowBtn],
    [text(''), 'm1_515', image('m1_515'), '', '', '', chooseRowBtn],
    [text(''), 'm1_517', image('m1_517'), '', '', '', chooseRowBtn],
    [text(''), 'm1_518', image('m1_518'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_1', image('m1_6_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_2', image('m1_6_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_3', image('m1_6_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_4', image('m1_6_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_5', image('m1_6_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_6', image('m1_6_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_7_1', image('m1_6_7_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_7_2', image('m1_6_7_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_7_3', image('m1_6_7_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_7_4', image('m1_6_7_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_7_5', image('m1_6_7_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_6_7_6', image('m1_6_7_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_1', image('m1_610_1'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_2', image('m1_610_2'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_3', image('m1_610_3'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_4', image('m1_610_4'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_5', image('m1_610_5'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_6', image('m1_610_6'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_7', image('m1_610_7'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_8', image('m1_610_8'), '', '', '', chooseRowBtn],
    [text(''), 'm1_610_9', image('m1_610_9'), '', '', '', chooseRowBtn],
    [text(''), 'm1_61010', image('m1_61010'), '', '', '', chooseRowBtn],
    [text(''), 'm1_61011', image('m1_61011'), '', '', '', chooseRowBtn],
    [text(''), 'm1_61012', image('m1_61012'), '', '', '', chooseRowBtn],
    [text(''), 'm1_61013', image('m1_61013'), '', '', '', chooseRowBtn],
    [text(''), 'm1_611', image('m1_611'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_1_1', image('m2_7_1_1'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_1_2', image('m2_7_1_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_1_3', image('m2_7_1_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_1_4', image('m2_7_1_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_1_5', image('m2_7_1_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_1_6', image('m2_7_1_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_2', image('m2_7_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_3', image('m2_7_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_4', image('m2_7_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_5', image('m2_7_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_6', image('m2_7_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_7', image('m2_7_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_8', image('m2_7_8'), '', '', '', chooseRowBtn],
    [text(''), 'm2_7_9', image('m2_7_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_1', image('m2_710_1'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_2', image('m2_710_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_3', image('m2_710_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_4', image('m2_710_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_5', image('m2_710_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_6', image('m2_710_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_7', image('m2_710_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_8', image('m2_710_8'), '', '', '', chooseRowBtn],
    [text(''), 'm2_710_9', image('m2_710_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2_71010', image('m2_71010'), '', '', '', chooseRowBtn],
    [text(''), 'm2_712_1', image('m2_712_1'), '', '', '', chooseRowBtn],
    [text(''), 'm2_712_2', image('m2_712_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_712_3', image('m2_712_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_712_4', image('m2_712_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_712_5', image('m2_712_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_712_6', image('m2_712_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_712_7', image('m2_712_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_1', image('m2_8_1'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_2', image('m2_8_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_3', image('m2_8_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_4', image('m2_8_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_5', image('m2_8_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_6', image('m2_8_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_7', image('m2_8_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_1', image('m2_8_8_1'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_2', image('m2_8_8_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_3', image('m2_8_8_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_4', image('m2_8_8_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_5', image('m2_8_8_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_6', image('m2_8_8_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_7', image('m2_8_8_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_8', image('m2_8_8_8'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_8_9', image('m2_8_8_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_810', image('m2_8_810'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_811', image('m2_8_811'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_812', image('m2_8_812'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_813', image('m2_8_813'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_814', image('m2_8_814'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_815', image('m2_8_815'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_816', image('m2_8_816'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_817', image('m2_8_817'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_818', image('m2_8_818'), '', '', '', chooseRowBtn],
    [text(''), 'm2_8_9', image('m2_8_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2_810', image('m2_810'), '', '', '', chooseRowBtn],
    [text(''), 'm2_811', image('m2_811'), '', '', '', chooseRowBtn],
    [text(''), 'm2_812', image('m2_812'), '', '', '', chooseRowBtn],
    [text(''), 'm2_813', image('m2_813'), '', '', '', chooseRowBtn],
    [text(''), 'm2_814', image('m2_814'), '', '', '', chooseRowBtn],
    [text(''), 'm2_815', image('m2_815'), '', '', '', chooseRowBtn],
    [text(''), 'm2_816', image('m2_816'), '', '', '', chooseRowBtn],
    [text(''), 'm2_817', image('m2_817'), '', '', '', chooseRowBtn],
    [text(''), 'm2_818', image('m2_818'), '', '', '', chooseRowBtn],
    [text(''), 'm2_819', image('m2_819'), '', '', '', chooseRowBtn],
    [text(''), 'm2_820', image('m2_820'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_1', image('m2_821_1'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_2', image('m2_821_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_3', image('m2_821_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_4', image('m2_821_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_5', image('m2_821_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_6', image('m2_821_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_7', image('m2_821_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_8', image('m2_821_8'), '', '', '', chooseRowBtn],
    [text(''), 'm2_821_9', image('m2_821_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2_82110', image('m2_82110'), '', '', '', chooseRowBtn],
    [text(''), 'm2_82111', image('m2_82111'), '', '', '', chooseRowBtn],
    [text(''), 'm2_822', image('m2_822'), '', '', '', chooseRowBtn],
    [text(''), 'm2_823', image('m2_823'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_1', image('m2_9_1_1'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_2', image('m2_9_1_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_3', image('m2_9_1_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_4', image('m2_9_1_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_5', image('m2_9_1_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_6', image('m2_9_1_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_7', image('m2_9_1_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_8', image('m2_9_1_8'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_1_9', image('m2_9_1_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_110', image('m2_9_110'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_111', image('m2_9_111'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_112', image('m2_9_112'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_113', image('m2_9_113'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_114', image('m2_9_114'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_2', image('m2_9_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_3', image('m2_9_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_4', image('m2_9_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_5', image('m2_9_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_6', image('m2_9_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_7', image('m2_9_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_8', image('m2_9_8'), '', '', '', chooseRowBtn],
    [text(''), 'm2_9_9', image('m2_9_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2_910', image('m2_910'), '', '', '', chooseRowBtn],
    [text(''), 'm2_911', image('m2_911'), '', '', '', chooseRowBtn],
    [text(''), 'm2_912', image('m2_912'), '', '', '', chooseRowBtn],
    [text(''), 'm2_913', image('m2_913'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_1', image('m2_915_1'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_2', image('m2_915_2'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_3', image('m2_915_3'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_4', image('m2_915_4'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_5', image('m2_915_5'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_6', image('m2_915_6'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_7', image('m2_915_7'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_8', image('m2_915_8'), '', '', '', chooseRowBtn],
    [text(''), 'm2_915_9', image('m2_915_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2_91510', image('m2_91510'), '', '', '', chooseRowBtn],
    [text(''), 'm2_91511', image('m2_91511'), '', '', '', chooseRowBtn],
    [text(''), 'm2_91512', image('m2_91512'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_1', image('m210_1_1'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_2', image('m210_1_2'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_3', image('m210_1_3'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_4', image('m210_1_4'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_5', image('m210_1_5'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_6', image('m210_1_6'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_7', image('m210_1_7'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_8', image('m210_1_8'), '', '', '', chooseRowBtn],
    [text(''), 'm210_1_9', image('m210_1_9'), '', '', '', chooseRowBtn],
    [text(''), 'm210_110', image('m210_110'), '', '', '', chooseRowBtn],
    [text(''), 'm210_111', image('m210_111'), '', '', '', chooseRowBtn],
    [text(''), 'm210_112', image('m210_112'), '', '', '', chooseRowBtn],
    [text(''), 'm210_113', image('m210_113'), '', '', '', chooseRowBtn],
    [text(''), 'm210_114', image('m210_114'), '', '', '', chooseRowBtn],
    [text(''), 'm210_115', image('m210_115'), '', '', '', chooseRowBtn],
    [text(''), 'm210_116', image('m210_116'), '', '', '', chooseRowBtn],
    [text(''), 'm210_117', image('m210_117'), '', '', '', chooseRowBtn],
    [text(''), 'm210_118', image('m210_118'), '', '', '', chooseRowBtn],
    [text(''), 'm210_119', image('m210_119'), '', '', '', chooseRowBtn],
    [text(''), 'm210_120', image('m210_120'), '', '', '', chooseRowBtn],
    [text(''), 'm210_121', image('m210_121'), '', '', '', chooseRowBtn],
    [text(''), 'm210_122', image('m210_122'), '', '', '', chooseRowBtn],
    [text(''), 'm210_123', image('m210_123'), '', '', '', chooseRowBtn],
    [text(''), 'm210_2', image('m210_2'), '', '', '', chooseRowBtn],
    [text(''), 'm210_3', image('m210_3'), '', '', '', chooseRowBtn],
    [text(''), 'm210_4', image('m210_4'), '', '', '', chooseRowBtn],
    [text(''), 'm210_5', image('m210_5'), '', '', '', chooseRowBtn],
    [text(''), 'm210_6', image('m210_6'), '', '', '', chooseRowBtn],
    [text(''), 'm210_7', image('m210_7'), '', '', '', chooseRowBtn],
    [text(''), 'm210_8', image('m210_8'), '', '', '', chooseRowBtn],
    [text(''), 'm210_9', image('m210_9'), '', '', '', chooseRowBtn],
    [text(''), 'm21010', image('m21010'), '', '', '', chooseRowBtn],
    [text(''), 'm21011_1', image('m21011_1'), '', '', '', chooseRowBtn],
    [text(''), 'm21011_2', image('m21011_2'), '', '', '', chooseRowBtn],
    [text(''), 'm21011_3', image('m21011_3'), '', '', '', chooseRowBtn],
    [text(''), 'm21011_4', image('m21011_4'), '', '', '', chooseRowBtn],
    [text(''), 'm21011_5', image('m21011_5'), '', '', '', chooseRowBtn],
    [text(''), 'm21011_6', image('m21011_6'), '', '', '', chooseRowBtn],
    [text(''), 'm21011_7', image('m21011_7'), '', '', '', chooseRowBtn],
    [text(''), 'm21011_8', image('m21011_8'), '', '', '', chooseRowBtn],
    [text(''), 'm21012', image('m21012'), '', '', '', chooseRowBtn],
    [text(''), 'm21013', image('m21013'), '', '', '', chooseRowBtn],
    [text(''), 'm21014', image('m21014'), '', '', '', chooseRowBtn],
    [text(''), 'm21015', image('m21015'), '', '', '', chooseRowBtn],
    [text(''), 'm21016', image('m21016'), '', '', '', chooseRowBtn],
    [text(''), 'm21017', image('m21017'), '', '', '', chooseRowBtn],
    [text(''), 'm21018', image('m21018'), '', '', '', chooseRowBtn],
    [text(''), 'm21019', image('m21019'), '', '', '', chooseRowBtn],
    [text(''), 'm21020', image('m21020'), '', '', '', chooseRowBtn],
    [text(''), 'm21021', image('m21021'), '', '', '', chooseRowBtn],
    [text(''), 'm21022', image('m21022'), '', '', '', chooseRowBtn],
    [text(''), 'm21023', image('m21023'), '', '', '', chooseRowBtn],
    [text(''), 'm21024', image('m21024'), '', '', '', chooseRowBtn],
    [text(''), 'm21025', image('m21025'), '', '', '', chooseRowBtn],
    [text(''), 'm21026', image('m21026'), '', '', '', chooseRowBtn],
    [text(''), 'm21027', image('m21027'), '', '', '', chooseRowBtn],
    [text(''), 'm21028', image('m21028'), '', '', '', chooseRowBtn],
    [text(''), 'm21029', image('m21029'), '', '', '', chooseRowBtn],
    [text(''), 'm21030', image('m21030'), '', '', '', chooseRowBtn],
    [text(''), 'm21031', image('m21031'), '', '', '', chooseRowBtn],
    [text(''), 'm21032', image('m21032'), '', '', '', chooseRowBtn],
    [text(''), 'm21033', image('m21033'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_1', image('m21035_1'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_2', image('m21035_2'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_3', image('m21035_3'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_4', image('m21035_4'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_5', image('m21035_5'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_6', image('m21035_6'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_7', image('m21035_7'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_8', image('m21035_8'), '', '', '', chooseRowBtn],
    [text(''), 'm21035_9', image('m21035_9'), '', '', '', chooseRowBtn],
    [text(''), 'm2103510', image('m2103510'), '', '', '', chooseRowBtn],
    [text(''), 'm2103511', image('m2103511'), '', '', '', chooseRowBtn],
    [text(''), 'm2103512', image('m2103512'), '', '', '', chooseRowBtn],
    [text(''), 'm2103513', image('m2103513'), '', '', '', chooseRowBtn],
    [text(''), 'm2103514', image('m2103514'), '', '', '', chooseRowBtn],
    [text(''), 'm2103515', image('m2103515'), '', '', '', chooseRowBtn],
    [text(''), 'm21036', image('m21036'), '', '', '', chooseRowBtn],
    [text(''), 'm21037', image('m21037'), '', '', '', chooseRowBtn],
]; 


