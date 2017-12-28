function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		var columnChangeName = $('<button class="column-change-name">Zmień nazwę kolumny</button>');

		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

		columnCardList.mouseup(function() {
			cardColumnId = self.id;
		});

		columnCardList.sortable({
      		receive: function(event, ui) {
      			$.ajax({
					url: baseUrl + '/card/' + cardId,
					method: 'PUT',
					data: {
						name: card_Name,
            			bootcamp_kanban_column_id: self.id 
        			}
				});
      		}
    	});

		columnChangeName.click(function() {
			self.renameColumn();
		});
		
		columnAddCard.click(function(event) {
			var cardName = prompt('Wpisz nazwę karty');
			event.preventDefault();
			$.ajax({
        		url: baseUrl + '/card',
        		method: 'POST',
        		data: {
              		name: cardName,
    				bootcamp_kanban_column_id: self.id
        		},
        		success: function(response) {
            		var card = new Card(response.id, cardName);
        			self.createCard(card);
        		}
    		});
		});
			
		// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnChangeName)
			.append(columnAddCard)
			.append(columnCardList);
		return column;
	}
}

Column.prototype = {
	createCard: function(card) {
	  	this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
	  	var self = this;
    	$.ajax({
      		url: baseUrl + '/column/' + self.id,
      		method: 'DELETE',
      		success: function(response){
        		self.element.remove();
      		}
    	});
	},
	renameColumn: function() {
		var self = this;
		var columnName = prompt('Wpisz nową nazwę');
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {
				name: columnName
			},
			success: function(response){
				self.element.children('h2')[0].innerText = columnName;
			}	
		});
	}
}