# jQuery-DBdata

Jquery plugin to collect values from data attributes to prepare full info about record to store in Database.

## Base idea 

Set full info for a DB record in place: 

    <input data-field="name" data-dbtable="tblNames" data-rowid="24" value="John" />

Run plugin = collect data attributes 

    $("body").on("change","input",function(){
      $(this).DBdata();
    });

and prepare structured AJAX POST request

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

All inputs are now sending values after editing in the same structure.

## Editing data from more tables

    <table data-dbtable="tblNames" data-alter-1="tblCompany">
     <thead>
      <tr><th data-dbfield="name">Name</th><th data-dbfield="age">Age</th><th data-dbfield="company">Company</th></tr>
     </thead> 
     <tbody> 
      <tr data-rowid="87">
       <td><input value="John" /></td>
       <td><input value="87" /></td>   
       <td><input data-alter="1" data-rowid="123" value="Edgering" /></td>
      </tr>
      <tr data-rowid="88">
       <td><input value="Alice" /></td>
       <td><input value="63" /></td>   
       <td><input data-alter="1" data-rowid="101" value="NASA" /></td>
      </tr>
     </tbody>  
    </table> 

3rd cell is now parsed as table 'tblCompany'. 
