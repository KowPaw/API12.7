var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  	'X-Client-Id': '2693',
  	'X-Auth-Token': '7e02a48560b55c33f4f17832bf24c069'
};
var cardId;
var card_Name;
var cardColumnId;

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
    	setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
  		var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
        var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(card);
  	});
}