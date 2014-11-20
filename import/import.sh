#!/bin/bash

#Replace line break

function doOwn () {
for filename in `ls oppskrift*.html`
do
	tr '\n' '¨' < $filename > "oneline_$filename"

	echo "{ //$filename" >> batchImport.json

	cat "oneline_$filename" | egrep -o '<input type="text" class="text" name="name".*' | perl -pe 's|.*"name" value="(.*?)".*|name : "\1",|' >> batchImport.json

	cat "oneline_$filename" | egrep -o '<textarea.*?caption.*?>.*?</textarea>' | perl -pe 's|<textarea.*?>(.*?)</textarea>|description : "\1",|' >> batchImport.json

	cat "oneline_$filename" | egrep -o '<textarea type="text" class="text" name="ingredients".*' | perl -pe 's|.*ingredients\".*?>(.*?)</textarea>.*|ingredients : "\1",|g'  >> batchImport.json

	cat "oneline_$filename" | egrep -o '<textarea type="text" class="text" name="instructions".*' | perl -pe 's|.*instructions\".*?>(.*?)</textarea>.*|instructions : "\1",|g' >> batchImport.json

	cat "oneline_$filename" | perl -pe 's|.*name="portions" value="(.*?)".*|portions : "\1",\n|g' >> batchImport.json
	
	echo 'tags : "",' >> batchImport.json
	echo 'image : "'`findImage "oneline_$filename" "mypage"`'"' >> batchImport.json

	echo "}," >> batchImport.json
done
}

function doAperitif() {
for filename in `ls aperitif*.html`
do
	echo "{//$filename" >> batchImport.json

	tr '\n' '¨' < $filename > "oneline_$filename"

	name=`cat oneline_$filename | perl -pe 's|.*<h2 itemprop="name">(.*?)</? ?h2>.*|\1|g'`
	echo 'name : "'$name'",' >> batchImport.json

	ingredients=`egrep -o '<h3>Ingredienser:</h3>.*' "oneline_$filename" | perl -pe 's|</?span.*?>||g' | perl -pe 's|</?p.*?>||g' |		perl -pe 's|<!.*?>||g' | perl -pe 's|</?html.*?>||g' | perl -pe 's|</?body.*?>||g' | perl -pe 's|^.*?</h3>(.*?)<div class=.hide.*|\1|g'`
	ingredients=`echo $ingredients | perl -pe 's|^[¨ ]*||g' | perl -pe 's|[¨ ]*$||g' | perl -pe 's|¨|\\n|g'`
	echo 'ingredients : "'$ingredients'",' >> batchImport.json

	instructions=`egrep -o '<h3>Fremgangsmåte:</h3>.*' "oneline_$filename" | perl -pe 's|</?span.*?>||g' | perl -pe 's|</?p.*?>||g' |		perl -pe 's|<!.*?>||g' | perl -pe 's|</?html.*?>||g' | perl -pe 's|</?body.*?>||g' | perl -pe 's|^.*?<div.*?>(.*?)<a.*|\1|g' | perl -pe 's|^(.*?)</div.*|\1|g'`  
	instructions=`echo $instructions | perl -pe 's|^[¨ ]*||g' | perl -pe 's|[¨ ]*$||g' | perl -pe 's|¨|\\n|g'`
	echo 'instructions : "'$instructions'",' >> batchImport.json

	portions=`egrep -o '<h3>Antall porsjoner:</h3>.*' "oneline_$filename" | perl -pe 's|</?span.*?>||g' | perl -pe 's|</?p.*?>||g' |		perl -pe 's|<!.*?>||g' | perl -pe 's|</?html.*?>||g' | perl -pe 's|</?body.*?>||g' | perl -pe 's|^.*?</h3>(.*?)</div.*|\1|g'` 
	portions=`echo $portions | perl -pe 's|^[¨ ]*||g' | perl -pe 's|[¨ ]*$||g' | perl -pe 's|¨|\\n|g'`
	echo 'portions : "'$portions'",' >> batchImport.json

	echo 'description : "",' >> batchImport.json
	echo 'tags: "",' >> batchImport.json
	echo 'image : "'`findImage "oneline_$filename" "storage/images/oppskrifter"`'"' >> batchImport.json

	echo "}," >> batchImport.json
done
}

# Accepts a filename and a portion of the image URL to look for in the document
function findImage() {
	imageUrl=`egrep -o "src=\"[^>]*?$2.*?\"" $1 | perl -pe 's|src="(.*?)"|\1|'`
	
	echo "URL: $imageUrl" >> log.log
	imageFilename=""
	if [ "-$imageUrl" = "-" ]; then
		imageFilename="no_image.jpg"
	else
		# curl "http://www.aperitif.no$imageUrl" > "$1.jpg"
		imageFilename="$1.jpg"
	fi
	echo $imageFilename
}

rm batchImport.json

echo "newRecipes = [" >> batchImport.json

doOwn
doAperitif

echo "];" >> batchImport.json

perl -i -pe 's|¨|\\n|g' batchImport.json
perl -i -pe 's|<br.*?>|\\n|g' batchImport.json
perl -i -pe 's|&oslash;|ø|g' batchImport.json
perl -i -pe 's|&aring;|å|g' batchImport.json
perl -i -pe 's|&aelig;|æ|g' batchImport.json
perl -i -pe 's|&nbsp;| |g' batchImport.json
perl -i -pe 's|&frac12;|1/2|g' batchImport.json

#Replace %&		