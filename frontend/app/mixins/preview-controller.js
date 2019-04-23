import Mixin from '@ember/object/mixin';
import { inject as injectController } from '@ember/controller';
import { inject as injectService } from '@ember/service';
import { computed } from '@ember/object';
import $ from 'jquery';
import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import ENV from 'frontend/config/environment';

export default Mixin.create({
  applicationController: injectController('application'),
  i18n: injectService(),
  session: injectService(),

  orderPreviewPartialName: computed('applicationController.selectedOrderType.label', function() {
    return 'partials/' + this.get('applicationController.selectedOrderType.label') + '-preview';
  }),

  isDeliveryTypeShipping: computed.equal('applicationController.selectedDeliveryMethod.label', 'send'),

  hasInvoicing: computed('applicationController.invoicingDetails{name,company,address,postalCode,city,customerId}', function() {
    return (
      this.get('applicationController.invoicingDetails.name') ||
      this.get('applicationController.invoicingDetails.company') ||
      this.get('applicationController.invoicingDetails.address') ||
      this.get('applicationController.invoicingDetails.postalCode') ||
      this.get('applicationController.invoicingDetails.city') ||
      this.get('applicationController.invoicingDetails.customerId')
    );
  }),

  actions: {
    save: function() {
      $('body').addClass('loading');

      let order = {
        // Valid properties:
        /*
        title: null,
        journal_title: null,
        authors: null,
        issn_isbn: null,
        publication_year: null,
        volume: null,
        issue: null,
        pages: null,
        not_valid_after: null,
        comments: null,
        order_outside_scandinavia: null,
        publication_type: null,
        period: null
        */
      };

      let setOrderProperties = (properties, sourcePath) => {
        properties.forEach((property) => {
          order[property.decamelize()] = this.get(`${sourcePath}.${property}`);
        });
      };

      let orderType = this.get('applicationController.selectedOrderType');
      switch(orderType.label) {
        case 'photocopy':
          setOrderProperties([
            'articleTitle',
            'journalTitle',
            'authors',
            'publicationYear',
            'volume',
            'issue',
            'pages',
            'notValidAfter'
          ], 'applicationController.orderDetailsArticle');
          order['issn_isbn'] = this.get('applicationController.orderDetailsArticle.issn');
          order['comments'] = this.get('applicationController.orderDetailsArticle.comment');
          break;
        case 'loan':
          setOrderProperties([
            'authors',
            'publicationYear',
            'notValidAfter'
          ], 'applicationController.orderDetailsBook');
          order['title'] = this.get('applicationController.orderDetailsBook.bookTitle');
          order['order_outside_scandinavia'] = this.get('applicationController.orderDetailsBook.outsideNordics');
          order['issn_isbn'] = this.get('applicationController.orderDetailsBook.isbn');
          order['comments'] = this.get('applicationController.orderDetailsBook.comment');
          break;
        case 'photocopy_chapter':
          setOrderProperties([
            'authors',
            'publicationYear',
            'pages',
            'notValidAfter'
          ], 'applicationController.orderDetailsChapter');
          order['title'] = this.get('applicationController.orderDetailsChapter.chapterTitle');
          order['journal_title'] = this.get('applicationController.orderDetailsChapter.bookTitle'); // Change ?
          order['issn_isbn'] = this.get('applicationController.orderDetailsChapter.isbn');
          order['comments'] = this.get('applicationController.orderDetailsChapter.comment');
          break;
        case 'score':
          setOrderProperties([
            'publicationType',
            'notValidAfter'
          ], 'applicationController.orderDetailsScore');
          order['authors'] = this.get('applicationController.orderDetailsScore.composers');
          order['title'] = this.get('applicationController.orderDetailsScore.opusTitle');
          order['comments'] = this.get('applicationController.orderDetailsScore.comment');
          break;
        case 'microfilm':
          setOrderProperties([
            'period',
            'notValidAfter'
          ], 'applicationController.orderDetailsMicrofilm');
          order['publication_year'] = this.get('applicationController.orderDetailsMicrofilm.startyear');
          order['title'] = this.get('applicationController.orderDetailsMicrofilm.newspaper');
          order['comments'] = this.get('applicationController.orderDetailsMicrofilm.comment');
          break;
        default:
          break;
      }

      //TODO: Quickfix, fix properly when pickup location
      // is not chosen on first page
      let deliveryMethod = this.get('applicationController.deliveryMethods').findBy(
        'label',
        this.get('applicationController.order.selectedDeliveryMethod') || 'pickup'
      );

      assign(order, {
        order_type_id:              orderType.id,
        customer_type_id:           this.get('applicationController.selectedCustomerType.id'),
        email_confirmation:         true, // Always set to true
        form_lang:                  this.get('i18n.locale'),
        delivery_place:             this.get('applicationController.selectedDeliveryMethod.title_internal') || 'Hämtas',
        order_path:                 this.get('applicationController.order.orderPath'),

        name:                       this.get('applicationController.customerDetails.name'),
        email_address:              this.get('applicationController.customerDetails.emailAddress'),
        company1:                   this.get('applicationController.customerDetails.organisation'),
        company2:                   this.get('applicationController.customerDetails.department'),
        company3:                   this.get('applicationController.customerDetails.unit'),
        library_card_number:        this.get('applicationController.customerDetails.libraryCardNumber'),
        x_account:                  this.get('applicationController.customerDetails.xAccount'),

        delivery_method_id:         deliveryMethod.id,
        delivery_address:           this.get('applicationController.deliveryDetails.address'),
        delivery_box:               this.get('applicationController.deliveryDetails.box'),
        delivery_postal_code:       this.get('applicationController.deliveryDetails.postalCode'),
        delivery_city:              this.get('applicationController.deliveryDetails.city'),
        delivery_comments:          this.get('applicationController.deliveryDetails.comment'),

        pickup_location_id:         this.get('applicationController.selectedLocation.id'),

        invoicing_name:             this.get('applicationController.invoicingDetails.name'),
        invoicing_company:          this.get('applicationController.invoicingDetails.company'),
        invoicing_address:          this.get('applicationController.invoicingDetails.address'),
        invoicing_postal_address1:  this.get('applicationController.invoicingDetails.postalCode'),
        invoicing_postal_address2:  this.get('applicationController.invoicingDetails.city'),
        invoicing_id:               this.get('applicationController.invoicingDetails.customerId')
      });

      $('body').removeClass('loading');

      $.ajax({
        type: 'POST',
        url: ENV.APP.serviceUrl + '/orders',
        data: JSON.stringify(order),
        contentType: 'application/json',
        dataType: 'json',
        headers: this.get('session.isAuthenticated')
          ? {Authorization: 'Bearer ' + this.get('session.data.authenticated.token')}
          : {}
      }).then((response) => {
        run(() => {
          if(window.dataLayer) {
            window.dataLayer.push({
              'orderType': this.get('applicationController.selectedOrderType.name_sv'),
              'pickupLocation': this.get('applicationController.selectedLocation.name_sv'),
              'customerType': this.get('applicationController.selectedCustomerType.name_sv')
            });
          }

          $("body").removeClass("loading");
          this.successHandler(response);
        });
      },
      (error) => {
        run(() => {
          if(window.dataLayer) {
            window.dataLayer.push({
              'orderType': this.get('applicationController.selectedOrderType.name_sv'),
              'pickupLocation': this.get('applicationController.selectedLocation.name_sv'),
              'customerType': this.get('applicationController.selectedCustomerType.name_sv')
            });
          }

          $('body').removeClass('loading');
          this.errorHandler(error);
        });
      });
    }
  }
});
