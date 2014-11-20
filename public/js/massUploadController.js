
function addMassUploadController() {

	app.controller('MassUploadCtrl', function ($scope, $controller, $location, StorageService) {
	    $controller('ParentCtrl', {$scope: $scope});

        $scope.upload = function (item) {
        	$scope.recipes = StorageService.findAllRecipes();

			var files = $("#filesInput")[0].files;     

		    newRecipes.forEach( function(recipe) {
		    	console.log("Recipe image: " + recipe.image);
		    	file = getByName(files, recipe.image);
		    	console.log(file);

                reader = new FileReader();
	            reader.onloadend = function (e) {
	                var imageBase64 = e.target.result;
	                recipe.image = imageBase64;
			    	StorageService.addRecipe(recipe, $scope.recipes);
	            };
	            reader.readAsDataURL(file);
		    });
		};
	});
}

function getByName(files, name) {
	for (i = 0; i < files.length; i++) {
		if (files[i].name == name) {
			return files[i];
		}
	}
	return null;
}	

newRecipes = [
{ //oppskrift1.html
name : "Kjøttkaker",
description : "fort og greit",
ingredients : "Kjøttkaker, brun saus, ertestuing, poteter, nachochips, guacamole-dip.",
instructions : "kok opp sausen og varm kjøttkakene i sausen.",
portions : "",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift10.html
name : "Koteletter og båtpoteter",
description : "Båtpoteter\nSvinekoteletter\nFrossen grønnsaksmix (wokblanding?)\nBearnaisesaus",
ingredients : "",
instructions : "",
portions : "",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift11.html
name : "Tortelloni con ricotta e spinaci",
description : "",
ingredients : "Ingredienser:\n500g Tortelloni med Ricotta og Spinat La Collezione Barilla\n120 g skrelte pistasjenøtter\n5 dl kremfløte\n40 g smør\n6 ss revet parmesanost\nSkinke\nAsparges\n4 blad salvie",
instructions : "Fremgangsmåte:\nStek pistasjenøttene med salvien og asparges i smør i et minutt. Tilsett fløten og ta pannen av platen.\n\nKok opp 2½ liter vann, tilsett 1 ss salt og Tortellonien. La det fosskoke uten lokk i 12-13 minutter. Hell av vannet og bland forsiktig med sausen.\n\nRør inn skinkebiter og strø parmesan over den ferdige retten.",
portions : "4",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift12.html
name : "Marinert kyllinglår med couscous (Marokko)",
description : "Kyllinglår marinert med sitron, honning og spisskummen blir ordentlig saftig og smakfullt. Server med couscous blandet med tørket frukt, pistasjnøtter og masse av krydder – smaker som tar deg rett til Marokko!",
ingredients : "4 stk kyllinglår naturell\nskall og saft av 1 stk sitron\n3 ss olivenolje\n1 båt hvitløk\n1 ts paprikapulver\n1⁄2 ts malt spisskummen\n1 ss honning\n\nCOUSCOUS:\n250 g couscous\n1⁄2 ts gurkemeie\n1 ss olivenolje\n1⁄2 ts salt\n21⁄2 dl vann\n5 stk tørkede fiken i terninger\n8 stk tørket aprikos i terninger\n2 stk vårløk , i skiver\n50 g grovhakkede pistasjenøtter\n2 ss finhakket frisk mynte , eventuelt bladpersille\n\nDRESSING:\nsaft av 1 stk sitron\n1 dl ferskpresset appelsinjuice\n1 ss honning\n1⁄2 ts malt koriander\n1⁄4 ts malt kanel\n1⁄4 ts malt ingefær\n1⁄2 ts salt\n1⁄4 ts pepper",
instructions : "1) Bland sitronsaft – og skall, olje, hvitløk, paprikapulver, spisskummen og honning. Mariner kyllinglår i blandingen i minimum 30 minutter.\n\n2) Legg kyllinglår på et bakepapirkledd stekebrett. Sett lårene i stekeovn på 180 °C i 25-30 minutter. \n\n3) Bland couscous, olje, gurkemeie og salt godt sammen i en bolle. Ha vann, fiken og aprikos i en liten kjele, kok opp. Sil kokevannet over bollen med couscous, sett fruktbitene til side. Dekk bollen med plastfolie og la couscousen dampe i 10-15 minutter, eller til væsken er absorbert.\n\n4) Bland dressing av sitronsaft, appelsinjuice, honning, koriander, kanel og ingefær. Smak til med salt og pepper.\n\n5) Rør i couscousen med en gaffel, slik at den blir luftig og fin. Ha i fruktbiter, vårløk, pistasjnøtter, m\nynte og dressing. Bland det hele forsiktig sammen.\n\nServer deilig krydret couscous med saftig, marinert kyllinglår.",
portions : "4",
tags : "",
image : "oneline_oppskrift12.html.jpg"
},
{ //oppskrift13.html
name : "Kylling chop suey",
description : "Du har sikkert spist kylling chop suey på kinesisk restaurant. Hva med å lage den selv? Prøv vår enkle og smakfulle oppskrift.",
ingredients : "500 g kyllingfilet\nca. 2 ss maisstivelse (maizena)\nca. 2 ss olje til steking\n1 stk løk\n3 stk gulrot\n1 ss hakket frisk ingefær\n1 pose dypfryst wokblanding\n4 stk vårløk\n3 dl hønsebuljong (utblandet)\n1 ss soyasaus\nca. 1 ss østerssaus (oyster sauce)",
instructions : "1. Skjær kyllingkjøtt i strimler. Del løk i tynne båter, gulrot og vårløk i tynne skiver. Ha ingrediensene til sausen klar.\n\n2. Vend kyllingstrimlene i maisstivelse og stek dem raskt i olje til de er gjennomstekt.\n\n3. Ta kjøttet ut og fortsett med løk, gulrot og ingefær.\n\n4. Ha kjøttet tilbake i pannen når grønnsakene er omtrent møre og tilsett de hermetiske wokgrønnsakene sammen med vårløk. Hell over hønsebuljong og kok opp.\n\n5. Smak til med soyasaus, østerssaus og eventuelt salt og pepper.\n\nServer gjerne med jasminris.",
portions : "4",
tags : "",
image : "oneline_oppskrift13.html.jpg"
},
{ //oppskrift14.html
name : "Wok med strimla svinekjøtt",
description : "",
ingredients : "Strimla svinekjøtt\nHvitløk\nVårløk\nKastanjer\nMinimais\nHvite bønner\nHalv flaske oystersaus",
instructions : "",
portions : "",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift15.html
name : "Hjemmelaget fiskesuppe",
description : "God hjemmelaget fiskesuppe",
ingredients : "1 løk, finhakket\n3 fedd hvitløk\n1/3 fersk chili\n2 dl hvitvin\n3 dl kremfløte\n200 gram smør\n400 gram assortert fisk, feks torsk, laks eller steinbit, i terninger ca 2 x 2 cm\n1 gulrot, i staver\n1 fennikel, i strimler\n1 liten purre, i strimler\nJacobs fiskekraft (7 dl)\n2 ss hakket frisk basilikum\n2 ss hakket frisk gressløk\n2 ss hakket frisk persille\nsalt og nykvernet hvit pepper\n1 ts hvitvinseddik",
instructions : "Surr løken, hvitløk og chili et par minutter i litt smør, til løken blir blank og myk, og tilsett deretter hvitvinen. La det surre uten lokk, til vinen er nesten kokt inn.\n\nSkjær opp grønnsakene som angitt ovenfor, slik at du har alt klart. Ha grønnsakene og fiskekraften over i hvitvinsgryta. Kok opp og la koke til grønnsakene er nesten møre. Det tar bare noen minutter.\n\nI en liten kjele gir du fløten et forsiktig oppkok og rører deretter inn smøret (skal ikke koke). Rør fløtesmøret i grønnsaksgryta og tilsett deretter fiskebitene. Synes du suppen er litt tynn kan du eventuelt jevne den med litt maisenna før du tilsetter fisken.\n\nLa suppen trekke til fisk og grønnsaker er ferdige, etter ca 3 minutter. Tilsett finhakkede urter mot slutten av trekketiden. Smak til med salt og nykvernet pepper.\n\nServeres med godt, nybakt brød til – og gjerne med et glass hvitvin.",
portions : "4",
tags : "",
image : "oneline_oppskrift15.html.jpg"
},
{ //oppskrift16.html
name : "Sunn fisk med frisk koriander og båtpoteter",
description : "",
ingredients : "",
instructions : "Fileter av 2 fisk (makrell eller sild), krydret med frisk koriander, hvitløk, salt, pepper og sitronsaft.\nBåtpoteter stekt sammen med søtpotet, vårløk, salt, pepper, olje og koriander. Veldig godt med eplemost til :)",
portions : "2",
tags : "",
image : "oneline_oppskrift16.html.jpg"
},
{ //oppskrift17.html
name : "Kremet fiskesuppe",
description : "Det finnes nesten like mange varianter av fiskesuppe, som det finnes nordmenn. Men har du ingen egen variant kan du prøve denne. Fiskesuppe er en nydelig forrett som er enkel å lage. Ønsker du å variere suppen kan du tilsette ferske reker eller blåskjell.",
ingredients : "200 g laksefilet\n200 g torskefilet eller steinbitfilet\n1 ss margarin\n2 stk gulrot\n100 g kålrot\n100 g knollselleri (sellerirot)\n½ stk purre\n½ stk fennikel\n1 ss hvetemel\n2 ss tomatpesto (rød pesto)\n2 dl matfløte\n1 ½ dl hvitvin\n6 ½ dl vann eller fiskekraft\n1 ts salt\n½ ts pepper\n2 ss hakket frisk kjørvel",
instructions : "1. Kutt alle grønnsakene i fyrstikklange lange staver eller i tynne skiver, og fisken i terninger på 2x2 cm.\n\n2. Smelt margarinen i en kjele og fres grønnsakene 2-3 minutter på medium varme. Strø over melet og vend inn.\n\n3. Rør inn pesto og ha i all væsken. La det småkoke i ca. 15 minutter. Tilsett fisk og kjørvel og la det stå og trekke i ett par minutter. Ha i salt og pepper og server med godt brød til.",
portions : "4",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift18.html
name : "A cool summerbreeze",
description : "",
ingredients : "1 rød paprika\n1 agurker\n1 beger yoghurt naturell\n2 båter hvitløk\n1 appelsiner\n8 skiver spekeskinke\n1 lite beger ruccolasalat\nca. 1 ss frisk basilikum\nca. 3 ss olivenolje\nca. 2 ss rødvinseddik",
instructions : "Del paprikaen i fire på langs og pensle med olivenolje. Legg dem på en stekeplate og stek dem på 250° C til skallet begynner å svi seg, ca. 15-20 minutter. \n\nRiv agurken og legg den i et dørslag slik at vannet får rent av.\nLag dressing av rødvinseddik og olivenolje. Fjern skallet på papriken og legg dem i dressingen en times tid.\nBland den avrente agurken med yoghurt og finhakket hvitløk. La den stå kjølig.\nSkjær marinert paprika, spekeskinke og appelsin i tynne skiver. Skyll ruccolasalaten.\nBland ingrediensene i salaten og server med yoghurtdressing ved siden av. Pynt med basilikum.",
portions : "2",
tags : "",
image : "oneline_oppskrift18.html.jpg"
},
{ //oppskrift19.html
name : "Muligatowny soup",
description : "indiskaktig sak :)",
ingredients : "800 gr. kylling (holder med 500 gr.)\n1 løk\n2 gulrøtter\n2 epler - sure ( ha i helt på slutten ellers bare mos)\n2 stangselleri\n1 grønn paprika\n6 ss olje (oliven eller solsikke)\n1 boks hakkede tomater\n2 ltr. hønsebuljong\n3 ss karri\n3 ss Garam Masala (krydder)\n220 gr. ris (Basmati er best)\n2 ss brunt sukker\nlitt salt",
instructions : "Stek kylling, løk, olje, karri og Garam Masala\nKok opp buljong og sukker\nTa alt i samme gryta, kok ytterligere 20 min\nha i eplebiter på slutten",
portions : "6",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift2.html
name : "Bali kyllinggryte",
description : "",
ingredients : "Bali kyllinggryte pose, kyllingkjøttdeig, salat, baguetter.",
instructions : "stek og kok og kombiner",
portions : "",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift20.html
name : "Tortilla-ruller med spekeskinke",
description : "",
ingredients : "Myke Tortillas\nKremost, type krydder\nSpekeskinke\nSalat",
instructions : "Smør kremost på tortillas og rull dem rundt det andre",
portions : "",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift21.html
name : "fiskeboller",
description : "",
ingredients : "fiskeboller ++",
instructions : "N/A",
portions : "4",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift23.html
name : "stekt laks med ris og wok",
description : "",
ingredients : "lakseskiver (4). \nris, \n1 løk, 4-5 gulerøtter, 1/5 squach, paprika.\nbalsamicosaus, \nev.t.fløte \nbaguetter",
instructions : "stek fisk i en panne. wok løk, strimlede gulerøtter i en annen panne. tilsett squach, paprika, pepper og litt balsamico. evt. fløte. server med ris.",
portions : "4",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift24.html
name : "kyllingfilet med gulrotpure",
description : "Det indiske krydderet kumin og gulrøtter passer perfekt i en pure som akkompagnement til en herlig kyllingfilet!",
ingredients : "300 g gulrøtter\nnaanbrød\n100 g smør\n1 ts kumin\n2 stk kyllingbryst\nris til to personer\n2 kvist timian\n1 ss honning\n0,5 stk sitron\nolje/smør til steking\nsalt og pepper",
instructions : "Kok gulrøttene møre i saltet vann. Sil av. \n\nSett på ovnen på 200 gr.\n\nKok ris.\n\nMos med smøret og smak til med salt, pepper og kumin. \n\nGni kyllingkjøttet inn med salt og pepper. Stek det på middels høy varme (eller på grillen) i ca 3-4 minutter på hver \nside.\n\nVarm naanbrød i ovnen.\n\nSmør på honningen og stek i ca ett minutt så det karamelliserer seg. Skvis over sitronsaft på slutten.\n\n\nServer med litt frisk timian. \n\n\nServer med en deilig salat, med for eksempel hodesalat, krutonger, cherrytomater, sukkererter, oliven og fetaost.",
portions : "4",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift3.html
name : "smakfull vegetarpastarett",
description : "",
ingredients : "mel, melk, smør, salt, pepper, ingefærpulver. tagliatelle-pasta. 1 løk, 1 squach, 1 paprika, soltørkede tomater, fetaost, cashewnøtter, fersk basilikum",
instructions : "mel, melk, smør, salt, pepper og ingefærpulver til hvit saus.\nWok løk og soltørkede tomater, så squach og paprika. krydre med paprikapulver f.eks. kok pasta. blande alt i en stor bolle.",
portions : "",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift4.html
name : "Toro fiskesuppe",
description : "",
ingredients : "en Toro fiskesuppepose. 4 laksefileter (evt. annet). 3-4 gulerøtter, 1/5 purre. \nfløte,\nbaguetter.",
instructions : "alt i samme gryte til slutt",
portions : "4",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift5.html
name : "Risotto all'Isolana",
description : "Risotto med svinekjøtt, parmesan og kanel",
ingredients : "400g ris\n8 dl grønnsakskraft/buljong\n4ss usaltet smør\n1 kvist frisk rosmarin\n200g renskåret svinekjøtt eller tilsvarende av kalv\nsalt og nykvernet pepper\n4 ss revet parmesan\nkanel",
instructions : "Koketid 15-20 minutter.\n\nSmelt smøret sammen med rosmarin over middels svak varme. Skjær kjøttet i små terninger, sauter i smøret i fem minutter. Fjern rosmarinen, tilsett salt og pepper. Dekk til og sett tilside. Kok opp grønnsakbuljongen i en tykkbunnet kjele, tilsett risen og kok opp en gang til. Legg et kjøkkenhåndkle over kjelen og legg på lokket. På denne måten absorberes noe av dampen, slik at risottoen blir tørr. La risen koke ved svak varme i 15 minutter. Tilsett kjøttet, rør forsiktig og ta risottoen av varmen. Rør i ost og kanel. La risottoen hvile (tildekket) noen minutter på et varmt sted før servering.",
portions : "6",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift6.html
name : "Sunne sjokoladekjeks",
description : "Sjokoladekjeks (litt som Brownies med nøtter og tørket frukt i)",
ingredients : "3 store eggehviter\n280 g melis\n6 ss kakao\n2 ts vaniljeekstrakt (eller vaniljesukker)\nlitt salt\n400 g fyll (f.eks. nøtter, pistasje, pekan, kokos, tranebær, tørket frukt)",
instructions : "Hakk opp fyll\nSett ovnen på 180 grader\nVisp eggehviter maks 30 sek til det blir skum\nHiv i alt det tørre bortsett fra fyllet og rør godt sammen.\nRør inn fyllet.\nFordel i klatter på stekebrett og stek",
portions : "40 kjeks",
tags : "",
image : "no_image.jpg"
},
{ //oppskrift7.html
name : "Babi Asam Manis",
description : "",
ingredients : "600 g renskåret svinekjøtt i strimler\n2 ss olje\n1 stk. løk\n2 stk. rød, grønn eller gul paprika\n1 ts malt chilipepper\n3 båt hvitløk\n1 ps. ferdig woksaus (gjerne sursøt)\n2 dl ananasjuice eller vann\n1 boks hermetisk ananas i biter, liten boks",
instructions : "Skjær kjøttet og paprika i strimler og løk i ringer. Finhakk chili og hvitløk. \n\nFres kjøttet raskt i panne eller wok til det er pent gyllent (bør stekes i 2-3 omganger).\nTa ut kjøttet og fres grønnsaker, chili og hvitløk et par minutter.\nHa kjøttet tilbake i panna og tilsett resten av ingrediensene. Kok opp og smak evt. til med mer saus.\nServer med kokt ris.",
portions : "4",
tags : "",
image : "oneline_oppskrift7.html.jpg"
},
{ //oppskrift8.html
name : "Frittata med artisjokk, tomat og squash ",
description : "",
ingredients : "1 grønn squash i små terninger\n2 vårløk i strimler\n2 fedd finhakket hvitløk\n1 ss smør\n1 ss olivenolje\n\n8 egg\n2 dl melk eller kremfløte\nsalt og pepper \n12 cherrytomater, delt i to\n1 boks hermetiske artiskokker\n50 g revet hvitost\nandre kryddere som for eksempel karse",
instructions : "Forvarm ovnen til 200 grader.\n\nVarm smør og olje i en stekepanne og stek oppdelt squash, vårløk og hvitløk til det er mykt.\nVisp sammen egg og fløte/melk og tilsett salt og pepper.\nHell eggeblandingen over grønnsakene og fordel tomater og halve artisjokker på toppen. Dryss over ost.\nSett frittataen inn i ovnen og stek den i 20-25 minutter, til den har stivnet og begynner å få farge. La frittataen hvile noen minutter før den serveres.\nFrittataen kan serveres både varm, lunken og kald, gjerne med brød og en god salat ved siden av.\n\nTIps: Frittata er den italienske versjonen av den klassiske omeletten. \n\n Flere eggende retter finner du her",
portions : "4",
tags : "",
image : "oneline_oppskrift8.html.jpg"
},
{ //oppskrift9.html
name : "Potetsalat",
description : "Bra til grillmat :)",
ingredients : "3-4 store poteter\n3dl lettrømme\n1 pose majones (2 dl?)\n1/2 løk\n8 skiver sylteagurk\nca. 2 spiseskjeer sylteagurksaft",
instructions : "Kok poteter i saltvann\nLegg dem på kjøkkenhåndkle slik at en del av fuktigheten tas opp\nHakk opp løk, veldig små biter\nHakk opp sylteagurk, små biter\nBland rømme og majones\nBland inn løk, sylteagurk og smak til med sylteagurksaft",
portions : "grilltilbehør til ca 4 personer",
tags : "",
image : "no_image.jpg"
},
{//aperitif_oppskrift.html
name : "Kylling med couscous- og eplesalat",
ingredients : "4 kyllingfileter\n salt og pepper\n2 ss smør til steking <b>Couscous- og eplesalat:</b>\n 4 dl couscous\n 4 dl grønnsakbuljong (utblandet)\n 50 g smør\nca. 1/2 ts gurkemeie 2 epler\n 1 rødløk\n 1 pakke ruccula\n200 g fetaost <b>Dressing:</b>\n 2 dl seterrømme\n1 dl hakkede, soltørkede tomater",
instructions : "Krydre kyllingfiletene med salt og pepper og stek dem i smør i en panne ved middels sterk varme i 3-4 minutter på hver side.Trekk pannen til side og la filetene hvile 3-4 minutter. <b>Couscous:</b>\nKok opp buljong, smør og eventuelt litt salt. Trekk kjelen til side. Ha i couscous og litt gurkemeie og rør godt.Jevn grynene til en glatt overflate. Legg over lokk og la grynene svelle i 5-10 minutter. Rør grynene fra hverandre. <b>Salaten:</b>\nTa ut kjernehuset på eplene og skjær dem i skiver. Del over løken og skjær hver halvdel i skiver.Grovhakk ruccolasalaten og bland den med couscous, epler, løk og biter med fetaost.Fordel salaten på fire tallerkener. Legg en kyllingfilet delt i to på hver tallerken.Rør soltørkede tomater i rømmen og server som dressing til salaten.",
portions : "4",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift.html.jpg"
},
{//aperitif_oppskrift10.html
name : "Fargerik aspargessalat med kylling",
ingredients : "1/2 ekebladsalat\n 1 pakke ruccula\n 8 grønne, friske asparges\n 2 små kyllingfileter eller 1 stor\n 1 eple, skåret i båter\n Fileter av 2 appelsiner\n 3 soltørkede tomater, snittet\n 1 ss god olje\n1 ss hvitvinseddik",
instructions : "Vask, riv og bland salaten. Anrett den på tallerkener.Forvell aspargesen i ca. 1 minutt for tynn asparges, noe lenger for tykkere. Avkjøl.Salte og pepre kyllingfiletene.Stek kyllingfiletene og skjær dem i strimler.Skjær aspargesen litt på skrå og legg den på salaten.Skjær ut fileter av appelsinene og degg dem på salaten.Ha på resten av ingrediensene.Bland olje, eddik og soltørkede tomater og ha dette over salaten rett før servering.Server gjerne med ferskt brød.",
portions : "4",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift10.html.jpg"
},
{//aperitif_oppskrift2.html
name : "Bakt spiss- eller sommerkål med fetaost og oliven",
ingredients : "1 spiss- eller sommerkålhode\n 1 hel hvitløk\n olivenolje\n salt og pepper\n 1 sjalottløk eller liten rødløk\n 1/2 dl blad av løpstikke eller persille\n 2 dl oliven (valgfri type)\n 200 g fetaost\n 2 basamicoeddik\n1 dl olivenolje",
instructions : "Sett ovnen på 200 grader. Del kålen i fire båter og legg den i en langpanne. Skjær hvitløken i to på tvers av feddene. Gni kålen med hvitløken før hvitløken også legges i langpannen. Drypp på litt olivenolje og krydre med salt og pepper. Bak kålen i 20.30 minutter. Kjenn med en spiss kniv om den er ferdig.Skrell løken og hakk fint. Hakk løpstikken (eller persillen) grovt. Hakk olivenene grovt. Skjær fetaosten i terninger. Bland alle ingrediensene til dressingen i en bolle.Skjær vekk midtstilken fra den varme kålen og snurr hver båt sammen til et lite knytte. Fordel fetaostblandingen over.",
portions : "",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift2.html.jpg"
},
{//aperitif_oppskrift3.html
name : "Bifftomater med tunfisksalat",
ingredients : "4 stk. bifftomat\n 1/2 ts salt\n 1 boks hermetisk tunfisk i olje\n 150 g hvitost i små terninger\n 1/2 stk. slangeagurk i strimler\n 8 stk. grønne oliven i skiver\n 2 ss frisk oregano\n 1/2 stk. hodesalat eller annen salat\n 4 stk. hardkokte egg i båter\n 1 boks ansjosfileter\n 8 stk. sorte oliven\n2 dl lettrømme",
instructions : "Skjær lokk av tomatene og hul ut innmaten. Dryss med salt og legg dem opp/ned så noe av saften trekkes ut.Bland forsiktig alt til salaten og fyll tomatene. Anrett på salatblad med egg og oliven. Legg en liten rømmeklatt på toppen av hver, pynt med oregano og gjerne en ansjosfilet.",
portions : "4",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift3.html.jpg"
},
{//aperitif_oppskrift4.html
name : "Potettortilla med chorizo og brokkoli",
ingredients : "4 egg\n 4 ss vann\n salt og kvernet pepper\n 1 kokt potet i biter\n 45 g brokkoli i biter\n 1/2 hakket rødløk\n 30 g chorizopølse eller salami i biter\n1/2 ss nøytral olje eller margarin",
instructions : "Fres potetbiter, brokkoli og løk i margarin til det er nesten mykt. Tilsett chorizo mot slutten av stekingen. Smak til med salt og kvernet pepper.Visp sammen egg, vann, salt og pepper. Hell i eggeblandingen og stek omeletten ved å skyve den stivnede massen inn mot midten, slik at det som fortsatt er flytende kommer i direkte kontakt med pannen.Skru ned til lav temperatur, legg over lokk og la tortillaen stå noen minutter til den er ferdig.Server varm med en god salat.<b>•",
portions : "2",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift4.html.jpg"
},
{//aperitif_oppskrift5.html
name : "Perfekt eggerøre",
ingredients : "6 store egg\n 5 ss kremfløte\n 2 ss smør\n litt salt\n nykvernet sort pepper\ngressløk",
instructions : "Visp eggene sammen med kremfløte, litt salt og nykvernet pepper.Smelt smøret i stekepannen og slå i eggerøren. La den stivne på svak varme mens du rører forsiktig mot bunnen av pannen med en varmebestandig slikkepott.Eggerøren skal være fløyelsmyk på konsistens og ta den av før den setter seg helt.Eggerøre passer godt til alle typer spekemat, laks og er en fast bestanddel på koldtbordet.<b>",
portions : "4",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift5.html.jpg"
},
{//aperitif_oppskrift6.html
name : "Pasta carbonara med torsk og bacon",
ingredients : "400 g skinn og benfri torskefilet i strimler\n 100 g bacon i tynne strimler\n 500 g tagliatelle eller annen pasta\n 2 hvitløksfedd, finhakket\n 4 egg\n 3 dl lettrømme\n 1 dl revet ost\nsalt, pepper",
instructions : "Strimler av bacon stekes på middels temperatur i sitt eget fett til de er sprø og gylne.Ha strimler av torsk og finhakket hvitløk i stekepanna, la det stå og steke videre på lav temperatur til fisken er nesten gjennomstekt.Kok pastaen i rikelig, godt saltet vann. Mens pastaen koker slår du sammen egg og rømme.Sil av pastaen, la den stå 1 minutt, og bland sammen med torsk/bacon og egg/rømme. Smak til med salt, nykvernet pepper og revet parmesan eller annen ost på toppen.<b>•",
portions : "4",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift6.html.jpg"
},
{//aperitif_oppskrift7.html
name : "Rask fiskesuppe fra Bergen",
ingredients : "3 gulrøtter, skrelt og i skiver\n ? sellerirot, skrelt og i biter\n 1 purre, vasket og i skiver\n 2 dl kremfløte\n 1 l kraft eller buljong\n 2 ts eddik (7%)\n 2 dl seterrømme\n 2 skiver bacon , i biter\n 400 g torskefilet (evt annen fiskefilet i biter)\n 300 g laksefilet\n 2 ss hvetemel\nsalt og pepper",
instructions : "Lag en sterk buljong av terning eller bruk en av de mange gode ferdigkraftene som har kommet på markedet. <b> </b> <b>Husk:</b>\n • Det varierer om ferdigkraften må vannes ut og eventuelt hvor mye.\n• Buljongterninger inneholder mye salt!Kutt grønnsakene i tynne skiver eller ½ cm brede staver. Ha fløten og grønnsakene i kraften og kok opp.Skru varmen litt ned og bland eddiken i rømmen. Hell rømmeblandingen i suppen mens du visper godt.Rør melet ut i kaldt vann (for å være sikker på å unngå klumper rister du vann og mel sammen i et syltetøyglass). Rør jevningen ut i suppen mens du visper.Kok opp igjen og la koke i minst fem minutter.Stek baconet sprøtt over middels varme og sett det til side.Skjær fisken i suppeskjestore biter og ha dem i suppen. La fiske trekke (ikke koke) i suppen i ca 5 minutter, smak så til med salt og pepper.Ha suppen i store dype tallerkner, dryss over sprøstekt bacon og server suppen med fersk brød ved siden av.<b>•",
portions : "4",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift7.html.jpg"
},
{//aperitif_oppskrift8.html
name : "Gulrotsuppe med ingefær og sei",
ingredients : "400 g seifilet, uten skinn og ben\n 1 l vann\n 2 ts salt\n 2 store gulrøtter\n 1 ts revet, frisk ingefær\n 1 ss smør\n 1 ss hvetemel\n salt, pepper\n 2 - 3 ss sherry\nhakket persille eller kjørvel",
instructions : "Kok opp vann med salt, legg i fisken og la den trekke til den er så vidt gjennomkokt, ca 8 minutter. Ta opp fisken og sil kraften.Rens og skjær gulrøttene i skiver. Kok dem godt møre i fiskekraften sammen med ingefær. Mos gulrøttene i kraften og kok den opp.Rør sammen smør og mel og visp det i gulrotsuppen. La den småkoke i ca. 5 minutter.Smak til med salt og pepper. Skjær fisken i pene terninger og varm dem i suppen. Dryss grønt over og server godt brød ved siden av.\n  \n<b>",
portions : "4",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift8.html.jpg"
},
{//aperitif_oppskrift9.html
name : "Kokt torsk med gulrotstuing og bacon",
ingredients : "800 g  torskefilet, uten skinn og bein\n 21/2 ss  salt\n5 dl  vann <b>Koking:</b>\n 1 l  vann\n 1 ss  salt\n 1 skive  sitron\n1 laurbærblad <b>Gulrotstuing:</b>\n 6 gulrøtter\n 3 dl melk\n 3 dl vann\n 1/2 løk\n 2 ss smør\n 2 ss hvetemel\nsalt og pepper <b>Tilbehør:</b>\n potet\nbacon",
instructions : "Skjær torsken i serveringsstykker. Rør salt ut i kaldt vann, og la fiskestykkene ligge i saltlaken i ca. 10 minutter.Kok potet og stek baconet sprøtt. <b>Koking av fisken:</b>\nKok opp vann, og tilsett salt, sitron og laurbærblad.Rett før servering legger du torskestykkene forsiktig i kjelen, la trekke i ca. 5-8 minutter, til den flaker seg.Løft opp med en hullsleiv, legg på et rent klede så den får rent av seg. <b>Gulrotstuing:</b>\nSkrell og skjær gulrøttene i terninger. Kok møre i melk og vann.Skrell og skjær løk i strimler. Surr lett i smør til den er blank men ikke tatt farge, og rør inn mel.Spe med kokekraft fra gulrøttene til du får en jevn og fin stuing. La den trekke i 10 minutter for å fjerne melsmaken. Smak til med salt og pepper.Ha i gulrot og varm forsiktig opp til de er varme.Server torsken med kokte poteter, sprøstekt bacon og gulrotstuing.<b>",
portions : "4",
description : "",
tags: "",
image : "oneline_aperitif_oppskrift9.html.jpg"
},
];
