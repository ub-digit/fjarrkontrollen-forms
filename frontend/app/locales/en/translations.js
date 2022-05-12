export default {
  home: {
      headers: {
        logoPrintUrl: '/gu_logo_en_high.png',
        level1: 'Gothenburg University Library',
        level2: 'Interlibrary loans',
        mainHeader: 'Order articles and loans from other libraries',
        langLink: 'På svenska',
        langTitle: 'Till den svenska versionen av sidan',
        langLinkUrl: '/'
      },
      footer: {
        content: '© <a title="Göteborgs universitet" href="https://www.gu.se/">University of Gothenburg, Sweden</a><br>Box 100, S-405 30 Gothenburg<br>Phone +46 31-786 0000, <a title="Contact" href="https://www.gu.se/omuniversitetet/kontakt/">Contact</a>'
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
      orderType: {
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
      orderDetails: {
        article: {
          header: 'Copy of article',
          price: '<strong>Prices:</strong><ul><li>A copy of an article costs SEK 80.</li><li>Copies of articles are free for employees and affiliated of the University of Gothenburg.</li><li>Companies pay a minimum of SEK 180 for copies of articles.</li></ul><br/><a target="_blank" href="https://www.ub.gu.se/en/borrow-and-log-in/interlibrary-loans-of-books-and-article-copies#prices">See price list for more information.</a>',
          subHeader1: 'Enter a PubMed ID...',
          subHeader2: '...or enter the details:',
          getPubMedBtn: 'Fetch',
          pubMedError: 'Could not find an article with the entered PubMed ID.',
        },
        book: {
          header: 'Book',
          price: 'Use this form to order books that are <strong>not</strong> held by Gothenburg University Library.<br/>Use <a target="_blank" href="https://gu-se-primo.hosted.exlibrisgroup.com/primo-explore/search?search_scope=default_scope&sortby=rank&vid=46GUB_VU1&lang=en_US">Supersearch</a> or our <a target="_blank" href="https://www.ub.gu.se/en/find-resources/books/older-books-in-card-catalogues">scanned card catalogues</a> if you want to to request books from the university library’s collections.',
          outsideNordicsHelpText: 'Charge: 200 SEK (charge for companies 400 SEK, no charge for employees at the University of Gothenburg)',
        },
        chapter: {
          header: 'Copy of book chapter',
          price: '<strong>Prices:</strong><ul><li>A copy of book chapter costs SEK 80.</li><li>Copies of book chapters are free for employees and affiliated of the University of Gothenburg.</li><li>Companies pay a minimum of SEK 180 for copies of book chapters.</li></ul><br/><a target="_blank" href="https://www.ub.gu.se/en/borrow-and-log-in/interlibrary-loans-of-books-and-article-copies#prices">See price list for more information.</a>',
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
      customerDetails: {
        header: 'Your personal details',
        customerTypeHeader: 'I am a...',
        customerTypeLabel: 'Customer category',
        customerTypePrompt: 'Select a category',
        priceLevel1: '<strong>Price:</strong> A copy costs SEK 80.',
        priceLevel2: '<strong>Price:</strong> A copy costs a minimum of SEK 180. <a target="_blank" href="https://www.ub.gu.se/en/borrow-and-log-in/interlibrary-loans-of-books-and-article-copies#prices">See price list for more information</a>.',
        priceInfoApproved: 'I have read and understood that i will be charged when i order a copy.',
        customerDetailsSubheader: 'Fill in your details',
        deliveryOptionsSubheader: 'Delivery options',
        deliveryMethodPrompt: 'Select a delivery option:',
        locationHeader: 'Pick up library ',
        locationPrompt: 'Select library',
        deliveryDetailsSubheader: 'Delivery details',
        invoicingDetailsSubheader: 'Invoicing details',
        customerIdHelptext: 'A purchase ID is a 5 or 7 digit number used by Region Västra Götaland for invoicing. If you are not eligible for a Purchase ID, please order and pay as a Private person.',
        nextBtn: 'Next',
        prevBtn: 'Back',
        mandatoryText: 'Mandatory fields must be filled in before you can proceed',

        name: 'Name',
        emailAddress: 'E-mail',
        organisation: 'Organisation/company',
        department: 'Department',
        unit: 'Unit',
        address: 'Address',
        postalCode: 'Postal code',
        city: 'City',
        libraryCardNumber: 'Library card number',
        xAccount: 'GU-account'
      },
      summary: {
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
      confirmation: {
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
      orderType: {
        header: 'Select library'
      }
    }
};
