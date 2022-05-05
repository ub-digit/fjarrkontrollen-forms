import Mixin from '@ember/object/mixin';
import { inject as injectController } from '@ember/controller';
import { inject as injectService} from '@ember/service';
import { computed } from '@ember/object';
import { alias, and, equal, notEmpty } from '@ember/object/computed';
import { observer } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { storageFor } from 'ember-local-storage';

export default Mixin.create({
  applicationController: injectController('application'),
  i18n: injectService(),
  session: injectService(),
  order: storageFor('order'),

  isEnglish: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'en';
  }),

  orderPreviewPartialName: computed('applicationController.order.selectedOrderType', function() {
    return 'sfx/partials/' + this.get('applicationController.order.selectedOrderType').dasherize() + '-preview';
  }),

  // Bool to check if customer type is set
  isCustomerTypeSet: notEmpty('order.selectedCustomerType'),

  // Book to check if price info is approved
  isPriceInfoApproved: equal('priceInfoApproved', true),

  // Bool to check whether to show customer details or not
  showDetailsInForm: computed('isCustomerTypeSet', 'isPriceInfoApproved', 'showPriceLevel1Info', 'showPriceLevel2Info', function() {
    return (
      (this.get('isCustomerTypeSet') && !(this.get('showPriceLevel1Info') || this.get('showPriceLevel2Info'))) ||
      (this.get('isPriceInfoApproved') && (this.get('showPriceLevel1Info') || this.get('showPriceLevel2Info')))
    );
  }),

  // Bool to check whether to show price level 1 info
  showPriceLevel1Info: computed('order.selectedOrderType', 'order.selectedCustomerType', function() {
    return (
      (this.get('order.selectedOrderType') === 'photocopy' ||
       this.get('order.selectedOrderType') === 'photocopy_chapter') &&
      (this.get('order.selectedCustomerType') === 'stud' ||
       this.get('order.selectedCustomerType') === 'dist' ||
       this.get('order.selectedCustomerType') === 'priv')
    );
  }),

  // Bool to check whether to show price level 2 info
  showPriceLevel2Info: computed('order.selectedOrderType', 'order.selectedCustomerType', function() {
    return (
      (this.get('order.selectedOrderType') === 'photocopy' ||
       this.get('order.selectedOrderType') === 'photocopy_chapter') &&
       this.get('order.selectedCustomerType') === 'ftag'
    );
  }),

  // Observes selected customer type and resets selected delivery method to null
  resetDeliveryMethod: observer('order.selectedCustomerType', function() {
    this.set('order.selectedDeliveryMethod', null);
    this.set('applicationController.deliveryDetails.company', null);
    this.set('applicationController.deliveryDetails.name', null);
    this.set('applicationController.deliveryDetails.address', null);
    this.set('applicationController.deliveryDetails.postalCode', null);
    this.set('applicationController.deliveryDetails.city', null);
  }),

  isShippable: computed('order.selectedOrderType', function() {
    // Check if order type is of a kind that never will be shipped
    return !(
      this.get('order.selectedOrderType') === 'loan' ||
      this.get('order.selectedOrderType') === 'microfilm' ||
      this.get('order.selectedOrderType') === 'score'
    );
  }),

  // Bool to check if shipping method options are available based on
  //  - Customer type has been set, and
  //  - Customer type is not student or private, and
  //  - Order type is shippable
  //TODO: better name?
  isShippingAvailable: computed('order.selectedCustomerType', 'isShippable', function() {
    return (
      this.get('isShippable') &&
      !(
        this.get('order.selectedCustomerType') === 'stud' ||
        this.get('order.selectedCustomerType') === 'priv'
      )
    );
  }),


  // Bool to check if delivery method is set, but only of there are multiple options available
  isDeliveryMethodSet: computed('order.selectedDeliveryMethod', 'isShippingAvailable', function() {
    return !(
      this.get('isShippingAvailable') &&
      isEmpty(this.get('order.selectedDeliveryMethod'))
    );
  }),

  // Bool to check if order might be invoiced and invoicing details are needed, based on
  //  - Customer type has been set, and
  //  - Order type is book outside nordics or article
  //  - Customer type is Sahlgrenska, Company or Others, or university if book
  //  - Order type is billable
  isInvoicingAvaliable: computed('order.selectedCustomerType', 'applicationController.isBillable', function () {
    let isInvoicable = (
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri'
    );
    return this.get('applicationController.isBillable') && isInvoicable;
  }),

  // Bool to check if delivery information form should be displayed, based on
  //  - If shipping is available as an option, and
  //  - If shipping is the selected delivery option
  showDeliveryInfoForm: computed('isShippingAvailable', 'order.selectedDeliveryMethod', function() {
    return (
      this.get('isShippingAvailable') &&
      this.get('order.selectedDeliveryMethod') === 'send'
    );
  }),

  showPickupLocationOptions: computed('order.selectedDeliveryMethod', function() {
    return !this.get('isShippingAvailable') || this.get('order.selectedDeliveryMethod') === 'pickup';
  }),

  // Bool to check if delivery info text should be displayed, based on
  //  - Pickup is the selected delivery option, or shipping is unavailable as an option, and
  //  - Customer type has been set, and
  showDeliveryInfoText: computed('isShippingAvailable', 'order.selectedDeliveryMethod', function() {
    return (
      this.get('order.selectedDeliveryMethod') === 'pickup' ||
      !this.get('isShippingAvailable')
    );
  }),

  // Properties for showing/hiding and validating fields

  // Organisation
  // Bool to check whether to show organisation field or not
  showOrganisation: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri'
    );
  }),
  // Bool to check whether organisation field is mandatory or not
  isOrganisationMandatory: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri'
    );
  }),
  // Bool to check if organisation is filled in
  isOrganisationValid: computed(
    'isOrganisationMandatory',
    'applicationController.customerDetails.organisation', function() {
      return !(
        this.get('isOrganisationMandatory') &&
        isEmpty(this.get('applicationController.customerDetails.organisation'))
      );
    }
  ),

  // Name
  // Bool to check if name is filled in
  isNameMandatory: computed('order.selectedCustomerType', function() {
    return this.get('order.selectedCustomerType') !== 'koha';
  }),
  isNameDisabled: equal('order.selectedCustomerType', 'koha'),
  isNameValid: computed('isNameMandatory', 'applicationController.customerDetails.name', function() {
    return !(
      this.get('isNameMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.name'))
    );
  }),

  areAllFieldsDisabled: equal('order.selectedCustomerType', 'koha'),

  // Email
  // Bool to check whether email is mandatory or not
  isEmailMandatory: computed('order.selectedCustomerType', function() {
    return !(
      this.get('order.selectedCustomerType') === 'priv' ||
      this.get('order.selectedCustomerType') === 'koha'
    );
  }),
  isEmailDisabled: equal('order.selectedCustomerType', 'koha'),
  // Bool to check if email is filled in
  //isEmailValid: notEmpty('customerDetails.emailAddress'),
  isEmailValid: computed('isEmailMandatory', 'applicationController.customerDetails.emailAddress', function() {
    if (this.get('isEmailMandatory')) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return (re.test(this.get('applicationController.customerDetails.emailAddress')));
    } else {
      return true;
    }
  }),


  // Department
  // Bool to check whether to show department (institution) field or not
  showDepartment: equal('order.selectedCustomerType', 'univ'),
  // Bool to check whether department field is mandatory or not
  isDepartmentMandatory: equal('order.selectedCustomerType', 'univ'),
  // Bool to check if department is filled in
  isDepartmentValid: computed('isDepartmentMandatory', 'applicationController.customerDetails.department', function() {
    return !(
      this.get('isDepartmentMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.department'))
    );
  }),

  // Unit
  // Bool to check whether to show unit (avdelning) field or not
  showUnit: equal('order.selectedCustomerType', 'sahl'),
  // Bool to check whether unit field is mandatory or not
  isUnitMandatory: equal('order.selectedCustomerType', 'sahl'),
  // Bool to check if unit is filled in
  isUnitValid: computed('isUnitMandatory', 'applicationController.customerDetails.unit', function() {
    return !(
      this.get('isUnitMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.unit'))
    );
  }),

  // Address
  // Bool to check whether to show address field or not
  showAddress: equal('order.selectedCustomerType', 'priv'),

  // Bool to check whether to show postal code field or not
  showPostalCode: equal('order.selectedCustomerType', 'priv'),

  // Bool to check whether to show city field or not
  showCity: equal('order.selectedCustomerType', 'priv'),

  // Library card number
  // Bool to check whether to show library card number field or not
  showLibraryCardNumber: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'priv' ||
      this.get('order.selectedCustomerType') === 'koha'
    );
  }),
  // Bool to check whether library card number field is mandatory or not
  isLibraryCardNumberMandatory: alias('showLibraryCardNumber'),

  // Bool to check if library card number is filled in
  isLibraryCardNumberValid: computed('isLibraryCardNumberMandatory', 'applicationController.customerDetails.libraryCardNumber', function() {
    return !(
      this.get('isLibraryCardNumberMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.libraryCardNumber'))
    );
  }),
  isLibraryCardNumberDisabled: equal('order.selectedCustomerType', 'koha'),

  // xAccount
  // Bool to check whether to show xAccount field or not
  showXAccount: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' || 
      this.get('order.selectedCustomerType') === 'stud' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),
  // Bool to check whether xAccount field is mandatory or not
  isXAccountMandatory: alias('showXAccount'),
  // Bool to check if xAccount is filled in
  isXAccountValid: computed('isXAccountMandatory', 'applicationController.customerDetails.xAccount', function() {
    return !(
      this.get('isXAccountMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.xAccount'))
    );
  }),


  // Delivery Fields

  // Bool to check whether to show delivery address field
  showDeliveryAddressField: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' ||
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),
  // Bool to check whether to show delivery postal code field
  showDeliveryPostalCodeField: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' ||
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),
  // Bool to check whether to show delivery city field
  showDeliveryCityField: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' ||
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),

  // Bool to check if delivery address field are mandatory
  isDeliveryAddressFieldMandatory: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' ||
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),
  // Bool to check if delivery postal code field are mandatory
  isDeliveryPostalCodeMandatory: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),
  // Bool to check if delivery cisty field are mandatory
  isDeliveryCityMandatory: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),  

  // Bool to check if all delivery address fields are mandatory
  areDeliveryAddressFieldsValid: computed(
    'areDeliveryAddressFieldsMandatory',
    'applicationController.{deliveryDetails.address,deliveryDetails.postalCode,deliveryDetails.city}',
    function() {
      return !(
        this.get('areDeliveryAddressFieldsMandatory') && (
         isEmpty(this.get('applicationController.deliveryDetails.address')) ||
         isEmpty(this.get('applicationController.deliveryDetails.postalCode')) ||
         isEmpty(this.get('applicationController.deliveryDetails.city'))
        )
      );
    }
  ),

  // Bools to check if individual delivery fields are validating
  isDeliveryAddressValid: computed('isDeliveryAddressFieldMandatory', 'applicationController.deliveryDetails.address', function() {
    return !(
      this.get('isDeliveryAddressFieldMandatory') &&
      isEmpty(this.get('applicationController.deliveryDetails.address'))
    );
  }),

  isDeliveryPostalCodeValid: computed('isDeliveryPostalCodeMandatory', 'applicationController.deliveryDetails.postalCode', function() {
    return !(
      this.get('isDeliveryPostalCodeMandatory') &&
      isEmpty(this.get('applicationController.deliveryDetails.postalCode'))
    );
  }),

  isDeliveryCityValid: computed('isDeliveryCityMandatory', 'applicationController.deliveryDetails.city', function() {
    return !(
      this.get('isDeliveryCityMandatory') &&
      isEmpty(this.get('applicationController.deliveryDetails.city'))
    );
  }),


  // Bool to check if delivery fields are valid
  areDeliveryFieldsValid: computed(
    'order.{selectedDeliveryMethod,selectedLocation}',
    'isDeliveryAddressValid',
    'isDeliveryPostalCodeValid',
    'isDeliveryCityValid',
    function() {
      return !(
        this.get('order.selectedDeliveryMethod') === 'send' && (
          !this.get('isDeliveryAddressValid') ||
          !this.get('isDeliveryPostalCodeValid') ||
          !this.get('isDeliveryCityValid')
        ) || (
          !this.get('isShippingAvailable') ||
          this.get('order.selectedDeliveryMethod') === 'pickup'
        ) && isEmpty(this.get('order.selectedLocation'))
      );
    }
  ),

  resetDeliveryMethodFields: observer('order.selectedDeliveryMethod', function() {
    let method = this.get('order.selectedDeliveryMethod');
    if (method === 'send' || isEmpty(method)) {
      this.set('order.selectedLocation', null);
    }
    else if (method === 'pickup' || isEmpty(method)) {
      this.get('applicationController.deliveryDetails').reset();
    }
  }),

  // Invoicing fields

  // Invoicing address
  // Bool to check whether to show invoicing address fields
  showInvoicingAddressFields: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri'
    );
  }),

  areInvoicingAddressFieldsMandatory: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri'
    );
  }),

  areInvoicingAddressFieldsValid: computed(
    'areInvoicingAddressFieldsMandatory',
    'invoicingDetails.name',
    'applicationController.{invoicingDetails.company,invoicingDetails.address,invoicingDetails.postalCode,invoicingDetails.city}',
    function() {
      return !(
        this.get('areInvoicingAddressFieldsMandatory') && (
          isEmpty(this.get('applicationController.invoicingDetails.name')) ||
          isEmpty(this.get('applicationController.invoicingDetails.company')) ||
          isEmpty(this.get('applicationController.invoicingDetails.address')) ||
          isEmpty(this.get('applicationController.invoicingDetails.postalCode')) ||
          isEmpty(this.get('applicationController.invoicingDetails.city'))
        )
      );
    }
  ),
  // Bool to check if individual invoicing fields are valid
  isInvoicingCompanyValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.company', function(){
    return !(
      this.get('areInvoicingAddressFieldsMandatory') &&
      isEmpty(this.get('applicationController.invoicingDetails.company'))
    );
  }),
  isInvoicingNameValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.name', function(){
    return !(
      this.get('areInvoicingAddressFieldsMandatory') &&
      isEmpty(this.get('applicationController.invoicingDetails.name'))
    );
  }),

  isInvoicingAddressValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.address', function(){
    return !(
      this.get('areInvoicingAddressFieldsMandatory') &&
      isEmpty(this.get('applicationController.invoicingDetails.address'))
    );
  }),

  isInvoicingPostalCodeValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.postalCode', function(){
    return !(
      this.get('areInvoicingAddressFieldsMandatory') &&
      isEmpty(this.get('applicationController.invoicingDetails.postalCode'))
    );
  }),

  isInvoicingCityValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.city', function(){
    return !(
      this.get('areInvoicingAddressFieldsMandatory') &&
      isEmpty(this.get('applicationController.invoicingDetails.city'))
    );
  }),

  // Customer ID
  // Bool to check whether to show customerId field or not
  showCustomerId: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' ||
      this.get('order.selectedCustomerType') === 'sahl'
    );
  }),

  // Bool to check whether customerId is mandatory or not
  isCustomerIdMandatory: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' ||
      this.get('order.selectedCustomerType') === 'sahl'
    );
  }),

  // Bool to check whether customerId is valid or not
  isCustomerIdValid: computed('isCustomerIdMandatory', 'applicationController.invoicingDetails.customerId', function() {
    return !(
      this.get('isCustomerIdMandatory') &&
      isEmpty(this.get('applicationController.invoicingDetails.customerId'))
    );
  }),

  // Bool to check if invoicing fiels are valid
  areInvoicingFieldsValid: computed('isInvoicingAvaliable', 'areInvoicingAddressFieldsValid', 'isCustomerIdValid', function() {
    return !(
      this.get('isInvoicingAvaliable') && (
        isEmpty(this.get('areInvoicingAddressFieldsValid')) ||
        isEmpty(this.get('isCustomerIdValid'))
      )
    );
  }),

  isAnyFieldMandatory: and(
    'isNameMandatory',
    'isEmailMandatory',
    'isDepartmentMandatory',
    'isUnitMandatory',
    'isLibraryCardNumberMandatory',
    'isXAccountMandatory'
  ),

  // Bool to check if form is complete, based on all isValid-properties
  isFormComplete: and(
    'isNameValid',
    'isEmailValid',
    'isDepartmentValid',
    'isUnitValid',
    'isLibraryCardNumberValid',
    'isXAccountValid',
    'isDeliveryMethodSet',
    'areDeliveryFieldsValid',
    'areInvoicingFieldsValid'
  ),

  // method for reseting fields values when customer type is changed, so no fields are hidden with their values maintained
  resetUnusedFields: observer('order.selectedCustomerType', function() {
    switch (this.get('order.selectedCustomerType')) {
      case 'univ':
        this.set('applicationController.customerDetails.organisation', null);
        this.set('applicationController.customerDetails.unit', null);
        this.set('applicationController.customerDetails.address',  null);
        this.set('applicationController.customerDetails.postalCode', null);
        this.set('applicationController.customerDetails.city', null);
        break;
      case 'stud':
        this.set('applicationController.customerDetails.organisation', null);
        this.set('applicationController.customerDetails.department', null);
        this.set('applicationController.customerDetails.unit', null);
        this.set('applicationController.customerDetails.address', null);
        this.set('applicationController.customerDetails.postalCode', null);
        this.set('applicationController.customerDetails.city', null);
        this.set('applicationController.customerDetails.xAccount', null);
        break;
      case 'sahl':
        this.set('applicationController.customerDetails.organisation', null);
        this.set('applicationController.customerDetails.department', null);
        this.set('applicationController.customerDetails.address', null);
        this.set('applicationController.customerDetails.postalCode', null);
        this.set('applicationController.customerDetails.city', null);
        this.set('applicationController.customerDetails.libraryCardNumber', null);
        this.set('applicationController.customerDetails.xAccount', null);
        break;
      case 'priv':
        this.set('applicationController.customerDetails.organisation', null);
        this.set('applicationController.customerDetails.department', null);
        this.set('applicationController.customerDetails.unit', null);
        this.set('applicationController.customerDetails.xAccount', null);
        break;
      case 'ftag':
        this.set('applicationController.customerDetails.department', null);
        this.set('applicationController.customerDetails.unit', null);
        this.set('applicationController.customerDetails.address', null);
        this.set('applicationController.customerDetails.postalCode', null);
        this.set('applicationController.customerDetails.city', null);
        this.set('applicationController.customerDetails.libraryCardNumber', null);
        this.set('applicationController.customerDetails.xAccount', null);
        break;
      case 'ovri':
        this.set('applicationController.customerDetails.department', null);
        this.set('applicationController.customerDetails.unit', null);
        this.set('applicationController.customerDetails.address', null);
        this.set('applicationController.customerDetails.postalCode', null);
        this.set('applicationController.customerDetails.city', null);
        this.set('applicationController.customerDetails.libraryCardNumber', null);
        this.set('applicationController.customerDetails.xAccount', null);
        break;
      case 'dist':
        this.set('applicationController.customerDetails.organisation', null);
        this.set('applicationController.customerDetails.department', null);
        this.set('applicationController.customerDetails.unit', null);
        this.set('applicationController.customerDetails.xAccount', null);
        break;
    }
    // The if is probably not necessary and can be removed(?)
    if (this.get('order.selectedCustomerType') !== 'koha') {
      this.set('applicationController.deliveryDetails.address', null);
      this.set('applicationController.deliveryDetails.postalCode', null);
      this.set('applicationController.deliveryDetails.city', null);
      this.set('applicationController.deliveryDetails.box', null);
      this.set('applicationController.deliveryDetails.comment', null);

      this.set('applicationController.invoicingDetails.name', null);
      this.set('applicationController.invoicingDetails.company', null);
      this.set('applicationController.invoicingDetails.address', null);
      this.set('applicationController.invoicingDetails.postalCode', null);
      this.set('applicationController.invoicingDetails.city', null);
      this.set('applicationController.invoicingDetails.customerId', null);
    }
  }),

  actions: {
    nextStep: function() {
      let step = 'home.summary';
      this.set('order.currentStep', step);
      this.transitionToRoute(step);
    },
    back: function() {
      let step = 'home.order-details';
      this.set('order.currentStep', step);
      this.transitionToRoute(step);
    }
  }
});
