# jQuery-DBdata

Jquery plugin to collect values from data attributes to prepare full info about record to store in Database.

## Base idea 

Set full info of a DB record: 

    <input data-field="name" data-dbtable="tblNames" data-rowid="24" value="John" />

Run plugin, collect data attributes and make structured AJAX POST request: 

    $("body").on("change","input",function(){
      $(this).DBSave();
    });

    DBdata: {
               table: 'tblNames',
               field: 'name',
               value: 'John',
                 key: 'id',
                  id: 24
           }

## Traversing

When grid is used the plugin can save a lot of writting:

    <table data-dbtable="tblNames">
     <thead>
      <tr><th data-dbfield="name">Name</th><th data-dbfield="age">Age</th></tr>
     </thead> 
     <tbody> 
      <tr data-rowid="87">
       <td><input value="John" /></td>
       <td><input value="87" /></td>   
      </tr>
      <tr data-rowid="88">
       <td><input value="Alice" /></td>
       <td><input value="63" /></td>   
      </tr>
     </tbody>  
    </table> 

