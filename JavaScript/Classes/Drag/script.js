let d = document.querySelectorAll(".draggables");
let c = document.querySelectorAll(".containers");

let draggedItem = null;

d.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
        draggedItem = item;
        item.classList.add("dragging");
        event.dataTransfer.setData("text/plain", item.textContent);
        event.dataTransfer.effectAllowed = "move";
    });

    item.addEventListener("dragend", (event) => {
        item.classList.remove("dragging");
        draggedItem = null;
    });
});

c.forEach((container) => {
    container.addEventListener("dragover", (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    });

    container.addEventListener("drop", (event) => {
        event.preventDefault();
        if (!draggedItem) return;
        container.appendChild(draggedItem);
    });
});


