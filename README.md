# jQuery-DBdata

Collect info from data attributes to prepare full info about record to store in Database.

Jquery plugin used for catching all data by traversing of parents to save writting the same things for more elements. 

## Base idea 

Set full info for a DB record to send: 

    <input data-field="name" data-dbtable="tblNames" data-rowid="24" value="" />

    $("body").on("change","input",function(){
      $(this).DBSave();
    });

After "change" the AJAX POST method will be called with certain row structure and values.

## Traversing

When grid is used, we can save a lot of writting:

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

