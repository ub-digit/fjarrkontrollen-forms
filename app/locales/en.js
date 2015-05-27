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
				postalCode: 'Postal code',
				city: 'City',
				libraryCardNumber: 'Library card number',
				xAccount: 'x-account'
			},
			deliveryDetails: {
				address: 'Address/box',
				postalCode: 'Postal code',
				city: 'City',
				box: 'Box',
				comment: 'Comment, (eg. temporary address)'
			},
			invoicingDetails: {
				name: 'Name',
				company: 'Organisation/company',
				address: 'Address/box',
				postalCode: 'Postal code',
				city: 'City',
				customerId: 'Purchase ID'
			},
   		step1: {
				header: 'Order and library',
   			typeHeader: 'What do you want to order',
        locationHeader: 'Select library to order from',
   			nextBtn: 'Next',
   		},
   		step2: {
				article: {
					header: 'Copy of article',
					price: 'Charge: 80 SEK (no charge for GU staff, charge for companies 160 SEK)',
					subHeader1: 'Enter a PubMed ID...',
					subHeader2: '...or enter the details:',
					getPubMedBtn: 'Fetch',
					pubMedError: 'Could not find an article with the entered PubMed ID.',
				},
				book: {
					header: 'Book',
					outsideNordicsHelpText: 'Charge: 200 SEK (charge for companies 400:-)',
				},
				chapter: {
					header: 'Copy of book chapter',
					price: 'Charge: 80:- (no charge for GU staff)',
				},
				score: {
					header: 'Musical score',
					publicationTypeHelpText: '(scores, sheet music, orchestral parts, etc)'
				},
				microfilm: {
					header: 'Microfilmed newspaper'
				},
				header: 'Order details',
				otherDetailsText: 'Additional details about the order',
				mandatoryText: '* Mandatory fields must be filled in before you can proceed',
				nextBtn: 'Next',
				prevBtn: 'Back'
   		},
   		step3: {
				header: 'Your personal details',
				customerTypeHeader: 'I am a...',
				customerTypePrompt: 'Choose customer category',
				customerDetailsSubheader: 'Fill in your details',
				deliveryOptionsSubheader: 'Delivery options',
				deliveryMethodPrompt: 'Choose a delivery option:',
				pickupInfoText: 'The order will be picked up at',
				deliveryDetailsSubheader: 'Delivery details',
				invoicingDetailsSubheader: 'Invoicing details',
				nextBtn: 'Next',
				prevBtn: 'Back',
				mandatoryText: '* Mandatory fields must be filled in before you can proceed'
   		},
   		step4: {
				header: 'Summary',
				orderDetailsSubheader: 'Order details',
				yes: 'Yes',
				no: 'No',
				customerDetailsSubheader: 'Personal details',
				deliveryOptionsSubheader: 'Delivery details',
				invoicingDetailsSubheader: 'Invoicing details',
				shippingInfoText: 'Will be sent to:',
				pickupInfoText: 'Pickup at',
   			nextBtn: 'Submit order',
   			prevBtn: 'Back'
   		},
			step5: {
				header: 'Confirmation',
				confirmationHeader: 'Thank you for your order!',
				confirmationMessage: 'Your order has been recieved and has been assigned the following order number:',
				startOver: 'Start over with a new order',
				errorHeader: 'Something went wrong',
				errorMessage: 'It was not possible to process your order. Please try again later.',
				back: 'Back',
				orderAnotherArticle: 'Order one more article',
				orderAnotherBook: 'Order one more book',
				orderAnotherChapter: 'Order one more book chapter',
				orderAnotherScore: 'Order one more musical score',
				orderAnotherMicrofilm: 'Order one more microfilm'
			}
  	}
};
