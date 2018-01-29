id: 1
source: 1
name: BigEarsNewsFeed
properties: 'a:0:{}'

-----

$bigEarsNewsXML = simplexml_load_file('http://bigearsfestival.org/feed/');

$output = "";

for ($i=0; $i < 3; $i++) {

	if ($bigEarsNewsXML->channel->item[$i]) {

		preg_match('/<p>(.*?)(\.\.\.)/', $bigEarsNewsXML->channel->item[$i]->description, $match);
		$title = $bigEarsNewsXML->channel->item[$i]->title . "";
		$link = $bigEarsNewsXML->channel->item[$i]->link . "";

		$properties = [
			"title" => $title,
			"url" => $link,
			"description" => $match[1]."..."
		];

		$output .= $modx->getChunk('newsArticle', $properties);

	}

}

return $output;