export default {
	home: {
   		crumbtrail: 'crumbtrail',
			orderDetails: {
				article: {
					articleTitle: 'Artikelns titel',
					journalTitle: 'Tidskriftstitel',
					authors: 'Författare',
					issn: 'ISSN',
					publicationYear: 'Publikationsår',
					issue: 'Utgåva',
					volume: 'Volym',
					pages: 'Sidor',
					notValidAfter: 'Ej aktuell efter',
					comment: 'Kommentar'
				},
				book: {
					bookTitle: 'Titel',
					authors: 'Författare',
					isbn: 'ISBN',
					publicationYear: 'Publikationsår',
					outsideNordics: 'Beställ mot avgift från bibliotek utanför norden, om nödvändigt',
					allowCopy: 'Jag vill kopior om boken ej går att låna',
					notValidAfter: 'Ej aktuell efter',
					comment: 'Kommentar'
				},
				chapter: {
					chapterTitle: 'Kapiteltitel',
					bookTitle: 'Boktitel',
					authors: 'Författare',
					isbn: 'ISBN',
					publicationYear: 'Publiceringsår',
					pages: 'Sidor',
					notValidAfter: 'Ej aktuell efter',
					comment: 'Kommentar'
				},
				score: {
					composers: 'Kompositör/Tonsättare',
					opusTitle: 'Titel',
					publicationType: 'Publikationstyp (partitur, klaverutdrag, orkesterstämmor, etc)',
					notValidAfter: 'Ej aktuell efter',
					comment: 'Kommentar'
				},
				microfilm: {
					newspaper: 'Dagstidning',
					period: 'Datum/period',
					startyear: 'Startår',
					notValidAfter: 'Ej aktuell efter',
					comment: 'Kommentar'
				}
			},
   		step1: {
   			typeHeader: 'Välj typ:',
        locationHeader: 'Välj varifrån du vill beställa:',
   			nextBtn: 'Nästa',
   		},
   		step2: {
				article: {
					header: 'Artikelbeställning',
					subHeader1: 'Ange PubMed ID...',
					subHeader2: '...eller fyll i uppgifterna:',
					getPubMedBtn: 'Hämta',
					pubMedError: 'Hittade ingen artikel med angivet id i PubMed.',
				},
				book: {
					header: 'Bokbeställning'
				},
				chapter: {
					header: 'Kapitelbeställning'
				},
				score: {
					header: 'Musiktryck'
				},
				microfilm: {
					header: 'Mikrofilmad dagstidning'
				},
				nextBtn: 'Nästa',
				prevBtn: 'Bakåt'
   		},
   		step3: {
   			nextBtn: 'Nästa',
   			prevBtn: 'Bakåt'
   		},
   		step4: {
   			nextBtn: 'Skicka beställning',
   			prevBtn: 'Bakåt'
   		},
			step5: {
				confirmationHeader: 'Tack för din beställning!',
				confirmationMessage: 'Din beställning är mottagen och har följande referensnummer:',
				orderOneMore: 'Gör en till beställning'
			}
  	}


};
