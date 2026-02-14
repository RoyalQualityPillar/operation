import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  public getMenu(): any[] {
    return [
      {
        name: 'Home',
        path: '/',
        children: [],
      },
      {
        name: 'Module List',
        path: '/module-list',
        children: [],
      },

      {
        name: 'Sub Module List',
        path: '/sub-module-list',
      },

      {
        name: 'Admin Management',
        path: '/admin',
        children: [
          { name: 'Admin', path: '/admin/upr-master-data' },
          {
            name: 'Admin Home',
            path: '/admin/master-management',
            children: [
              {
                name: 'Master Data Home',
                path: '/admin/ad-master',
                children: [
                  {
                    name: 'Standard Reason Registration',
                    path: '/admin/master-management/ad-master/standard-reason-registartion-home-page',
                  },
                  {
                    name: 'Material Type',
                    path: '/admin/master-management/ad-master/material-type-home-page',
                  },
                  {
                    name: 'Material Sub Type',
                    path: '/admin/master-management/ad-master/sub-department-home-page',
                  },

                  {
                    name: 'Unit',
                    path: '/admin/master-management/ad-master/ut-master-home-page',
                  },

                  {
                    name: 'Pack Master',
                    path: '/admin/master-management/ad-master/ut-master-home-page',
                  },

                  {
                    name: 'Tax Master',
                    path: '/admin/master-management/ad-master/tax-master-home-page',
                  },

                  {
                    name: 'Guidelines',
                    path: '/admin/master-management/ad-master/guidelines-home-page',
                  },

                  {
                    name: 'Dosage Form',
                    path: '/admin/master-management/ad-master/dosage-from-home-page',
                  },

                  {
                    name: 'Payment Term',
                    path: '/admin/master-management/ad-master/payment-term-home-page',
                  },

                  {
                    name: 'Vendor List',
                    path: '/admin/master-management/ad-master/vendor-list-home-page',
                  },
                ],
              },
            ],
          },
          {
            name: 'Life Cycle Management',
            path: '/admin/lcm-master-data',
          },
        ],
      },
      {
        name: 'LIMS',
        path: '/lims',
        children: [
          {
            name: 'Course Home',
            path: '/lims/course-home',
          },
          {
            name: 'Course Init',
            path: '/lims/course-initiator',
          },
          {
            name: 'Course Update',
            path: '/lims/course-update',
          },
          {
            name: 'Course Approver',
            path: '/lims/course-reviewer',
          },
          {
            name: 'Course Completed',
            path: 'lims/course-completed?ff0001=CRS',
          },
          {
            name: 'Course Session Home',
            path: 'lims/course-session-home',
          },
          {
            name: 'Course Session Init',
            path: '/lims/course-session-initiator',
          },
          {
            name: 'Course Session Update',
            path: '/lims/course-session-update',
          },
          {
            name: 'Course Session Reviewer',
            path: '/lims/course-session-reviewer',
          },
          {
            name: 'Group Training Plan Home',
            path: '/lims/gtp-home',
          },
          {
            name: 'Group Training Plan Home',
            path: '/lims/gtp-home',
          },
          {
            name: 'Group Training Plan Init',
            path: '/lims/gtp-init',
          },

          {
            name: 'Group Training Plan Update',
            path: '/lims/gtp-update',
          },

          {
            name: 'Group Training Plan Reviewer',
            path: '/lims/gtp-reviewer',
          },
          {
            name: 'Lerning Management System',
            path: '/lms/lms-module-home-page',
          },
          {
            name: 'LMS Question Bank Home',
            path: '/lms/lms-module-home-page',
          },
          {
            name: 'LMS Question Bank Init',
            path: '/lms/lmsqb-initator',
          },
          {
            name: 'LMS Question Bank Update',
            path: '/lms/lmsqb-update-home-page',
          },
          {
            name: 'LMS Question Bank Home',
            path: '/lms/lmsqb-reviewer',
          },
          {
            name: 'Training Schedule Home',
            path: '/lims/training-schedule-home',
          },
          {
            name: 'Training Schedule Init',
            path: '/lims/training-schedule-initiator',
          },
          {
            name: 'Training Schedule Update',
            path: '/lims/training-schedule-update',
          },
          {
            name: 'Training Schedule Reviewer',
            path: '/lims/training-schedule-reviewer',
          },
          {
            name: 'Topic Registration Home',
            path: '/lims/topic-registration-home',
          },
          {
            name: 'Topic Registration Init',
            path: '/lims/topic-registration-init',
          },
          {
            name: 'Topic Registration Update',
            path: '/lims/topic-registration-update',
          },
          {
            name: 'Topic Registration Approver',
            path: '/lims/topic-registration-reviewer',
          },
        ],
      },
      {
        name: 'MM',
        path: '/mm',
        children: [
          {
            name: 'DQ Completed Records Dashboard',
            path: '/mm/dq-completed-records-dashboard',
          },
          {
            name: 'MM Home',
            path: '/mm/mm-module-home-page',
          },
          {
            name: 'MM Data Home',
            path: '/mm/mm-master-data-home-page',
          },
          {
            name: 'Material Master',
            path: '/mm/material-master-home-page',
          },
          {
            name: 'Stock Ledger',
            path: '/mm/stock-ledger-home-page',
          },
          {
            name: 'Price Type',
            path: '/mm/price-type-home-page',
          },
          {
            name: 'Price Master',
            path: '/mm/price-master-home-page',
          },
          {
            name: 'MV Master',
            path: '/mm/home-page-mv-master',
          },
          {
            name: 'Purchase Delivery Order Home',
            path: '/mm/do-home',
            children: [
              {
                name: 'Pending Assignment Dashboard Board',
                path: '/mm/do-home/do-lw-dash-bord',
              },
              {
                name: 'Completed Records Dashboard',
                path: '/mm/do-home/dq-completed-records-dashboard',
              },
              {
                name: 'Completed Delivery Order',
                path: '/mm/do-home/do-completed',
              },
            ],
          },
          {
            name: 'Purchase Delivery Order Init',
            path: '/mm/do-initiator',
          },
          {
            name: 'Purchase Delivery Order Update',
            path: '/mm/do-update',
          },
          {
            name: 'Purchase Delivery Order Reviewer',
            path: '/mm/do-reviewer',
          },
          {
            name: 'Purchase Draft Quotation',
            path: '/mm/dq-home',
            children: [
              {
                name: 'Pending Assignment Dashboard',
                path: '/mm/dq-home/dq-lw-dash-bord',
              },
              {
                name: 'Completed Records Dashboard',
              },
              {
                name: 'Completed Draft Quotations',
              },
              {
                name: 'Draft Quotations Item',
              },
              {
                name: 'Inprogress Draft Quotations',
              },
            ],
          },
          {
            name: 'Purchase Draft Quotation Init',
            path: '/mm/dq-initiator',
          },
          {
            name: 'Purchase Draft Quotation Update',
            path: '/mm/dq-update',
          },
          {
            name: 'Purchase Draft Quotation Reviewer',
            path: '/mm/dq-reviewer',
          },
          {
            name: 'Purchase Fair Quotation Init',
            path: '/mm/fq-initiator',
          },
          {
            name: 'Purchase Fair Quotation Update',
            path: '/mm/fq-update',
          },
          {
            name: 'Purchase Fair Quotation Reviewer',
            path: '/mm/fq-reviewer',
          },

          {
            name: 'Purchase Purchase Order Init',
            path: '/mm/po-initiator',
          },
          {
            name: 'Purchase Purchase Order Update',
            path: '/mm/po-update',
          },
          {
            name: 'Purchase Purchase Order Reviewer',
            path: '/mm/po-reviewer',
          },
          {
            name: 'Purchase Quotation Home',
            path: '/mm/qt-home',
          },

          {
            name: 'Purchase Quotation Init',
            path: '/mm/qt-initiator',
          },
          {
            name: 'Purchase Quotation Update',
            path: '/mm/qt-update',
          },
          {
            name: 'Purchase Quotation Reviewer',
            path: '/mm/qt-reviewer',
          },

          {
            name: 'Purchase Sales Invoice',
            path: '/mm/si-home',
          },
          {
            name: 'Purchase Sales Invoice Init',
            path: '/mm/si-initiator',
          },
          {
            name: 'Purchase Sales Invoice Update',
            path: '/mm/si-update',
          },
          {
            name: 'Purchase Sales Invoice Reviewer',
            path: '/mm/si-reviewer',
          },

          {
            name: 'Purchase Sales Order',
            path: '/mm/so-home',
          },
          {
            name: 'Purchase Sales Order Init',
            path: '/mm/so-initiator',
          },
          {
            name: 'Purchase Sales Order Update',
            path: '/mm/so-update',
          },
          {
            name: 'Purchase Sales Order Reviewer',
            path: '/mm/so-reviewer',
          },
        ],
      },
      {
        name: 'SD',
        path: '/sd',
        children: [
          {
            name: 'SD Home',
            path: '/sd/do-home',
          },
          {
            name: 'Sales Delivery Order Init',
            path: '/sd/do-initiator',
          },
          {
            name: 'Sales Delivery Order Update',
            path: '/sd/do-update',
          },
          {
            name: 'Sales Delivery Order Reviewer',
            path: '/sd/do-reviewer',
          },
          {
            name: 'Sale & Distribution',
            path: '/sd/qt-master-data-home-page',
          },
          {
            name: 'Sale Draft Quotation Home',
            path: '/sd/dq-home-page',
          },
          {
            name: 'Sale Draft Quotation Init',
            path: '/sd/dq-init',
          },
          {
            name: 'Sale Draft Quotation Update',
            path: '/sd/dq-update',
          },
          {
            name: 'Sale Draft Quotation Reviewer',
            path: '/sd/dq-reviewer',
          },

          {
            name: 'Sale Fair Quotation Home',
            path: '/sd/fair-home-page',
          },
          {
            name: 'Sale Fair Quotation Init',
            path: '/sd/fair-init',
          },
          {
            name: 'Sale Fair Quotation Update',
            path: '/sd/fair-update',
          },
          {
            name: 'Sale Fair Quotation Reviewer',
            path: '/sd/fair-reviewer',
          },

          {
            name: 'Sale Purchase Order Home',
            path: '/sd/po-home-page',
          },
          {
            name: 'Sale Purchase Order Init',
            path: '/sd/po-init',
          },
          {
            name: 'Sale Purchase Order Update',
            path: '/sd/po-update',
          },
          {
            name: 'Sale Purchase Order Reviewer',
            path: '/sd/po-reviewer',
          },
          {
            name: 'Sale Quotation Home',
            path: '/sd/qt-home',
          },
          {
            name: 'Sale Quotation Init',
            path: '/sd/qt-init',
          },
          {
            name: 'Sale Quotation Update',
            path: '/sd/qt-update',
          },
          {
            name: 'Sale Quotation Reviewer',
            path: '/sd/qt-reviewer',
          },
          {
            name: 'Sale Invoice Home',
            path: '/sd/si-home',
          },
          {
            name: 'Sale Invoice Init',
            path: '/sd/si-init',
          },
          {
            name: 'Sale Invoice Update',
            path: '/sd/si-update',
          },
          {
            name: 'Sale Invoice Reviewer',
            path: '/sd/si-reviewer',
          },
          {
            name: 'Sale Sale Order Home',
            path: '/sd/so-home',
          },
          {
            name: 'Sale Sale Order Init',
            path: '/sd/so-init',
          },
          {
            name: 'Sale Sale Order Update',
            path: '/sd/so-update',
          },
          {
            name: 'Sale Sale Order Reviewer',
            path: '/sd/so-reviewer',
          },
        ],
      },
      {
        name: 'HR',
        path: '/hr',
        children: [
          {
            name: 'HR Module Home',
            path: '/hr/hr-module-home-page',
          },
          {
            name: 'HR Master Home',
            path: '/hr/hr-master-home-page',
            children: [
              {
                name: 'Allwnce Master',
                path: '/hr/hr-master-home-page/hr-allwnce-home-page',
              },
              {
                name: 'Atin Master',
                path: '/hr/hr-master-home-page/hr-atin-home-page',
              },
              {
                name: 'CP Master',
                path: '/hr/hr-master-home-page/hr-cp-home-page',
              },
              {
                name: 'Daytypes Master',
                path: '/hr/hr-master-home-page/hr-daytypes-home-page',
              },
              {
                name: 'Deduction Master',
                path: '/hr/hr-master-home-page/hr-deduction-home-page',
              },
              {
                name: 'Empgrp Master',
                path: '/hr/hr-master-home-page/hr-empgrp-home-page',
              },
              {
                name: 'Latedays Master',
                path: '/hr/hr-master-home-page/hr-latedays-home-page',
              },
              {
                name: 'Jp Master',
                path: '/hr/hr-master-home-page/hr-jp-home-page',
              },
              {
                name: 'Leave Master',
                path: '/hr/hr-master-home-page/hr-leave-home-page',
              },
              {
                name: 'Paygr Master',
                path: '/hr/hr-master-home-page/hr-paygr-home-page',
              },
              {
                name: 'Pubhldy Master',
                path: '/hr/hr-master-home-page/hr-pubhldy-home-page',
              },
              {
                name: 'Tax Master',
                path: '/hr/hr-master-home-page/hr-tax-home-page',
              },
              {
                name: 'Sq Master',
                path: '/hr/hr-master-home-page/hr-sq-home-page',
              },
              {
                name: 'Wst Master',
                path: '/hr/hr-master-home-page/hr-wst-home-page',
              },
            ],
          },
        ],
      },
      {
        name: 'Warning Letters',
        path: '/gl',
        children: [
          {
            name: 'Warning Letters Home',
            path: '/gl/gwl-home',
          },
          {
            name: 'Warning Letters Init',
            path: '/gl/gwl-initiator',
          },
          {
            name: 'Warning Letters Update',
            path: '/gl/gwl-update',
          },
          {
            name: 'Warning Letters Approver',
            path: '/gl/gwl-reviewer',
          },
        ],
      },
      {
        name: 'Finance Management',
        path: '/fi',
        children: [
          {
            name: 'Finance Management Home',
            path: 'fi/fi-module-home-page',
          },
          {
            name: 'Finance Management Master',
            path: '/fi/fi-master-home-page',
            children: [
              {
                name: 'Account Group',
                path: '/fi/fi-master-home-page/fi-ag-home-page',
              },
              {
                name: 'Account Sub Group',
                path: '/fi/fi-master-home-page/fi-asg-home-page',
              },
              {
                name: 'Account Code',
                path: '/fi/fi-master-home-page/fi-ca-home-page',
              },
              {
                name: 'General Ledger',
                path: '/fi/fi-master-home-page/fi-gl-home-page',
              },
              {
                name: 'Payment Indicator',
                path: '/fi/fi-master-home-page/fi-pi-home-page',
              },
              {
                name: 'Payment Method',
                path: '/fi/fi-master-home-page/fi-pm-home-page',
              },
              {
                name: 'Payment Type',
                path: '/fi/fi-master-home-page/fi-pt-home-page',
              },
              {
                name: 'Posting Key',
                path: '/fi/fi-master-home-page/fi-pk-home-page',
              },
              {
                name: 'Item Codes',
                path: '/fi/fi-master-home-page/fi-item-home-page',
              },
              {
                name: 'Payment Process',
                path: '/fi/fi-master-home-page/payment-process-home-page',
              },
            ],
          },
        ],
      },
      {
        name: 'Excel',
        path: '/excel',
        children: [
          {
            name: 'Finished Product Assay-1 Init',
            path: '/excel/fas1-initiator',
          },
          {
            name: 'Finished Product Assay-1 Update',
            path: '/excel/fas1-update',
          },
          {
            name: 'Finished Product Assay-1 Update',
            path: '/excel/fas1-reviewer',
          },
          {
            name: 'MRS-Linearity',
          },
          {
            name: 'MRS-Linearity Home',
            path: '/excel/mrsle-home',
          },
          {
            name: 'MRS-Linearity Init ',
            path: '/excel/mrsle-init',
          },
          {
            name: 'MRS-Linearity Update',
            path: '/excel/mrsle-update',
          },
          {
            name: 'MRS-Linearity Reviewer',
            path: '/excel/mrsle-reviewer',
          },
          {
            name: 'Raw Material Assay-1',
            path: '/excel/rasi-home',
          },
          {
            name: 'Raw Material Assay-1 Init',
            path: '/excel/rasi-init',
          },
          {
            name: 'Raw Material Assay-1 Update',
            path: '/excel/rasi-update',
          },
          {
            name: 'Raw Material Assay-1 Reviewer',
            path: '/excel/rasi-reviewer',
          },
          {
            name: 'Raw Material Assay-2',
            path: '/excel/ras2-home',
          },
          {
            name: 'Raw Material Assay-2 Init',
            path: '/excel/ras2-init',
          },
          {
            name: 'Raw Material Assay-2 Update',
            path: '/excel/ras2-update',
          },
          {
            name: 'Raw Material Assay-2 Reviewer',
            path: '/excel/ras2-reviewer',
          },
        ],
      },
      {
        name: 'Royal Market Place',
        path: '/rmp',
        children: [
          {
            name: 'Royal Market Place Master Data Management',
            path: '/rmp/master-data-management',
          },
          {
            name: 'Royal Market Place Master Home',
            path: '/rmp/fm-master-home-page',
            children: [
              {
                name: 'Material Type Master',
              },
              {
                name: 'API Master',
              },
              {
                name: 'Material Master',
              },
              {
                name: 'Pack Master',
              },
              {
                name: 'Pack Enquiry Master',
              },
              {
                name: 'Enquiry Master',
              },
              {
                name: 'IMP BusinessUnitType Master',
              },
              {
                name: 'IMP BusinessUnit Master',
              },
              {
                name: 'IMP Curt Record',
              },
              {
                name: 'Vendor Master',
              },
              {
                name: 'User Access Information',
              },
            ],
          },
        ],
      },
      {
        name: 'QMS',
        path: '/qms',
        children: [
          {
            name: 'CAPA Home',
            path: '/qms/capaa-home',
          },
          {
            name: 'CAPA Init',
            path: '/qms/capaa-initiator',
          },
          {
            name: 'CAPA Update',
            path: '/qms/capaa-update-home-page',
          },
          {
            name: 'CAPA Reviewer',
            path: '/qms/capaa-reviewer-home-page',
          },
          {
            name: 'CCA Home',
            path: '/qms/cca-home',
          },
          {
            name: 'CCA Init',
            path: '/qms/cca-initiator',
          },
          {
            name: 'CCA Update',
            path: '/qms/cca-update-home-page',
          },
          {
            name: 'CCA Reviewer',
            path: '/qms/cca-reviewer-home-page',
          },
          {
            name: 'CC Home',
            path: '/qms/cc-home',
          },
          {
            name: 'CC Init',
            path: '/qms/cc-initiator',
          },
        ],
      },
      {
        name: 'Validation',
        path: '/vl',
        children: [
          {
            name: 'Validation Home',
            path: '/vl/vl-module-home-page',
          },
          {
            name: 'Cleaning Validation Init',
            path: '/vl/clv-initiator',
          },
          {
            name: 'Cleaning Validation Update',
            path: '/vl/clv-update-home-page',
          },
          {
            name: 'Cleaning Validation Reviewer',
            path: '/vl/clv-reviewer-home-page',
          },
          {
            name: 'Cleaning Validation Master Home',
            path: '/vl/vl-master-home-page',
            children: [
              {
                name: 'Cleaning Category',
                path: '/vl/vl-master-home-page/cleaning-category-home-page',
              },
              {
                name: 'Equipment Information',
                path: '/vl/vl-master-home-page/equipment-information-home-page',
              },
              {
                name: 'Product Information',
                path: '/vl/vl-master-home-page/equipment-information-home-page',
              },
              {
                name: 'Potency',
                path: '/vl/vl-master-home-page/potency-home-page',
              },
              {
                name: 'Product Equipment Matrix',
                path: '/vl/vl-master-home-page/product-equipment-matrix-home-page',
              },
              {
                name: 'Solubulity',
                path: '/vl/vl-master-home-page/solubulity-home-page',
              },
              {
                name: 'Toxicity',
                path: '/vl/vl-master-home-page/toxicity-home-page',
              },
              {
                name: 'Department',
                path: '/vl/vl-master-home-page/department-home-page',
              },
              {
                name: 'Section',
                path: '/vl/vl-master-home-page/section-home-page',
              },
              {
                name: 'Lines Master',
                path: '/vl/vl-master-home-page/lines-home-page',
              },
            ],
          },
        ],
      },
      {
        name: 'Column Management',
        path: '/lims-cm',
        children: [
          {
            name: 'Column Management Master Home',
            path: '/lims-cm/lims-cm-master-home-page',
            children: [
              {
                name: 'Column Code Index Master',
                path: '/lims-cm/lims-cm-master-home-page/lims-cm-cci-home-page',
              },
              {
                name: 'Column Lot Master',
                path: '/lims-cm/lims-cm-master-home-page/lims-cm-cl-home-page',
              },
              {
                name: 'Column Master',
                path: '/lims-cm/lims-cm-master-home-page/lims-cm-column-home-page',
              },
            ],
          },
        ],
      },
      {
        name: 'Blog Management',
        path: '/blg',
        children: [
          {
            name: 'Blog Master Home',
            path: '/blg/blog-master-home-page',
            children: [
              {
                name: 'Blog Page',
                path: '/blg/blog-master-home-page/blg-home',
              },
              {
                name: 'Blog Document',
                path: '/blg/blog-master-home-page/home-page-blg-document',
              },
              {
                name: 'Blog Completed Records',
                path: '/blg/blog-master-home-page/blg-completed',
              },
              {
                name: 'Blog Image',
                path: '/blg/blog-master-home-page/blg-Image',
              },
              {
                name: 'Blog Scroll',
                path: '/blg/blog-master-home-page/blg-scroll',
              },
              {
                name: 'Big Record',
                path: '/blg/blog-master-home-page/blg-record',
              },
              {
                name: 'Blog User Profile',
                path: 'blog-master-home-page/blg-user-profile',
              },
              {
                name: 'Blog Document Type',
                path: 'blog-master-home-page/blg-document-type',
              },
              {
                name: 'Blog Section',
                path: 'blog-master-home-page/blg-section',
              },
              {
                name: 'Blog User Access',
                path: 'blog-master-home-page/blg-user-access',
              },
            ],
          },
          {
            name: 'Blog Init',
            path: '/blg/blg-initiator',
          },
          {
            name: 'Blog Update',
            path: '/blg/blg-update',
          },
          {
            name: 'Blog Approver',
            path: '/blg/blg-reviewer',
          },
        ],
      },
      // {
      //   name: 'BMR-Print Request Home',
      //   path: '/dms/bmr-pr-module-home-page',
      //   children: [
      //     {
      //       name: 'BMR-Print Request Init',
      //       path: '/dms/bmr-pr-init-save',
      //     },
      //     {
      //       name: 'BMR-Print Request Update',
      //       path: '/dms/bmr-pr-update',
      //     },
      //     {
      //       name: 'BMR-Print Request Reviewer',
      //       path: '/dms/bmr-pr-reviewer',
      //     },
      //   ],
      // },

      {
        name: 'DMS',
        path: '/dms/',
        children: [
          {
            name: 'Document Requirement Home Page',
            path: 'dms/document-requirement-home-page',
          },
          {
            name: 'Urs Lw Dash bord',
            path: '/dms/urs-lw-dash-bord',
          },
          {
            name: 'SOP Module Home Page',
            path: '/dms/sop-module-home-page',
          },
          {
            name: 'SOP Initiator',
            path: '/dms/sop-initiator',
          },
          {
            name: 'SOP Update',
            path: 'dms/sop-update-home-page',
          },
          {
            name: 'SOP Update',
            path: 'dms/sop-update',
          },
          {
            name: 'SOP Department Reviewer',
            path: '/dms/sop-review-home-page',
          },
          {
            name: 'SOP QA Reviewer',
            path: '/dms/sop-qa-review-home-page',
          },
          {
            name: 'SOP Cross Functional Reviewer',
            path: '/dms/sop-cross-function-review-home-page',
          },
          {
            name: 'SOP QA Approver',
            path: '/dms/sop-qa-approver-review-home-page',
          },
          {
            name: 'SOP Training Coordinator',
            path: '/dms/sop-training-review-home-page',
          },
          {
            name: 'SOP DMS Manager',
            path: '/dms/sop-documentation-review-home-page',
          },
          {
            name: 'BMR Module Home Page',
            path: '/dms/bmr-module-home-page',
          },
          {
            name: 'BMR Initiator',
            path: '/dms/bmr-initiator',
          },
          {
            name: 'BMR Update',
            path: 'dms/bmr-update-home-page',
          },
          {
            name: 'BMR Update',
            path: 'dms/bmr-update',
          },
          {
            name: 'BMR Department Reviewer',
            path: '/dms/bmr-review-home-page',
          },
          {
            name: 'BMR QA Reviewer',
            path: '/dms/bmr-qa-review-home-page',
          },
          {
            name: 'BMR Cross Functional Reviewer',
            path: '/dms/bmr-cross-function-review-home-page',
          },
          {
            name: 'BMR QA Approver',
            path: '/dms/bmr-qa-approver-review-home-page',
          },
          {
            name: 'BMR Training Coordinator',
            path: '/dms/bmr-authorization-review-home-page',
          },
          {
            name: 'BMR DMS Manager',
            path: '/dms/bmr-closure-review-home-page',
          },

          {
            name: 'BPR Module Home Page',
            path: '/dms/bpr-module-home-page',
          },
          {
            name: 'BPR Initiator',
            path: '/dms/bpr-initiator',
          },
          {
            name: 'BPR Update',
            path: 'dms/bpr-update-home-page',
          },
          {
            name: 'BPR Update',
            path: 'dms/bpr-update',
          },
          {
            name: 'BPR Department Reviewer',
            path: '/dms/bpr-review-home-page',
          },
          {
            name: 'BPR QA Reviewer',
            path: '/dms/bpr-qa-review-home-page',
          },
          {
            name: 'BPR Cross Functional Reviewer',
            path: '/dms/bpr-cross-function-review-home-page',
          },
          {
            name: 'BPR QA Approver',
            path: '/dms/bpr-qa-approver-review-home-page',
          },
          {
            name: 'BPR Training Coordinator',
            path: '/dms/bpr-authorization-review-home-page',
          },
          {
            name: 'BPR DMS Manager',
            path: '/dms/bpr-closure-review-home-page',
          },
        ],
      },
      {
        name: 'Data Table',
        path: '/data-table',
      },
      {
        name: 'Lms',
        path: '/lms',
        children: [
          {
            name: 'Lms Qb Home Page',
            path: '/lms/lms-qb-home-page',
          },
        ],
      },
    ];
  }
}
