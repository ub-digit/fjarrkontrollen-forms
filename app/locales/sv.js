export default {
	home: {
			headers: {
				level1: 'Göteborgs universitetesbibliotek',
				level2: 'Fjärrlån',
				mainHeader: 'Beställ artiklar och fjärrlån',
				langLink: 'In English',
				langLinkUrl: '/index_en.html'
			},
			footer: {
				content: '© <a title="Göteborgs universitet" href="http://www.gu.se/">Göteborgs universitet</a><br>Box 100, 405 30 Göteborg<br>Tel. 031-786 0000, <a title="Kontakta oss" href="http://www.gu.se/omuniversitetet/kontakt/">Kontakta oss</a>'
			},
			orderDetails: {
				article: {
					articleTitle: 'Artikelns titel',
					journalTitle: 'Tidskriftstitel',
					authors: 'Författare',
					issn: 'ISSN',
					publicationYear: 'År',
					issue: 'Nummer',
					volume: 'Volym',
					pages: 'Sidor',
					notValidAfter: 'Ej aktuell efter',
					comment: 'Kommentar'
				},
				book: {
					bookTitle: 'Titel',
					authors: 'Författare/utgivare',
					isbn: 'ISBN',
					publicationYear: 'År',
					outsideNordics: 'Godkänn lån utanför Norden',
					notValidAfter: 'Ej aktuell efter',
					comment: 'Kommentar'
				},
				chapter: {
					chapterTitle: 'Kapiteltitel',
					bookTitle: 'Boktitel',
					authors: 'Författare/utgivare',
					isbn: 'ISBN',
					publicationYear: 'År',
					pages: 'Sidor',
					notValidAfter: 'Ej aktuell efter',
					comment: 'Kommentar'
				},
				score: {
					composers: 'Kompositör/tonsättare',
					opusTitle: 'Titel',
					publicationType: 'Publikationstyp',
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
			customerDetails: {
				name: 'Namn',
				emailAddress: 'Epost',
				phoneNumber: 'Telefonnummer',
				organisation: 'Organisation/företag',
				department: 'Institution',
				unit: 'Avdelning',
				address: 'Adress',
				postalCode: 'Postnummer',
				city: 'Ort',
				libraryCardNumber: 'Lånekortsnummer',
				xAccount: 'xkonto'
			},
			deliveryDetails: {
				address: 'Gatuadress/box',
				postalCode: 'Postnummer',
				city: 'Ort',
				box: 'Box',
				comment: 'Kommentar, (tex. tillfällig adress)'
			},
			invoicingDetails: {
				name: 'Namn',
				company: 'Organisation/företag',
				address: 'Adress/box',
				postalCode: 'Postnummer',
				city: 'Ort',
				customerId: 'Beställar-ID'
			},
   		step1: {
				header: 'Typ och bibliotek',
   			typeHeader: 'Välj vad vill du beställa',
        locationHeader: 'Välj vilket bibliotek du vill beställa från',
   			nextBtn: 'Nästa',
   		},
   		step2: {
				article: {
					header: 'Artikelkopia',
					price: 'Kostnad: 80:- (gratis för anställda vid GU, företag 160:-)',
					subHeader1: 'Ange PubMed ID...',
					subHeader2: '...eller fyll i uppgifterna:',
					getPubMedBtn: 'Hämta',
					pubMedError: 'Hittade ingen artikel med angivet id i PubMed.',
				},
				book: {
					header: 'Bok',
					outsideNordicsHelpText: 'Kostnad 200:- (företag 400:-)',
				},
				chapter: {
					header: 'Kopia av bokkapitel',
					price: 'Kostnad: 80:- (gratis för anställda vid GU)',
				},
				score: {
					header: 'Musiktryck',
					publicationTypeHelpText: '(partitur, klaverutdrag, orkesterstämmor, etc)'
				},
				microfilm: {
					header: 'Mikrofilmad dagstidning'
				},
				header: 'Beställningsuppgifter',
				otherDetailsText: 'Övriga uppgifter om beställningen',
				mandatoryText: 'Obligatoriska fält måste fyllas i innan du kan gå vidare',
				nextBtn: 'Nästa',
				prevBtn: 'Bakåt'
   		},
   		step3: {
				header: 'Dina uppgifter',
				customerTypeHeader: 'Jag är...',
				customerTypePrompt: 'Välj kategori',
				customerDetailsSubheader: 'Fyll i dina uppgifter',
				deliveryOptionsSubheader: 'Leveransalternativ',
				deliveryMethodPrompt: 'Välj leveranssätt:',
				pickupInfoText: 'Beställningen hämtas på',
				deliveryDetailsSubheader: 'Leveransuppgifter',
				invoicingDetailsSubheader: 'Faktureringsuppgifter',
   			nextBtn: 'Nästa',
   			prevBtn: 'Bakåt',
				mandatoryText: 'Obligatoriska fält måste fyllas i innan du kan gå vidare'
   		},
   		step4: {
				header: 'Summering',
				orderDetailsSubheader: 'Beställningsuppgifter',
				yes: 'Ja',
				no: 'Nej',
				customerDetailsSubheader: 'Personuppgifter',
				deliveryOptionsSubheader: 'Leveransuppgifter',
				invoicingDetailsSubheader: 'Faktureringsuppgifter',
				shippingInfoText: 'Skickas till:',
				pickupInfoText: 'Hämtas på',
   			nextBtn: 'Skicka beställning',
   			prevBtn: 'Bakåt'
   		},
			step5: {
				header: 'Bekräftelse',
				confirmationHeader: 'Tack för din beställning!',
				confirmationMessage: 'Din beställning är mottagen och har följande referensnummer:',
				startOver: 'Börja om med en ny beställning',
				errorHeader: 'Något gick fel',
				errorMessage: 'Det gick ej att genomföra din beställning. Försök igen senare.',
				back: 'Tillbaka',
				orderAnotherArticle: 'Beställ en artikel till',
				orderAnotherBook: 'Beställ en bok till',
				orderAnotherChapter: 'Beställ en kapitelkopia till',
				orderAnotherScore: 'Beställ ett musiktryck till',
				orderAnotherMicrofilm: 'Beställ en mikrofilm till'
			}
  	}
};
