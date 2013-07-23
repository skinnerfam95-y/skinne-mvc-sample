$(function(){
	$('#inputEdit').hide();
	recordManager.init(jsViewVars.Records);
	recordManager.bind();
	
	$("#myTable").dataTable({
		"aaSorting"   : [[ 1, "desc" ]],
		"bStateSave"  : true,
	    "fnStateLoad" : function (oSettings) {
	    	// Disabling the state load permits a saved state
	    	// as a page is redrawn (ajax'd for instance)
	    	// but resets the state each time the page is loaded
	    	return null;
	    }		
	});
});

var recordManager= {
	records : null,
	editIdx : null,
	
	init : function(records){
		this.records = records;
	},
	
	bind : function(){
		var $this = this;
		
		$('#inputAdd').click(function(){
			$('#inputAdd').hide();
			$('#inputEdit').show();
			
			$('#inputId').html('{new record}');
			$('#inputVal').val('');
			
			var newRowNum = $this.records.length;
			$this.records.push({
				'rowNum' : newRowNum,
				'id' : null,
				'val': null
			});
			
			$this.editIdx = newRowNum;
		});
		
		$('#inputSave').click(function(){
			$.ajax({
				'url' : 'index.php?action=save',
				'type' : 'post',
				'dataType' : 'json',
				'data' : $this.records[$this.editIdx],
				'success' : function(data, textStatus, jqXHR){
					$this.records[$this.editIdx]['id'] = data.id;
					$this.editIdx = null;
					$('#inputAdd').show();
					$('#inputEdit').hide();

					$this.ajaxRecordListTable();
				}
			});
		});
		
		$('.updateStore').change(function(){
			$this.records[$this.editIdx]['val'] = $('#inputVal').val();
		});
		
		this.bindRows();
	},
	
	bindRows : function(){
		var $this = this;

		$('#myTable').on('click', '.editRow', function(){
			var idParts = this.parentNode.parentNode.id.split('_');
			var rowNum = idParts[idParts.length - 1];
			
			$('#inputAdd').hide();
			$('#inputEdit').show();
			$('#inputId').html($this.records[rowNum]['id']);
			$('#inputVal').val($this.records[rowNum]['val']);
			
			$this.editIdx = rowNum;
			// TODO: Improve this to bind to specific row, but still delegate?
			return false; // stop propegation...otherwise calls for every row
		});
		
			$('#myTable').on('click', '.deleteRow', function(){
				var idParts = this.parentNode.parentNode.id.split('_');
				var rowNum = idParts[idParts.length - 1];
				
				$.ajax({
					'url' : 'index.php?action=delete',
					'type' : 'post',
					'dataType' : 'json',
					'data' : {id:$this.records[rowNum]['id']},
					'success' : function(data, textStatus, jqXHR){
						$this.records.splice(rowNum,1);
						$this.ajaxRecordListTable();
					}
				});
				// TODO: Improve this to bind to specific row, but still delegate?
				return false; // stop propegation...otherwise calls for every row
			});	
	},
	
	ajaxRecordListTable : function(){
		
		var $this = this;
		
		$('#recordListTable').empty();
		
		$.ajax({
			'url' : 'index.php?action=recordListTable',
			'dataType' : 'text',
			'success' : function(data, textStatus, jqXHR){
				$('#recordListTable').html(data);
				$("table").dataTable({
			        "bStateSave": true
			    });
				$this.bindRows();
			}
		});
	}
};