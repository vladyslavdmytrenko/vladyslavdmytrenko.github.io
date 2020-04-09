var books = {};

$(document).ready(function () {
	$('#modal-add-book-ok').on('click', addBookToLibrary);
	var saveBook = localStorage.getItem('library');
	if ( saveBook ) {
		books = JSON.parse(saveBook);
		for (var key in books) {
			drawBook(key);
		}
	}
});

function addBookToLibrary() {
	var formData = $('form').serializeArray();
	var arr = {};
	var data = $(this).attr('data');
	for (key in formData) {
		arr[formData[key]['name']] = formData[key]['value'];
	};
	if (data == undefined) {
		var randomArticle = Math.round(Math.random() * 10000);
		books[randomArticle] = arr;
		drawBook(randomArticle);
	} else {
		books[data] = arr;
		drawBook(data);

	};
	
	//console.log(books);
	$('#modal-add-book').modal('hide');

};

function drawBook(article) {
	var book = $('.book[data=' + article + ']');
	if (book.length == 0) {
		var div = document.createElement('div');
		div.className = 'col-lg-3 book';
		div.setAttribute('data', article);

		var cover = document.createElement('div');
		cover.className = 'book-cover';
		cover.style.backgroundImage = `url(${books[article]['book-cover']})`;

		var bookName = document.createElement('h3');
		bookName.className = 'book-title';
		bookName.innerHTML = books[article]['book-name'];

		var bookYear = document.createElement('p');
		bookYear.className = 'book-year';
		bookYear.innerHTML = books[article]['book-year'];

		var ButtonEdit = document.createElement('button');
		ButtonEdit.className = 'btn btn-success edit';
		ButtonEdit.innerHTML = 'Edit';
		ButtonEdit.setAttribute('data', article);
		ButtonEdit.onclick = editBook;
		
		var ButtonDelete = document.createElement('button');
		ButtonDelete.className = 'btn btn-warning edit';
		ButtonDelete.innerHTML = 'Delete';
		ButtonDelete.setAttribute('data', article);
		ButtonDelete.onclick = deleteBook;

		div.appendChild(cover);
		div.appendChild(bookName);
		div.appendChild(bookYear);
		div.appendChild(ButtonEdit);
		div.appendChild(ButtonDelete);

		$('.book-panel').append(div);
	} else {
		var bookCover = book.find('.book-cover');
		bookCover.css({'background-image': 'url(' + books[article]['book-cover'] + ')'});
		
		var bookYear = book.find('.book-year').eq(0);
		bookYear.html( books[article]['book-year'] );
		var bookAuthor = book.find('.book-author').eq(0);
		bookAuthor.html( books[article]['book-author'] );
		var bookName = book.find('.book-title').eq(0);
		bookName.html( books[article]['book-name'] );
		$('#modal-add-book-ok').removeAttr('data');
	};
	localStorage.setItem('library', JSON.stringify(books));
};

function editBook() {
	var data = $(this).attr('data');
	console.log(data);
	$('#modal-add-book').modal('show');
	$('form #book-name').val(books[data]['book-name']);
	$('form #book-author').val(books[data]['book-author']);
	$('form #book-cover').val(books[data]['book-cover']);
	$('form #book-year').val(books[data]['book-year']);
	$('#modal-add-book-ok').attr('data', data);
};
 function deleteBook () {
	 $(this).parent('.book').remove();
	 var data = $(this).attr('data');
	 delete books[data];
	 localStorage.setItem('library', JSON.stringify(books));
 }