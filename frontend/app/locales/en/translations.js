export default {
  home: {
      headers: {
        logoPrintUrl: '/gu_logo_en_high.png',
        level1: 'Gothenburg University Library',
        level2: 'Interlibrary loans',
        mainHeader: 'Order articles and interlibrary loans',
        langLink: 'På svenska',
        langTitle: 'To the English version of this page',
        langLinkUrl: '/'
      },
      footer: {
        content: '© <a title="Göteborgs universitet" href="http://www.gu.se/">University of Gothenburg, Sweden</a><br>Box 100, S-405 30 Gothenburg<br>Phone +46 31-786 0000, <a title="Contact" href="http://www.gu.se/omuniversitetet/kontakt/">Contact</a>'
      },
      orderDetailsArticle: {
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
      orderDetailsBook: {
        bookTitle: 'Title',
        authors: 'Author/publisher',
        isbn: 'ISBN',
        publicationYear: 'Year',
        outsideNordics: 'Forward to library outside Scandinavia, if necessary',
        notValidAfter: 'Request not needed after',
        comment: 'Comment'
      },
      orderDetailsChapter: {
        chapterTitle: 'Chapter title',
        bookTitle: 'Book title',
        authors: 'Author/publisher',
        isbn: 'ISBN',
        publicationYear: 'Year',
        pages: 'Pages',
        notValidAfter: 'Request not needed after',
        comment: 'Comment'
      },
      orderDetailsScore: {
        composers: 'Composer',
        opusTitle: 'Title',
        publicationType: 'Publication type',
        notValidAfter: 'Request not needed after',
        comment: 'Comment'
      },
      orderDetailsMicrofilm: {
        newspaper: 'Newspaper',
        period: 'Date/period',
        startyear: 'Starting year',
        notValidAfter: 'Request not needed after',
        comment: 'Comment'
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
        header: 'Order type',
        subHeader1: "Select what to order",
        typeHeader: 'Type of material',
        typePrompt: 'Select type',
        nextBtn: 'Next',
        authBtn: 'Login'
      },
      login: {
        header: 'Login',
        subHeader1: "Please login to continue",

        heading: "Log in with GU account",
        body: "For students and employees at GU with a gus-account or an x-account.",
        accountHeading: "Log in with library account",
        accountBody: "For users without a GU account.",
        cardNumberLabel: "Library card number",
        personalNumberLabel: "Personal identity number",
        loginButton: "Log in",
        libraryCardLinkText: "Sign up for an account",
        loginError: "Wrong username or password. Please try again.",
        or: "Or"
      },
      step2: {
        article: {
          header: 'Copy of article',
          price: '<strong>Prices:</strong><ul><li>A copy of an article costs SEK 80.</li><li>Copies of articles are free for employees at the University of Gothenburg.</li><li>Companies pay SEK 180 for copies of articles</li><li><a target="_blank" href="http://www.ub.gu.se/%3C-sv,en%3E/priser/koplanpriser/">See price list for more information.</a></li></ul>',
          subHeader1: 'Enter a PubMed ID...',
          subHeader2: '...or enter the details:',
          getPubMedBtn: 'Fetch',
          pubMedError: 'Could not find an article with the entered PubMed ID.',
        },
        book: {
          header: 'Book',
          outsideNordicsHelpText: 'Charge: 200 SEK (charge for companies 400 SEK, no charge for employees at the University of Gothenburg)',
        },
        chapter: {
          header: 'Copy of book chapter',
          price: 'Charge: 80 SEK (no charge for GU staff)',
        },
        score: {
          header: 'Musical score',
          publicationTypeHelpText: '(scores, sheet music, orchestral parts, etc)'
        },
        microfilm: {
          header: 'Microfilm newspaper'
        },
        header: 'Order details',
        otherDetailsText: 'Additional details about the order',
        mandatoryText: 'Mandatory fields must be filled in before you can proceed',
        nextBtn: 'Next',
        prevBtn: 'Back'
      },
      step3: {
        header: 'Your personal details',
        customerTypeHeader: 'I am a...',
        customerTypeLabel: 'Customer category',
        customerTypePrompt: 'Select a category',
        customerDetailsSubheader: 'Fill in your details',
        xAccountHelptext: 'If you lack an x-account but are a researcher or staff at the University of Gothenburg, please write “xx” in this field.',
        deliveryOptionsSubheader: 'Delivery options',
        deliveryMethodPrompt: 'Select a delivery option:',
        locationHeader: 'Pick up library ',
        locationPrompt: 'Select library',
        deliveryDetailsSubheader: 'Delivery details',
        invoicingDetailsSubheader: 'Invoicing details',
        customerIdHelptext: 'A purchase ID is a 5 or 7 digit number used by Region Västra Götaland for invoicing. If you are not eligible for a Purchase ID, please order and pay as a Private person.',
        nextBtn: 'Next',
        prevBtn: 'Back',
        mandatoryText: 'Mandatory fields must be filled in before you can proceed'
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
        orderAnotherArticle: 'Order another article',
        orderAnotherBook: 'Order another book',
        orderAnotherChapter: 'Order another book chapter',
        orderAnotherScore: 'Order another musical score',
        orderAnotherMicrofilm: 'Order another microfilm'
      },
      error: {
        errorHeader: 'Something went wrong',
        errorMessage: 'It was not possible to process your order. Please try again later.',
        back: 'Back'
      }
    },
    sfx: {
      step1: {
        header: 'Select library'
      }
    }
};
