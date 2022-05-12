export default {
  home: {
      headers: {
        logoPrintUrl: '/gu_logo_sv_high.png',
        level1: 'Göteborgs universitetsbibliotek',
        level2: 'Fjärrlån',
        mainHeader: 'Beställ artiklar och lån från andra bibliotek',
        langLink: 'In English',
        langTitle: 'To the English version of this page',
        langLinkUrl: '/index_en.html'
      },
      footer: {
        content: '© <a title="Göteborgs universitet" href="https://www.gu.se/">Göteborgs universitet</a><br>Box 100, 405 30 Göteborg<br>Tel. 031-786 0000, <a title="Kontakta oss" href="https://www.gu.se/omuniversitetet/kontakt/">Kontakta oss</a>'
      },
      orderDetailsArticle: {
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
      orderDetailsBook: {
        bookTitle: 'Titel',
        authors: 'Författare/utgivare',
        isbn: 'ISBN',
        publicationYear: 'År',
        outsideNordics: 'Godkänn lån utanför Norden',
        notValidAfter: 'Ej aktuell efter',
        comment: 'Kommentar'
      },
      orderDetailsChapter: {
        chapterTitle: 'Kapiteltitel',
        bookTitle: 'Boktitel',
        authors: 'Författare/utgivare',
        isbn: 'ISBN',
        publicationYear: 'År',
        pages: 'Sidor',
        notValidAfter: 'Ej aktuell efter',
        comment: 'Kommentar'
      },
      orderDetailsScore: {
        composers: 'Kompositör/tonsättare',
        opusTitle: 'Titel',
        publicationType: 'Publikationstyp',
        notValidAfter: 'Ej aktuell efter',
        comment: 'Kommentar'
      },
      orderDetailsMicrofilm: {
        newspaper: 'Dagstidning',
        period: 'Datum/period',
        startyear: 'Startår',
        notValidAfter: 'Ej aktuell efter',
        comment: 'Kommentar'
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
      orderType: {
        header: 'Beställningstyp',
        subHeader1: "Välj vad du vill beställa",
        typeHeader: 'Typ av material',
        typePrompt: 'Välj typ',
        nextBtn: 'Nästa',
        authBtn: 'Logga in'
      },
      login: {
        header: "Logga in",

        heading: "Logga in med GU-konto",
        body: "För studenter och anställda vid GU med ett gus-konto eller x-konto.",
        subHeader1: "Var god logga in för att fortsätta",
        accountHeading: "Logga in med bibliotekskonto",
        accountBody: "För användare som inte har något GU-konto.",
        cardNumberLabel: "Nummer på bibliotekskort",
        personalNumberLabel: "Personnummer",
        loginButton: "Logga in",
        libraryCardLinkText: "Skaffa bibliotekskonto",
        loginError: "Fel användarnamn eller lösenord. Vänligen försök igen.",
        or: "Eller"
      },
      orderDetails: {
        article: {
          header: 'Artikelkopia',
          price: '<strong>Priser:</strong><ul><li>En artikelkopia kostar 80 kronor.</li><li>Artikelkopior är gratis för anställda och affilierade vid Göteborgs universitet.</li><li>Företag betalar minst 180 kronor för en artikelkopia.</li></ul><br/><a target="_blank" href="https://www.ub.gu.se/sv/lana-och-logga-in/fjarrlan-av-bocker-och-artiklar#priser">Se prislista för mer information.</a>',
          subHeader1: 'Ange PubMed ID...',
          subHeader2: '...eller fyll i uppgifterna:',
          getPubMedBtn: 'Hämta',
          pubMedError: 'Hittade ingen artikel med angivet id i PubMed.',
        },
        book: {
          header: 'Bok',
          price: 'Här beställer du böcker som <strong>inte</strong> finns i Göteborgs universitetsbiblioteks samlingar.<br/>Använd <a target="_blank" href="https://gu-se-primo.hosted.exlibrisgroup.com/primo-explore/search?query=&vid=46GUB_VU1&search_scope=default_scope&sortby=rank&lang=sv_SE">Supersök</a> eller <a target="_blank" href="https://www.ub.gu.se/sv/hitta-material/bocker/aldre-bocker-i-kortkataloger">våra inskannade kortkataloger</a> om du vill beställa böcker från universitetsbibliotekets samlingar.',
          outsideNordicsHelpText: 'Kostnad 200:- (företag 400:-, gratis för anställda vid Göteborgs universitet)',
        },
        chapter: {
          header: 'Kopia av bokkapitel',
          price: '<strong>Priser:</strong><ul><li>En kapitelkopia kostar 80 kronor.</li><li>Kapitelkopior är gratis för anställda och affilierade vid Göteborgs universitet.</li><li>Företag betalar minst 180 kronor för en kapitelkopia.</li></ul><br/><a target="_blank" href="https://www.ub.gu.se/sv/lana-och-logga-in/fjarrlan-av-bocker-och-artiklar#priser">Se prislista för mer information.</a>',
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
      customerDetails: {
        header: 'Dina uppgifter',
        customerTypeHeader: 'Jag är...',
        customerTypeLabel: 'Kundkategori',
        customerTypePrompt: 'Välj kategori',
        priceLevel1: '<strong>Pris:</strong> En kopia kostar 80 kronor.',
        priceLevel2: '<strong>Pris:</strong>  En kopia kostar minst 180 kronor. <a target="_blank" href="https://www.ub.gu.se/sv/lana-och-logga-in/fjarrlan-av-bocker-och-artiklar#priser">Se prislista för mer information</a>.',
        priceInfoApproved: 'Jag har läst och förstår att det innebär en kostnad att beställa en kopia.',
        customerDetailsSubheader: 'Fyll i dina uppgifter',
        deliveryOptionsSubheader: 'Leveransalternativ',
        deliveryMethodPrompt: 'Välj leveranssätt',
        locationHeader: 'Bibliotek att hämta på',
        locationPrompt: 'Välj bibliotek',
        deliveryDetailsSubheader: 'Leveransuppgifter',
        invoicingDetailsSubheader: 'Faktureringsuppgifter',
        customerIdHelptext: 'Beställar-ID är ett 5- eller 7-siffrigt nummer som används av Västra Götalandsregionen vid fakturering. Om du inte har tillgång till ett beställar-ID får du istället beställa och betala som Privatperson.',
        nextBtn: 'Nästa',
        prevBtn: 'Bakåt',
        mandatoryText: 'Obligatoriska fält måste fyllas i innan du kan gå vidare',

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
        xAccount: 'GU-konto'
      },
      summary: {
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
      confirmation: {
        header: 'Bekräftelse',
        confirmationHeader: 'Tack för din beställning!',
        confirmationMessage: 'Din beställning är mottagen och har följande referensnummer:',
        startOver: 'Börja om med en ny beställning',
        orderAnotherArticle: 'Beställ en artikel till',
        orderAnotherBook: 'Beställ en bok till',
        orderAnotherChapter: 'Beställ en kapitelkopia till',
        orderAnotherScore: 'Beställ ett musiktryck till',
        orderAnotherMicrofilm: 'Beställ en mikrofilm till'
      },
      error: {
        errorHeader: 'Något gick fel',
        errorMessage: 'Det gick inte att genomföra din beställning. Försök igen senare.',
        back: 'Tillbaka'
      }
    },
    sfx: {
      orderType: {
        header: 'Välj bibliotek'
      }
    }
};
