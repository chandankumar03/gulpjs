var parent_id=0;
var expand_all=0;
var create_subcat_flag = 0;

$(document).ready(function(){
    //$('.chosen_dropdown').width('200');
    $('.chosen_dropdown').chosen({max_selected_options: 10, width:"95%"});
    
    $('#btnSubcategory').click(function(event){
        event.preventDefault();
        var frm= $('#myform').serialize();
        var name =$('#name').val();
        $title =($('#h3-title-cat').text()).split("(");
        var cat_id_str=$title[1];
        var cat_id=cat_id_str.substring(0,(cat_id_str.length-1));
        create_subcat_flag = 1;
        $('#myform')[0].reset();
        $('#delete').css('display','none');
        $.ajax({
                type:"POST",
                url:$url+"getPosition/"+cat_id,
                data:null,
                async:false,
                success:function(response){
                   $('#position').val(response);
                }
              });
        return false;

    });

    $('#btnResetcategory').click(function(){
        $('#myform')[0].reset();
        $('#btnSubcategory').attr('title',"add");
        $('#delete').css('display','none');
        $('#submit').css('display','none');
    });

    $('#submit').click(function(event){
        
        event.preventDefault();
        var frm= $('#myform').serialize();
        var name =$('#name').val();
        if(name == "")
        {
            alert("Name cannot be blank");
            $('#name').focus();
            return false;
        }
        else
        {
            $title =($('#h3-title-cat').text()).split("(");
            var cat_id_str=$title[1];
            
            if(cat_id_str== "" || typeof(cat_id_str) == "undefined")
            {
                alert("Please select category.");
                return false;
            }
            else
            {
                $cat_id=cat_id_str.substring(0, cat_id_str.length-1);
                
                var post_data;
                if(typeof $cat_path[$cat_id] == "undefined")
                {
                    var root_category=$cat_parent[$cat_id];
                }
                else
                {
                    var destination_path=($cat_path[$cat_id]).split("/");
                    var root_category=destination_path[1];
                }
                var change_url=0;
                if($('#change_url').is(':checked'))
                {
                    change_url=1;
                }
                
                /* Redesign Jan 2017 Yogesh.v Starts */
                var display_detailed_view = $.trim($('#display_detailed_view').val());
                var default_layout_view = $.trim($('#default_layout_view').val());
                if(display_detailed_view==1 && default_layout_view=='')
                {
                    alert("Please select default layout view in display setting tab.");
                    return false;
                }
                /* Redesign Jan 2017 Yogesh.v Ends */
                
                //console.log(create_subcat_flag);   /*create_subcat_flag= 0:whn editing existing category; 1:whn creating subcategory */
                if(create_subcat_flag == 1)
                {
                    create_subcat_flag = 0;
                    if(change_url == 0)
                    {
                        alert('Please select change URL checkbox.');
                        return false;
                    }
                    //post_data=frm+"&main_category="+$cat_id+"&type=child&root_category="+root_category+"&change_url="+change_url;
                    var jType = 'child';
                }
                else
                {
                    //post_data=frm+"&main_category="+$cat_id+"&type=edit&root_category="+root_category+"&change_url="+change_url;
                    var jType = 'edit';
                }

                var values1 = {};
                $.each($('#myform').serializeArray(), function(i, field) {
			if(field.name in values1) {
				values1[field.name] += "," + field.value;
			} else {
				values1[field.name] = field.value;
			}
		});
                
                values1['main_category'] = $cat_id;
                values1['root_category'] = root_category;
                values1['change_url'] = change_url;
                values1['type'] = jType;
                
                $.ajax({
                type:"POST",
                url:$url+"categoryPost",
                data:{data:values1},
                async:false,
                dataType:"json",
                beforeSend : function(){
                    $('#notices').text("Loading , plese wait ...........").css("display","block");
                },
                success:function(response){

                    if(response.failed) {
                    alert(response.failed);
                    } else {
                        $('#notices').text(response.success);
                        for(i=0;i<2;i++) {
                             $('#notices').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
                         }
                         $('#notices').fadeOut( 'slow' );
                    }

                    if((response.inserted_catid) && response.inserted_catid != 'undefined'){
                        catid = response.inserted_catid;
                    } else {
                        catid = response.updated_catid;
                    }
                    initExtJSTree(catid);
                }
              });
            }
        }
    });

    $('#btnRootcategory').click(function(event){
        event.preventDefault();
        var frm= $('#myform').serialize();
        var name =$('#name').val();
        if(name == "")
        {
            alert("Name cannot be blank");
            $('#name').focus();
            return false;
        }
        else
        {
            $.ajax({
            type:"POST",
            url:$url+"categoryPost",
            data:{data:frm+"&type=new&main_category=1&root_category=0"},
            async:false,
            success:function(response){
                var inserted_catid = $.parseJSON(response).inserted_catid;

                if((inserted_catid) && inserted_catid != 'undefined'){
                    catid = inserted_catid;
                } else {
                    catid = inserted_catid;
                }
                initExtJSTree(catid);
            }
          });
        }
    });
});

  function initExtJSTree(cat_id){

      Ext.application({
        name : 'MyApp',

        launch : function() {
            var store = Ext.create('Ext.data.TreeStore', {
                root : {
                    expanded : true,
                    children : $tree
               }
            });
            //console.log(JSON.stringify($tree));
            var tree = Ext.create('Ext.tree.Panel',{
                renderTo : 'tree-div',
                title : 'CATEGORY INFORMATION',
                height : 600,
                width : 368,
                store : store,
                rootVisible : false,
                border: false,
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        text: 'Expand All',
                        handler: function(){
                            tree.expandAll();
                        }
                    }, {
                        text: 'Collapse All',
                        handler: function(){
                            tree.collapseAll();
                        }
                    }]
                }],

                viewConfig: {
                    plugins: {
                        ptype: 'treeviewdragdrop'
                    },
                    listeners: {
                        itemclick: function(s,r) {
                            $('#delete').show();
                            $('#submit').show();
                            create_subcat_flag = 0;

                            var ajax_catid = r.data.id;
                            var level = r.data.level;
                            var children = r.data.children;
                            var show_data = {};
                            if(level>3 && children.length > 0) {
                                //level is not meta, and has children hence cat is PG
                                //category is PG - show selection options for pg categories for mobile display options
                                show_data.show_meta = 0;
                                show_data.show_direct = 0;
                                show_data.show_selection = 1;
                            }
                            catid = ajax_catid;
                            $('#notices').text("Loading , plese wait ...........").css("display","block");
                            loadCatData(ajax_catid,show_data);
                            $('#notices').text("").css("display","none");

                            $("#h3-title-cat").html($("#name").val() + " (" + catid + ")");
                        },


                        drop: function (node, data, overModel, dropPosition) {

                            var changeURL = $('#change_url').is(":checked");
                            var a = data.records;
                            var b = a[0];
                            var droppedNode = b.data.id;   //ID of node being drapped

                            var newParentInfo = overModel.data;   //new parent info
                            var ID = newParentInfo.id;
                            var parentID = newParentInfo.parent_id;

                            var childName = [];
                            var nameFlag = 0;       //to avoid dropping the node having the same name as tht of one of the existing child node
                            for(var i=0; i<newParentInfo.children.length; i++){
                                childName.push(newParentInfo.children[i].text);
                                if(childName[i] == b.data.text){
                                    nameFlag = 1;
                                }
                            }

                            if(nameFlag == 1){

                                cat_id = droppedNode;
                                $.ajax({
                                    type:"POST",
                                    url:$url+"getNewCategorytreeEXTJS",
                                    async:false,
                                    success:function(response){

                                        $cat_parent=$.parseJSON(response).cat_parent;
                                        $cat_path=$.parseJSON(response).cat_path;
                                        cat_active_details=$.parseJSON(response).cat_active_details;

                                        var jsonData = {
                                            expanded: true,
                                            children: $.parseJSON(response).tree
                                        };
                                        tree.setRootNode(jsonData);

                                        if(cat_id != 1){
                                            var level = store.getNodeById(cat_id).data.level;
                                            var children = store.getNodeById(cat_id).data.children;
                                            var show_data = {};
                                            if(level>3 && children.length > 0) {
                                                //level is not meta, and has children hence cat is PG
                                                //category is PG - show selection options for pg categories for mobile display options
                                                show_data.show_meta = 0;
                                                show_data.show_direct = 0;
                                                show_data.show_selection = 1;
                                            }
                                            tree.expandPath(store.getNodeById(cat_id).getPath());
                                            select_treeNode(cat_id);
                                            loadCatData(cat_id,show_data);
                                        }
                                    }
                                });
                                alert('New parent already has a child category with the same name as that of the category being dropped');
                            }else{
                                $.ajax({
                                    type: "POST",
                                    url: $url + 'cniMovement',
                                    data: {changeURL: changeURL, droppedNode: droppedNode, parentID: parentID, ID: ID, dropPosition: dropPosition},
                                    beforeSend : function(){
                                        $('#notices').text("Loading , plese wait ...........").css("display","block");
                                    },
                                    success: function(response){

                                        select_treeNode(droppedNode);

                                        if(response.indexOf("Error") > -1) {
                                           alert(response);
                                        } else {
                                            var jsonData = {
                                                expanded: true,
                                                children: $.parseJSON(response)
                                            };
                                            tree.setRootNode(jsonData);
                                            tree.expandPath(store.getNodeById(droppedNode).getPath());
                                            $.ajax({
                                                type: 'POST',
                                                url: $url + 'ajaxCategory',
                                                data: {Ajax_catid:droppedNode,data:1,attr_name_id:0},
                                                dataType:"json",
                                                async: false,
                                                success: function(resulthtml)
                                                {
                                                    if(resulthtml)
                                                    {
                                                        $.each(resulthtml, function(index, val){
                                                            $('#'+index).val(val);
                                                        });
                                                        $('#notices').text("").css("display","none");
                                                    }
                                                },
                                                error: function(message)
                                                {
                                                    alert('error');
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            });

            /*  'if-else' part is for loading tree again after clicking on "Add Root Category", "Save Category" or "Delete Categry" button */
            if(cat_id){
                if($('.x-panel').length > 0){
                    var tid = $('.x-panel').attr('id');
                    $('#'+tid).remove();
                }

                $.ajax({
                    type:"POST",
                    url:$url+"getNewCategorytreeEXTJS",
                    async:false,
                    success:function(response){

                        $cat_parent=$.parseJSON(response).cat_parent;
                        $cat_path=$.parseJSON(response).cat_path;
                        cat_active_details=$.parseJSON(response).cat_active_details;

                        var jsonData = {
                            expanded: true,
                            children: $.parseJSON(response).tree
                        };
                        tree.setRootNode(jsonData);

                        if(cat_id != 1){
                            var level = store.getNodeById(cat_id).data.level;
                            var children = store.getNodeById(cat_id).data.children;
                            var show_data = {};
                            if(level>3 && children.length > 0) {
                                //level is not meta, and has children hence cat is PG
                                //category is PG - show selection options for pg categories for mobile display options
                                show_data.show_meta = 0;
                                show_data.show_direct = 0;
                                show_data.show_selection = 1;
                            }
                            tree.expandPath(store.getNodeById(cat_id).getPath());
                            select_treeNode(cat_id);
                            loadCatData(cat_id,show_data);
                        }
                    }
                });
            } else {
                tree.expandPath(store.getNodeById(2).getPath());
            }

            function select_treeNode(nodeID){
                $('#delete').hide();
                setTimeout(function(){
                    node = store.getNodeById(nodeID);
                    tree.getSelectionModel().select(node);
                    $("#h3-title-cat").html($("#name").val() + " (" + nodeID + ")");
                },1000);
            }

        }
    });

  }

  function loadCatData(ajax_catid,show_data){
    if(typeof show_data == 'undefined'){
        show_data = {};
    }
    $.ajax({
        type: 'POST',
        url: $url + 'ajaxCategory',
        data: {Ajax_catid:ajax_catid,data:1,attr_name_id:0},
        dataType:"json",
        async: false,
        success: function(resulthtml)
        {
            callbackForSuccess(resulthtml,show_data);
            /*console.log(show_data)
            if(resulthtml)
            {
                $.each(resulthtml, function(index, val){
                    $('#'+index).val(val);
                });
            }*/
        },
        error: function(message)
        {
            alert('error');
        }
    });
  }

function callbackForSuccess(resulthtml,show_data){
    if(resulthtml){
        $.each(resulthtml, function(index, val){
            //set only selected values in dropdown for mobile display options
            $('#'+index).val(val);
            
            if(index == 'brand_card')
            {
                $('#brand_card_hidden').val(val);
            }
            
            if(index=='mobile_display_mode'){
                $('#'+index+ " option").prop('disabled', true);
                $('#'+index+ " option[value='"+val+"']").prop('disabled', false); 
                //if selected value is pg_non_furniture then show 2 values
                if(resulthtml.is_furniture_category==0 && show_data.show_selection==1){
                    $.each(mobile_display_values['pg_non_furniture'] , function(i,v){
                        $('#'+index+ " option[value='"+v+"']").prop('disabled', false);
                    });
                }
            }
        });
        
        getDefautLayoutSelectView();
        selectMultipleBrandsIds(resulthtml['brand_card']);
    }
}

function getDefautLayoutSelectView()
{
    var display_detailed_view = $.trim($('#display_detailed_view').val());
    
    if(display_detailed_view == 0)
    {
        //code to select default value and disable it.
        $('#default_layout_view').val("").change();
        $('#default_layout_view').prop('disabled', true);
    }
    else
    {
        $('#default_layout_view').prop('disabled', false);
    }
    
}


function selectMultipleBrandsIds(val)
{
    var str_array = val.split(',');

    for (var i = 0; i < str_array.length; i++) {
        str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
    }

    $("#brand_card").val(str_array).trigger("liszt:updated");
}