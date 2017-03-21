
$(document).ready(function(){
	console.log("Document is ready ");
		var $table = $('#eventsTable');
		var table;
 	 $.get("http://localhost:8080",function(data,status){
   		console.log("Data == "+(data));
   	var datar = JSON.parse(data);
   	console.log("Data == "+(datar));
   	console.log("Data == "+datar[1].events[0].title );

   	console.log(status, status);

   	 
                    $("#Template-categories").tmpl(datar).appendTo("#listview-categories");
                    document.createElement('Template-categories').content
                
                 
   
$(function() {
  var table = $table.bootstrapTable({
    data: datar,
    detailView: true,
    onExpandRow: function(index, row, $detail) {
      console.log(row)
      $detail.html('<table></table>').find('table').bootstrapTable({
        columns: [{
          field: 'title',
          title: 'Title'
        }, {
          field: 'author',
          title: 'Author'
        },
        {
          field: 'duration',
          title: 'Duration'
        },
        {
          field: 'details',
          title: 'Details'
        }],
        data: row.events,
        
      });

    }
  });
});

   });



$('#eventsform').hide();
$('#sessionform').hide();

  
  $('#eventbutton').click(function(){
  	console.log("events button clicked");
  	$('#listview-categories').hide(750);
  	 $('#eventsform').show();
  	 $('#eventbutton').hide();
  	 $('#headinga').html("Create New Event");
  });

  $('#eform').submit(function (event) {
  	//event.preventDefault();
  	 // $('#eventsTable').show();
  	 // $('#eventsform').hide();
  	 // $('#eventbutton').show();
  	 console.log("form data submitted")
	 var params   = $('#eform').serializeArray();
	$.ajax({
    	url: 'http://localhost:8080/updateEvent', 
    	type: 'POST', 
    	contentType: 'application/json', 
    	 data: JSON.stringify(params),
    	 success: function(data) {
               console.log('success');
               console.log(JSON.stringify(data));
               window.location.reload();
            }

    	}
	)

	 console.log("Forma data is "+params);

	 return false;
  });


  var selectedSession;
   

    // output "content", inner template

//$template = $($.parseXML(tc)).contents();
//var $table = $template.find('table');
 var table = $('#Template-categories table') ;
 $('#eventsTable').on( 'click', 'tr button', function (data) {

   var $template = $('#Template-categories');
        var node = $template.prop('content');
        var $content = $template.find('table');
        console.log("content ******************"+JSON.stringify(data));


        console.log("button clicked ");
        var data =  $(this).parents().data();
        var $table = $(this).tmplItem();
          // data = $table.row( $(this).closest('tr') ).data();
          console.log("data ==" +JSON.stringify($table.prent()));

        data = $(this).closest('tr').get(0);
        console.log("data " +data.rowIndex);
        //$(this).closest('tr').remove();
     
          
      
         //var table2 = $('#example').bootstrapTable();
       //  console.log('getRowByUniqueId: ' + JSON.stringify($table.bootstrapTable('getRowByUniqueId', 'C++')));
		// var data2 = table2.row( 0 ).data();
        //selectedSession = data.index + 1;
       // var sdata = $table.bootstrapTable('getRowByUniqueId', selectedSession)
       //var data2 =  $('#eventsTable').DataTable().row(0).data();
       // console.log("onclicked" +$table.bootstrapTable('getRowByUniqueId', 0));
        $('#sessionform').show();
        $('Template-categories #eventsTable').hide(750);
        $('#eventbutton').hide();
  	 	$('#headinga').html("Create New SESSION FOR EVENT " +data);
    } );


 $('#sessionform').submit(function (event) {

  	event.preventDefault();
  	 // $('#eventsTable').show();
  	 // $('#eventsform').hide();
  	 // $('#eventbutton').show();
  	 console.log("session form data submitted for " +selectedSession)
	 var params   = $('#sform').serializeArray();
	 var selectedS = {"selectedSession" : selectedSession};
	 console.log("session Forma data is "+JSON.stringify(params));
	 params.push({"selectedSession" : selectedSession});

	$.ajax({
    	url: 'http://localhost:8080/updateSession', 
    	type: 'POST', 
    	contentType: 'application/json', 
    	 data: JSON.stringify(params),
    	 success: function(data) {
               console.log('success');
               console.log(JSON.stringify(data));
               window.location.reload();
            }

    	}
	)

	 

	 return false;
  });

  

  window.actionEvents = {
    'click .create': function (e, value, row, index) {
        alert('You click like icon, row: ' + JSON.stringify(row));
        console.log(value, row, index);
    }
    
};
});


 function operateFormatter(value, row, index) {
 	console.log("formatter called");
            return value + '<button type="button" class="create" style = "float:right;margin-right:20px">Create New Session</button>'
        }



