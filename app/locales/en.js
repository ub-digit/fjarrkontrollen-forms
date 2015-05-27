export default {
	home: {
			orderDetails: {
				article: {
					articleTitle: 'Article title',
					journalTitle: 'Journal title',
					authors: 'Authors',
					issn: 'ISSN',
					publicationYear: 'Year',
					issue: 'Issue',
					volume: 'Volume',
					pages: 'Pages',
					notValidAfter: 'Request not needed after',
					comment: 'Comment'
				},
				book: {
					bookTitle: 'Title',
					authors: 'Author/publisher',
					isbn: 'ISBN',
					publicationYear: 'Year',
					outsideNordics: 'Forward to library outside Scandinavia, if necessary',
					notValidAfter: 'Request not needed after',
					comment: 'Comment'
				},
				chapter: {
					chapterTitle: 'Chapter title',
					bookTitle: 'Book title',
					authors: 'Author/publisher',
					isbn: 'ISBN',
					publicationYear: 'Year',
					pages: 'Pages',
					notValidAfter: 'Request not needed after',
					comment: 'Comment'
				},
				score: {
					composers: 'Composer',
					opusTitle: 'Title',
					publicationType: 'Publication type',
					notValidAfter: 'Request not needed after',
					comment: 'Comment'
				},
				microfilm: {
					newspaper: 'Newspaper',
					period: 'Date/period',
					startyear: 'Starting year',
          notValidAfter: 'Request not needed after',
					comment: 'Comment'
				}
			},
			customerDetails: {
				name: 'Name',
				emailAddress: 'E-mail',
				organisation: 'Organisation/company',
				department: 'Department',
				unit: 'Unit',
				address: 'Address',
				postalCode: 'Postnummer',
				city: 'Ort',
				libraryCardNumber: 'Lånekortsnummer',
				xAccount: 'xkonto'
			},
			deliveryDetails: {
				address: 'Address/box',
				postalCode: 'Postnummer',
				city: 'Ort',
				box: 'Box',
				comment: 'Kommentar, (tex. tillfällig adress)'
			},
			invoicingDetails: {
				name: 'Namn',
				company: 'Organisation/företag',
				address: 'Address/box',
				postalCode: 'Postnummer',
				city: 'Ort',
				customerId: 'Beställar-ID'
			},
   		step1: {
				header: 'Typ och bibliotek',
   			typeHeader: 'Välj vad vill du beställa',
        locationHeader: 'Välj bibliotek',
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
				mandatoryText: '* Obligatoriska fält måste fyllas i innan du kan gå vidare',
				nextBtn: 'Nästa',
				prevBtn: 'Bakåt'
   		},
   		step3: {
				header: 'Dina uppgifter',
				customerTypeHeader: 'Jag är...',
				customerTypePrompt: 'Välj kundkategori',
				customerDetailsSubheader: 'Fyll i dina uppgifter',
				deliveryOptionsSubheader: 'Leveransalternativ',
				deliveryMethodPrompt: 'Välj leveranssätt:',
				pickupInfoText: 'Beställningen hämtas på',
				deliveryDetailsSubheader: 'Leveransuppgifter',
				invoicingDetailsSubheader: 'Faktureringsuppgifter',
   			nextBtn: 'Nästa',
   			prevBtn: 'Bakåt',
				mandatoryText: '* Obligatoriska fält måste fyllas i innan du kan gå vidare'
   		},
   		step4: {
				header: 'Summering',
				orderDetailsSubheader: 'Beställningsuppgifter',
				yes: 'Ja',
				no: 'Nej',
				customerDetailsSubheader: 'Personuppgifter',
				deliveryOptionsSubheader: 'Leveransalternativ',
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
				errorMessage: 'Det gick ej att genomföra din beställning. Försök senare.',
				back: 'Tillbaka',
				orderAnotherArticle: 'Beställ en artikel till',
				orderAnotherBook: 'Beställ en bok till',
				orderAnotherChapter: 'Beställ en kapitelkopia till',
				orderAnotherScore: 'Beställ ett musiktryck till',
				orderAnotherMicrofilm: 'Beställ en mikrofilm till'
			}
  	}
};
