import Ember from 'ember';

export default Ember.Mixin.create({

  needs: ['application'],

  customerDetailsBinding: 'controllers.application.customerDetails',
  deliveryDetailsBinding: 'controllers.application.deliveryDetails',
  invoicingDetailsBinding: 'controllers.application.invoicingDetails',

  selectedOrderTypeBinding: 'controllers.application.selectedOrderType',
  selectedLocationBinding: 'controllers.application.selectedLocation',
  isBillableBinding: 'controllers.application.isBillable',
  isShippableBinding: 'controllers.application.isShippable',

  customerTypesBinding: 'controllers.application.customerTypes',
  selectedCustomerTypeBinding:'controllers.application.selectedCustomerType',
  deliveryMethodsBinding: 'controllers.application.deliveryMethods',
  selectedDeliveryMethodBinding: 'controllers.application.selectedDeliveryMethod',


  optionLabelPath: Ember.computed('controllers.application.currentLocale', function() {
    switch (this.get('controllers.application.currentLocale')) {
      case 'sv':
        return 'content.title_sv';
      default:
        return 'content.title_en';
    }
  }),

  selectedLibraryNameString: Ember.computed('controllers.application.currentLocale', 'selectedLocation', function() {
    switch (this.get('controllers.application.currentLocale')) {
      case 'sv':
        return this.get('controllers.application.selectedLocation.title_sv');
      default:
        return this.get('controllers.application.selectedLocation.title_en');
    }
  }),


  // Bool to check if customer type is set
  isCustomerTypeSet: Ember.computed.notEmpty('selectedCustomerType'),


  // Observes selected customer type and resets selected delivery method to null
  resetDeliveryMethod: Ember.observer('selectedCustomerType', function() {
    this.set('selectedDeliveryMethod', null);
    this.set('deliveryDetails.company', null);
    this.set('deliveryDetails.name', null);
    this.set('deliveryDetails.address', null);
    this.set('deliveryDetails.postalCode', null);
    this.set('deliveryDetails.city', null);
  }),


  // Bool to check if delivery method is set, but only of there are multiple options available
  isDeliveryMethodSet: Ember.computed('selectedDeliveryMethod', 'isShippingAvailable', function() {
    if (this.get('isShippingAvailable')) {
      return (this.get('selectedDeliveryMethod'));
    } else {
      return true;
    }
  }),


  // Bool to check if order might be invoiced and invoicing details are needed, based on
  //  - Customer type has been set, and
  //  - Order type is book outside nordics or article
  //  - Customer type is Sahlgrenska, Company or Others, or university if book
  //  - Order type is billable
  isInvoicingAvaliable: Ember.computed('selectedOrderType', 'selectedCustomerType', 'isBillable', 'isCustomerTypeSet', function () {
    var isInvoicable = null;

    if (this.get('selectedOrderType.identifier') === 'book') {
      //isInvoicable = (this.get('selectedCustomerType.identifier') === 'univ' || this.get('selectedCustomerType.identifier') === 'sahl' || this.get('selectedCustomerType.identifier') === 'ftag' || this.get('selectedCustomerType.identifier') === 'ovri');
      isInvoicable = (this.get('selectedCustomerType.identifier') === 'sahl' || this.get('selectedCustomerType.identifier') === 'ftag' || this.get('selectedCustomerType.identifier') === 'ovri');
    } else {
      isInvoicable = (this.get('selectedCustomerType.identifier') === 'sahl' || this.get('selectedCustomerType.identifier') === 'ftag' || this.get('selectedCustomerType.identifier') === 'ovri');
    }
    return (this.get('isBillable') && isInvoicable && this.get('isCustomerTypeSet'));
  }),


  // Bool to check if shipping is available as an option, based on
  //  - Customer type has been set, and
  //  - Customer type is not student or private, and
  //  - Order type is shippable
  isShippingAvailable: Ember.computed('selectedCustomerType','isShippable', 'isCustomerTypeSet', function() {
    var studentOrPrivate = (this.get('selectedCustomerType.identifier') === 'stud' || this.get('selectedCustomerType.identifier') === 'priv');
    return (this.get('isShippable') && !studentOrPrivate && this.get('isCustomerTypeSet'));
  }),


  // Bool to check if delivery information form should be displayed, based on
  //  - If shipping is available as an option, and
  //  - If shipping is the selected delivery option
  showDeliveryInfoForm: Ember.computed('isShippingAvailable', 'selectedDeliveryMethod.identifier', function() {
    return (this.get('isShippingAvailable') && this.get('selectedDeliveryMethod.identifier') === 'send');
  }),


  // Bool to check if delivery info text should be displayed, based on
  //  - Pickup is the selected delivery option, or shipping is unavailable as an option, and
  //  - Customer type has been set, and
  showDeliveryInfoText: Ember.computed('isShippingAvailable', 'selectedDeliveryMethod.identifier', 'isCustomerTypeSet', function() {
    return ((this.get('selectedDeliveryMethod.identifier') === 'pickup') || !this.get('isShippingAvailable')) && this.get('isCustomerTypeSet');
  }),



  // Properties for showing/hiding and validating fields

  // Organisation
  // Bool to check whether to show organisation field or not
  showOrganisation: Ember.computed('selectedCustomerType', function() {
    return ((this.get('selectedCustomerType.identifier') === 'ftag') || (this.get('selectedCustomerType.identifier') === 'ovri'));
  }),
  // Bool to check whether organisation field is mandatory or not
  isOrganisationMandatory: Ember.computed('selectedCustomerType', function() {
    return ((this.get('selectedCustomerType.identifier') === 'ftag') || (this.get('selectedCustomerType.identifier') === 'ovri'));
  }),
  // Bool to check if organisation is filled in
  isOrganisationValid: Ember.computed('isOrganisationMandatory', 'customerDetails.organisation', function() {
    if (this.get('isOrganisationMandatory')) {
      return (this.get('customerDetails.organisation.length') > 1);
    } else {
      return true;
    }
  }),


  // Name
  // Bool to check if name is filled in
  isNameValid: Ember.computed.notEmpty('customerDetails.name'),

  // Email
  // Bool to check whether email is mandatory or not
  isEmailMandatory: Ember.computed('selectedCustomerType', function() {
    return (this.get('selectedCustomerType.identifier') !== 'priv');
  }),
  // Bool to check if email is filled in
  //isEmailValid: Ember.computed.notEmpty('customerDetails.emailAddress'),
  isEmailValid: Ember.computed('isEmailMandatory', 'customerDetails.emailAddress', function() {
    if (this.get('isEmailMandatory')) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return (re.test(this.get('customerDetails.emailAddress')));
    } else {
      return true;
    }
  }),


  // Department
  // Bool to check whether to show department (institution) field or not
  showDepartment: Ember.computed.equal('selectedCustomerType.identifier', 'univ'),
  // Bool to check whether department field is mandatory or not
  isDepartmentMandatory: Ember.computed.equal('selectedCustomerType.identifier', 'univ'),
  // Bool to check if department is filled in
  isDepartmentValid: Ember.computed('isDepartmentMandatory', 'customerDetails.department', function() {
    if (this.get('isDepartmentMandatory')) {
      return (this.get('customerDetails.department.length') > 1);
    } else {
      return true;
    }
  }),

  // Unit
  // Bool to check whether to show unit (avdelning) field or not
  showUnit: Ember.computed.equal('selectedCustomerType.identifier', 'sahl'),
  // Bool to check whether unit field is mandatory or not
  isUnitMandatory: Ember.computed.equal('selectedCustomerType.identifier', 'sahl'),
  // Bool to check if unit is filled in
  isUnitValid: Ember.computed('isUnitMandatory', 'customerDetails.unit', function() {
    if (this.get('isUnitMandatory')) {
      return (this.get('customerDetails.unit.length') > 1);
    } else {
      return true;
    }
  }),

  // Address
  // Bool to check whether to show address field or not
  showAddress: Ember.computed.equal('selectedCustomerType.identifier', 'priv'),

  // Bool to check whether to show postal code field or not
  showPostalCode: Ember.computed.equal('selectedCustomerType.identifier', 'priv'),

  // Bool to check whether to show city field or not
  showCity: Ember.computed.equal('selectedCustomerType.identifier', 'priv'),

  // Library card number
  // Bool to check whether to show library card number field or not
  showLibraryCardNumber: Ember.computed('selectedCustomerType', function() {
    return ((this.get('selectedCustomerType.identifier') === 'univ') ||
            (this.get('selectedCustomerType.identifier') === 'stud') ||
            (this.get('selectedCustomerType.identifier') === 'priv') ||
            (this.get('selectedCustomerType.identifier') === 'dist'));
  }),
  // Bool to check whether library card number field is mandatory or not
  isLibraryCardNumberMandatory: Ember.computed('selectedCustomerType', function() {
    return ((this.get('selectedCustomerType.identifier') === 'univ') ||
            (this.get('selectedCustomerType.identifier') === 'stud') ||
            (this.get('selectedCustomerType.identifier') === 'priv') ||
            (this.get('selectedCustomerType.identifier') === 'dist'));
  }),
  // Bool to check if library card number is filled in
  isLibraryCardNumberValid: Ember.computed('isLibraryCardNumberMandatory', 'customerDetails.libraryCardNumber', function() {
    if (this.get('isLibraryCardNumberMandatory')) {
      return (this.get('customerDetails.libraryCardNumber.length') > 1);
    } else {
      return true;
    }
  }),


  // xAccount
  // Bool to check whether to show xAccount field or not
  showXAccount: Ember.computed.equal('selectedCustomerType.identifier', 'univ'),
  // Bool to check whether xAccount field is mandatory or not
  isXAccountMandatory: Ember.computed.equal('selectedCustomerType.identifier', 'univ'),
  // Bool to check if xAccount is filled in
  isXAccountValid: Ember.computed('isXAccountMandatory', 'customerDetails.xAccount', function() {
    if (this.get('isXAccountMandatory')) {
      return (this.get('customerDetails.xAccount.length') > 1);
    } else {
      return true;
    }
  }),


  // Delivery Fields


  // Delivery address
  // Bool to check whether to show delivery address fields
  showDeliveryAddressFields: Ember.computed('selectedCustomerType.identifier', function() {
    return (this.get('selectedCustomerType.identifier') === 'sahl' || this.get('selectedCustomerType.identifier') === 'ftag' || this.get('selectedCustomerType.identifier') === 'ovri' || this.get('selectedCustomerType.identifier') === 'dist');
  }),

  // Bool to check if delivery address fields are mandatory
  areDeliveryAddressFieldsMandatory: Ember.computed('selectedDeliveryMethod.identifier', 'selectedCustomerType.identifier', function() {
    return (this.get('selectedCustomerType.identifier') === 'sahl' || this.get('selectedCustomerType.identifier') === 'ftag' || this.get('selectedCustomerType.identifier') === 'ovri' || this.get('selectedCustomerType.identifier') === 'dist');
  }),

  // Bool to check if all delivery address fields are mandatory
  areDeliveryAddressFieldsValid: Ember.computed('areDeliveryAddressFieldsMandatory', 'deliveryDetails.address', 'deliveryDetails.postalCode', 'deliveryDetails.city', function() {
    if (this.get('areDeliveryAddressFieldsMandatory')) {
      return (this.get('deliveryDetails.address.length') > 1 && this.get('deliveryDetails.postalCode.length') > 1 && this.get('deliveryDetails.city.length') > 1 );
    } else {
      return true;
    }
  }),


  // Bools to check if individual delivery fields are validating
  isDeliveryAddressValid: Ember.computed('areDeliveryAddressFieldsMandatory', 'deliveryDetails.address', function() {
    if (this.get('areDeliveryAddressFieldsMandatory')) {
      return (this.get('deliveryDetails.address.length') > 1);
    } else {
      return true;
    }
  }),

  isDeliveryPostalCodeValid: Ember.computed('areDeliveryAddressFieldsMandatory', 'deliveryDetails.postalCode', function() {
    if (this.get('areDeliveryAddressFieldsMandatory')) {
      return (this.get('deliveryDetails.postalCode.length') > 1);
    } else {
      return true;
    }
  }),

  isDeliveryCityValid: Ember.computed('areDeliveryAddressFieldsMandatory', 'deliveryDetails.city', function() {
    if (this.get('areDeliveryAddressFieldsMandatory')) {
      return (this.get('deliveryDetails.city.length') > 1 );
    } else {
      return true;
    }
  }),


  // Delivery box
  // Bool to check whether to show delivery box fields
  showDeliveryBoxField: Ember.computed.equal('selectedCustomerType.identifier', 'univ'),

  //Bool to check if delivery box field is mandatory
  isDeliveryBoxFieldMandatory: Ember.computed.equal('selectedCustomerType.identifier', 'univ'),

  // Bool to check if delivery box field is valid
  isDeliveryBoxFieldValid: Ember.computed('isDeliveryBoxFieldMandatory', 'deliveryDetails.box', function() {
    if (this.get('isDeliveryBoxFieldMandatory')) {
      return (this.get('deliveryDetails.box.length') > 1);
    } else {
      return true;
    }
  }),

  // Bool to check if delivery fields are valid
  areDeliveryFieldsValid: Ember.computed('selectedDeliveryMethod.identifier', 'areDeliveryAddressFieldsValid', 'isDeliveryBoxFieldValid', function() {
    if (this.get('selectedDeliveryMethod.identifier') === 'send') {
      return (this.get('areDeliveryAddressFieldsValid') && this.get('isDeliveryBoxFieldValid'));
    } else {
      return true;
    }
  }),


  // Invoicing fields


  // Invoicing address
  // Bool to check whether to show invoicing address fields
  showInvoicingAddressFields: Ember.computed('selectedCustomerType.identifier', function() {
    return (this.get('selectedCustomerType.identifier') === 'ftag' || this.get('selectedCustomerType.identifier') === 'ovri');
  }),

  areInvoicingAddressFieldsMandatory: Ember.computed('selectedCustomerType.identifier', function() {
    return (this.get('selectedCustomerType.identifier') === 'ftag' || this.get('selectedCustomerType.identifier') === 'ovri');
  }),

  areInvoicingAddressFieldsValid: Ember.computed('areInvoicingAddressFieldsMandatory', 'invoicingDetails.name', 'invoicingDetails.company', 'invoicingDetails.address', 'invoicingDetails.postalCode', 'invoicingDetails.city', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('invoicingDetails.name.length') > 0 && this.get('invoicingDetails.company.length') > 0 && this.get('invoicingDetails.address.length') > 0 && this.get('invoicingDetails.postalCode.length') > 0 && this.get('invoicingDetails.city.length') > 0);
    } else {
      return true;
    }
  }),

  // Bool to check if individual invoicing fields are valid
  isInvoicingCompanyValid: Ember.computed('areInvoicingAddressFieldsMandatory', 'invoicingDetails.company', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('invoicingDetails.company.length') > 0);
    } else {
      return true;
    }
  }),
  isInvoicingNameValid: Ember.computed('areInvoicingAddressFieldsMandatory', 'invoicingDetails.name', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('invoicingDetails.name.length') > 0);
    } else {
      return true;
    }
  }),

  isInvoicingAddressValid: Ember.computed('areInvoicingAddressFieldsMandatory', 'invoicingDetails.address', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('invoicingDetails.address.length') > 0);
    } else {
      return true;
    }
  }),

  isInvoicingPostalCodeValid: Ember.computed('areInvoicingAddressFieldsMandatory', 'invoicingDetails.postalCode', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('invoicingDetails.postalCode.length') > 0);
    } else {
      return true;
    }
  }),

  isInvoicingCityValid: Ember.computed('areInvoicingAddressFieldsMandatory', 'invoicingDetails.city', function(){
    if (this.get('areInvoicingAddressFieldsMandatory')) {
      return (this.get('invoicingDetails.city.length') > 0);
    } else {
      return true;
    }
  }),


  // Customer ID
  // Bool to check whether to show customerId field or not
  showCustomerId: Ember.computed('selectedCustomerType', function() {
    return ((this.get('selectedCustomerType.identifier') === 'univ') || (this.get('selectedCustomerType.identifier') === 'sahl'));
  }),

  // Bool to check whether customerId is mandatory or not
  isCustomerIdMandatory: Ember.computed('selectedCustomerType', function() {
    return ((this.get('selectedCustomerType.identifier') === 'univ') || (this.get('selectedCustomerType.identifier') === 'sahl'));
  }),

  // Bool to check whether customerId is valid or not
  isCustomerIdValid: Ember.computed('isCustomerIdMandatory', 'invoicingDetails.customerId', function() {
    if (this.get('isCustomerIdMandatory')) {
      return (this.get('invoicingDetails.customerId.length') > 1);
    } else {
      return true;
    }
  }),

  // Bool to check if invoicing fiels are valid
  areInvoicingFieldsValid: Ember.computed('isInvoicingAvaliable', 'areInvoicingAddressFieldsValid', 'isCustomerIdValid', function() {
    if (this.get('isInvoicingAvaliable')) {
      return (this.get('areInvoicingAddressFieldsValid') && this.get('isCustomerIdValid'));
    } else {
      return true;
    }
  }),


  // Bool to check if form is complete, based on all isValid-properties
  isFormComplete: Ember.computed.and('isOrganisationValid', 'isNameValid', 'isEmailValid', 'isDepartmentValid', 'isUnitValid', 'isLibraryCardNumberValid', 'isXAccountValid', 'isDeliveryMethodSet', 'areDeliveryFieldsValid', 'areInvoicingFieldsValid'),


  // method for reseting fields values when customer type is changed, so no fields are hidden with their values maintained
  resetUnusedFields: Ember.observer('selectedCustomerType', function() {
   switch (this.get('selectedCustomerType.identifier')) {
      case 'univ':
        this.set('customerDetails.organisation', null);
        this.set('customerDetails.unit', null);
        this.set('customerDetails.address', null);
        this.set('customerDetails.postalCode', null);
        this.set('customerDetails.city', null);
        break;
      case 'stud':
        this.set('customerDetails.organisation', null);
        this.set('customerDetails.department', null);
        this.set('customerDetails.unit', null);
        this.set('customerDetails.address', null);
        this.set('customerDetails.postalCode', null);
        this.set('customerDetails.city', null);
        this.set('customerDetails.xAccount', null);
        break;
      case 'sahl':
        this.set('customerDetails.organisation', null);
        this.set('customerDetails.department', null);
        this.set('customerDetails.address', null);
        this.set('customerDetails.postalCode', null);
        this.set('customerDetails.city', null);
        this.set('customerDetails.libraryCardNumber', null);
        this.set('customerDetails.xAccount', null);
        break;
      case 'priv':
        this.set('customerDetails.organisation', null);
        this.set('customerDetails.department', null);
        this.set('customerDetails.unit', null);
        this.set('customerDetails.xAccount', null);
        break;
      case 'ftag':
        this.set('customerDetails.department', null);
        this.set('customerDetails.unit', null);
        this.set('customerDetails.address', null);
        this.set('customerDetails.postalCode', null);
        this.set('customerDetails.city', null);
        this.set('customerDetails.libraryCardNumber', null);
        this.set('customerDetails.xAccount', null);
        break;
      case 'ovri':
        this.set('customerDetails.department', null);
        this.set('customerDetails.unit', null);
        this.set('customerDetails.address', null);
        this.set('customerDetails.postalCode', null);
        this.set('customerDetails.city', null);
        this.set('customerDetails.libraryCardNumber', null);
        this.set('customerDetails.xAccount', null);
        break;
      case 'dist':
        this.set('customerDetails.organisation', null);
        this.set('customerDetails.department', null);
        this.set('customerDetails.unit', null);
        this.set('customerDetails.xAccount', null);
        break;
   }

   this.set('deliveryDetails.address', null);
   this.set('deliveryDetails.postalCode', null);
   this.set('deliveryDetails.city', null);
   this.set('deliveryDetails.box', null);
   this.set('deliveryDetails.comment', null);

   this.set('invoicingDetails.name', null);
   this.set('invoicingDetails.company', null);
   this.set('invoicingDetails.address', null);
   this.set('invoicingDetails.postalCode', null);
   this.set('invoicingDetails.city', null);
   this.set('invoicingDetails.customerId', null);

  }),

});