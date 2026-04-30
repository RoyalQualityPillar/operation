export enum apiEndPoints {
  lifeCycleTableData = 'login/lifecycleinfo',

  /*******Common *********/
  dropDownInputList = 'gm/input',
  // dropDownSdInputList = 'sd/input',
  dropDownLmsmInputList = 'lmsm/input',
  lcDropDownInputList = 'gm/lc-input',
  userProfileDropdownList = 'admin/userprofile/input',
  masterDocumet = 'dms/Documents-for-print',
  obsoletedDocumet = 'dms/obsoleted-Documents-List',
  terminatedDocumet = 'dms/Terminated-Documents-List',
  superseededDocumet = 'dms/Superseeded-Documents-List',
  additionalMasterDocumet = 'dms/printed-document-list',
  documentPrint = 'dms/document-print',
  materDocumentPrint = 'file/print-pdf',
  matsterDocumentDirectPrint = 'file/direct-print',
  masterDocumentReview = 'dms/document-revision',
  attachmentListApi = 'gm/attachment-list',
  moduleListApi = 'admin/module-input-list',
  subModuleListApi = 'admin/user-input-module-list',
  blgInput = 'rqp-blg/input',
  soloMaterialTypeList = 'solo/input',
  materialTypeList = 'imp/input',
  topicDropDownInputList = 'lmsr/topic-list',

  //clv input
  clvInput = 'clv/input',

  //pimpblog
  pimlhimage = 'imp/get-implh-images',
  pimrhimage = 'imp/get-imprh-image',
  pimrTopImage = 'imp/get-imptop-images',
  pimrvalidationCode = 'imp/buimp-master/validate-code',
  pimrVerification = 'imp/buimp-master/Verification',
  pimrScrollText = 'rqp-blg/get-scroll-text',
  pimrInputData = 'imp/input',
  pimrClientLogoList = 'rqp-blg/client-logo-list',
  pimrBlogList = 'imp/imp-master-list',
  blogRecord = 'imp/imp-fetchBgRecord',
  cartValidationCode = 'imp/curt/validate-code',

  //soloblog
  sololhimage = 'solo/get-sololh-images',
  solorhimage = 'solo/get-solorh-image',
  soloTopImage = 'solo/get-solotop-images',
  soloBlogList = 'solo/solo-master-list',
  soloBlagButtonsList = 'solo/soloMaster-list',
  soloInputData = 'solo/input',

  /*************SMP BLOG */
  smpBlogInput = 'pujari/input',
  smpVerification = 'pujari/bupu-master/Verification',
  smpVerificationCode = 'pujari/bupu-master/validate-code',
  smpleftImage = 'pujari/get-pulh-images',
  smpRightImage = 'pujari/get-purh-image',
  smpTopImage = 'pujari/get-putop-images',
  smpClientLogo = 'rqp-blg/client-logo-list',
  smpScrollText = 'rqp-blg/get-scroll-text',
  smpBlogRecord = 'pujari/pu-fetchBgRecord',
  smpBlogList = 'pujari/pu-master-list',
  smpSaveUpdate = 'pujari/bupu-master/save-update',
  smpButtonBar = 'pujari/puMaster-list',

  //puMaster-list

  //
  //   imp-master-list
  // imp-fetchBgRecord

  // buimp-master/save-update

  //
  // impMaster-list
  //

  /*******Common *********/
  /***************************TR Module **********/
  trRequestSaveUpdate = 'limspc/trRequest-save-update',
  commoncommentsUrl = 'gm/gmap-record/review-comments',
  completedCommentsUrl = 'gm/gmap-record/common-comments',
  commonButtonBarApprove = 'gm/lc-approval/save-update',
  commonButtonBarReject = 'gm/lc-reject/save-update',
  getModuleRequestNo = 'gm/gmur-module-request-no',
  /********************************Admin Module ***********************************************/
  /*******User Profile Management*********/

  allUserProfileTabledata = 'admin/userprofile/get-all',
  activeUserProfileTabledata = 'admin/userprofile/get-max-all',
  userProfileAllAuditTrail = 'admin/userprofile/get-by-code',
  userProfileUserProfileFilterData = 'admin/userprofile/serach',
  userProfileLoadUpdatePage = 'admin/userprofile/get-max-by-code',
  userProfileCreateUpdate = 'admin/userprofile/save-update',
  /*******Business Unit *********/
  allBusinessTabledata = 'gm/bu-master/get-all',
  activeBusinessTabledata = 'gm/bu-master/get-max-all',
  businessUnitAllAuditTrail = 'gm/bu-master/get-by-code-all',
  businessUnitUserProfileFilterData = 'gm/bu-master/search',
  businessUnitLoadUpdatePage = 'gm/bu-master/get-by-max-code',
  businessUnitCreateUpdate = 'gm/bu-master/save-update',
  activatedBuSearch='gm/bu-master/active-search',

  /*******Business Unit Type*********/
  allBusinessUnitTypeTabledata = 'gm/but-master/get-all',
  activeBusinessUnitTypeTabledata = 'gm/but-master/get-max-all',
  businessUnitTypeUserProfileFilterData = 'gm/but-master/search',
  businessUnitTypeCreateUpdate = 'gm/but-master/save-update',
  businessUnitTypeLoadUpdatePage = 'gm/but-master/get-by-max-code',
  businessUnitTypeAllAuditTrail = 'gm/but-master/get-by-code-all',
  /*******Department Master*********/
  allDepartmentTabledata = 'gm/pd-master/get-all',
  activeDepartmentTabledata = 'gm/pd-master/get-max-all',
  departmentUserProfileFilterData = 'gm/pd-master/search',
  departmentCreateUpdate = 'gm/pd-master/save-update',
  departmentLoadUpdatePage = 'gm/pd-master/get-by-max-code',
  departmentAllAuditTrail = 'gm/pd-master/get-by-code-all',
  /*******Designation Master*********/
  allDesignationTabledata = 'gm/ds-master/get-all',
  activeDesignationTabledata = 'gm/ds-master/get-max-all',
  designationUserProfileFilterData = 'gm/ds-master/search',
  designationCreateUpdate = 'gm/ds-master/save-update',
  designationLoadUpdatePage = 'gm/ds-master/get-by-max-code',
  designationAllAuditTrail = 'gm/ds-master/get-by-code-all',
  /*******Dngen Master*********/
  allDngenTabledata = 'gm/dngen-master/get-all',
  activeDngenTabledata = 'gm/dngen-master/get-max-all',
  dngenUserProfileFilterData = 'gm/dngen-master/search',
  dngenCreateUpdate = 'gm/dngen-master/save-update',
  dngenLoadUpdatePage = 'gm/dngen-master/get-by-max-code',
  dngenAllAuditTrail = 'gm/dngen-master/get-by-code-all',
  /*******Dosage Master*********/
  allDosageTabledata = 'gm/df-master/get-all',
  activeDosageTabledata = 'gm/df-master/get-max-all',
  dosageUserProfileFilterData = 'gm/df-master/search',
  dosageCreateUpdate = 'gm/df-master/save-update',
  dosageLoadUpdatePage = 'gm/df-master/get-by-max-code',
  dosageAllAuditTrail = 'gm/df-master/get-by-code-all',
  /*******MaterialSubType*********/
  allMaterialSubTypeTabledata = 'gm/mst-master/get-all',
  activeMaterialSubTypeTabledata = 'gm/mst-master/get-max-all',
  materialSubTypeUserProfileFilterData = 'gm/mst-master/search',
  materialSubTypeCreateUpdate = 'gm/mst-master/save-update',
  materialSubTypeLoadUpdatePage = 'gm/mst-master/get-by-max-code',
  materialSubTypeAllAuditTrail = 'gm/mst-master/get-by-code-all',
  activatedMstSearch = 'gm/mst-master/active-search',
  /*******MaterialType*********/
  allMaterialTypeTabledata = 'gm/mt-master/get-all',
  activeMaterialTypeTabledata = 'gm/mt-master/get-max-all',
  materialTypeUserProfileFilterData = 'gm/mt-master/search',
  materialTypeCreateUpdate = 'gm/mt-master/save-update',
  materialTypeLoadUpdatePage = 'gm/mt-master/get-by-max-code',
  materialTypeAllAuditTrail = 'gm/mt-master/get-by-code-all',
  /*******Module*********/
  allModuleTabledata = 'gm/md-master/get-all',
  activeModuleTabledata = 'gm/md-master/get-max-all',
  moduleUserProfileFilterData = 'gm/md-master/search',
  moduleCreateUpdate = 'gm/md-master/save-update',
  moduleLoadUpdatePage = 'gm/md-master/get-by-max-code',
  moduleAllAuditTrail = 'gm/md-master/get-by-code-all',
  /*******Organization*********/
  allOrganizationTabledata = 'gm/org-master/get-all',
  activeOrganizationTabledata = 'gm/org-master/get-max-all',
  organizationUserProfileFilterData = 'gm/org-master/search',
  organizationCreateUpdate = 'gm/org-master/save-update',
  organizationLoadUpdatePage = 'gm/org-master/get-by-max-code',
  organizationAllAuditTrail = 'gm/org-master/get-by-code-all',
  /*******Pack Master*********/
  allPackMasterTabledata = 'gm/pk-master/get-all',
  activePackMasterTabledata = 'gm/pk-master/get-max-all',
  packMasterUserProfileFilterData = 'gm/pk-master/search',
  packMasterCreateUpdate = 'gm/pk-master/save-update',
  packMasterLoadUpdatePage = 'gm/pk-master/get-by-max-code',
  packMasterAllAuditTrail = 'gm/pk-master/get-by-code-all',
  activatedPkSearch = 'gm/pk-master/active-search',
  /*******user audit*********/
  allUserAuditTabledata = 'admin/user_audit/get-all',
  activeUserAuditTabledata = 'admin/user_audit/get-max-all',
  UserAuditUserProfileFilterData = 'admin/user_audit/search',
  UserAuditCreateUpdate = 'admin/user_audit/save-update',
  UserAuditLoadUpdatePage = 'admin/user_audit/get-by-max-code',
  UserAuditAllAuditTrail = 'admin/user_audit/get-by-code-all',
  /*******password audit*********/
  allPasswordAuditTabledata = 'admin/password_audit/get-all',
  activePasswordAuditTabledata = 'admin/password_audit/get-max-all',
  passwordAuditUserProfileFilterData = 'admin/password_audit/search',
  passwordAuditCreateUpdate = 'admin/password_audit/save-update',
  passwordAuditLoadUpdatePage = 'admin/password_audit/get-by-max-code',
  passwordAuditrAllAuditTrail = 'admin/password_audit/get-by-code-all',
  /*******PaymentTerm*********/
  allPaymentTermTabledata = 'gm/payment-terms-Master/get-all',
  activePaymentTermTabledata = 'gm/payment-terms-Master/get-max-all',
  paymentTermUserProfileFilterData = 'gm/payment-terms-Master/search',
  paymentTermCreateUpdate = 'gm/payment-terms-Master/save-update',
  paymentTermLoadUpdatePage = 'gm/payment-terms-Master/get-by-max-code',
  paymentTermAllAuditTrail = 'gm/payment-terms-Master/get-by-code-all',
  activatedPaymentSearch = 'gm/payment-terms-Master/active-search',

  /*******RoleMaster*********/
  allRoleMasterTabledata = 'gm/rl-master/get-all',
  activeRoleMasterabledata = 'gm/rl-master/get-max-all',
  roleMasterUserProfileFilterData = 'gm/rl-master/search',
  roleMasterCreateUpdate = 'gm/rl-master/save-update',
  roleMasterLoadUpdatePage = 'gm/rl-master/get-by-max-code',
  roleMasterAllAuditTrail = 'gm/rl-master/get-by-code-all',
  /*******SecurityProfile*********/
  allSecurityProfileTabledata = 'gm/sp-master/get-all',
  activeSecurityProfileabledata = 'gm/sp-master/get-max-all',
  securityProfileUserProfileFilterData = 'gm/sp-master/search',
  securityProfileCreateUpdate = 'gm/sp-master/save-update',
  securityProfileLoadUpdatePage = 'gm/sp-master/get-by-max-code',
  securityProfileAllAuditTrail = 'gm/sp-master/get-by-code-all',
  /*******StandardReasonRegistartion*********/
  allStandardReasonRegistartionTabledata = 'gm/sr-master/get-all',
  activeStandardReasonRegistartionabledata = 'gm/sr-master/get-max-all',
  standardReasonRegistartionUserProfileFilterData = 'gm/sr-master/search',
  standardReasonRegistartionCreateUpdate = 'gm/sr-master/save-update',
  standardReasonRegistartionLoadUpdatePage = 'gm/sr-master/get-by-max-code',
  standardReasonRegistartionAllAuditTrail = 'gm/sr-master/get-by-code-all',
  /*******SubDepartment*********/
  allSubDepartmentTabledata = 'gm/sd-master/get-all',
  activeSubDepartmentabledata = 'gm/sd-master/get-max-all',
  subDepartmentUserProfileFilterData = 'gm/sd-master/search',
  subDepartmentCreateUpdate = 'gm/sd-master/save-update',
  subDepartmentLoadUpdatePage = 'gm/sd-master/get-by-max-code',
  subDepartmentAllAuditTrail = 'gm/sd-master/get-by-code-all',
  /*******TaxMaster*********/
  allTaxMasterTabledata = 'gm/tx-master/get-all',
  activeTaxMasterTabledata = 'gm/tx-master/get-max-all',
  taxMasterUserProfileFilterData = 'gm/tx-master/search',
  taxMasterCreateUpdate = 'gm/tx-master/save-update',
  taxMasterLoadUpdatePage = 'gm/tx-master/get-by-max-code',
  taxMasterAllAuditTrail = 'gm/tx-master/get-by-code-all',
  /*******UtMaster*********/
  allUtMasterTabledata = 'gm/ut-master/get-all',
  activeUtMasterTabledata = 'gm/ut-master/get-max-all',
  utMasterUserProfileFilterData = 'gm/ut-master/search',
  utMasterCreateUpdate = 'gm/ut-master/save-update',
  utMasterLoadUpdatePage = 'gm/ut-master/get-by-max-code',
  utMasterAllAuditTrail = 'gm/ut-master/get-by-code-all',
  activatedUtSearch='gm/ut-master/active-search',

  /*******VendorList*********/
  allVendorListTabledata = 'gm/vendor-master/get-all',
  activeVendorListTabledata = 'gm/vendor-master/get-max-all',
  vendorListUserProfileFilterData = 'gm/bu-master/search',
  vendorListCreateUpdate = 'gm/bu-master/save-update',
  vendorListLoadUpdatePage = 'gm/bu-master/get-by-max-code',
  vendorListAllAuditTrail = 'gm/bu-master/get-by-code-all',
  /*******ModuleType*********/
  allModuleTypeTabledata = 'gm/module_type/get-all',
  activeModuleTypeTabledata = 'gm/module_type/get-max-all',
  moduleTypeUserProfileFilterData = 'gm/module_type/search',
  moduleTypeCreateUpdate = 'gm/module_type/save-update',
  moduleTypeLoadUpdatePage = 'gm/module_type/get-by-max-code',
  moduleTypeAllAuditTrail = 'gm/module_type/get-by-code-all',

  /*******OrganizationunitRequirement*********/
  allOrganizationunitRequirementTabledata = 'gm/ous-master/get-all',
  activeOrganizationunitRequirementTabledata = 'gm/ous-master/get-max-all',
  organizationUnitRequirementUserProfileFilterData = 'gm/ous-master/search',
  organizationUnitRequirementCreateUpdate = 'gm/ous-master/save-update',
  organizationUnitRequirementLoadUpdatePage = 'gm/ous-master/get-by-max-code',
  organizationUnitRequirementAllAuditTrail = 'gm/ous-master/get-by-code-all',
  /************* LMSQB **********************/
  mcMasterList = 'lmsm/qbmc-master-list',
  fbMasterList = 'lmsm/qbfb-master-list',
  tfMasterList = 'lmsm/qbtf-master-list',
  qbeMasterList = 'lmsm/qbe-master-list',
  pbMasterModuleRequestNo = 'lmsm/qb-master-module-request-no',
  qbmcSaveUpdate = 'lmsm/qbmc_master/save-update',

  /********************************Fi Module ***********************************************/
  /***Gl Master***/
  allGlMasterTabledata = 'fi/gl-master/get-all',
  activeGlMasterTabledata = 'fi/gl-master/get-max-all',
  GlMasterUserProfileFilterData = 'fi/gl-master/search',
  GlMasterCreateUpdate = 'fi/gl-master/save-update',
  GlMasterLoadUpdatePage = 'fi/gl-master/get-by-max-code',
  GlMasterAllAuditTrail = 'fi/gl-master/get-by-code-all',
  /***AG Master***/
  allAgMasterTabledata = 'fi/ag-master/get-all',
  activeAgMasterTabledata = 'fi/ag-master/get-max-all',
  agMasterUserProfileFilterData = 'fi/ag-master/search',
  agMasterCreateUpdate = 'fi/ag-master/save-update',
  agMasterLoadUpdatePage = 'fi/ag-master/get-by-max-code',
  agMasterAllAuditTrail = 'fi/ag-master/get-by-code-all',
  /***ASG Master***/
  allAsgMasterTabledata = 'fi/asg-master/get-all',
  activeAsgMasterTabledata = 'fi/asg-master/get-max-all',
  asgMasterUserProfileFilterData = 'fi/asg-master/search',
  asgMasterCreateUpdate = 'fi/asg-master/save-update',
  asgMasterLoadUpdatePage = 'fi/asg-master/get-by-max-code',
  asgMasterAllAuditTrail = 'fi/asg-master/get-by-code-all',
  /***CA Master***/
  allCaMasterTabledata = 'fi/ca-master/get-all',
  activeCaMasterTabledata = 'fi/ca-master/get-max-all',
  caMasterUserProfileFilterData = 'fi/ca-master/search',
  caMasterCreateUpdate = 'fi/ca-master/save-update',
  caMasterLoadUpdatePage = 'fi/ca-master/get-by-max-code',
  caMasterAllAuditTrail = 'fi/ca-master/get-by-code-all',

  /***Item Master***/
  allItemMasterTabledata = 'fi/item-codes/get-all',
  activeItemMasterTabledata = 'fi/item-codes/get-max-all',
  ItemMasterUserProfileFilterData = 'fi/item-codes/search',
  ItemMasterCreateUpdate = 'fi/item-codes/save-update',
  ItemMasterLoadUpdatePage = 'fi/item-codes/get-by-max-code',
  ItemMasterAllAuditTrail = 'fi/item-codes/get-by-code-all',

  /***PaymentProcess***/
  allPaymentProcessTabledata = 'fi/pp-record/get-all',
  activePaymentProcessTabledata = 'fi/pp-record/get-max-all',
  paymentProcessUserProfileFilterData = 'fi/pp-record/search',
  paymentProcessCreateUpdate = 'fi/pp-record/save-update',
  paymentProcessLoadUpdatePage = 'fi/pp-record/get-by-max-code',
  paymentProcessAllAuditTrail = 'fi/pp-record/get-by-code-all',
  paymentProcessRecordList = 'fi/get-pp-record-list',
  /*******PiMaster*****/
  allPiMasterTabledata = 'fi/pi-master/get-all',
  activePiMasterTabledata = 'fi/pi-master/get-max-all',
  PiMasterUserProfileFilterData = 'fi/pi-master/search',
  PiMasterCreateUpdate = 'fi/pi-master/save-update',
  PiMasterLoadUpdatePage = 'fi/pi-master/get-by-max-code',
  PiMasterAllAuditTrail = 'fi/pi-master/get-by-code-all',
  /*****PkMaster******/
  allPkMasterTabledata = 'fi/pk-master/get-all',
  activePkMasterTabledata = 'fi/pk-master/get-max-all',
  PkMasterUserProfileFilterData = 'fi/pk-master/search',
  PkMasterCreateUpdate = 'fi/pk-master/save-update',
  PkMasterLoadUpdatePage = 'fi/pk-master/get-by-max-code',
  PkMasterAllAuditTrail = 'fi/pk-master/get-by-code-all',
  /*********PmMaster******/
  allPmMasterTabledata = 'fi/pm-master/get-all',
  activePmMasterTabledata = 'fi/pm-master/get-max-all',
  PmMasterUserProfileFilterData = 'fi/pm-master/search',
  PmMasterCreateUpdate = 'fi/pm-master/save-update',
  PmMasterLoadUpdatePage = 'fi/pm-master/get-by-max-code',
  PmMasterAllAuditTrail = 'fi/pm-master/get-by-code-all',
  /*********PtMaster******/
  allPtMasterTabledata = 'fi/pt-master/get-all',
  activePtMasterTabledata = 'fi/pt-master/get-max-all',
  PtMasterUserProfileFilterData = 'fi/pt-master/search',
  PtMasterCreateUpdate = 'fi/pt-master/save-update',
  PtMasterLoadUpdatePage = 'fi/pt-master/get-by-max-code',
  PtMasterAllAuditTrail = 'fi/pt-master/get-by-code-all',
  /********************************Sd Module ***********************************************/
  /*********PriceMaster******/
  allPriceMasterTabledata = 'sd/price-master/get-all',
  activePriceMasterTabledata = 'sd/price-master/get-max-all',
  PriceMasterUserProfileFilterData = 'sd/price-master/search',
  PriceMasterCreateUpdate = 'sd/price-master/save-update',
  PriceMasterLoadUpdatePage = 'sd/price-master/get-by-max-code',
  PriceMasterAllAuditTrail = 'sd/price-master/get-by-code-all',

  /*********PricetypeMaster******/
  allPriceTypeMasterTabledata = 'sd/pricetype-master/get-all',
  activePriceTypeMasterTabledata = 'sd/pricetype-master/get-max-all',
  PriceTypeMasterUserProfileFilterData = 'sd/pricetype-master/search',
  PriceTypeMasterCreateUpdate = 'sd/pricetype-master/save-update',
  PriceTypeMasterLoadUpdatePage = 'sd/pricetype-master/get-by-max-code',
  PriceTypeMasterAllAuditTrail = 'sd/pricetype-master/get-by-code-all',

  /*********SaleProductMaster******/
  allSaleProductMasterTabledata = 'sd/sp-master/get-all',
  activeSaleProductMasterTabledata = 'sd/sp-master/get-max-all',
  SaleProductMasterUserProfileFilterData = 'sd/sp-master/search',
  SaleProductMasterCreateUpdate = 'sd/sp-master/save-update',
  SaleProductMasterLoadUpdatePage = 'sd/sp-master/get-by-max-code',
  SaleProductMasterAllAuditTrail = 'sd/sp-master/get-by-code-all',

  /*********StockLedgerMaster******/
  allStockLedgerMasterTabledata = 'sd/sl-master/get-all',
  activeStockLedgerMasterTabledata = 'sd/sl-master/get-max-all',
  StockLedgerMasterUserProfileFilterData = 'sd/sl-master/search',
  StockLedgerMasterCreateUpdate = 'sd/sl-master/save-update',
  StockLedgerMasterLoadUpdatePage = 'sd/sl-master/get-by-max-code',
  StockLedgerMasterAllAuditTrail = 'sd/sl-master/get-by-code-all',

  /*******supply chain management *********/
  allScmTabledata = 'sd/vendor-master/get-all',
  activeScmTabledata = 'sd/vendor-master/get-max-all',
  scmAllAuditTrail = 'sd/vendor-master/get-by-code-all',
  scmUserProfileFilterData = 'sd/vendor-master/search',
  scmLoadUpdatePage = 'sd/vendor-master/get-by-max-code',
  scmCreateUpdate = 'sd/vendor-master/save-update',
  
  /********************MmModule**********/

  /*********MaterialMaster******/
  allMaterialMasterTabledata = 'pmm/pmm_master/get-all',
  activeMaterialMasterTabledata = 'pmm/pmm_master/get-max-all',
  MaterialMasterUserProfileFilterData = 'pmm/pmm_master/search',
  MaterialMasterCreateUpdate = 'pmm/pmm_master/save-update',
  MaterialMasterLoadUpdatePage = 'pmm/pmm_master/get-by-max-code',
  MaterialMasterAllAuditTrail = 'pmm/pmm_master/get-by-code-all',

  /*********MVMaster******/
  allMVMasterTabledata = 'pmm/mv_master/get-all',
  activeMVMasterTabledata = 'pmm/mv_master/get-max-all',
  MVMasterUserProfileFilterData = 'pmm/mv_master/search',
  MVMasterCreateUpdate = 'pmm/mv_master/save-update',
  MVMasterLoadUpdatePage = 'pmm/mv_master/get-by-max-code',
  MVMasterAllAuditTrail = 'pmm/mv_master/get-by-code-all',

  /*********priceMaster******/
  allpriceMasterTabledata = 'pmm/pprice_master/get-all',
  activepriceMasterTabledata = 'pmm/pprice_master/get-max-all',
  priceMasterUserProfileFilterData = 'pmm/pprice_master/search',
  priceMasterCreateUpdate = 'pmm/pprice_master/save-update',
  priceMasterLoadUpdatePage = 'pmm/pprice_master/get-by-max-code',
  priceMasterAllAuditTrail = 'pmm/pprice_master/get-by-code-all',

  /*********pricetypeMaster******/
  allpricetypeMasterTabledata = 'pmm/ppricetype_master/get-all',
  activepricetypeMasterTabledata = 'pmm/ppricetype_master/get-max-all',
  pricetypeMasterUserProfileFilterData = 'pmm/ppricetype_master/search',
  pricetypeMasterCreateUpdate = 'pmm/ppricetype_master/save-update',
  pricetypeMasterLoadUpdatePage = 'pmm/ppricetype_master/get-by-max-code',
  pricetypeMasterAllAuditTrail = 'pmm/ppricetype_master/get-by-code-all',

  /*********Stockledger******/
  allStockledgerTabledata = 'pmm/psl_master/get-all',
  activeStockledgerTabledata = 'pmm/psl_master/get-max-all',
  StockledgerUserProfileFilterData = 'pmm/psl_master/search',
  StockledgerCreateUpdate = 'pmm/psl_master/save-update',
  StockledgerLoadUpdatePage = 'pmm/psl_master/get-by-max-code',
  StockledgerAllAuditTrail = 'pmm/psl_master/get-by-code-all',

   /*******supply chain management *********/
  allScmmTabledata = 'pmm/vendor-master/get-all',
  activeScmmTabledata = 'pmm/vendor-master/get-max-all',
  scmmAllAuditTrail = 'pmm/vendor-master/get-by-code-all',
  scmmUserProfileFilterData = 'pmm/vendor-master/search',
  scmmLoadUpdatePage = 'pmm/vendor-master/get-by-max-code',
  scmmCreateUpdate = 'pmm/vendor-master/save-update',

  /***************QMSMaster****************/

  /*********ActionType******/
  allActionTypeTabledata = 'qms/action-type/get-all',
  activeActionTypeTabledata = 'qms/action-type/get-max-all',
  ActionTypeUserProfileFilterData = 'qms/action-type/search',
  ActionTypeCreateUpdate = 'qms/action-type/save-update',
  ActionTypeLoadUpdatePage = 'qms/action-type/get-by-max-code',
  ActionTypeAllAuditTrail = 'qms/action-type/get-by-code-all',

  /*********CtMaster******/
  allCtMasterTabledata = 'qms/ct-master/get-all',
  activeCtMasterTabledata = 'qms/ct-master/get-max-all',
  CtMasterUserProfileFilterData = 'qms/ct-master/search',
  CtMasterCreateUpdate = 'qms/ct-master/save-update',
  CtMasterLoadUpdatePage = 'qms/ct-master/get-by-max-code',
  CtMasterAllAuditTrail = 'qms/ct-master/get-by-code-all',

  /*********IcsMaster******/
  allIcsMasterTabledata = 'qms/ics-master/get-all',
  activeIcsMasterTabledata = 'qms/ics-master/get-max-all',
  IcsMasterUserProfileFilterData = 'qms/ics-master/search',
  IcsMasterCreateUpdate = 'qms/ics-master/save-update',
  IcsMasterLoadUpdatePage = 'qms/ics-master/get-by-max-code',
  IcsMasterAllAuditTrail = 'qms/ics-master/get-by-code-all',

  /*********ItemCategory******/
  allItemCategoryTabledata = 'qms/item-category/get-all',
  activeItemCategoryTabledata = 'qms/item-category/get-max-all',
  ItemCategoryUserProfileFilterData = 'qms/item-category/search',
  ItemCategoryCreateUpdate = 'qms/item-category/save-update',
  ItemCategoryLoadUpdatePage = 'qms/item-category/get-by-max-code',
  ItemCategoryAllAuditTrail = 'qms/item-category/get-by-code-all',

  /*********PsMaster******/
  allPsMasterTabledata = 'qms/ps-master/get-all',
  activePsMasterTabledata = 'qms/ps-master/get-max-all',
  PsMasterUserProfileFilterData = 'qms/ps-master/search',
  PsMasterCreateUpdate = 'qms/ps-master/save-update',
  PsMasterLoadUpdatePage = 'qms/ps-master/get-by-max-code',
  PsMasterAllAuditTrail = 'qms/ps-master/get-by-code-all',

  /*********RctMaster******/
  allRctMasterTabledata = 'qms/rct-master/get-all',
  activeRctMasterTabledata = 'qms/rct-master/get-max-all',
  RctMasterUserProfileFilterData = 'qms/rct-master/search',
  RctMasterrCreateUpdate = 'qms/rct-master/save-update',
  RctMasterLoadUpdatePage = 'qms/rct-master/get-by-max-code',
  RctMasterAllAuditTrail = 'qms/rct-master/get-by-code-all',

  /***************LmsMaster***************/

  /*********CrMaster******/
  allCrMasterTabledata = 'lmsm/cr_master/get-all',
  activeCrMasterTabledata = 'lmsm/cr_master/get-max-all',
  CrMasterUserProfileFilterData = 'lmsm/cr_master/search',
  CrMasterrCreateUpdate = 'lmsm/cr_master/save-update',
  // CrMasterLoadUpdatePage = 'lmsm/cr_master/get-by-max-code',
  CrMasterLoadUpdatePage = 'lmsm/course_status_update',
  CrMasterAllAuditTrail = 'lmsm/cr_master/get-by-code-all',

  /*********CourseMaster******/
  allCourseMasterTabledata = 'lmsm/course_master/get-all',
  activeCourseMasterTabledata = 'lmsm/course_master/get-max-all',
  CourseMasterUserProfileFilterData = 'lmsm/course_master/search',
  CourseMasterrCreateUpdate = 'lmsm/course_master/save-update',
  CourseMasterLoadUpdatePage = 'lmsm/course_master/get-by-max-code',
  CourseMasterAllAuditTrail = 'lmsm/course_master/get-by-code-all',

  /*********ctMaster******/
  allctMasterTabledata = 'lmsm/ct_master/get-all',
  activectMasterTabledata = 'lmsm/ct_master/get-max-all',
  ctMasterUserProfileFilterData = 'lmsm/ct_master/search',
  ctMasterrCreateUpdate = 'lmsm/ct_master/save-update',
  ctMasterLoadUpdatePage = 'lmsm/ct_master/get-by-max-code',
  ctMasterAllAuditTrail = 'lmsm/ct_master/get-by-code-all',

  /*********CtdptMaster******/
  allCtdptMasterTabledata = 'lmsm/ctdpt_master/get-all',
  activeCtdptMasterTabledata = 'lmsm/ctdpt_master/get-max-all',
  CtdptMasterUserProfileFilterData = 'lmsm/ctdpt_master/search',
  CtdptMasterrCreateUpdate = 'lmsm/ctdpt_master/save-update',
  CtdptMasterLoadUpdatePage = 'lmsm/ctdpt_master/get-by-max-code',
  CtdptMasterAllAuditTrail = 'lmsm/ctdpt_master/get-by-code-all',

  /*********grpdptMaster******/
  allgrpdptMasterTabledata = 'lmsm/grpdpt_master/get-all',
  activegrpdptMasterTabledata = 'lmsm/grpdpt_master/get-max-all',
  grpdptMasterUserProfileFilterData = 'lmsm/grpdpt_master/search',
  grpdptMasterrCreateUpdate = 'lmsm/grpdpt_master/save-update',
  grpdptMasterLoadUpdatePage = 'lmsm/grpdpt_master/get-by-max-code',
  grpdptMasterAllAuditTrail = 'lmsm/grpdpt_master/get-by-code-all',

  /*********gtptMaster******/
  allgtpttMasterTabledata = 'lmsm/gtpt_master/get-all',
  activegtptMasterTabledata = 'lmsm/gtpt_master/get-max-all',
  gtptMasterUserProfileFilterData = 'lmsm/gtpt_master/search',
  gtptMasterrCreateUpdate = 'lmsm/gtpt_master/save-update',
  gtptMasterLoadUpdatePage = 'lmsm/gtpt_master/get-by-max-code',
  gtptMasterAllAuditTrail = 'lmsm/gtpt_master/get-by-code-all',

  /*********jobrMaster******/
  alljobrMasterTabledata = 'lmsm/jobr_master/get-all',
  activejobrtMasterTabledata = 'lmsm/jobr_master/get-max-all',
  jobrMasterUserProfileFilterData = 'lmsm/jobr_master/search',
  jobrMasterrCreateUpdate = 'lmsm/jobrt_master/save-update',
  jobrtMasterLoadUpdatePage = 'lmsm/jobr_master/get-by-max-code',
  jobrMasterAllAuditTrail = 'lmsm/jobr_master/get-by-code-all',

  /*********QbMaster******/
  allQbtMasterTabledata = 'lmsm/qb_master/get-all',
  activeQbMasterTabledata = 'lmsm/qb_master/get-max-all',
  QbMasterUserProfileFilterData = 'lmsm/qb_master/search',
  QbMasterrCreateUpdate = 'lmsm/qb_master/save-update',
  QbMasterLoadUpdatePage = 'lmsm/qb_master/get-by-max-code',
  QbMasterAllAuditTrail = 'lmsm/qb_master/get-by-code-all',

  /*********QbeMaster******/
  allQbeMasterTabledata = 'lmsm/qbe_master/get-all',
  activeQbeMasterTabledata = 'lmsm/qbe_master/get-max-all',
  QbeMasterUserProfileFilterData = 'lmsm/qbe_master/search',
  QbeMasterrCreateUpdate = 'lmsm/qbe_master/save-update',
  QbeMasterLoadUpdatePage = 'lmsm/qbe_master/get-by-max-code',
  QbeMasterAllAuditTrail = 'lmsm/qbe_master/get-by-code-all',

  /*********QbfbMaster******/
  allQbfbMasterTabledata = 'lmsm/qbfb_master/get-all',
  activeQbfbMasterTabledata = 'lmsm/qbfb_master/get-max-all',
  QbfbMasterUserProfileFilterData = 'lmsm/qbfb_master/search',
  QbfbMasterrCreateUpdate = 'lmsm/qbfb_master/save-update',
  QbfbMasterLoadUpdatePage = 'lmsm/qbfb_master/get-by-max-code',
  QbfbMasterAllAuditTrail = 'lmsm/qbfb_master/get-by-code-all',

  /*********QbmcMaster******/
  allQbmcMasterTabledata = 'lmsm/qbmc_master/get-all',
  activeQbmcMasterTabledata = 'lmsm/qbmc_master/get-max-all',
  QbmcMasterUserProfileFilterData = 'lmsm/qbmc_master/search',
  QbmcMasterrCreateUpdate = 'lmsm/qbmc_master/save-update',
  QbmcMasterLoadUpdatePage = 'lmsm/qbmc_master/get-by-max-code',
  QbmcMasterAllAuditTrail = 'lmsm/qbmc_mastermaster/get-by-code-all',

  /*********QbtfMaster******/
  allQbtfMasterTabledata = 'lmsm/qbtf_master/get-all',
  activeQbtfMasterTabledata = 'lmsm/qbtf_master/get-max-all',
  QbtfMasterUserProfileFilterData = 'lmsm/qbtf_master/search',
  QbtfMasterrCreateUpdate = 'lmsm/qbtf_master/save-update',
  QbtfMasterLoadUpdatePage = 'lmsm/qbtf_master/get-by-max-code',
  QbtfMasterAllAuditTrail = 'lmsm/qbtf_master/get-by-code-all',

  /*********SatisfactionMaster******/
  allSatisfactionMasterTabledata = 'lmsm/satisfaction_master/get-all',
  activeSatisfactionMasterTabledata = 'lmsm/satisfaction_master/get-max-all',
  SatisfactionMasterUserProfileFilterData = 'lmsm/satisfaction_master/search',
  SatisfactionMasterrCreateUpdate = 'lmsm/satisfaction_master/save-update',
  SatisfactionMasterLoadUpdatePage = 'lmsm/satisfaction_master/get-by-max-code',
  SatisfactionMasterAllAuditTrail = 'lmsm/satisfaction_master/get-by-code-all',

  /*********SgsdMaster******/
  allSgsdMasterTabledata = 'lmsm/sgsd_master/get-all',
  activeSgsdMasterTabledata = 'lmsm/sgsd_master/get-max-all',
  SgsdMasterUserProfileFilterData = 'lmsm/sgsd_master/search',
  SgsdMasterrCreateUpdate = 'lmsm/sgsd_master/save-update',
  SgsdMasterLoadUpdatePage = 'lmsm/sgsd_master/get-by-max-code',
  SgsdMasterAllAuditTrail = 'lmsm/sgsd_master/get-by-code-all',

  /*********SqMaster******/
  allSqMasterTabledata = 'lmsm/sq_master/get-all',
  activeSqMasterTabledata = 'lmsm/sq_master/get-max-all',
  SqMasterUserProfileFilterData = 'lmsm/sq_master/search',
  SqMasterrCreateUpdate = 'lmsm/sq_master/save-update',
  SqMasterLoadUpdatePage = 'lmsm/sq_master/get-by-max-code',
  SqMasterAllAuditTrail = 'lmsm/sq_master/get-by-code-all',

  /*********SsdMaster******/
  allSsdMasterTabledata = 'lmsm/ssdpt_master/get-all',
  activeSsdMasterTabledata = 'lmsm/ssdpt_master/get-max-all',
  SsdMasterUserProfileFilterData = 'lmsm/ssdpt_master/search',
  SsdMasterrCreateUpdate = 'lmsm/ssdpt_master/save-update',
  SsdMasterLoadUpdatePage = 'lmsm/ssdpt_master/get-by-max-code',
  SsdMasterAllAuditTrail = 'lmsm/ssdpt_master/get-by-code-all',

  /*********TeqMaster******/
  allTeqMasterTabledata = 'lmsm/teq_master/get-all',
  activeTeqMasterTabledata = 'lmsm/teq_master/get-max-all',
  TeqMasterUserProfileFilterData = 'lmsm/teq_master/search',
  TeqMasterrCreateUpdate = 'lmsm/teq_master/save-update',
  TeqMasterLoadUpdatePage = 'lmsm/teq_master/get-by-max-code',
  TeqMasterAllAuditTrail = 'lmsm/teq_master/get-by-code-all',

  /*********TesMaster******/
  allTesMasterTabledata = 'lmsm/tes_master/get-all',
  activeTesMasterTabledata = 'lmsm/tes_master/get-max-all',
  TesMasterUserProfileFilterData = 'lmsm/tes_master/search',
  TesMasterrCreateUpdate = 'lmsm/tes_master/save-update',
  TesMasterLoadUpdatePage = 'lmsm/tes_master/get-by-max-code',
  TesMasterAllAuditTrail = 'lmsm/tes_master/get-by-code-all',

  /*********TetMaster******/
  allTetMasterTabledata = 'lmsm/tet_master/get-all',
  activeTetMasterTabledata = 'lmsm/tet_master/get-max-all',
  TetMasterUserProfileFilterData = 'lmsm/tet_master/search',
  TetMasterrCreateUpdate = 'lmsm/tet_master/save-update',
  TetMasterLoadUpdatePage = 'lmsm/tet_master/get-by-max-code',
  TetMasterAllAuditTrail = 'lmsm/tet_master/get-by-code-all',

  /*********TopicMaster******/
  allTopicMasterTabledata = 'lmsm/topic_master/get-all',
  activeTopicMasterTabledata = 'lmsm/topic_master/get-max-all',
  TopicMasterUserProfileFilterData = 'lmsm/topic_master/search',
  TopicMasterrCreateUpdate = 'lmsm/topic_master/save-update',
  // TopicMasterLoadUpdatePage = 'lmsm/topic_master/get-by-max-code',
  TopicMasterLoadUpdatePage = 'lmsm/topic_status_update',
  TopicMasterAllAuditTrail = 'lmsm/topic_master/get-by-code-all',

  /*********TrainerMaster******/
  allTrainerMasterTabledata = 'lmsm/trainer_master/get-all',
  activeTrainerMasterTabledata = 'lmsm/trainer_master/get-max-all',
  TrainerMasterUserProfileFilterData = 'lmsm/trainer_masterr/search',
  TrainerMasterrCreateUpdate = 'lmsm/trainer_master/save-update',
  TrainerMasterLoadUpdatePage = 'lmsm/trainer_master/get-by-max-code',
  TrainerMasterAllAuditTrail = 'lmsm/trainer_master/get-by-code-all',

  /*********UasgMaster******/
  allUasgMasterTabledata = 'lmsm/uasg_master/get-all',
  activeUasgMasterTabledata = 'lmsm/uasg_master/get-max-all',
  UasgMasterUserProfileFilterData = 'lmsm/uasg_master/search',
  UasgMasterrCreateUpdate = 'lmsm/uasg_master/save-update',
  UasgMasterLoadUpdatePage = 'lmsm/uasg_master/get-by-max-code',
  UasgMasterAllAuditTrail = 'lmsm/uasg_master/get-by-code-all',

  /*********VenueMaster******/
  allVenueMasterTabledata = 'lmsm/venue_master/get-all',
  activeVenueMasterTabledata = 'lmsm/venue_master/get-max-all',
  VenueMasterUserProfileFilterData = 'lmsm/venue_master/search',
  VenueMasterrCreateUpdate = 'lmsm/venue_master/save-update',
  VenueMasterLoadUpdatePage = 'lmsm/venue_master/get-by-max-code',
  VenueMasterAllAuditTrail = 'lmsm/venue_master/get-by-code-all',
  /*********UsageGroupMaster******/
  allUsageGroupMasterTabledata = 'lmsm/ug_master/get-all',
  activeUsageGroupMasterTabledata = 'lmsm/ug_master/get-max-all',
  usageGroupMasterUserProfileFilterData = 'lmsm/ug_master/search',
  usageGroupMasterrCreateUpdate = 'lmsm/ug-user/save-update',
  // usageGroupMasterLoadUpdatePage = 'lmsm/ug_master/get-by-max-code',
  usageGroupMasterLoadUpdatePage = 'lmsm/user_group_status_Updtae',
  usageGroupMasterAllAuditTrail = 'lmsm/ug_master/get-by-code-all',

  /***********HRModule*******/

  /*********AllwnceMaster******/
  allAllwnceMasterTabledata = 'hr/allwnce-master/get-all',
  activeAllwnceMasterTabledata = 'hr/allwnce-master/get-max-all',
  AllwnceMasterUserProfileFilterData = 'hr/allwnce-master/search',
  AllwnceMasterrCreateUpdate = 'hr/allwnce-master/save-update',
  AllwnceMasterLoadUpdatePage = 'hr/allwnce-master/get-by-max-code',
  AllwnceMasterAllAuditTrail = 'hr/allwnce-master/get-by-code-all',

  /*********AtinMaster******/
  allAtinMasterTabledata = 'hr/atin-master/get-all',
  activeAtinMasterTabledata = 'hr/atin-master/get-max-all',
  AtinMasterUserProfileFilterData = 'hr/atin-master/search',
  AtinMasterrCreateUpdate = 'hr/atin-master/save-update',
  AtinMasterLoadUpdatePage = 'hr/atin-master/get-by-max-code',
  AtinMasterAllAuditTrail = 'hr/atin-master/get-by-code-all',

  /*********CpMaster******/
  allCpMasterTabledata = 'hr/cp-master/get-all',
  activeCpMasterTabledata = 'hr/cp-master/get-max-all',
  CpMasterUserProfileFilterData = 'hr/cp-master/search',
  CpMasterrCreateUpdate = 'hr/cp-master/save-update',
  CpMasterLoadUpdatePage = 'hr/cp-master/get-by-max-code',
  CpMasterAllAuditTrail = 'hr/cp-master/get-by-code-all',

  /*********DatatypesMaster******/
  allDatatypesMasterTabledata = 'hr/dayTypes-master/get-all',
  activeDatatypesMasterTabledata = 'hr/dayTypes-master/get-max-all',
  DatatypesMasterUserProfileFilterData = 'hr/dayTypes-master/search',
  DatatypesMasterrCreateUpdate = 'hr/dayTypes-master/save-update',
  DatatypesMasterLoadUpdatePage = 'hr/dayTypes-master/get-by-max-code',
  DatatypesMasterAllAuditTrail = 'hr/dayTypes-master/get-by-code-all',

  /*********DeductionMaster******/
  allDeductionsMasterTabledata = 'hr/deduction-master/get-all',
  activeDeductionMasterTabledata = 'hr/deduction-master/get-max-all',
  DeductionMasterUserProfileFilterData = 'hr/deduction-master/search',
  DeductionMasterrCreateUpdate = 'hr/deduction-master/save-update',
  DeductionMasterLoadUpdatePage = 'hr/deduction-master/get-by-max-code',
  DeductionMasterAllAuditTrail = 'hr/deduction-master/get-by-code-all',

  /*********EmpgrpMaster******/
  allEmpgrpMasterTabledata = 'hr/empgrp-master/get-all',
  activeEmpgrpMasterTabledata = 'hr/empgrp-master/get-max-all',
  EmpgrpMasterUserProfileFilterData = 'hr/empgrp-master/search',
  EmpgrpMasterrCreateUpdate = 'hr/empgrp-master/save-update',
  EmpgrpMasterLoadUpdatePage = 'hr/empgrp-master/get-by-max-code',
  EmpgrpMasterAllAuditTrail = 'hr/empgrp-master/get-by-code-all',

  /*********jpMaster******/
  allJpMasterTabledata = 'hr/jp-master/get-all',
  activeJpMasterTabledata = 'hr/jp-master/get-max-all',
  JpMasterUserProfileFilterData = 'hr/jp-master/search',
  JpMasterrCreateUpdate = 'hr/jp-master/save-update',
  JpMasterLoadUpdatePage = 'hr/jp-master/get-by-max-code',
  JpMasterAllAuditTrail = 'hr/jp-master/get-by-code-all',

  /*********latedaysMaster******/
  alllatedaysMasterTabledata = 'hr/latedays-master/get-all',
  activelatedaysMasterTabledata = 'hr/latedays-master/get-max-all',
  latedaysMasterUserProfileFilterData = 'hr/latedays-master/search',
  latedaysMasterrCreateUpdate = 'hr/latedays-master/save-update',
  latedaysMasterLoadUpdatePage = 'hr/latedays-master/get-by-max-code',
  latedaysMasterAllAuditTrail = 'hr/latedays-master/get-by-code-all',

  /*********leaveMaster******/
  leaveMasterTabledata = 'hr/leave-master/get-all',
  leavelatedaysMasterTabledata = 'hr/leave-master/get-max-all',
  leaveMasterUserProfileFilterData = 'hr/leave-master/search',
  leaveMasterrCreateUpdate = 'hr/leave-master/save-update',
  leaveMasterLoadUpdatePage = 'hr/leave-master/get-by-max-code',
  leaveMasterAllAuditTrail = 'hr/leave-master/get-by-code-all',

  /*********PaygrMaster******/
  allPaygrMasterTabledata = 'hr/paygr-master/get-all',
  activePaygrMasterTabledata = 'hr/paygr-master/get-max-all',
  PaygrMasterUserProfileFilterData = 'hr/paygr-master/search',
  PaygrMasterrCreateUpdate = 'hr/paygr-master/save-update',
  PaygrMasterLoadUpdatePage = 'hr/paygr-master/get-by-max-code',
  PaygrMasterAllAuditTrail = 'hr/paygr-master/get-by-code-all',

  /*********PubhldyMaster******/
  allPubhldyMasterTabledata = 'hr/pubhldy_master/get-all',
  activePubhldyMasterTabledata = 'hr/pubhldy-master/get-max-all',
  allMasterUserProfileFilterData = 'hr/pubhldy-master/search',
  PubhldyMasterrCreateUpdate = 'hr/pubhldy-master/save-update',
  PubhldyMasterLoadUpdatePage = 'hr/pubhldy-master/get-by-max-code',
  PubhldyMasterAllAuditTrail = 'hr/pubhldy-master/get-by-code-all',

  /*********SQMaster******/
  allSQsMasterTabledata = 'hr/sq-master/get-all',
  activelSQMasterTabledata = 'hr/sq-master/get-max-all',
  SQMasterUserProfileFilterData = 'hr/sq-master/search',
  SQMasterrCreateUpdate = 'hr/sq-master/save-update',
  SQMasterLoadUpdatePage = 'hr/sq-master/get-by-max-code',
  SQMasterAllAuditTrail = 'hr/sq-master/get-by-code-all',

  /*********taxMaster******/
  alltaxMasterTabledata = 'hr/tax-master/get-all',
  activetaxMasterTabledata = 'hr/tax-master/get-max-all',
  taxxMasterUserProfileFilterData = 'hr/tax-master/search',
  taxMasterrCreateUpdate = 'hr/tax-master/save-update',
  taxxMasterLoadUpdatePage = 'hr/tax-master/get-by-max-code',
  taxxMasterAllAuditTrail = 'hr/tax-master/get-by-code-all',

  /*********WstMaster******/
  allWstMasterTabledata = 'hr/wst-master/get-all',
  activeWstMasterTabledata = 'hr/wst-master/get-max-all',
  WstMasterUserProfileFilterData = 'hr/wst-master/search',
  WstMasterrCreateUpdate = 'hr/wst-master/save-update',
  WstMasterLoadUpdatePage = 'hr/wst-master/get-by-max-code',
  WstMasterAllAuditTrail = 'hr/wst-master/get-by-code-all',

  /***************BLGModule***************/

  /*********BlgDocument******/
  allBlgDocumentTabledata = 'rqp-blg/doct-master/get-all',
  activeBlgDocumentTabledata = 'rqp-blg/doct-master/get-max-all',
  BlgDocumentUserProfileFilterData = 'rqp-blg/doct-master/search',
  BlgDocumentCreateUpdate = 'rqp-blg/doct-master/save-update',
  BlgDocumentLoadUpdatePage = 'rqp-blg/doct-master/get-by-max-code',
  BlgDocumentAllAuditTrail = 'rqp-blg/doct-master/get-by-code-all',

  /*********BlgSection******/
  allBlgSectionTabledata = 'rqp-blg/sec-master/get-all',
  activeBlgSectionTabledata = 'rqp-blg/sec-master/get-max-all',
  BlgSectionUserProfileFilterData = 'rqp-blg/sec-master/search',
  BlgSectionCreateUpdate = 'rqp-blg/sec-master/save-update',
  BlgSectionLoadUpdatePage = 'rqp-blg/sec-master/get-by-max-code',
  BlgSectionAllAuditTrail = 'rqp-blg/sec-master/get-by-code-all',

  /*********BlgImage******/
  allBlgImageTabledata = 'rqp-blg/bgi-master/get-all',
  activeBlgImageTabledata = 'rqp-blg/bgi-master/get-max-all',
  BlgImageUserProfileFilterData = 'rqp-blg/bgi-master/search',
  BlgImageCreateUpdate = 'rqp-blg/bgi-master/save-update',
  BlgImageLoadUpdatePage = 'rqp-blg/bgi-master/get-by-max-code',
  BlgImageAllAuditTrail = 'rqp-blg/bgi-master/get-by-code-all',

  /*********BlgScroll******/
  allBlgScrollTabledata = 'rqp-blg/bgs-master/get-all',
  activeBlgScrollTabledata = 'rqp-blg/bgs-master/get-max-all',
  BlgScrollUserProfileFilterData = 'rqp-blg/bgs-master/search',
  BlgScrollCreateUpdate = 'rqp-blg/bgs-master/save-update',
  BlgScrollLoadUpdatePage = 'rqp-blg/bgs-master/get-by-max-code',
  BlgScrollAllAuditTrail = 'rqp-blg/bgs-master/get-by-code-all',

  /*********BlgRecord******/
  allBlgRecordTabledata = 'rqp-blg/bg-record/get-all',
  activeBlgRecordTabledata = 'rqp-blg/bg-record/get-max-all',
  BlgRecordUserProfileFilterData = 'rqp-blg/bg-record/search',
  BlgRecordCreateUpdate = 'rqp-blg/bg-record/save-update',
  BlgRecordLoadUpdatePage = 'rqp-blg/bg-record/get-by-max-code',
  BlgRecordAllAuditTrail = 'rqp-blg/bg-record/get-by-code-all',

  /*********BlgUserprofile******/
  allBlgUserprofileTabledata = 'rqp-blg/bup-master/get-all',
  activeBlgUserprofileTabledata = 'rqp-blg/bup-master/get-max-all',
  BlgUserprofileUserProfileFilterData = 'rqp-blg/bup-master/search',
  BlgUserprofileCreateUpdate = 'rqp-blg/bup-master/save-update',
  BlgUserprofileLoadUpdatePage = 'rqp-blg/bup-master/get-by-max-code',
  BlgUserprofileAllAuditTrail = 'rqp-blg/bup-master/get-by-code-all',

  /*********BlgUseracess******/
  allBlgUseracessTabledata = 'rqp-blg/uai-master/get-all',
  activeBlgUseracessTabledata = 'rqp-blg/uai-master/get-max-all',
  BlgUseracessUserProfileFilterData = 'rqp-blg/uai-master/search',
  BlgUseracessCreateUpdate = 'rqp-blg/uai-master/save-update',
  BlgUseracessLoadUpdatePage = 'rqp-blg/uai-master/get-by-max-code',
  BlgUseracessAllAuditTrail = 'rqp-blg/uai-master/get-by-code-all',

  /********************************Lims-cm Module ***********************************************/
  /***CCI Master***/
  allCciMasterTabledata = 'limscm/cci-master/get-all',
  activeCciMasterTabledata = 'limscm/cci-master/get-max-all',
  CciMasterUserProfileFilterData = 'limscm/cci-master/search',
  CciMasterCreateUpdate = 'limscm/cci-master/save-update',
  CciMasterLoadUpdatePage = 'limscm/cci-master/get-by-max-code',
  CciMasterAllAuditTrail = 'limscm/cci-master/get-by-code-all',

  /***Cl-assign Master***/
  allClMasterTabledata = 'limscm/cl-assign/get-all',
  activeClMasterTabledata = 'limscm/cl-assign/get-max-all',
  ClMasterUserProfileFilterData = 'limscm/cl-assign/get-max-all',
  ClMasterCreateUpdate = 'limscm/cl-assign/save-update',
  ClMasterLoadUpdatePage = 'limscm/cl-assign/get-by-max-code',
  ClMasterAllAuditTrail = 'limscm/cl-assign/get-by-code-all',

  /***Column Master***/
  allColumnMasterTabledata = 'limscm/cm-master/get-all',
  activeColumnMasterTabledata = 'limscm/cm-master/get-max-all',
  ColumnMasterUserProfileFilterData = 'limscm/cm-master/search',
  ColumnMasterCreateUpdate = 'limscm/cm-master/save-update',
  ColumnMasterLoadUpdatePage = 'limscm/cm-master/get-by-max-code',
  ColumnMasterAllAuditTrail = 'limscm/cm-master/get-by-code-all',

  /***************DMSModule***************/

  /*******DmProduct*********/
  allDmproductTabledata = 'dms/dmproduct-master/get-all',
  activeDmproductTabledata = 'dms/dmproduct-master/get-max-all',
  dmproductUserProfileFilterData = 'dms/dmproduct-master/search',
  dmproductCreateUpdate = 'dms/dmproduct-master/save-update',
  dmproductLoadUpdatePage = 'dms/dmproduct-master/get-by-max-code',
  dmproductAllAuditTrail = 'dms/dmproduct-master/get-by-code-all',

  /*******DocumentRequirement*********/
  allDocumentRequirementTabledata = 'dms/docr-master/get-all',
  activeDocumentRequirementTabledata = 'dms/docr-master/get-max-all',
  documentRequirementUserProfileFilterData = 'dms/docr-master/search',
  documentRequirementCreateUpdate = 'dms/docr-master/save-update',
  documentRequirementLoadUpdatePage = 'dms/docr-master/get-by-max-code',
  documentRequirementAllAuditTrail = 'dms/docr-master/get-by-code-all',

  /*******Blog API  ******************************/
  getBlogTopImage = 'rqp-blg/get-top-images',
  getRightPanelImage = 'rqp-blg/get-rh-image',
  getLeftPanelImage = 'rqp-blg/get-lh-images',
  getScrollText = 'rqp-blg/get-scroll-text',
  getBlogRecord = 'rqp-blg/fetchBgRecord',
  blogInput = 'rqp-blg/input',
  blgRecordList = 'rqp-blg/blg-record-list',
  blgButtonBarList = 'rqp-blg/department-list',
  clientLogoList = 'rqp-blg/client-logo-list',
  blgAuthentication = 'rqp-blg/bup-master/Verification',
  // blgRegistration = 'rqp-blg/bup-master/save-update',
  blgRegistration = 'imp/buimp-master/save-update',
  otpVerification = 'rqp-blg/bup-master/validate-code',
  blgDetail = 'rqp-blg/fetchBgRecord',
  blagButtonsList = 'imp/impMaster-list',

  /************Print Type*************/
  allPrintTypeMasterTabledata = 'dms/pty-master/get-all',
  activePrintTypeMasterTabledata = 'dms/pty-master/get-max-all',
  PrintTypeMasterUserProfileFilterData = 'dms/pty-master/search',
  PrintTypeMasterCreateUpdate = 'dms/pty-master/save-update',
  PrintTypeMasterLoadUpdatePage = 'dms/pty-master/get-by-max-code',
  PrintTypeMasterAllAuditTrail = 'dms/pty-master/get-by-code-all',

  /***************************************Rmp module******************************************** */

  /************Enquire Master*************/
  allEnquireMasterTabledata = 'imp/enqu-master/get-all',
  activeEnquireMasterTabledata = 'imp/enqu-master/get-max-all',
  EnquireMasterUserProfileFilterData = 'imp/enqu-master/search',
  EnquireMasterCreateUpdate = 'imp/enqu-master/save-update',
  EnquireMasterLoadUpdatePage = 'imp/enqu-master/get-by-max-code',
  EnquireMasterAllAuditTrail = 'imp/enqu-master/get-by-code-all',

  /************ Impurity Master*************/
  allMaterialTabledata = 'imp/imp-master/get-all',
  activeMaterialTabledata = 'imp/imp-master/get-max-all',
  materialUserProfileFilterData = 'imp/imp-master/search',
  materialCreateUpdate = 'imp/imp-master/save-update',
  materialLoadUpdatePage = 'imp/imp-master/get-by-max-code',
  materialAllAuditTrail = 'imp/imp-master/get-by-code-all',

  /************ material Master*************/
  allAPIMasterTabledata = 'imp/mt-master/get-all',
  activeAPIMasterTabledata = 'imp/mt-master/get-max-all',
  apiMasterUserProfileFilterData = 'imp/mt-master/search',
  apiMasterCreateUpdate = 'imp/mt-master/save-update',
  apiMasterLoadUpdatePage = 'imp/mt-master/get-by-max-code',
  apiMasterAllAuditTrail = 'imp/mt-master/get-by-code-all',

  /************ material type Master*************/
  allmaterialtypeMasterTabledata = 'imp/mtty-master/get-all',
  activematerialtypeMasterTabledata = 'imp/mtty-master/get-max-all',
  materialtypeMasterUserProfileFilterData = 'imp/mtty-master/search',
  materialtypeMasterCreateUpdate = 'imp/mtty-master/save-update',
  materialtypeMasterLoadUpdatePage = 'imp/mtty-master/get-by-max-code',
  materialtypeMasterAllAuditTrail = 'imp/mtty-master/get-by-code-all',

  /************ packenquiry  Master*************/
  allPackenquiryMasterTabledata = 'imp/packenq-master/get-all',
  activePackenquiryMasterTabledata = 'imp/packenq_master/get-max-all',
  PackenquiryMasterUserProfileFilterData = 'imp/packenq-master/search',
  PackenquiryMasterCreateUpdate = 'imp/packenq-master/save-update',
  PackenquiryMasterLoadUpdatePage = 'imp/packenq-master/get-by-max-code',
  PackenquiryMasterAllAuditTrail = 'imp/packenq-master/get-by-code-all',

  /************ Pack Master*************/
  allpackMasterTabledata = 'imp/pack-master/get-all',
  activepackMasterTabledata = 'imp/pack-master/get-max-all',
  PackMasterUserProfileFilterData = 'imp/pack-master/search',
  PackMasterCreateUpdate = 'imp/pack-master/save-update',
  PackMasterLoadUpdatePage = 'imp/pack-master/get-by-max-code',
  PackMasterAllAuditTrail = 'imp/pack-master/get-by-code-all',

  /************ CurtSum Master*************/
  allCurtSumTabledata = 'imp/curtsum_record/get-max-all',
  activeCurtSumTabledata = 'imp/curtsum_record/get-max-all',
  curtsumUserProfileFilterData = 'imp/curtsum_record/search',
  curtsumCreateUpdate = 'imp/curtsum_record/save-update',
  curtsumLoadUpdatePage = 'imp/curtsum_record/get-by-max-code',
  curtsumAllAuditTrail = 'imp/curtsum_record/get-by-code-all',

  /************ Curt Master*************/
  allCurtTabledata = 'imp/curt_record/get-all',
  activeCurtTabledata = 'imp/curt_record/get-max-all',
  curtUserProfileFilterData = 'imp/impbut-master/search',
  curtCreateUpdate = 'imp/curt_record/save-update',
  curtLoadUpdatePage = 'imp/curt_record/get-by-max-code',
  curtAllAuditTrail = 'imp/curt_record/get-by-code-all',

  /************ IMPBut Master*************/
  allIMPButTabledata = 'imp/impbut-master/get-all',
  activeIMPButTabledata = 'imp/impbut-master/get-max-all',
  impbutUserProfileFilterData = 'imp/impbut-master/search',
  impbutCreateUpdate = 'imp/impbut-master/save-update',
  impbutLoadUpdatePage = 'imp/impbut-master/get-by-max-code',
  impbutAllAuditTrail = 'imp/impbut-master/get-by-code-all',

  /************ IMPBu Master*************/
  allIMPBuabledata = 'imp/impbu-master/get-all',
  activeIMPBuTabledata = 'imp/impbu-master/get-max-all',
  impbuUserProfileFilterData = 'imp/impbu-master/search',
  impbuCreateUpdate = 'imp/impbu-master/save-update',
  impbuLoadUpdatePage = 'imp/impbu-master/get-by-max-code',
  impbuAllAuditTrail = 'imp/impbu-master/get-by-code-all',

  /************ Vendor Master*************/
  allVendorMasterTabledata = 'imp/impven-master/get-all',
  activeVendorkMasterTabledata = 'imp/impven-master/get-max-all',
  VendorMasterUserProfileFilterData = 'imp/impven-master/search',
  VendorMasterCreateUpdate = 'imp/impven-master/save-update',
  VendorMasterLoadUpdatePage = 'imp/impven-master/get-by-max-code',
  VendorMasterAllAuditTrail = 'imp/impven-master/get-by-code-all',

  /************ user acess information*************/
  alluseracessinformationTabledata = 'imp/uaiimp-master/get-by-max-code',
  activeuseracessinformationTabledata = 'imp/uaiimp-master/get-max-all',
  useracessinformationUserProfileFilterData = 'imp/uaiimp-master/search',
  useracessinformationCreateUpdate = 'imp/uaiimp-master/save-update',
  useracessinformationLoadUpdatePage = 'imp/uaiimp-master/get-by-max-code',
  useracessinformationAllAuditTrail = 'imp/uaiimp-master/get-by-code-all',

  /***************************************SPM(Pujari) module******************************************** */

  /************SPM-Enquire Master*************/
  allSPMEnquireMasterTabledata = 'pujari/enpu-master/get-all',
  activeSPMEnquireMasterTabledata = 'pujari/enqu-master/get-max-all',
  sPMEnquireMasterUserProfileFilterData = 'pujari/enqu-master/search',
  sPMEnquireMasterCreateUpdate = 'pujari/enpu-master/save-update',
  sPMEnquireMasterLoadUpdatePage = 'pujari/enpu-master/get-by-max-code',
  sPMEnquireMasterAllAuditTrail = 'pujari/enpu-master/get-by-code-all',

  /************ SPM-Impurity Master*************/
  allSPMImpurityTabledata = 'pujari/pu-master/get-all',
  activeSPMImpurityTabledata = 'pujari/pu-master/get-max-all',
  sPMImpurityUserProfileFilterData = 'pujari/pu-master/search',
  sPMImpurityCreateUpdate = 'pujari/pu-master/save-update',
  sPMImpurityLoadUpdatePage = 'pujari/pu-master/get-by-max-code',
  sPMImpurityAllAuditTrail = 'pujari/pu-master/get-by-code-all',

  /************ SPM-material Master*************/
  allSPMAPIMasterTabledata = 'pujari/mtpu-master/get-all',
  activeSPMAPIMasterTabledata = 'pujari/mtpu-master/get-max-all',
  sPMapiMasterUserProfileFilterData = 'pujari/mtpu-master/search',
  sPMapiMasterCreateUpdate = 'pujari/mtpu-master/save-update',
  sPMapiMasterLoadUpdatePage = 'pujari/mtpu-master/get-by-max-code',
  sPMapiMasterAllAuditTrail = 'pujari/mtpu-master/get-by-code-all',

  /************ SPM-material type Master*************/
  allSPMMaterialtypeMasterTabledata = 'pujari/mttypu-master/get-all',
  activeSPMMaterialtypeMasterTabledata = 'pujari/mttypu-master/get-max-all',
  sPMMaterialtypeMasterUserProfileFilterData = 'pujari/mttypu-master/search',
  sPMMaterialtypeMasterCreateUpdate = 'pujari/mttypu-master/save-update',
  sPMMaterialtypeMasterLoadUpdatePage = 'pujari/mttypu-master/get-by-max-code',
  sPMMaterialtypeMasterAllAuditTrail = 'pujari/mttypu-master/get-by-code-all',

  /************ SPM-packenquiry  Master*************/
  allSPMPackenquiryMasterTabledata = 'pujari/packenpu-master/get-by-max-code',
  activeSPMPackenquiryMasterTabledata = 'pujari/packenpu_master/get-max-all',
  sPMPackenquiryMasterUserProfileFilterData = 'pujari/packenpu-master/search',
  sPMPackenquiryMasterCreateUpdate = 'pujari/packenpu-master/save-update',
  sPMPackenquiryMasterLoadUpdatePage = 'pujari/packenpu-master/get-by-max-code',
  sPMPackenquiryMasterAllAuditTrail = 'pujari/packenpu-master/get-by-code-all',

  /************ SPM-Pack Master*************/
  allSPMPackMasterTabledata = 'pujari/packpu-master/get-all',
  activeSPMPackMasterTabledata = 'pujari/packpu-master/get-max-all',
  sPMPackMasterUserProfileFilterData = 'pujari/packpu-master/search',
  sPMPackMasterCreateUpdate = 'pujari/packpu-master/save-update',
  sPMPackMasterLoadUpdatePage = 'pujari/packpu-master/get-by-max-code',
  sPMPackMasterAllAuditTrail = 'pujari/packpu-master/get-by-code-all',

  /***************************************Freelance management ******************************************** */

  /************SEnquire Master*************/
  allSEnquireMasterTabledata = 'solo/senqu-master/get-all',
  activeSEnquireMasterTabledata = 'solo/senqu-master/get-max-all',
  SEnquireMasterUserProfileFilterData = 'solo/senqu-master/search',
  SEnquireMasterCreateUpdate = 'solo/senqu-master/save-update',
  SEnquireMasterLoadUpdatePage = 'solo/senqu-master/get-by-max-code',
  SEnquireMasterAllAuditTrail = 'solo/senqu-master/get-by-code-all',

  // /************ Impurity Master*************/
  // allMaterialTabledata = 'imp/imp-master/get-all',
  // activeMaterialTabledata = 'imp/imp-master/get-max-all',
  // materialUserProfileFilterData = 'imp/imp-master/search',
  // materialCreateUpdate = 'imp/imp-master/save-update',
  // materialLoadUpdatePage = 'imp/imp-master/get-by-max-code',
  // materialAllAuditTrail = 'imp/imp-master/get-by-code-all',

  /************ smaterial Master*************/
  allsmaterialMasterTabledata = 'solo/smt-master/get-all',
  activesmaterialMasterTabledata = 'solo/smt-master/get-max-all',
  smaterialMasterUserProfileFilterData = 'solo/smt-master/search',
  smaterialMasterCreateUpdate = 'solo/smt-master/save-update',
  smaterialMasterLoadUpdatePage = 'solo/smt-master/get-by-max-code',
  smaterialMasterAllAuditTrail = 'solo/smt-master/get-by-code-all',

  /************ smaterial type Master*************/
  allsmaterialtypeMasterTabledata = 'solo/smtty-master/get-all',
  activesmaterialtypeMasterTabledata = 'solo/smtty-master/get-max-all',
  smaterialtypeMasterUserProfileFilterData = 'solo/smtty-master/search',
  smaterialtypeMasterCreateUpdate = 'solo/smtty-master/save-update',
  smaterialtypeMasterLoadUpdatePage = 'solo/smtty-master/get-by-max-code',
  smaterialtypeMasterAllAuditTrail = 'solo/smtty-master/get-by-code-all',

  /************ spackenquiry  Master*************/
  allsPackenquiryMasterTabledata = 'solo/spackenq-master/get-all',
  activesPackenquiryMasterTabledata = 'solo/spackenq_master/get-max-all',
  SPackenquiryMasterUserProfileFilterData = 'solo/spackenq-master/search',
  SPackenquiryMasterCreateUpdate = 'solo/spackenq-master/save-update',
  SPackenquiryMasterLoadUpdatePage = 'solo/spackenq-master/get-by-max-code',
  SPackenquiryMasterAllAuditTrail = 'solo/spackenq-master/get-by-code-all',

  /************ SPack Master*************/
  allSpackMasterTabledata = 'solo/spack-master/get-all',
  activeSpackMasterTabledata = 'solo/spack-master/get-max-all',
  SPackMasterUserProfileFilterData = 'solo/spack-master/search ',
  SPackMasterCreateUpdate = 'solo/spack-master/save-update',
  SPackMasterLoadUpdatePage = 'solo/spack-master/get-by-max-code',
  SPackMasterAllAuditTrail = 'solo/spack-master/get-by-code-all',

  /************ SCurtSum Master*************/
  allSCurtSumTabledata = 'solo/scurtsum_record/get-all',
  activeSCurtSumTabledata = 'solo/scurtsum_record/get-max-all',
  ScurtsumUserProfileFilterData = 'solo/scurtsum_record/search',
  ScurtsumCreateUpdate = 'solo/scurtsum_record/save-update',
  ScurtsumLoadUpdatePage = 'solo/scurtsum_record/get-by-max-code',
  ScurtsumAllAuditTrail = 'solo/scurtsum_record/get-by-code-all',

  /************ SCurt Master*************/
  allSCurtTabledata = 'solo/scurt_record/get-all',
  activeSCurtTabledata = 'solo/scurt_record/get-max-all',
  ScurtUserProfileFilterData = 'solo/scurt_record/search',
  ScurtCreateUpdate = 'solo/scurt_record/save-update',
  ScurtLoadUpdatePage = 'solo/scurt_record/get-by-max-code',
  ScurtAllAuditTrail = 'solo/scurtsum_record/get-by-code-all',

  /************ SIMPBut Master*************/
  allSIMPButTabledata = 'solo/solobut-master/get-all',
  activeSIMPButTabledata = 'solo/solobut-master/get-max-all',
  SimpbutUserProfileFilterData = 'solo/solobut-master/search',
  SimpbutCreateUpdate = 'solo/solobut-master/save-update',
  SimpbutLoadUpdatePage = 'solo/solobut-master/get-by-max-code',
  SimpbutAllAuditTrail = 'solo/solobut-master/get-by-code-all',

  /************ SIMPBu Master*************/
  allSIMPBuabledata = 'solo/solobu-master/get-all',
  activeSIMPBuTabledata = 'solo/solobu-master/get-max-all',
  SimpbuUserProfileFilterData = 'solo/solobu-master/search',
  SimpbuCreateUpdate = 'solo/solobu-master/save-update',
  SimpbuLoadUpdatePage = 'solo/solobu-master/get-by-max-code',
  SimpbuAllAuditTrail = 'solo/solobu-master/get-by-code-all',

  /************ SVendor Master*************/
  allSVendorMasterTabledata = 'solo/soloven-master/get-all',
  activeSVendorkMasterTabledata = 'solo/soloven-master/get-max-all',
  SVendorMasterUserProfileFilterData = 'solo/soloven-master/search',
  SVendorMasterCreateUpdate = 'solo/soloven-master/save-update',
  SVendorMasterLoadUpdatePage = 'solo/soloven-master/get-by-max-code',
  SVendorMasterAllAuditTrail = 'solo/soloven-master/get-by-code-all',

  /************ Suser acess information*************/
  allSuseracessinformationTabledata = 'solo/uaisolo-master/get-all',
  activeSuseracessinformationTabledata = 'solo/uaisolo-master/get-max-all',
  SuseracessinformationUserProfileFilterData = 'solo/uaisolo-master/search',
  SuseracessinformationCreateUpdate = 'solo/uaisolo-master/save-update',
  SuseracessinformationLoadUpdatePage = 'solo/uaisolo-master/get-by-max-code',
  SuseracessinformationAllAuditTrail = 'solo/uaisolo-master/get-by-code-all',

  /******************VendorList*******************/

  /*******ProductInformation*********/
  allProductInformationTabledata = 'clv/product-information/get-all',
  activeProductInformationTabledata = 'clv/product-information/get-max-all',
  ProductInformationUserProfileFilterData = 'clv/product-information/search',
  ProductInformationCreateUpdate = 'clv/product-information/save-update',
  ProductInformationLoadUpdatePage = 'clv/product-information/get-by-max-code',
  ProductInformationAllAuditTrail = 'clv/product-information/get-by-code-all',

  /*******Cleaningcategory*********/
  allCleaningcategoryTabledata = 'clv/cleaning-category/get-all',
  activeCleaningcategoryTabledata = 'clv/cleaning-category/get-max-all',
  CleaningcategoryUserProfileFilterData = 'clv/cleaning-category/search',
  CleaningcategoryCreateUpdate = 'clv/cleaning-category/save-update',
  CleaningcategoryLoadUpdatePage = 'clv/cleaning-category/get-by-max-code',
  CleaningcategoryAllAuditTrail = 'clv/cleaning-category/get-by-code-all',

  /*******Equipmentinformation*********/
  allEquipmentinformationTabledata = 'clv/equipment_information/get-all',
  activeEquipmentinformationTabledata = 'clv/equipment_information/get-max-all',
  EquipmentinformationUserProfileFilterData = 'clv/equipment_information/search',
  EquipmentinformationCreateUpdate = 'clv/equipment_information/save-update',
  EquipmentinformationLoadUpdatePage = 'clv/equipment_information/get-by-max-code',
  EquipmentinformationAllAuditTrail = 'clv/equipment_information/get-by-code-all',

  /*******Potency*********/
  allPotencyTabledata = 'clv/potency/get-all',
  activePotencyTabledata = 'clv/potency/get-max-all',
  PotencyUserProfileFilterData = 'clv/potency/search',
  PotencyCreateUpdate = 'clv/potency/save-update',
  PotencyLoadUpdatePage = 'clv/potency/get-by-max-code',
  PotencyAllAuditTrail = 'clv/potency/get-by-code-all',

  /*******ProductEquipmentmatrix*********/
  allProductEquipmentmatrixTabledata = 'clv/product_equipment_matrix/get-all',
  activeProductEquipmentmatrixTabledata = 'clv/product_equipment_matrix/get-max-all',
  ProductEquipmentmatrixUserProfileFilterData = 'clv/product_equipment_matrix/search',
  ProductEquipmentmatrixCreateUpdate = 'clv/product_equipment_matrix/save-update',
  ProductEquipmentmatrixLoadUpdatePage = 'clv/product_equipment_matrix/get-by-max-code',
  ProductEquipmentmatrixAllAuditTrail = 'clv/product_equipment_matrix/get-by-code-all',

  /***********Solubulity************/
  allSolubulityTabledata = 'clv/solubulity/get-all',
  activeSolubulityTabledata = 'clv/solubulity/get-max-all',
  SolubulityUserProfileFilterData = 'clv/solubulity/search',
  SolubulityCreateUpdate = 'clv/solubulity/save-update',
  SolubulityLoadUpdatePage = 'clv/solubulity/get-by-max-code',
  SolubulityAllAuditTrail = 'clv/solubulity/get-by-code-all',

  /*******Toxicity*********/
  allToxicityTabledata = 'clv/toxicity/get-all',
  activeToxicityTabledata = 'clv/toxicity/get-max-all',
  ToxicityUserProfileFilterData = 'clv/toxicity/search',
  ToxicityCreateUpdate = 'clv/toxicity/save-update',
  ToxicityLoadUpdatePage = 'clv/toxicity/get-by-max-code',
  ToxicityAllAuditTrail = 'clv/toxicity/get-by-code-all',

  /*******Department Master*********/
  allDepartmentMasterTabledata = 'clv/department/get-all',
  activeDepartmentMasterTabledata = 'clv/department/get-max-all',
  departmentMasterUserProfileFilterData = 'clv/department/search',
  departmentMasterCreateUpdate = 'clv/department/save-update',
  departmentMasterLoadUpdatePage = 'clv/department/get-by-max-code',
  departmentMasterAllAuditTrail = 'clv/department/get-by-code-all',

  /*******Section Master*********/
  allSectionTabledata = 'clv/section/get-all',
  activeSectionTabledata = 'clv/section/get-max-all',
  sectionUserProfileFilterData = 'clv/section/search',
  sectionCreateUpdate = 'clv/section/save-update',
  sectionLoadUpdatePage = 'clv/section/get-by-max-code',
  sectionAllAuditTrail = 'clv/section/get-by-code-all',

  /*******Lines Master*********/
  allLinesTabledata = 'clv/lines/get-all',
  activeLinesTabledata = 'clv/lines/get-max-all',
  linesUserProfileFilterData = 'clv/lines/search',
  linesCreateUpdate = 'clv/lines/save-update',
  linesLoadUpdatePage = 'clv/lines/get-by-max-code',
  linesAllAuditTrail = 'clv/lines/get-by-code-all',

  /***************SD Dashboard ***************/
  yearWiseData ='sdsi/sdsi-index-fta-Year',
  monthWiseData ='sdsi/sdsi-index-fta-Month',
  weekWiseData ='sdsi/sdsi-index-fta-Week',
  dayWiseData ='sdsi/sdsi-index-fta-Day',

            /******* sdq ********/
  dqYearWiseData ='sddq/sddq-index-fta-Year',
  dqMonthWiseData ='sddq/sddq-index-fta-week',
  dqWeekWiseData ='sddq/sddq-index-fta-month',
  dqDayWiseData ='sddq/sddq-index-fta-day',


    /***************MM Dashboard ***************/
    
           /******* pdq ********/
  pdqYearWiseData ='pmmpdq/pdq-index-fta-Year',
  pdqMonthWiseData ='pmmpdq/pdq-index-fta-Month',
  pdqWeekWiseData ='pmmpdq/pdq-index-fta-Week',
  pdqDayWiseData ='pmmpdq/pdq-index-fta-Day',

             /******* pfq ********/
  pfqYearWiseData ='pmmpfqt/pfqt-index-fta-Year',
  pfqMonthWiseData ='pmmpfqt/pfqt-index-fta-Month',
  pfqWeekWiseData ='pmmpfqt/pfqt-index-fta-Week',
  pfqDayWiseData ='pmmpfqt/pfqt-index-fta-Day',

             /******* ppo ********/
  ppoYearWiseData ='pmmpfqt/pfqt-index-fta-Year',
  ppoMonthWiseData ='pmmpfqt/pfqt-index-fta-Month',
  ppoWeekWiseData ='pmmpfqt/pfqt-index-fta-Week',
  ppoDayWiseData ='pmmpfqt/pfqt-index-fta-Day',

             /******* pqt ********/
  pqtYearWiseData ='pmmpqt/pqt-index-fta-Year',
  pqtMonthWiseData ='pmmpqt/pqt-index-fta-Month',
  pqtWeekWiseData ='pmmpqt/pqt-index-fta-Week',
  pqtDayWiseData ='pmmpqt/pqt-index-fta-Day',

             /******* pso ********/
  psoYearWiseData ='pmmpso/pso-index-fta-Year',
  psoMonthWiseData ='pmmpso/pso-index-fta-Month',
  psoWeekWiseData ='pmmpso/pso-index-fta-Week',
  psoDayWiseData ='pmmpso/pso-index-fta-Day',

             /******* pdo ********/
  pdoYearWiseData ='pmmpdo/pdo-index-fta-Year',
  pdoMonthWiseData ='pmmpdo/pdo-index-fta-Month',
  pdoWeekWiseData ='pmmpdo/pdo-index-fta-Week',
  pdoDayWiseData ='pmmpdo/pdo-index-fta-Day',

           /******* psi ********/
  psiYearWiseData ='pmmpsi/psi-index-fta-Year',
  psiMonthWiseData ='pmmpsi/psi-index-fta-Month',
  psiWeekWiseData ='pmmpsi/psi-index-fta-Week',
  psiDayWiseData ='pmmpsi/psi-index-fta-Day',


   /***************LBMS ***************/

  /*******Area master*********/
  allAreaMasterTabledata = 'lbms/area_master/get-all',
  activeAreaMasterTabledata = 'lbms/area_master/get-max-all',
  areaMasterUserProfileFilterData = 'lbms/area_master/search',
  areaMasterCreateUpdate = 'lbms/area_master/save-update',
  areaMasterLoadUpdatePage = 'lbms/area_master/get-by-max-code',
  areaMasterAllAuditTrail = 'lbms/area_master/get-by-code-all',

  /*******Area Group master*********/
  allAreaGroupMasterTabledata = 'lbms/area_group_master/get-all',
  activeAreaGroupMasterTabledata = 'lbms/area_group_master/get-max-all',
  areaGroupMasterUserProfileFilterData = 'lbms/area_group_master/search',
  areaGroupMasterCreateUpdate = 'lbms/area_group_master/save-update',
  areaGroupMasterLoadUpdatePage = 'lbms/area_group_master/get-by-max-code',
  areaGroupMasterAllAuditTrail = 'lbms/area_group_master/get-by-code-all',

  /*******Clean Room Grade master*********/
  allCrmMasterTabledata = 'lbms/clean_room_grade_master/get-all',
  activeCrmMasterTabledata = 'lbms/clean_room_grade_master/get-max-all',
  crmMasterUserProfileFilterData = 'lbms/clean_room_grade_master/search',
  crmMasterCreateUpdate = 'lbms/clean_room_grade_master/save-update',
  crmMasterLoadUpdatePage = 'lbms/clean_room_grade_master/get-by-max-code',
  crmMasterAllAuditTrail = 'lbms/clean_room_grade_master/get-by-code-all',

    /***************WmhModule***************/

  /*******Inspection Master*********/
  allInspectionTabledata = 'wh/it-master/get-all',
  activeInspectionTabledata = 'wh/it-master/get-max-all',
  inspectionUserProfileFilterData = 'wh/it-master/search',
  inspectionCreateUpdate = 'wh/it-master/save-update',
  inspectionLoadUpdatePage = 'wh/it-master/get-by-max-code',
  inspectionAllAuditTrail = 'wh/it-master/get-by-code-all',

  /*******Storage Location*********/
  allStorageTabledata = 'wh/sl_master/get-all',
  activeStorageTabledata = 'wh/sl_master/get-max-all',
  storageUserProfileFilterData = 'wh/sl_master/search',
  storageCreateUpdate = 'wh/sl_master/save-update',
  storageLoadUpdatePage = 'wh/sl_master/get-by-max-code',
  storageAllAuditTrail = 'wh/sl_master/get-by-code-all',

   /*******Quntity Master*********/
  allQuantityTabledata = 'wh/qt-master/get-all',
  activeQuantityTabledata = 'wh/qt-master/get-max-all',
  quantityUserProfileFilterData = 'wh/qt-master/search',
  quantityCreateUpdate = 'wh/qt-master/save-update',
  quantityLoadUpdatePage = 'wh/qt-master/get-by-max-code',
  quantityAllAuditTrail = 'wh/qt-master/get-by-code-all',

   /*******Quntity Ledger*********/
  allQuantityLedgTabledata = 'wh/qt_ledger/get-all',
  activeQuantityLedgTabledata = 'wh/qt_ledger/get-max-all',
  quantityLedgUserProfileFilterData = 'wh/qt_ledger/search',
  quantityLedgCreateUpdate = 'wh/qt_ledger/save-update',
  quantityLedgLoadUpdatePage = 'wh/qt_ledger/get-by-max-code',
  quantityLedgAllAuditTrail = 'wh/qt_ledger/get-by-code-all',
  allCleanRoomGradeTabledata = "allCleanRoomGradeTabledata",
  cleanRoomGradeUserProfileFilterData = "cleanRoomGradeUserProfileFilterData",


  
}
