import Mixin from '@ember/object/mixin';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service } from '@ember/service';
import { computed } from '@ember/object';
import ENV from 'frontend/config/environment';
import $ from 'jquery';

export default Mixin.create({
  applicationController: inject_controller('application'),
  i18n: inject_service(),


  orderPreviewPartialName: computed('applicationController.selectedOrderType.identifier', function() {
    return 'partials/' + this.get('applicationController.selectedOrderType.identifier') + '-preview';
  }),

  selectedLibraryNameString: computed('i18n.locale', function() {
    switch (this.get('i18n.locale')) {
      case 'sv':
      return this.get('applicationController.selectedLocation.title_sv');
      default:
      return this.get('applicationController.selectedLocation.title_en');
    }
  }),

  isDeliveryTypeShipping: computed.equal('applicationController.selectedDeliveryMethod.identifier', 'send'),

  hasInvoicing: computed('applicationController.{invoicingDetails.name,invoicingDetails.company,invoicingDetails.address,invoicingDetails.postalCode,invoicingDetails.city,invoicingDetails.customerId}', function() {
    return (this.get('applicationController.invoicingDetails.name') || this.get('applicationController.invoicingDetails.company') || this.get('applicationController.invoicingDetails.address') || this.get('applicationController.invoicingDetails.postalCode') || this.get('applicationController.invoicingDetails.city') || this.get('applicationController.invoicingDetails.customerId'));
  }),

  actions: {
    save: function() {
      $("body").addClass("loading");
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
      var order_outside_scandinavia =         null;
      var publication_type =                  null;
      var period =                            null;
      var delivery_place = this.get('applicationController.selectedDeliveryMethod.title_internal') || "Hämtas";

      var orderType =                         this.get("applicationController.selectedOrderType");
      switch(orderType.identifier) {
        case 'article':
        title =                             this.get('applicationController.orderDetailsArticle.articleTitle');
        journal_title =                     this.get('applicationController.orderDetailsArticle.journalTitle');
        authors =                           this.get('applicationController.orderDetailsArticle.authors');
        issn_isbn =                         this.get('applicationController.orderDetailsArticle.issn');
        publication_year =                  this.get('applicationController.orderDetailsArticle.publicationYear');
        volume =                            this.get('applicationController.orderDetailsArticle.volume');
        issue =                             this.get('applicationController.orderDetailsArticle.issue');
        pages =                             this.get('applicationController.orderDetailsArticle.pages');
        not_valid_after =                   this.get('applicationController.orderDetailsArticle.notValidAfter');
        comments =                          this.get('applicationController.orderDetailsArticle.comment');
        break;
        case 'book':
        title =                             this.get('applicationController.orderDetailsBook.bookTitle');
        authors =                           this.get('applicationController.orderDetailsBook.authors');
        issn_isbn =                         this.get('applicationController.orderDetailsBook.isbn');
        publication_year =                  this.get('applicationController.orderDetailsBook.publicationYear');
        order_outside_scandinavia =         this.get('applicationController.orderDetailsBook.outsideNordics');
        not_valid_after =                   this.get('applicationController.orderDetailsBook.notValidAfter');
        comments =                          this.get('applicationController.orderDetailsBook.comment');
        break;
        case 'chapter':
        title =                             this.get('applicationController.orderDetailsChapter.chapterTitle');
        journal_title =                     this.get('applicationController.orderDetailsChapter.bookTitle'); // Change ?
        authors =                           this.get('applicationController.orderDetailsChapter.authors');
        issn_isbn =                         this.get('applicationController.orderDetailsChapter.isbn');
        publication_year =                  this.get('applicationController.orderDetailsChapter.publicationYear');
        pages =                             this.get('applicationController.orderDetailsChapter.pages');
        not_valid_after =                   this.get('applicationController.orderDetailsChapter.notValidAfter');
        comments =                          this.get('applicationController.orderDetailsChapter.comment');
        break;
        case 'score':
        title =                             this.get('applicationController.orderDetailsScore.opusTitle');
        authors =                           this.get('applicationController.orderDetailsScore.composers');
        publication_type =                  this.get('applicationController.orderDetailsScore.publicationType');
        not_valid_after =                   this.get('applicationController.orderDetailsScore.notValidAfter');
        comments =                          this.get('applicationController.orderDetailsScore.comment');
        break;
        case 'microfilm':
        title =                             this.get('applicationController.orderDetailsMicrofilm.newspaper');
        period =                            this.get('applicationController.orderDetailsMicrofilm.period');
        publication_year =                  this.get('applicationController.orderDetailsMicrofilm.startyear');
        not_valid_after =                   this.get('applicationController.orderDetailsMicrofilm.notValidAfter');
        comments =                          this.get('applicationController.orderDetailsMicrofilm.comment');
        break;
        default:
        break;
      }

      var that = this;
      $.ajax({
        type: 'POST',
        url: ENV.APP.serviceURL + '/orders',
        data: JSON.stringify({
          order_type_id:                      orderType.id,
          customer_type:                      this.get('applicationController.selectedCustomerType.identifier'),
          form_library:                       this.get('applicationController.selectedLocation.identifier'), // Change?
          email_confirmation:                 true, // Always set to true
          form_lang:                          this.get('i18n.locale'),
          delivery_place:                     delivery_place,
          order_path:                         this.get('applicationController.orderPath'),

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
          order_outside_scandinavia:          order_outside_scandinavia,

          publication_type:                   publication_type,
          period:                             period,

          name:                               this.get('applicationController.customerDetails.name'),
          email_address:                      this.get('applicationController.customerDetails.emailAddress'),
          company1:                           this.get('applicationController.customerDetails.organisation'),
          company2:                           this.get('applicationController.customerDetails.department'),
          company3:                           this.get('applicationController.customerDetails.unit'),
          library_card_number:                this.get('applicationController.customerDetails.libraryCardNumber'),
          x_account:                          this.get('applicationController.customerDetails.xAccount'),

          delivery_address:                   this.get('applicationController.deliveryDetails.address'),
          delivery_box:                       this.get('applicationController.deliveryDetails.box'),
          delivery_postal_code:               this.get('applicationController.deliveryDetails.postalCode'),
          delivery_city:                      this.get('applicationController.deliveryDetails.city'),
          delivery_comments:                  this.get('applicationController.deliveryDetails.comment'),

          invoicing_name:                     this.get('applicationController.invoicingDetails.name'),
          invoicing_company:                  this.get('applicationController.invoicingDetails.company'),
          invoicing_address:                  this.get('applicationController.invoicingDetails.address'),
          invoicing_postal_address1:          this.get('applicationController.invoicingDetails.postalCode'),
          invoicing_postal_address2:          this.get('applicationController.invoicingDetails.city'),
          invoicing_id:                       this.get('applicationController.invoicingDetails.customerId')
        }),
        contentType: 'application/json',
        dataType: 'json'
      }).then(function(response) {

        if(window.dataLayer) {
          window.dataLayer.push({
            'orderType': that.get('applicationController.selectedOrderType.title_sv'),
            'location': that.get('applicationController.selectedLocation.title_sv'),
            'customerType': that.get('applicationController.selectedCustomerType.title_sv')
          });
        }

        $("body").removeClass("loading");
        that.successHandler(response);
      },
      function(error) {

        if(window.dataLayer) {
          window.dataLayer.push({
            'orderType': that.get('applicationController.selectedOrderType.title_sv'),
            'location': that.get('applicationController.selectedLocation.title_sv'),
            'customerType': that.get('applicationController.selectedCustomerType.title_sv')
          });
        }

        $("body").removeClass("loading");
        that.errorHandler(error);
      });
    }
  }
});
