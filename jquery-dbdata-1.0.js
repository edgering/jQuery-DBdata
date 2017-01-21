(function ($){
  $.fn.DBSave = function(options){
     
    var me = this,
        parent = me.parent(),
        element = me.prop('nodeName');        
              
    var settings = $.extend({  
          action: "index.php",
//        action: false,  --> to return db values
           scope: ".ns__dbdata",
      thead_cell: "th",  
      data_table: "dbtable",
      data_field: "dbfield",
      data_rowid: "rowid",              
        data_key: "key",
  data_addvalues: "values",        
    classEditing: "",
     classSaving: "EdbSave",
      classSaved: "saved",                          
          DBdata: {
                    table: false,
                    field: false,
                    value: false,
                   values: '',
                      key: 'id',
                       id: 0
                  }         
    }, options);
    
    /**
     *  Traverse parents to find data attribute
     *  
     *  !deep_search means scan only element and its 1st parent
     *  
     */
            
    function FindField(attr, deep_search)
    {                                      
      deep_search = deep_search || true; 

      var f = me.attr("data-" + attr);
                  
      if (f === undefined && parent.length)
      {
        f = parent.attr("data-" + attr);
      }
      
      if (deep_search && f === undefined)
      {                
        var find = me.closest("[data-" + attr + "]");
        
        if (find.length)
        {
          f = find.data(attr)
        }                
      }          
            
      return (f === undefined) ? false : f;
    }
            
    // -- Set table name ---------------
    
    if (!settings.DBdata.table)
    {            
      settings.DBdata.table = FindField(settings.data_table);      
    }
    
    // -- Set field name ---------------
     
    settings.DBdata.field = FindField(settings.data_field,false);
                 
    if (!settings.DBdata.field)
    {
      // Field name can be stored in table header
      
      var tbl = me.closest("table");
      
      if (tbl.length)
      {
        var tmp = tbl.find("thead tr:eq(0) " + settings.thead_cell + ":eq(" + (me.index() - 1) + ")"); 
        
        if (tmp.length && tmp.attr("data-" + settings.data_field))
        {
          settings.DBdata.field = tmp.data(settings.data_field);
        }                              
      }       
    }
    
    // -- Rowid ------------------------
        
    settings.DBdata.id = FindField(settings.data_rowid);
    
    // -- Key --------------------------
        
    var temp = FindField(settings.data_key);
    
    if (temp)
    {
      settings.DBdata.key = tmp; 
    }
    
    // -- Value ------------------------
    
    if (element == 'TEXTAREA' || element == 'INPUT' || element == 'SELECT')
    {
      settings.DBdata.value = me.val();
    }
    else
    {
      settings.DBdata.value = me.find("input").val();
    }
            
    //  Aditional values
    // ---------------------------------
    //  set > data-values = 'key|value'
    
    var temp = [];
    
    if (me.attr("data-" + settings.data_addvalues))
    {
      temp.push(me.data(settings.data_addvalues));
    }
    
    if (parent.attr("data-" + settings.data_addvalues))
    {
      temp.push(parent.data(settings.data_addvalues));
    }
    
    var scope = $(settings.scope);
    
    if (scope.length)
    {            
      if ($(settings.scope).attr("data-" + settings.data_addvalues))
      {
        temp.push($(settings.scope).data(settings.data_addvalues));
      }
    
      if (me.attr("data-alter") && scope.attr("data-alter-" + me.data("alter")))
      {
        /**
         *  To switch tables defined in scope  
         *  using alias  
         *  
         *  class="scope" data-alter-1="MyTable1" data-alter-2="MyTable2"
         *
         *  <input data-alter="1" => .scope[data-alter-1] => MyTable1
         *  
         */
      
         settings.DBdata.table =  scope.data("alter-" + me.data("alter"));
      }      
    }
    
    /***
     *  SEND RESULT    
     *  
     */

    if (!settings.action)
    {
      return settings.DBdata;   
    }
    else
    {                                                                          
      if (settings.DBdata.table !== ''                     
           && settings.DBdata.field !== ''
            && settings.DBdata.id !== '')
      {
        me.addClass(settings.classSaving);
                                                                                                                                               
        $.post(settings.action, { params: { way: "edb" }, data: settings.DBdata }, 
          function(data){        
            me.removeClass(settings.classSaving);
            me.addClass(settings.classSaved);        
        })                      
      }      
    }    
}}(jQuery));    
