import Mixin from '@ember/object/mixin';
import { inject as inject_controller } from '@ember/controller';
import { inject as inject_service} from '@ember/service';
import { computed } from '@ember/object';
import { observer } from '@ember/object';

export default Mixin.create({
  applicationController: inject_controller('application'),
  i18n: inject_service(),

  isEnglish: computed('i18n.locale', function() {
    switch (this.get('i18n.locale')) {
      case 'sv':
        return false;
      default:
        return true;
    }
  }),

  selectedLibraryNameString: computed('applicationController.{currentLocale,selectedLocation}', function() {
    switch (this.get('i18n.locale')) {
      case 'sv':
        return this.get('applicationController.selectedLocation.title_sv');
      default:
        return this.get('applicationController.selectedLocation.title_en');
    }
  }),


  // Bool to check if customer type is set
  isCustomerTypeSet: computed.notEmpty('applicationController.selectedCustomerType'),


  // Observes selected customer type and resets selected delivery method to null
  resetDeliveryMethod: observer('applicationController.selectedCustomerType', function() {
    this.set('applicationController.selectedDeliveryMethod', null);
    this.set('applicationController.deliveryDetails.company', null);
    this.set('applicationController.deliveryDetails.name', null);
    this.set('applicationController.deliveryDetails.address', null);
    this.set('applicationController.deliveryDetails.postalCode', null);
    this.set('applicationController.deliveryDetails.city', null);
  }),


  // Bool to check if delivery method is set, but only of there are multiple options available
  isDeliveryMethodSet: computed('applicationController.selectedDeliveryMethod','isShippingAvailable', function() {
    if (this.get('isShippingAvailable')) {
      return (this.get('applicationController.selectedDeliveryMethod'));
    } else {
      return true;
    }
  }),


  // Bool to check if order might be invoiced and invoicing details are needed, based on
  //  - Customer type has been set, and
  //  - Order type is book outside nordics or article
  //  - Customer type is Sahlgrenska, Company or Others, or university if book
  //  - Order type is billable
  isInvoicingAvaliable: computed('applicationController.{selectedOrderType,selectedCustomerType,isBillable,isCustomerTypeSet}', function () {
    var isInvoicable = null;

    if (this.get('applicationController.selectedOrderType.identifier') === 'book') {
      //isInvoicable = (this.get('selectedCustomerType.identifier') === 'univ' || this.get('selectedCustomerType.identifier') === 'sahl' || this.get('selectedCustomerType.identifier') === 'ftag' || this.get('selectedCustomerType.identifier') === 'ovri');
      isInvoicable = (this.get('applicationController.selectedCustomerType.identifier') === 'sahl' || this.get('applicationController.selectedCustomerType.identifier') === 'ftag' || this.get('applicationController.selectedCustomerType.identifier') === 'ovri');
    } else {
      isInvoicable = (this.get('applicationController.selectedCustomerType.identifier') === 'sahl' || this.get('applicationController.selectedCustomerType.identifier') === 'ftag' || this.get('applicationController.selectedCustomerType.identifier') === 'ovri');
    }
    return (this.get('applicationController.isBillable') && isInvoicable && this.get('isCustomerTypeSet'));
  }),


  // Bool to check if shipping is available as an option, based on
  //  - Customer type has been set, and
  //  - Customer type is not student or private, and
  //  - Order type is shippable
  isShippingAvailable: computed('applicationController.{selectedCustomerType,isShippable,isCustomerTypeSet}', function() {
    var studentOrPrivate = (this.get('applicationController.selectedCustomerType.identifier') === 'stud' || this.get('applicationController.selectedCustomerType.identifier') === 'priv');
    return (this.get('applicationController.isShippable') && !studentOrPrivate && this.get('isCustomerTypeSet'));
  }),


  // Bool to check if delivery information form should be displayed, based on
  //  - If shipping is available as an option, and
  //  - If shipping is the selected delivery option
  showDeliveryInfoForm: computed('isShippingAvailable','applicationController.selectedDeliveryMethod.identifier', function() {
    return (this.get('isShippingAvailable') && this.get('applicationController.selectedDeliveryMethod.identifier') === 'send');
  }),


  // Bool to check if delivery info text should be displayed, based on
  //  - Pickup is the selected delivery option, or shipping is unavailable as an option, and
  //  - Customer type has been set, and
  showDeliveryInfoText: computed('isShippingAvailable','applicationController.selectedDeliveryMethod.identifier','isCustomerTypeSet', function() {
    return ((this.get('applicationController.selectedDeliveryMethod.identifier') === 'pickup') || !this.get('isShippingAvailable')) && this.get('isCustomerTypeSet');
  }),



  // Properties for showing/hiding and validating fields

  // Organisation
  // Bool to check whether to show organisation field or not
  showOrganisation: computed('applicationController.selectedCustomerType', function() {
    return ((this.get('applicationController.selectedCustomerType.identifier') === 'ftag') || (this.get('applicationController.selectedCustomerType.identifier') === 'ovri'));
  }),
  // Bool to check whether organisation field is mandatory or not
  isOrganisationMandatory: computed('applicationController.selectedCustomerType', function() {
    return ((this.get('applicationController.selectedCustomerType.identifier') === 'ftag') || (this.get('applicationController.selectedCustomerType.identifier') === 'ovri'));
  }),
  // Bool to check if organisation is filled in
  isOrganisationValid: computed('isOrganisationMandatory', 'applicationController.customerDetails.organisation', function() {
    if (this.get('isOrganisationMandatory')) {
      return (this.get('applicationController.customerDetails.organisation.length') > 1);
    } else {
      return true;
    }
  }),


  // Name
  // Bool to check if name is filled in
  isNameValid: computed.notEmpty('applicationController.customerDetails.name'),

  // Email
  // Bool to check whether email is mandatory or not
  isEmailMandatory: computed('applicationController.selectedCustomerType', function() {
    return (this.get('applicationController.selectedCustomerType.identifier') !== 'priv');
  }),
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
  showDepartment: computed.equal('applicationController.selectedCustomerType.identifier', 'univ'),
  // Bool to check whether department field is mandatory or not
  isDepartmentMandatory: computed.equal('applicationController.selectedCustomerType.identifier', 'univ'),
  // Bool to check if department is filled in
  isDepartmentValid: computed('isDepartmentMandatory', 'applicationController.customerDetails.department', function() {
    if (this.get('isDepartmentMandatory')) {
      return (this.get('applicationController.customerDetails.department.length') > 1);
    } else {
      return true;
    }
  }),

  // Unit
  // Bool to check whether to show unit (avdelning) field or not
  showUnit: computed.equal('applicationController.selectedCustomerType.identifier', 'sahl'),
  // Bool to check whether unit field is mandatory or not
  isUnitMandatory: computed.equal('applicationController.selectedCustomerType.identifier', 'sahl'),
  // Bool to check if unit is filled in
  isUnitValid: computed('isUnitMandatory', 'applicationController.customerDetails.unit', function() {
    if (this.get('isUnitMandatory')) {
      return (this.get('applicationController.customerDetails.unit.length') > 1);
    } else {
      return true;
    }
  }),

  // Address
  // Bool to check whether to show address field or not
  showAddress: computed.equal('applicationController.selectedCustomerType.identifier', 'priv'),

  // Bool to check whether to show postal code field or not
  showPostalCode: computed.equal('applicationController.selectedCustomerType.identifier', 'priv'),

  // Bool to check whether to show city field or not
  showCity: computed.equal('applicationController.selectedCustomerType.identifier', 'priv'),

  // Library card number
  // Bool to check whether to show library card number field or not
  showLibraryCardNumber: computed('applicationController.selectedCustomerType', function() {
    return ((this.get('applicationController.selectedCustomerType.identifier') === 'univ') ||
            (this.get('applicationController.selectedCustomerType.identifier') === 'stud') ||
            (this.get('applicationController.selectedCustomerType.identifier') === 'priv') ||
            (this.get('applicationController.selectedCustomerType.identifier') === 'dist'));
  }),
  // Bool to check whether library card number field is mandatory or not
  isLibraryCardNumberMandatory: computed('applicationController.selectedCustomerType', function() {
    return ((this.get('applicationController.selectedCustomerType.identifier') === 'univ') ||
            (this.get('applicationController.selectedCustomerType.identifier') === 'stud') ||
            (this.get('applicationController.selectedCustomerType.identifier') === 'priv') ||
            (this.get('applicationController.selectedCustomerType.identifier') === 'dist'));
  }),
  // Bool to check if library card number is filled in
  isLibraryCardNumberValid: computed('isLibraryCardNumberMandatory', 'applicationController.customerDetails.libraryCardNumber', function() {
    if (this.get('isLibraryCardNumberMandatory')) {
      return (this.get('applicationController.customerDetails.libraryCardNumber.length') > 1);
    } else {
      return true;
    }
  }),


  // xAccount
  // Bool to check whether to show xAccount field or not
  showXAccount: computed.equal('applicationController.selectedCustomerType.identifier', 'univ'),
  // Bool to check whether xAccount field is mandatory or not
  isXAccountMandatory: computed.equal('applicationController.selectedCustomerType.identifier', 'univ'),
  // Bool to check if xAccount is filled in
  isXAccountValid: computed('isXAccountMandatory', 'applicationController.customerDetails.xAccount', function() {
    if (this.get('isXAccountMandatory')) {
      return (this.get('applicationController.customerDetails.xAccount.length') > 1);
    } else {
      return true;
    }
  }),


  // Delivery Fields


  // Delivery address
  // Bool to check whether to show delivery address fields
  showDeliveryAddressFields: computed('applicationController.selectedCustomerType.identifier', function() {
    return (this.get('applicationController.selectedCustomerType.identifier') === 'sahl' || this.get('applicationController.selectedCustomerType.identifier') === 'ftag' || this.get('applicationController.selectedCustomerType.identifier') === 'ovri' || this.get('applicationController.selectedCustomerType.identifier') === 'dist');
  }),

  // Bool to check if delivery address fields are mandatory
  areDeliveryAddressFieldsMandatory: computed('applicationController.{selectedDeliveryMethod.identifier,selectedCustomerType.identifier}', function() {
    return (this.get('applicationController.selectedCustomerType.identifier') === 'sahl' || this.get('applicationController.selectedCustomerType.identifier') === 'ftag' || this.get('applicationController.selectedCustomerType.identifier') === 'ovri' || this.get('applicationController.selectedCustomerType.identifier') === 'dist');
  }),

  // Bool to check if all delivery address fields are mandatory
  areDeliveryAddressFieldsValid: computed('areDeliveryAddressFieldsMandatory', 'applicationController.{deliveryDetails.address,deliveryDetails.postalCode,deliveryDetails.city}', function() {
    if (this.get('areDeliveryAddressFieldsMandatory')) {
      return (this.get('applicationController.deliveryDetails.address.length') > 1 && this.get('applicationController.deliveryDetails.postalCode.length') > 1 && this.get('applicationController.deliveryDetails.city.length') > 1 );
    } else {
      return true;
    }
  }),


  // Bools to check if individual delivery fields are validating
  isDeliveryAddressValid: computed('areDeliveryAddressFieldsMandatory', 'applicationController.deliveryDetails.address', function() {
    if (this.get('areDeliveryAddressFieldsMandatory')) {
      return (this.get('applicationController.deliveryDetails.address.length') > 1);
    } else {
      return true;
    }
  }),

  isDeliveryPostalCodeValid: computed('areDeliveryAddressFieldsMandatory', 'applicationController.deliveryDetails.postalCode', function() {
    if (this.get('areDeliveryAddressFieldsMandatory')) {
      return (this.get('applicationController.deliveryDetails.postalCode.length') > 1);
    } else {
      return true;
    }
  }),

  isDeliveryCityValid: computed('areDeliveryAddressFieldsMandatory', 'applicationController.deliveryDetails.city', function() {
    if (this.get('areDeliveryAddressFieldsMandatory')) {
      return (this.get('applicationController.deliveryDetails.city.length') > 1 );
    } else {
      return true;
    }
  }),


  // Delivery box
  // Bool to check whether to show delivery box fields
  showDeliveryBoxField: computed.equal('applicationController.selectedCustomerType.identifier', 'univ'),

  //Bool to check if delivery box field is mandatory
  isDeliveryBoxFieldMandatory: computed.equal('applicationController.selectedCustomerType.identifier', 'univ'),

  // Bool to check if delivery box field is valid
  isDeliveryBoxFieldValid: computed('isDeliveryBoxFieldMandatory', 'applicationController.deliveryDetails.box', function() {
    if (this.get('isDeliveryBoxFieldMandatory')) {
      return (this.get('applicationController.deliveryDetails.box.length') > 1);
    } else {
      return true;
    }
  }),

  // Bool to check if delivery fields are valid
  areDeliveryFieldsValid: computed('applicationController.selectedDeliveryMethod.identifier', 'areDeliveryAddressFieldsValid', 'isDeliveryBoxFieldValid', function() {
    if (this.get('applicationController.selectedDeliveryMethod.identifier') === 'send') {
      return (this.get('areDeliveryAddressFieldsValid') && this.get('isDeliveryBoxFieldValid'));
    } else {
      return true;
    }
  }),


  // Invoicing fields


  // Invoicing address
  // Bool to check whether to show invoicing address fields
  showInvoicingAddressFields: computed('applicationController.selectedCustomerType.identifier', function() {
    return (this.get('applicationController.selectedCustomerType.identifier') === 'ftag' || this.get('applicationController.selectedCustomerType.identifier') === 'ovri');
  }),

  areInvoicingAddressFieldsMandatory: computed('applicationController.selectedCustomerType.identifier', function() {
    return (this.get('applicationController.selectedCustomerType.identifier') === 'ftag' || this.get('applicationController.selectedCustomerType.identifier') === 'ovri');
  }),

  areInvoicingAddressFieldsValid: computed('areInvoicingAddressFieldsMandatory', 'invoicingDetails.name', 'applicationController.{invoicingDetails.company,invoicingDetails.address,invoicingDetails.postalCode,invoicingDetails.city}', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('applicationController.invoicingDetails.name.length') > 0 && this.get('applicationController.invoicingDetails.company.length') > 0 && this.get('applicationController.invoicingDetails.address.length') > 0 && this.get('applicationController.invoicingDetails.postalCode.length') > 0 && this.get('applicationController.invoicingDetails.city.length') > 0);
    } else {
      return true;
    }
  }),

  // Bool to check if individual invoicing fields are valid
  isInvoicingCompanyValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.company', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('applicationController.invoicingDetails.company.length') > 0);
    } else {
      return true;
    }
  }),
  isInvoicingNameValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.name', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('applicationController.invoicingDetails.name.length') > 0);
    } else {
      return true;
    }
  }),

  isInvoicingAddressValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.address', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('applicationController.invoicingDetails.address.length') > 0);
    } else {
      return true;
    }
  }),

  isInvoicingPostalCodeValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.postalCode', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('applicationController.invoicingDetails.postalCode.length') > 0);
    } else {
      return true;
    }
  }),

  isInvoicingCityValid: computed('areInvoicingAddressFieldsMandatory', 'applicationController.invoicingDetails.city', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('applicationController.invoicingDetails.city.length') > 0);
    } else {
      return true;
    }
  }),


  // Customer ID
  // Bool to check whether to show customerId field or not
  showCustomerId: computed('applicationController.selectedCustomerType', function() {
    return ((this.get('applicationController.selectedCustomerType.identifier') === 'univ') || (this.get('applicationController.selectedCustomerType.identifier') === 'sahl'));
  }),

  // Bool to check whether customerId is mandatory or not
  isCustomerIdMandatory: computed('applicationController.selectedCustomerType', function() {
    return ((this.get('applicationController.selectedCustomerType.identifier') === 'univ') || (this.get('applicationController.selectedCustomerType.identifier') === 'sahl'));
  }),

  // Bool to check whether customerId is valid or not
  isCustomerIdValid: computed('isCustomerIdMandatory', 'applicationController.invoicingDetails.customerId', function() {
    if (this.get('isCustomerIdMandatory')) {
      return (this.get('applicationController.invoicingDetails.customerId.length') > 1);
    } else {
      return true;
    }
  }),

  // Bool to check if invoicing fiels are valid
  areInvoicingFieldsValid: computed('isInvoicingAvaliable', 'areInvoicingAddressFieldsValid', 'isCustomerIdValid', function() {
    if (this.get('isInvoicingAvaliable')) {
      return (this.get('areInvoicingAddressFieldsValid') && this.get('isCustomerIdValid'));
    } else {
      return true;
    }
  }),


  // Bool to check if form is complete, based on all isValid-properties
  isFormComplete: computed.and('isOrganisationValid', 'isNameValid', 'isEmailValid', 'isDepartmentValid', 'isUnitValid', 'isLibraryCardNumberValid', 'isXAccountValid', 'isDeliveryMethodSet', 'areDeliveryFieldsValid', 'areInvoicingFieldsValid'),

  // method for reseting fields values when customer type is changed, so no fields are hidden with their values maintained
  resetUnusedFields: observer('applicationController.selectedCustomerType', function() {
   switch (this.get('applicationController.selectedCustomerType.identifier')) {
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

  }),

  actions: {
    handleSelectCustomerType: function(type) {
      this.set("applicationController.selectedCustomerType", type);
    },
    handleSelectDeliveryMethod: function(type) {
      this.set("applicationController.selectedDeliveryMethod", type);
    }
  }

});
