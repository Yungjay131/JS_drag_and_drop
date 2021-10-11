const ulDraggable = $("#draggable-list");
const btnCheck = $("#check");

const listRichestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Micheal Bloomberg',
    'Larry Page'
];

//list items would be stored here
const listItems = [];

let dragStartIndex;

createList();

//insert list items into DOM
function createList() {
    //using spread operator to preserve order
    [...listRichestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((num1, num2) => { return num1.sort - num2.sort })
        .map(a => a.value)
        .forEach((person, index) => {

            const innerDiv =
                `<div id="${index}" class="draggable" draggable="true">
            <p id='p-${index}' class="person-name">${person}</p>
            <i class="fas fa-grip-lines></i>
         </div>`;

            const item = ulDraggable.append(
                `<li data-index=${index}>
             <span class="number">${index + 1}</span>
             ${innerDiv}
             </li>`);

            listItems[index] = item.find(`#p-${index}`);
        });

    addEventListeners();
}

function addEventListeners() {
    const draggables = $('.draggable');
    const dragListItems = $('.draggable-list li');

    draggables.bind('dragstart', dragStart);

    dragListItems.bind('dragover', dragOver);
    dragListItems.bind('drop', dragDrop);
    dragListItems.bind('dragenter', dragEnter);
    dragListItems.bind('dragleave', dragLeave);

    btnCheck.bind('click', checkOrder);
}

function dragStart() {
    //getting the closest li to where the drag started
    dragStartIndex = +$(this).closest('li').attr('data-index');
    console.log(dragStartIndex);
}

function dragEnter() {
    $(this).addClass("over");
}

function dragLeave() {
    $(this).removeClass("over");
}

function dragDrop() {
    const dragEndIndex = +$(this).attr('data-index');

    swapItems(dragStartIndex, dragEndIndex);

    $(this).removeClass('over');
}

function dragOver(event) { event.preventDefault(); }

function swapItems(from, to) {
    const start = $(`li[data-index=${from}]`);
    const end = $(`li[data-index=${to}]`);

    const startItem = listItems[from].text();
    const endItem = listItems[to].text();

    start.find(`#${from}`).find(`#p-${from}`).text(endItem);

    end.find(`#${to}`).find(`#p-${to}`).text(startItem);

}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.text()

        if (personName !== listRichestPeople[index]) {
            //meaning its in the wrong spot
            listItem.addClass('wrong');
        } else {
            listItem.removeClass('wrong');
            listItem.addClass('right');
        }
    });
}


