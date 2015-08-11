import Ember from 'ember';
import ENV from 'fjarrkontrollen-forms/config/environment';

export default Ember.Controller.extend({
  needs: ['application'],
  invoicingDetailsBinding: 'controllers.application.invoicingDetails',

  orderPreviewPartialName: Ember.computed('controllers.application.selectedOrderType.identifier', function() {
    return 'home/step4/' + this.get('controllers.application.selectedOrderType.identifier');
  }),

  selectedLibraryNameString: Ember.computed('lang', function() {
    switch (this.get('lang')) {
      case 'sv':
        return this.get('controllers.application.selectedLocation.title_sv');
      default:
        return this.get('controllers.application.selectedLocation.title_en');
    }
  }),

  isDeliveryTypeShipping: Ember.computed.equal('controllers.application.selectedDeliveryMethod.identifier', 'send'),

  hasInvoicing: Ember.computed('invoicingDetails.name','invoicingDetails.company', 'invoicingDetails.address', 'invoicingDetails.postalCode', 'invoicingDetails.city', 'invoicingDetails.customerId', function() {
    return (this.get('invoicingDetails.name') || this.get('invoicingDetails.company') || this.get('invoicingDetails.address') || this.get('invoicingDetails.postalCode') || this.get('invoicingDetails.city') || this.get('invoicingDetails.customerId'));
  }),

  actions: {
    back: function() {
      this.transitionToRoute("home.step3");
    },
    nextStep: function() {
      this.transitionToRoute("home.step4");
    },
    save: function() {
      Ember.$("body").addClass("loading");
      var title =                             null;
      var journal_title =                     null;
      var authors =                           null;
      var issn_isbn =                         null;
      var publication_year =                  null;
      var volume =                            null;
      var issue =                             null;
      var pages =                             null;
      var not_valid_after =                   null;
      var comments =                          null;
      //var photocopies_if_loan_not_possible =  null;
      var order_outside_scandinavia =         null;
      var publication_type =                  null;
      var period =                            null;
      var delivery_place = this.get('controllers.application.selectedDeliveryMethod.title_special') || "Hämtas";

      var orderType =                         this.get("controllers.application.selectedOrderType");
      switch(orderType.identifier) {
        case 'article':
          title =                             this.get('controllers.application.orderDetails.article.articleTitle');
          journal_title =                     this.get('controllers.application.orderDetails.article.journalTitle');
          authors =                           this.get('controllers.application.orderDetails.article.authors');
          issn_isbn =                         this.get('controllers.application.orderDetails.article.issn');
          publication_year =                  this.get('controllers.application.orderDetails.article.publicationYear');
          volume =                            this.get('controllers.application.orderDetails.article.volume');
          issue =                             this.get('controllers.application.orderDetails.article.issue');
          pages =                             this.get('controllers.application.orderDetails.article.pages');
          not_valid_after =                   this.get('controllers.application.orderDetails.article.notValidAfter');
          comments =                          this.get('controllers.application.orderDetails.article.comment');
          break;
        case 'book':
          title =                             this.get('controllers.application.orderDetails.book.bookTitle');
          authors =                           this.get('controllers.application.orderDetails.book.authors');
          issn_isbn =                         this.get('controllers.application.orderDetails.book.isbn');
          publication_year =                  this.get('controllers.application.orderDetails.book.publicationYear');
          //photocopies_if_loan_not_possible =  this.get('controllers.application.orderDetails.book.outsideNordics');
          order_outside_scandinavia =         this.get('controllers.application.orderDetails.book.allowCopy');
          not_valid_after =                   this.get('controllers.application.orderDetails.book.notValidAfter');
          comments =                          this.get('controllers.application.orderDetails.book.comment');
          break;
        case 'chapter':
          title =                             this.get('controllers.application.orderDetails.chapter.chapterTitle');
          journal_title =                     this.get('controllers.application.orderDetails.chapter.bookTitle'); // Change ?
          authors =                           this.get('controllers.application.orderDetails.chapter.authors');
          issn_isbn =                         this.get('controllers.application.orderDetails.chapter.isbn');
          publication_year =                  this.get('controllers.application.orderDetails.chapter.publicationYear');
          pages =                             this.get('controllers.application.orderDetails.chapter.pages');
          not_valid_after =                   this.get('controllers.application.orderDetails.chapter.notValidAfter');
          comments =                          this.get('controllers.application.orderDetails.chapter.comment');
          break;
        case 'score':
          title =                             this.get('controllers.application.orderDetails.score.opusTitle');
          authors =                           this.get('controllers.application.orderDetails.score.composers');
          publication_type =                  this.get('controllers.application.orderDetails.score.publicationType');
          not_valid_after =                   this.get('controllers.application.orderDetails.score.notValidAfter');
          comments =                          this.get('controllers.application.orderDetails.score.comment');
          break;
        case 'microfilm':
          title =                             this.get('controllers.application.orderDetails.microfilm.newspaper');
          period =                            this.get('controllers.application.orderDetails.microfilm.period');
          publication_year =                  this.get('controllers.application.orderDetails.microfilm.startyear');
          not_valid_after =                   this.get('controllers.application.orderDetails.microfilm.notValidAfter');
          comments =                          this.get('controllers.application.orderDetails.microfilm.comment');
          break;
        default:
          break;
      }

      var that = this;
      Ember.$.ajax({
        type: 'POST',
        url: ENV.APP.serviceURL + '/orders',
        data: JSON.stringify({
          order_type_id:                      orderType.id,
          customer_type:                      this.get('controllers.application.selectedCustomerType.identifier'),
          form_library:                       this.get('controllers.application.selectedLocation.identifier'), // Change?
          email_confirmation:                 true, // Always set to true
          form_lang:                          this.get('lang'),
          delivery_place:                     delivery_place,
          order_path:                         this.get('controllers.application.orderPath'),

          title:                              title,
          journal_title:                      journal_title,
          authors:                            authors,
          issn_isbn:                          issn_isbn,
          publication_year:                   publication_year,
          volume:                             volume,
          issue:                              issue,
          pages:                              pages,
          not_valid_after:                    not_valid_after,
          comments:                           comments,
          //photocopies_if_loan_not_possible:   photocopies_if_loan_not_possible,
          order_outside_scandinavia:          order_outside_scandinavia,

          publication_type:                   publication_type,
          period:                             period,

          name:                               this.get('controllers.application.customerDetails.name'),
          email_address:                      this.get('controllers.application.customerDetails.emailAddress'),
          //phone_number:                       this.get('controllers.application.customerDetails.phoneNumber'),
          company1:                           this.get('controllers.application.customerDetails.organisation'),
          company2:                           this.get('controllers.application.customerDetails.department'),
          company3:                           this.get('controllers.application.customerDetails.unit'),
          library_card_number:                this.get('controllers.application.customerDetails.libraryCardNumber'),
          x_account:                          this.get('controllers.application.customerDetails.xAccount'),

          delivery_address:                   this.get('controllers.application.deliveryDetails.address'),
          delivery_box:                       this.get('controllers.application.deliveryDetails.box'),
          delivery_postal_code:               this.get('controllers.application.deliveryDetails.postalCode'),
          delivery_city:                      this.get('controllers.application.deliveryDetails.city'),
          delivery_comments:                  this.get('controllers.application.deliveryDetails.comment'),

          invoicing_name:                     this.get('controllers.application.invoicingDetails.name'),
          invoicing_company:                  this.get('controllers.application.invoicingDetails.company'),
          invoicing_address:                  this.get('controllers.application.invoicingDetails.address'),
          invoicing_postal_address1:          this.get('controllers.application.invoicingDetails.postalCode'),
          invoicing_postal_address2:          this.get('controllers.application.invoicingDetails.city'),
          invoicing_id:                       this.get('controllers.application.invoicingDetails.customerId')
        }),
        contentType: 'application/json',
        dataType: 'json'
      }).then(function(response) {
        Ember.$("body").removeClass("loading");
        var result = {};
        result.id = response.order.order_number;
        that.transitionToRoute('home.step5', result);
      },
      function(error) {
        Ember.$("body").removeClass("loading");
        var result = {};
        result.error = error;
        result.id = 'error';
        that.transitionToRoute('home.step5', result);
      });
    }
  }
});
