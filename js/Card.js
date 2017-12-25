// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'No name given';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardChangeName = $('<button class="card-change-name">Zmień opis</button>');
		
		card.mouseup(function(){
			self.updateCardColumn();
		});

		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		cardChangeName.click(function() {
			self.renameCard();
		});
		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		card.append(cardChangeName);
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
    	var self = this;
    	$.ajax({
      		url: baseUrl + '/card/' + self.id,
      		method: 'DELETE',
      		success: function(){
        		self.element.remove();
      		}
    	});
	},
	renameCard: function() {
		var self = this;
		var cardName = prompt('Wpisz nowy opis');
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
            	name: cardName
        	},
			success: function(response){
				self.element.children('p')[0].innerText = cardName;
			}	
		});
	},
	updateCardColumn: function(){
        var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
    			bootcamp_kanban_column_id: this.column.id
        	}
		});
	}
}