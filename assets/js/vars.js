"use luck";

// tooltips text
var tooltip_dynamic = 'هذه المسئلة ديناميكة'
var tooltip_static = 'هذه المسئلة إستاتيكية'

// icons
const icon_search = `<svg width="24" height="24" viewBox="0 0 48 48" fill="rgba(22, 24, 35, 0.34)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z"></path></svg>`
const icon_book = `<svg width="25" height="25" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
<path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
</svg>`

const modal_footer = "© Ahmed Shokry — Email:&nbsp;<span class='selectable'>mathar4end@gmail.com</span>";
// tables vars
tables_tanslation = {
    "language": {
        "sLengthMenu": "مدخلات _MENU_ أظهر",
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
        },
        "zeroRecords": 'لم يتم العثور على سجلات مطابقة',
        "emptyTable": 'لا توجد بيانات للعرض - قم بإضافة البعض من جدول المسائل'
    },
}
const table1_args = {
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
    "rowReorder":false,
    ...tables_tanslation,
    "columnDefs": [{
        "searchable": true,
        "orderable": false,
        "targets": 0,
        "className": "dt-center", 
        "targets": "_all"
    }], 

    "createdRow": function(row, data, dataIndex){
        // tooltip - table 1 - icons on hover tooltip.
        $('.dynamic_lamp', row).hover(function(){
            tippy(`.dynamic_lamp`, {
                content: tooltip_dynamic,
            });
        });
        $('.static_lamp', row).hover(function(){
            tippy(`.static_lamp`, {
                content: tooltip_static,
            });
        });

    },
}

const table2_args = {
    "rowReorder": {"selector": 'td:not(:last-child)'},
    "lengthChange":false,
    "bFilter": false,
    "bLengthChange": false,
    "bAutoWidth": false,
    "bPaginate": false,
    "bInfo":false,
    ...tables_tanslation,
    "columnDefs": [{
        "searchable": true,
        "orderable": false,
        "targets": 0,
        "className": "dt-center reorder", //row reorder - class 'reorder' changes cursor icon on hover.
        "targets": "_all"
    }],

}
// table vars - end


////////////////////////
/// python settings ///
//////////////////////

// settings vars 
var font_name    = 'Yakout';
var font_size    = 70;
var paper_count  = 1;
var is_random    = 0;
var color_title  = 'black';
var color_probs  = 'black';
var color_answer = 'green';
var color_numing = '#4b5d67';
var sep_line     = 1; //boolean
var border_style = 1;
var n_style      = "circle";

async function python_update_config_js(config){ // call python to update config
    await eel.python_update_config(config)
};

// show update text on tab 4 settings when settings are changed by user.
function show_update_statuts(){
    $('#settings_status').fadeIn("slow");
    setTimeout(function () {
        $('#settings_status').fadeOut("slow");
    }, 4000);
};

// collect data and update config
function save_settings(){
    var settings_config = {
        'font_name'    : font_name,
        'font_size'    : font_size,
        'paper_count'  : paper_count,
        'is_random'    : is_random,
        'color_title'  : color_title,
        'color_probs'  : color_probs,
        'color_answer' : color_answer,
        'color_numing' : color_numing,   
        'sep_line'     : sep_line,
        'border_style' : border_style,
        'n_style'      : n_style
    };

    // fire status bar for specific time.
    show_update_statuts()
    
    // update python config.
    python_update_config_js(settings_config);
}

// settings events

$('#font_name').on('change', function(){
    font_name = this.value
    save_settings()
});

$('#border_style').on('change', function(){
    border_style = this.value
    save_settings()
});

$('#n_style').on('change', function(){
    n_style = this.value
    save_settings()
});

$('#font_size').on('change paste', function(){
    if (this.value>120){ // validate max value
        $('#font_size').prop('value', '120');
    };
    if (this.value<40){ // validate min value
        $('#font_size').prop('value', '40');
    };
    font_size = this.value;

    save_settings()
});

$('#paper_count').on('change', function(){
    paper_count = this.value
    if (this.value<1){ // validate min value
        $('#paper_count').prop('value', '1');
    };
    paper_count = this.value
    save_settings()
});

$('#sep_line').click(function(){
    if ( $(this).is(':checked') ){
        console.log('sep_line: on');
        sep_line = 1;
    }
    else {
        console.log('sep_line: off');
        sep_line = 0;
    }

    save_settings()
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

    save_settings()
});

$('#color_title').on('change', function(){
    color_title = this.value
    save_settings()
});
$('#color_probs').on('change', function(){
    color_probs = this.value
    save_settings()
});
$('#color_answer').on('change', function(){
    color_answer = this.value;
    save_settings()
});

$('#color_numing').on('change', function(){
    color_numing = this.value;
    save_settings()
});

// paper_count init.
function read_paper_count(){
    return $('#paper_count').val()
}
function read_paper_counter(){
    return $('#paper_counter').text().split('/')
};

function update_paper_counter(count, total){
    const new_val = count+'/'+total
    $('#paper_counter').text(new_val);
};

function refresh_paper_count(){
    update_paper_counter(0, paper_count);
}

function increment_paper_counter(){
    const curr_read = read_paper_counter();
    update_paper_counter(parseInt(curr_read[0])+1, curr_read[1])
};
// paper_count - end

// tab 4 ribbon event.
const news_link = 'https://raw.githubusercontent.com/ahmed4end/Mathar-GUI/master/news.html';

$('#news').on('click', function(){
    fetch(news_link)
        .then(response => response.text())
        .then(data => {
        Swal.queue([{
            html: data,
            showConfirmButton: false,
            footer : modal_footer,
        }]);
    }).catch(()=> {
        Swal.queue([{
            icon: 'error',
            title: 'حدث خطأ ما',
            text: 'يرجى التأكد من الإتصال بالإنترنت لجلب آخر تحديث للأخبار',
            footer : modal_footer,
            showConfirmButton: false,
        }]);        
    });
});

// disable dev buttons
function disable_dev_buttons(){
    // Diable F5 Button
    $(document).on("keydown", function(e){if ((e.which || e.keyCode) == 116) e.preventDefault()});

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
}