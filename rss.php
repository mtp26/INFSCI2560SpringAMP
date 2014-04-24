<?php

$hs = "mysql.rosta-farzan.net";
$un = "grp1";
$pw = "d6q7pY";
$db = "inf2560_g1";  

$con = new mysqli($hs, $un, $pw, $db);
$getFeed = mysql_query("select * from Study,Research where studyID = $input")or die(mysql_error());

echo '<?xml version="1.0" encoding="ISO-8859-1" ?>
      <rss version="2.0"
			xmlns:content="http://purl.org/rss/1.0/modules/content/"
			xmlns:dc="http://purl.org/dc/elements/1.1/"
			xmlns:sy="http://purl.org/rss/1.0/modules/syndications/"
			xmlns:atom="http://www.w3.org/2005/Atom">

			<!-- General Study Page -->
			<channel>
				<title>Title</title>
				
				<!-- needs to be checked -->
				<link>http://mysql.rosta-farzan.net</link>
				<pubDate>Wed, 23 Apr 2014 08:24:00 EST</pubDate>
				<dc:creator>AMP</dc:creator>
				<description>Research Study News Feed</description>
				<language>en</language>
				<sy:updatePeriod>daily</sy:updatePeriod>
				<sy:updateFrequency>1</sy:updateFrequency>
				<!-- needs to be edited -->
				<atom:link href="http://st25606.dreamhosters.com/Lecture10/Practice_10.2.xml" rel="self" type="application/rss+xml" />';
				
					while($rssFeed = mysql_fetch_array($getFeed)) {
    					 echo '<item>',
				              '<title>', $rssFeed['title']'</title>',
				              '<description>', $rssFeed['description'], '</description>',
				              '<startDate>', $rssFeed['startDate'], '</startDate>',
							  '<endDate>', $rssFeed['endDate'], '</endDate>',
							  '<keywords>', $rssFeed['keywords'], '</keywords>'
							   </item>';
					}
			echo '</channel>
    </rss>';


?>
