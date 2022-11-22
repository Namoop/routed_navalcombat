<script>
	let fact = "...";
	const getfact = async () => {
		if (Math.random() > 0.3) {
			fact = (
				await (
					await fetch(
						"https://uselessfacts.jsph.pl/random.json?language=en"
					)
				).json()
			).text;
		} else {
			fact = (
				await (
					await fetch("https://api.chucknorris.io/jokes/random")
				).json()
			).value;
		}
	};
	getfact();

	//maybe get like dnd generator description thing
</script>

<div>
	<h2>Random Fact</h2>
	<p>{fact}</p>
</div>
