import Mixin from '@ember/object/mixin';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { storageFor } from 'ember-local-storage';

export default Mixin.create({
  applicationController: inject_controller('application'),
  i18n: inject_service(),
  session: inject_service(),

  order: storageFor('order'),

  isEnglish: computed('i18n.locale', function() {
    return this.get('i18n.locale') === 'en';
  }),

  // Bool to check if customer type is set
  isCustomerTypeSet: computed.notEmpty('order.selectedCustomerType'),


  // Observes selected customer type and resets selected delivery method to null
  resetDeliveryMethod: observer('order.selectedCustomerType', function() {
    this.set('order.selectedDeliveryMethod', null);
    this.set('applicationController.deliveryDetails.company', null);
    this.set('applicationController.deliveryDetails.name', null);
    this.set('applicationController.deliveryDetails.address', null);
    this.set('applicationController.deliveryDetails.postalCode', null);
    this.set('applicationController.deliveryDetails.city', null);
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


  // Bool to check if shipping is available as an option, based on
  //  - Customer type has been set, and
  //  - Customer type is not student or private, and
  //  - Order type is shippable
  isShippingAvailable: computed('order.selectedCustomerType', 'applicationController.isShippable', function() {
    return (
      this.get('applicationController.isShippable') &&
      !(
        this.get('order.selectedCustomerType') === 'stud' ||
        this.get('order.selectedCustomerType') === 'priv'
      )
    );
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
  isNameDisabled: computed.equal('order.selectedCustomerType', 'koha'),
  isNameValid: computed('isNameMandatory', 'applicationController.customerDetails.name', function() {
    return !(
      this.get('isNameMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.name'))
    );
  }),

  areAllFieldsDisabled: computed.equal('order.selectedCustomerType', 'koha'),

  // Email
  // Bool to check whether email is mandatory or not
  isEmailMandatory: computed('order.selectedCustomerType', function() {
    return !(
      this.get('order.selectedCustomerType') === 'priv' ||
      this.get('order.selectedCustomerType') === 'koha'
    );
  }),
  isEmailDisabled: computed.equal('order.selectedCustomerType', 'koha'),
  // Bool to check if email is filled in
  //isEmailValid: computed.notEmpty('customerDetails.emailAddress'),
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
  showDepartment: computed.equal('order.selectedCustomerType', 'univ'),
  // Bool to check whether department field is mandatory or not
  isDepartmentMandatory: computed.equal('order.selectedCustomerType', 'univ'),
  // Bool to check if department is filled in
  isDepartmentValid: computed('isDepartmentMandatory', 'applicationController.customerDetails.department', function() {
    return !(
      this.get('isDepartmentMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.department'))
    );
  }),

  // Unit
  // Bool to check whether to show unit (avdelning) field or not
  showUnit: computed.equal('order.selectedCustomerType', 'sahl'),
  // Bool to check whether unit field is mandatory or not
  isUnitMandatory: computed.equal('order.selectedCustomerType', 'sahl'),
  // Bool to check if unit is filled in
  isUnitValid: computed('isUnitMandatory', 'applicationController.customerDetails.unit', function() {
    return !(
      this.get('isUnitMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.unit'))
    );
  }),

  // Address
  // Bool to check whether to show address field or not
  showAddress: computed.equal('order.selectedCustomerType', 'priv'),

  // Bool to check whether to show postal code field or not
  showPostalCode: computed.equal('order.selectedCustomerType', 'priv'),

  // Bool to check whether to show city field or not
  showCity: computed.equal('order.selectedCustomerType', 'priv'),

  // Library card number
  // Bool to check whether to show library card number field or not
  showLibraryCardNumber: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' ||
      this.get('order.selectedCustomerType') === 'stud' ||
      this.get('order.selectedCustomerType') === 'priv' ||
      this.get('order.selectedCustomerType') === 'koha' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),
  // Bool to check whether library card number field is mandatory or not
  isLibraryCardNumberMandatory: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'univ' ||
      this.get('order.selectedCustomerType') === 'stud' ||
      this.get('order.selectedCustomerType') === 'priv' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),
  // Bool to check if library card number is filled in
  isLibraryCardNumberValid: computed('isLibraryCardNumberMandatory', 'applicationController.customerDetails.libraryCardNumber', function() {
    return !(
      this.get('isLibraryCardNumberMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.libraryCardNumber'))
    );
  }),
  isLibraryCardNumberDisabled: computed.equal('order.selectedCustomerType', 'koha'),

  // xAccount
  // Bool to check whether to show xAccount field or not
  showXAccount: computed.equal('order.selectedCustomerType', 'univ'),
  // Bool to check whether xAccount field is mandatory or not
  isXAccountMandatory: computed.equal('order.selectedCustomerType', 'univ'),
  // Bool to check if xAccount is filled in
  isXAccountValid: computed('isXAccountMandatory', 'applicationController.customerDetails.xAccount', function() {
    return !(
      this.get('isXAccountMandatory') &&
      isEmpty(this.get('applicationController.customerDetails.xAccount.length'))
    );
  }),


  // Delivery Fields


  // Delivery address
  // Bool to check whether to show delivery address fields
  showDeliveryAddressFields: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),

  // Bool to check if delivery address fields are mandatory
  areDeliveryAddressFieldsMandatory: computed('order.selectedCustomerType', function() {
    return (
      this.get('order.selectedCustomerType') === 'sahl' ||
      this.get('order.selectedCustomerType') === 'ftag' ||
      this.get('order.selectedCustomerType') === 'ovri' ||
      this.get('order.selectedCustomerType') === 'dist'
    );
  }),

  // Bool to check if all delivery address fields are mandatory
  areDeliveryAddressFieldsValid: computed('areDeliveryAddressFieldsMandatory', 'applicationController.{deliveryDetails.address,deliveryDetails.postalCode,deliveryDetails.city}', function() {
    return !(
      this.get('areDeliveryAddressFieldsMandatory') && (
       isEmpty(this.get('applicationController.deliveryDetails.address')) ||
       isEmpty(this.get('applicationController.deliveryDetails.postalCode')) ||
       isEmpty(this.get('applicationController.deliveryDetails.city'))
      )
    );
  }),


  // Bools to check if individual delivery fields are validating
  isDeliveryAddressValid: computed('areDeliveryAddressFieldsMandatory', 'applicationController.deliveryDetails.address', function() {
    return !(
      this.get('areDeliveryAddressFieldsMandatory') &&
      isEmpty(this.get('applicationController.deliveryDetails.address'))
    );
  }),

  isDeliveryPostalCodeValid: computed('areDeliveryAddressFieldsMandatory', 'applicationController.deliveryDetails.postalCode', function() {
    return !(
      this.get('areDeliveryAddressFieldsMandatory') &&
      isEmpty(this.get('applicationController.deliveryDetails.postalCode'))
    );
  }),

  isDeliveryCityValid: computed('areDeliveryAddressFieldsMandatory', 'applicationController.deliveryDetails.city', function() {
    return !(
      this.get('areDeliveryAddressFieldsMandatory') &&
      isEmpty(this.get('applicationController.deliveryDetails.city'))
    );
  }),


  // Delivery box
  // Bool to check whether to show delivery box fields
  showDeliveryBoxField: computed.equal('order.selectedCustomerType', 'univ'),

  //Bool to check if delivery box field is mandatory
  isDeliveryBoxFieldMandatory: computed.equal('order.selectedCustomerType', 'univ'),

  // Bool to check if delivery box field is valid
  isDeliveryBoxFieldValid: computed('isDeliveryBoxFieldMandatory', 'applicationController.deliveryDetails.box', function() {
    return !(
      this.get('isDeliveryBoxFieldMandatory') &&
      isEmpty(this.get('applicationController.deliveryDetails.box'))
    );
  }),

  // Bool to check if delivery fields are valid
  areDeliveryFieldsValid: computed('order.selectedDeliveryMethod', 'areDeliveryAddressFieldsValid', 'isDeliveryBoxFieldValid', function() {
    return !(
      this.get('order.selectedDeliveryMethod') === 'send' && (
        isEmpty(this.get('areDeliveryAddressFieldsValid')) ||
        isEmpty(this.get('isDeliveryBoxFieldValid'))
      )
    );
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

  isAnyFieldMandatory: computed.and(
    'isNameMandatory',
    'isEmailMandatory',
    'isDepartmentMandatory',
    'isUnitMandatory',
    'isLibraryCardNumberMandatory',
    'isXAccountMandatory'
  ),

  // Bool to check if form is complete, based on all isValid-properties
  isFormComplete: computed.and(
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
      let step = 'home.step4';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    },
    back: function() {
      let step = 'home.step2';
      this.set('applicationController.order.currentStep', step);
      this.transitionToRoute(step);
    }
  }
});
