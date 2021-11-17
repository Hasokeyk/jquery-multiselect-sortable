/*
 Hasan Yüksektepe
 Version : 1.0.0
 Website: hayatikodla.net

 12.11.2021
 Multiselect Sortable
 */
(function($){

    $.fn.multiselect_sortable = function(options){

        var defaults = {
            selectable:{
                title:'Selectable'
            },
            selection :{
                title:'Selection'
            }
        };

        var me = this;

        var select_name = me.attr('name');
        var classes     = $(me).attr('class');

        var select = document.createElement('select');
        select.setAttribute('multiple', '');
        select.setAttribute('name', select_name+'[]');
        select.setAttribute('class', classes);
        select.setAttribute('style', "display:none");

        var settings = $.extend(true, defaults, options);
        var parent   = this.parent();

        $(me).attr('class', '');
        this.addClass('multiselect_sortable_hide');
        $(me).prop('disabled', true);

        var selectable = '';
        var selection  = '';
        $.each($(' option', me), function(i, e){

            var name              = $(e).html();
            var value             = $(e).attr('value');
            var selected          = $(e).attr('selected');
            var disabled          = $(e).attr('disabled');
            var data              = $(e).data();
            var element_data_list = '';
            var create_id         = 'id'+Math.floor(Math.random()*999);

            $(e).attr('data-unit_id', create_id)

            $.each(data, function(i, e){
                element_data_list += 'data-'+i+'="'+e+'"';
            })

            if(selected!=undefined){
                selection += '<li class="select_li '+(disabled?'disabled':'')+'" data-uniq_id="'+create_id+'" data-name="'+name+'" data-value="'+value+'" '+element_data_list+'>'+name+'</li>';
            }
            else{
                selectable += '<li class="select_li '+(disabled?'disabled':'')+'" data-uniq_id="'+create_id+'" data-name="'+name+'" data-value="'+value+'" '+element_data_list+'>'+name+'</li>';
            }
        });

        var content = `
            <div class="multiselect_sortable_content">
                <div class="selection">
                    <div class="selection_title">${settings.selection.title}</div>
                    <ul class="selection_content sortable">
                        ${selection}
                    </ul>
                </div>
                <div class="selectable">
                    <div class="selectable_title">${settings.selectable.title}</div>
                    <ul class="selectable_content">
                        ${selectable}
                    </ul>
                </div>
            </div>
        `;

        $(parent).append(content)

        $(document).on('click', '.selectable_content .select_li', function(){
            const html = $(this)[0].outerHTML;
            $('.selection_content').append(html);
            $(this).remove();
            sortable_selectbox();
        });

        $(document).on('click', '.selection_content .select_li', function(){
            var html = $(this)[0].outerHTML;
            $('.selectable_content').append(html);
            $(this).remove();
            sortable_selectbox();
        });

        $(".sortable").sortable({
            connectWith:"ul",
            axis       :'y',
            start      :function(e){
                sortable_selectbox();
            },
            change     :function(e){
                sortable_selectbox();
            },
            update     :function(e){
                sortable_selectbox();
            },
        });

        sortable_selectbox();

        function sortable_selectbox(){
            $('.multiselect_sortable_content select option').remove();
            $('.selection_content .select_li').each(function(i, e){

                var value = $(e).data('value');
                if(value!==undefined){

                    var opt      = document.createElement("option");
                    opt.text     = value;
                    opt.value    = value;
                    opt.selected = true;

                    //var MSS = document.createElement("input");
                    //MSS.setAttribute("type", "hidden");
                    //MSS.setAttribute("name", select_name+"[]");
                    //MSS.setAttribute("value", value);
                    //MSS.setAttribute("class", classes);
                    select.appendChild(opt);

                    //$('.multiselect_sortable_content').append(MSS)
                }

            })

            $('.multiselect_sortable_content').append(select)

        }
    }

}(jQuery));