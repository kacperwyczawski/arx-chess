import { getAllPieces, q } from "./utils";

const body = document.body;
for (const piece of getAllPieces("white")) {
	if (piece.name === "pawn") {
		continue;
	}

	const h1 = document.createElement("h1");
	h1.id = piece.name;
	let content;
	if (piece.name === "bishop-rook") {
		content = "Bishop + Rook (Queen)";
	} else if (piece.name === "amazon") {
		content = "Amazon (Bishop + Knight + Rook)";
	} else {
		content = piece.name
			.split("-")
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join(" + ");
	}
	h1.textContent = content;
	body.appendChild(h1);

	const ul = document.createElement("ul");
	for (const requirement of piece.requirements) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = `#${requirement.name}`;
		a.textContent = requirement.name;
		li.appendChild(a);
		ul.appendChild(li);
	}
	body.appendChild(ul);
}

// TODO: images
