import type { Player } from "./player";
import { q } from "./utils";

export default class Tutorial {
	activate(whitePlayer: Player) {
		function m(text: string, mainMenu = false) {
			setTimeout(() => {
				alert(text);
				if (mainMenu) {
					location.pathname = "";
					location.search = "";
				}
			}, 100);
		}

		m("Welcome to Industrial Chess tutorial!");
		m(
			"Your primary objective is to capture all enemy castles. But for now just move your pawn to the right. In order to do that, click on it.",
		);
		q("td[style*='white']").addEventListener("click", () => {
			m(
				"Great! Now pawn is selected. Click on cell to the left to place the pawn on it.",
			);
			q("td[style*='white'] + td").addEventListener("click", () => {
				m("Now the turn ends. You get some gold and your enemy can move.");
				q("td[style*='black']").dispatchEvent(new Event("click"));
				q("tr:nth-child(7) > td:nth-child(8)").dispatchEvent(
					new Event("click"),
				);
				m(
					"Now you have 1 gold, which is enough to buy another pawn. Right-click (or long-press on touchscreen) on your castle (the cell you started from).",
				);
				let skip = false;
				q("tr:nth-child(2) > td:nth-child(2)").addEventListener(
					"contextmenu",
					() => {
						if (!skip) {
							skip = true;
							m("Now click on pawn.");
							q("li.cell").addEventListener("click", () => {
								m(
									"Now you bought your first piece! Unfortunately there is only 1 action per turn. Wait for your enemy to move.",
								);
								q("td[style*='black']").dispatchEvent(new Event("click"));
								q("tr:nth-child(6) > td:nth-child(8)").dispatchEvent(
									new Event("click"),
								);
								m(
									"Your enemy is moving towards the next castle! When he captures it he'll get more gold per turn and bigger piece capacity.",
								);
								m(
									"But there is another way to get these bonuses. You can upgrade your castle to barracks (more total pieces), factory (lower prices) or mine (more gold per turn).",
								);
								m(
									"I'll grant you some additional gold to buy an upgrade. Enter the castle menu like before and buy it.",
								);
								whitePlayer.handleEndTurn();
								whitePlayer.handleEndTurn();
								whitePlayer.handleEndTurn();
								whitePlayer.handleEndTurn();
								whitePlayer.handleEndTurn();
								whitePlayer.handleEndTurn();
								whitePlayer.activate();
							});
						} else {
							m(
								"Now click on either: mine (just mine), fctry (factory) or brcks (barracks)",
							);
							m(
								"By the way you might notice more available pieces. You unlocked them buy buying a pawn. You can see all pieces on separate page, accessible from the main menu",
							);
							document
								.querySelectorAll("#castle-menu-top-list > *:not(:first-child)")
								.forEach((el) =>
									el.addEventListener("click", () => {
										m("Great! Now you can enjoy bonuses from your upgrade.");
										m(
											"And that's all in this tutorial, now you can start new game from the main menu",
											true,
										);
									}),
								);
						}
					},
				);
			});
		});
	}
}
