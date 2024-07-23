import { getAllPieces } from "./utils";

const body = document.body;
for (const piece of getAllPieces("white")) {
	if (piece.name === "pawn") {
		continue;
	}

	const h1 = document.createElement("h1");
	h1.id = piece.name;
	const span = document.createElement("span")
	const img = document.createElement("img")
	img.src = `${piece.name}-white.png`
	img.alt = piece.name
	if (piece.name === "bishop-rook") {
		span.textContent = "Bishop + Rook (Queen)";
	} else if (piece.name === "amazon") {
		span.textContent = "Amazon (Bishop + Knight + Rook)";
	} else {
		span.textContent = piece.name
			.split("-")
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join(" + ");
	}
	h1.appendChild(img)
	h1.appendChild(span)
	body.appendChild(h1);

	const ul = document.createElement("ul");
	ul.textContent = "requires:"
	for (const requirement of piece.requirements) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = `#${requirement.name}`;
		const img = document.createElement("img");
		img.src = `${requirement.name}-white.png`
		img.alt = requirement.name
		a.appendChild(img)
		li.appendChild(a);
		ul.appendChild(li);
	}
	body.appendChild(ul);
}
