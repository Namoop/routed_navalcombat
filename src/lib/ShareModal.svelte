<script>
	import { sharing, sharekey } from "./save";

	$sharing = true;
</script>

<div>
	<h2>Share Link</h2>
	<p>
		Data is wiped after two hours of inactivity. If you reload, please click
		the "share" button again to reconnect. The player view is available here:
	</p>
	<br>
	<a href="/p/{$sharekey}">
		<code>
			{location.host}/p/{$sharekey}
		</code>
	</a>
	<br>
	<br>
	<hr>
</div>

<style>
	code {
		border: 1px solid white;
		background-color: rgb(33, 95, 60);
		color: white;
		border-radius: 20px;
		padding: 15px;
	}
</style>
