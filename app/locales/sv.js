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
					outsideNordics: 'Godkänn lån utanför Norden',
					allowCopy: 'Jag vill ha kopior om boken ej går att låna',
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
				company: 'Organisation/företag',
				name: 'Namn',
				address: 'Adress/box',
				postalCode: 'Postnummer',
				city: 'Ort'
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
   			typeHeader: 'Välj vad vill du beställa',
        locationHeader: 'Välj bibliotek',
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
					header: 'Bokbeställning',
					outsideNordicsHelpText: 'Om boken inte finns tillgänglig inom norden kan den eventuellt lånas in från ett bibliotek utanför norden, mote en avgift.',
				},
				chapter: {
					header: 'Kapitelbeställning'
				},
				score: {
					header: 'Musiktryck',
					publicationTypeHelpText: '(partitur, klaverutdrag, orkesterstämmor, etc)'
				},
				microfilm: {
					header: 'Mikrofilmad dagstidning'
				},
				otherDetailsText: 'Övriga uppgifter om beställningen',
				mandatoryText: '* Obligatoriska fält måste fyllas i innan du kan gå vidare',
				nextBtn: 'Nästa',
				prevBtn: 'Bakåt'
   		},
   		step3: {
				header: 'Beställaruppgifter',
				customerTypeHeader: 'Jag är...',
				customerDetailsSubheader: 'Fyll i dina uppgifter',
				deliveryOptionsSubheader: 'Leveransalternativ',
				pickupInfoText: 'Hämtas på',
				deliveryDetailsSubheader: 'Leveransuppgifter',
				invoicingDetailsSubheader: 'Faktureringsuppgifter',
   			nextBtn: 'Nästa',
   			prevBtn: 'Bakåt',
				mandatoryText: '* Obligatoriska fält måste fyllas i innan du kan gå vidare'
   		},
   		step4: {
				header: 'Förhandsgranska',
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
				confirmationHeader: 'Tack för din beställning!',
				confirmationMessage: 'Din beställning är mottagen och har följande referensnummer:',
				orderOneMore: 'Gör en till beställning'
			}
  	}


};
