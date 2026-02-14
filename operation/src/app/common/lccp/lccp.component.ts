import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { LccpService } from 'src/app/service/lccp.service';
import { LifeCycleDataService } from 'src/app/service/life-cycle-data.service';
import { ShareHostDataService } from 'src/app/service/load-share-data.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};
export type piechartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type donutchartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type linechartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-lccp',
  templateUrl: './lccp.component.html',
  styleUrls: ['./lccp.component.scss'],
  standalone: false,
})
export class LccpComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild('piechart') piechart: ChartComponent;
  public piechartOptions: Partial<piechartOptions>;
  @ViewChild('donutchart') donutchart: ChartComponent;
  public donutchartOptions: Partial<donutchartOptions>;
  @ViewChild('linechart') linechart: ChartComponent;
  public linechartOptions: Partial<linechartOptions>;
  public stageList: { stage: string }[] = [];
  public isPieChartDataAvailable: boolean = false;
  public inValidMessage =
    'Start Date and End Date difference must be less than 31 days.';
  public stage = new FormGroup({
    stageLevel: new FormControl(''),
    type: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    day: new FormControl(''),
  });
  private $destroy = new Subject();
  public list: { name: string }[] = [
    {
      name: 'Day',
    },
    {
      name: 'From - To',
    },
    {
      name: 'Month - Week',
    },
    {
      name: 'Week - Day',
    },
    {
      name: 'Year - Month',
    },
    {
      name: 'Year - Year',
    },
  ];

  constructor(
    private lifeCycleDataService: LifeCycleDataService,
    private lccpService: LccpService,
    private router: Router,
    private shareHostDataService: ShareHostDataService
  ) { }
  ngOnInit(): void {
    // let selectedRow = this.lifeCycleDataService.getSelectedRowData();
    let selectedRow = this.shareHostDataService.selectedRowInterfaceData;
    this.apiYearToyear('1', selectedRow);
    this.stage.get('type').setValue('Year - Year');
    this.stage.get('stageLevel').setValue('1');
    this.lifeCycleDataService
      .getnStage(selectedRow.lcnum)
      .pipe(takeUntil(this.$destroy))
      .subscribe(({ data }: any) => {
        data.stageList = [
          ...new Map(
            data.stageList.map((element) => [element.stage, element])
          ).values(),
        ];
        const list = data.stageList.map((element) => {
          return {
            ...element,
            stage: String(element.stage),
          };
        });

        this.stageList = list;
      });
  }

  public getWeekData(lifeCycleCode: any, stageLevel: string) {
    let selectedRow = this.shareHostDataService.selectedRowInterfaceData;
    const lcroles = [];
    const counts = [];
    const startDate = moment(
      new Date(this.stage.get('startDate').value).getTime()
    ).format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(
      new Date(this.stage.get('endDate').value).getTime()
    ).format('YYYY-MM-DD HH:mm:ss');

    this.lccpService
      .getMonthDay(selectedRow.lcnum, startDate, endDate)
      .pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
        data.data.forEach((item) => {
          lcroles.push(item.day);
          counts.push(item.count);
        });
        this.createpieChart(lcroles, counts);
        this.createDonutchart(lcroles, counts);
        this.createLineChart(lcroles, counts);
        this.createLineChart(lcroles, counts);
        this.createTableChart(lcroles, counts);
      });

    // this.stage.get('dateValue').patchValue(dateValue);
  }

  public selectType() {
    this.stage.patchValue({
      startDate: null,
      endDate: null,
      day: null,
    });

    if (this.stage.get('type').value === 'Day') {
      const stageValue = this.stage.get('stageLevel').value
        ? this.stage.get('stageLevel').value
        : '1';
      let selectedRow = this.shareHostDataService.selectedRowInterfaceData;
      this.apiDay(stageValue, selectedRow);
    }
    let selectedRow = this.shareHostDataService.selectedRowInterfaceData;
    const stageValue = this.stage.get('stageLevel').value
      ? this.stage.get('stageLevel').value
      : '1';

    this.CallApi(stageValue, selectedRow);
  }

  public changeStage() {
    let selectedRow = this.shareHostDataService.selectedRowInterfaceData;
    const stageValue = this.stage.get('stageLevel').value
      ? this.stage.get('stageLevel').value
      : '1';
    this.CallApi(stageValue, selectedRow);
  }

  public getYearMonthData() {
    let selectedRow = this.shareHostDataService.selectedRowInterfaceData;
    const stageValue = this.stage.get('stageLevel').value
      ? this.stage.get('stageLevel').value
      : '1';

    this.CallApi(stageValue, selectedRow);
  }

  public countDays(startDate: string, endDate: string) {
    return (
      (new Date(startDate).getTime() - new Date(endDate).getTime()) /
      (24 * 60 * 60 * 1000)
    );
  }

  private CallApi(stageValue: string, selectedRow) {
    const type = this.stage.get('type').value;

    if (type === 'Year - Month') {
      this.apiYear(stageValue, selectedRow);
    } else if (type === 'Day') {
      this.apiDay(stageValue, selectedRow);
    } else if (type === 'Month - Week') {
      this.apiMonthWeek(stageValue, selectedRow);
    } else if (type === 'Week - Day') {
      this.apiMonthDay(stageValue, selectedRow);
    } else if (type === 'From - To') {
      this.getFromData(stageValue, selectedRow);
    } else {
      this.apiYearToyear(stageValue, selectedRow);
    }
  }

  private formatDate(date: string) {
    return moment(new Date(date).getTime()).format('YYYY-MM-DD HH:mm:ss');
  }

  private getFullYear(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private startDateCondition(startDate: string, getStartDate: Date) {
    return startDate
      ? startDate
      : this.stage.get('startDate').setValue(getStartDate.toISOString());
  }

  private endDateCondition(
    endDate: string,
    year: number,
    month: number,
    date: number
  ) {
    return endDate
      ? endDate
      : this.stage
        .get('endDate')
        .setValue(new Date(year, month, date).toISOString());
  }

  private getYearMonthDataApi(
    stageValue: string,
    lcNum: string,
    startDate: string,
    endDate: string
  ) {
    const selectedRow = this.shareHostDataService.selectedRowInterfaceData;

    let lcroles = [];
    let counts = [];
    this.lccpService
      .getYearMonthData(selectedRow.lcnum, startDate, endDate)
      .pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
        data.data.forEach((item) => {
          data = item;
          lcroles.push(item.generatedDate);
          counts.push(item.count);
        });
        this.createpieChartYM(lcroles, counts);
        this.createDonutchartMM(lcroles, counts);
        this.createLineChart(lcroles, counts);
        this.createLineChart(lcroles, counts);
        this.createTableChart(lcroles, counts);
      });
  }

  private apiYear(
    stageValue: string,
    selectedRow,
    startDate?: string,
    endDate?: string
  ) {
    this.stage.patchValue({ startDate: null, endDate: null });
    const now = new Date();
    let lcroles = [];
    let counts = [];
    const [year, month, date] = [
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ];

    if (startDate && endDate) {
      this.stage.patchValue({ startDate: startDate, endDate: endDate });
      const [startDateValue, endDateValue] = [
        this.formatDate(startDate),
        this.formatDate(endDate),
      ];

      this.getYearMonthDataApi(
        stageValue,
        selectedRow.lcnum,
        startDateValue,
        endDateValue
      );
    } else {
      const { startDate, endDate } = this.stage.value;
      const [startDateValue, endDateValue] = [
        new Date(startDate),
        new Date(endDate),
      ];
      const getStartDate = startDate
        ? this.getFullYear(startDateValue)
        : new Date(year - 1, month, date);

      const CompareStartDate = getStartDate;
      const compareLastDate = endDate
        ? this.getFullYear(endDateValue)
        : new Date(year, month, date);

      let Difference_In_Days = this.countDays(
        compareLastDate.toString(),
        CompareStartDate.toString()
      );

      this.startDateCondition(startDate, getStartDate);
      this.endDateCondition(startDate, year, month, date);

      if (Difference_In_Days <= 365 || Difference_In_Days === 366) {
        let { startDate, endDate } = this.stage.value;
        startDate = this.formatDate(startDate);
        endDate = this.formatDate(endDate);
        this.getYearMonthDataApi(
          stageValue,
          selectedRow.lcnum,
          startDate,
          endDate
        );
      } else {
        lcroles = [];
        counts = [];
        this.stage.get('startDate').markAsTouched();
        this.stage.get('startDate').setErrors({ invalidDate: true });
        this.inValidMessage =
          'Start Date and End Date difference must be 1 year.';
      }
    }
  }

  private apiYearToyear(stageValue: string, selectedRow) {
    const startDateValue = new Date(this.stage.get('startDate').value);
    let lcroles = [];
    let counts = [];

    const now = new Date();
    let { startDate, endDate } = this.stage.value;
    const [year, month, date] = [
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ];

    const getStartDate = startDate
      ? this.getFullYear(startDateValue)
      : new Date(year - 5, month, date);

    startDate
      ? startDate
      : this.stage.get('startDate').setValue(getStartDate.toISOString());

    endDate
      ? endDate
      : this.stage
        .get('endDate')
        .setValue(new Date(year, month, date).toISOString());

    startDate = moment(
      new Date(this.stage.get('startDate').value).getTime()
    ).format('YYYY-MM-DD HH:mm:ss');
    endDate = moment(
      new Date(this.stage.get('endDate').value).getTime()
    ).format('YYYY-MM-DD HH:mm:ss');

    this.lccpService
      .getYeartoYearData(selectedRow.lcnum, startDate, endDate)
      .pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
        data.data.forEach((item) => {
          lcroles.push(item.generatedDate);
          counts.push(item.count);
        });
        this.createpieChartYY(lcroles, counts);
        this.createDonutchartYY(lcroles, counts);
        this.createLineChart(lcroles, counts);
        this.createLineChart(lcroles, counts);
        this.createTableChart(lcroles, counts);
      });
  }

  private apiDay(stageValue: string, selectedRow) {
    const lcroles = [];
    const counts = [];
    const startDate = moment(
      new Date(this.stage.get('day').value).getTime()
    ).format('YYYY-MM-DD HH:mm:ss');
    this.lccpService
      .getDayData(selectedRow.lcnum, startDate)
      .pipe(takeUntil(this.$destroy))

      .subscribe((data: any) => {
        data.data.forEach((item) => {
          lcroles.push(item.day);
          counts.push(item.count);
        });
        this.createpieChart(lcroles, counts);
        this.createDonutchart(lcroles, counts);
        this.createLineChart(lcroles, counts);
        this.createLineChart(lcroles, counts);
        this.createTableChart(lcroles, counts);
      });
  }

  private apiMonthWeek(
    stageValue: string,
    selectedRow,
    startDate?: string,
    endDate?: string
  ) {
    const startDateValue = new Date(this.stage.get('startDate').value);
    const endDateValue = new Date(this.stage.get('endDate').value);
    let lcroles = [];
    let counts = [];

    const now = new Date();
    const [year, month, date] = [
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    ];

    if (startDate && endDate) {
      this.stage.get('startDate').setValue(startDate);
      this.stage.get('endDate').setValue(endDate);

      startDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
      this.lccpService
        .getMonthWeek(selectedRow.lcnum, startDate, endDate)
        .pipe(takeUntil(this.$destroy))
        .subscribe((data: any) => {
          data.data.forEach((item) => {
            lcroles.push(item.generatedDate);
            counts.push(item.count);
          });
          this.createpieChartMW(lcroles, counts);
          this.createDonutchartWW(lcroles, counts);
          this.createLineChart(lcroles, counts);
          this.createLineChart(lcroles, counts);
          this.createTableChart(lcroles, counts);
        });
    } else {
      const getStartDate = this.stage.get('startDate').value
        ? new Date(
          startDateValue.getFullYear(),
          startDateValue.getMonth(),
          startDateValue.getDate()
        )
        : new Date(year, month - 1, date + 1);
      const CompareStartDate = getStartDate;
      const compareLastDate = this.stage.get('endDate').value
        ? new Date(
          endDateValue.getFullYear(),
          endDateValue.getMonth(),
          endDateValue.getDate()
        )
        : new Date(year, month, date);
      let Difference_In_Days =
        (compareLastDate.getTime() - CompareStartDate.getTime()) /
        (24 * 60 * 60 * 1000);

      this.stage.get('startDate').value
        ? this.stage.get('startDate').value
        : this.stage.get('startDate').setValue(getStartDate.toISOString());

      this.stage.get('endDate').value
        ? this.stage.get('endDate').value
        : this.stage
          .get('endDate')
          .setValue(new Date(year, month, date).toISOString());

      if (Difference_In_Days < 31) {
        this.stage.get('startDate').setErrors(null);
        const startDate = moment(
          new Date(this.stage.get('startDate').value)
        ).format('YYYY-MM-DD HH:mm:ss');

        const endDate = moment(
          new Date(this.stage.get('endDate').value).getTime()
        ).format('YYYY-MM-DD HH:mm:ss');

        this.lccpService
          .getMonthWeek(selectedRow.lcnum, startDate, endDate)
          .pipe(takeUntil(this.$destroy))
          .subscribe((data: any) => {
            data.data.forEach((item) => {
              lcroles.push(item.generatedDate);
              counts.push(item.count);
            });
            this.createpieChartMW(lcroles, counts);
            this.createDonutchartWW(lcroles, counts);
            this.createLineChart(lcroles, counts);
            this.createLineChart(lcroles, counts);
            this.createTableChart(lcroles, counts);
          });
      } else {
        lcroles = [];
        counts = [];
        this.stage.get('startDate').markAsTouched();
        this.stage.get('startDate').setErrors({ invalidDate: true });
      }
    }

  }

  private apiMonthDay(
    stageValue: string,
    selectedRow,
    startDate?: string,
    endDate?: string
  ) {  
    const startDateValue = new Date(this.stage.get('startDate').value);
    const endDateValue = new Date(this.stage.get('endDate').value);
    let lcroles = [];
    let counts = [];
    const date = new Date();
    const getYear = date.getFullYear();
    const getMonth = date.getMonth();
    const getDate = date.getDate();

    if (startDate && endDate) {
      this.stage.get('startDate').setValue(startDate);
      this.stage.get('endDate').setValue(endDate);
      startDate = moment(startDate).format('YYYY-MM-DD HH:mm:ss');
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm:ss');
      
      this.lccpService
        .getMonthDay(selectedRow.lcnum, startDate, endDate)
        .pipe(takeUntil(this.$destroy))
        .subscribe((data: any) => {
          data.data.forEach((item) => {
            lcroles.push(item.generatedDate);
            counts.push(item.count);
          });
          this.createpieChart(lcroles, counts);
          this.createDonutchartDD(lcroles, counts, lcroles);
          this.createLineChart(lcroles, counts);
          this.createLineChart(lcroles, counts);
          this.createTableChart(lcroles, counts);
        });
    } else {
      const getStartDate = this.stage.get('startDate').value
        ? new Date(
          startDateValue.getFullYear(),
          startDateValue.getMonth(),
          startDateValue.getDate()
        )
        : new Date(getYear, getMonth, getDate - 7);
      const CompareStartDate = getStartDate;
      const compareLastDate = this.stage.get('endDate').value
        ? new Date(
          endDateValue.getFullYear(),
          endDateValue.getMonth(),
          endDateValue.getDate()
        )
        : new Date(getYear, getMonth, getDate);
      let Difference_In_Days =
        (compareLastDate.getTime() - CompareStartDate.getTime()) /
        (24 * 60 * 60 * 1000);

      this.stage.get('startDate').value
        ? this.stage.get('startDate').value
        : this.stage.get('startDate').setValue(getStartDate.toISOString());

      this.stage.get('endDate').value
        ? this.stage.get('endDate').value
        : this.stage
          .get('endDate')
          .setValue(new Date(getYear, getMonth, getDate).toISOString());

      if (Difference_In_Days == 7) {
        this.stage.get('startDate').setErrors(null);
        const startDate = moment(
          new Date(this.stage.get('startDate').value).getTime()
        ).format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(
          new Date(this.stage.get('endDate').value).getTime()
        ).format('YYYY-MM-DD HH:mm:ss');

        this.lccpService
          .getMonthDay(selectedRow.lcnum, startDate, endDate)
          .pipe(takeUntil(this.$destroy))
          .subscribe((data: any) => {
            data.data.forEach((item) => {
              lcroles.push(item.generatedDate);
              counts.push(item.count);
            });
            
    this.createpieChart(lcroles, counts);
     this.createDonutchartDD(lcroles, counts, lcroles);
    this.createLineChart(lcroles, counts);
    this.createLineChart(lcroles, counts);
    this.createTableChart(lcroles, counts);
          });
      } else {
        lcroles = [];
        counts = [];
        this.stage.get('startDate').markAsTouched();
        this.stage.get('startDate').setErrors({ invalidDate: true });
        this.inValidMessage =
          'Start Date and End Date difference must be 7 days.';
      }
    }

  }

  private getFromData(stageValue: string, selectedRow) {
    const lcroles = [];
    const counts = [];
    const startDate = moment(
      new Date(this.stage.get('startDate').value).getTime()
    ).format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(
      new Date(this.stage.get('endDate').value).getTime()
    ).format('YYYY-MM-DD HH:mm:ss');
    if (startDate && endDate) {
      this.lifeCycleDataService
        .getFormToData(
          selectedRow.lcnum,
          stageValue,
          startDate,
          endDate
        )
        .pipe(takeUntil(this.$destroy))
        .subscribe((data: any) => {
          data.data.forEach((item) => {
            lcroles.push(item.day);
            counts.push(item.count);
          });
          this.createpieChart(lcroles, counts);
          this.createDonutchart(lcroles, counts);
          this.createLineChart(lcroles, counts);
          this.createLineChart(lcroles, counts);
          this.createTableChart(lcroles, counts);
        });
    }
  }

  private createTableChart(lcroles, counts) {
    this.chartOptions = {
      series: [
        {
          name: 'No of pending assignments',
          // data: [21, 22, 10, 28, 16, 21, 13, 30]
          data: counts,
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      colors: [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#D10CE8',
      ],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: lcroles,
        // categories: [
        //   ["John", "Doe"],
        //   ["Joe", "Smith"],
        //   ["Jake", "Williams"],
        //   "Amber",
        //   ["Peter", "Brown"],
        //   ["Mary", "Evans"],
        //   ["David", "Wilson"],
        //   ["Lily", "Roberts"]
        // ],
        labels: {
          style: {
            colors: [
              '#008FFB',
              '#00E396',
              '#FEB019',
              '#FF4560',
              '#775DD0',
              '#546E7A',
              '#26a69a',
              '#D10CE8',
            ],
            fontSize: '12px',
          },
        },
      },
    };
  }

  private createLineChart(lcroles: any, counts: any) {
    this.isPieChartDataAvailable = true;
    this.linechartOptions = {
      series: [
        {
          name: 'No of pending assignment',
          // data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          data: counts,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Stage',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: lcroles,
        // categories: [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep"
        // ]
      },
    };
  }
  private createDonutchart(lcroles: any, counts: any) {
    this.isPieChartDataAvailable = true;
    this.donutchartOptions = {
      series: counts,
      chart: {
        type: 'donut',
      },
      labels: lcroles,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  private createDonutchartYY(lcroles: any, counts: any) {
    this.isPieChartDataAvailable = true;
    this.donutchartOptions = {
      series: counts,
      chart: {
        type: 'donut',
        events: {
          click: (event, chartContext, config) => {
            const selectedSliceIndex = config.dataPointIndex;
            const selectedSliceValue = config.config.labels[selectedSliceIndex];
            let year = selectedSliceValue
              .replace('Y1(', '')
              .replace('Y2(', '')
              .replace('Y3(', '')
              .replace('Y4(', '')
              .replace(')', '');
            const startDate = new Date(year, 0, 1).toISOString();
            const endDate = new Date(year, 11, 31).toISOString();
            let selectedRow = this.shareHostDataService.selectedRowInterfaceData;
            let stage = this.stage.get('stageLevel').value;
            this.lifeCycleDataService
              .getList(
                selectedRow.lcnum,
                +stage,
                0,
                50,
                startDate,
                endDate
              )
              .pipe(takeUntil(this.$destroy))
              .subscribe(({ data }: any) => {
                this.lifeCycleDataService.storeData(data.content);
                this.router.navigate(['/rqpquailtyui/dms/urs-completed'], {
                  queryParams: { navigate: true },
                });
              });
          },
        },
      },
      labels: lcroles,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  private createDonutchartMM(lcroles: any, counts: any) {
    this.isPieChartDataAvailable = true;
    this.donutchartOptions = {
      series: counts,
      chart: {
        type: 'donut',
        events: {
          click: (event, chartContext, config) => {
            const selectedSliceIndex = config.dataPointIndex;
            const selectedSliceValue = config.config.labels[selectedSliceIndex];
            let month = selectedSliceValue
              .replace('M1', '')
              .replace('M2', '')
              .replace('M3', '')
              .replace('M4', '')
              .replace('(', '')
              .replace(')', '')
              .trim();
                    
     const [monthStr, yearStr] = month.split('-');
  const monthIndex = this.getMonth(monthStr);
  const year = 2000 + parseInt(yearStr); // 25 → 2025

  if (isNaN(monthIndex) || isNaN(year)) {
    console.error('Invalid month or year:', monthStr, yearStr);
    return;
  }

  const startDate = new Date(year, monthIndex, 1).toISOString();
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();
  const endDate = new Date(year, monthIndex, lastDay).toISOString();


            const selectedRow = this.shareHostDataService.selectedRowInterfaceData;
            let stage = this.stage.get('stageLevel').value;
            this.lifeCycleDataService
              .getList(
                selectedRow.lcnum,
                +stage,
                0,
                50,
                startDate,
                endDate
              )
              .pipe(takeUntil(this.$destroy))
              .subscribe(({ data }: any) => {
                this.lifeCycleDataService.storeData(data.content);
                this.router.navigate(['/rqpquailtyui/dms/urs-completed'], {
                  queryParams: { navigate: true },
                });
              });
          },
        },
      },
      labels: lcroles,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  private createDonutchartWW(lcroles: any, counts: any) {
    this.isPieChartDataAvailable = true;
    this.donutchartOptions = {
      series: counts,
      chart: {
        type: 'donut',
        events: {
          click: (event, chartContext, config) => {
            const selectedSliceIndex = config.dataPointIndex;
            const selectedSliceValue = config.config.labels[selectedSliceIndex];
            let date = selectedSliceValue
              .trim()
              .slice(2)
              .replace('(', '')
              .replace(')', '')
              .split(' ');
            let startDate = new Date(date.slice(2)).toISOString();
            let endDate = new Date(date.slice(0, 1)).toISOString();
            const selectedRow = this.shareHostDataService.selectedRowInterfaceData;
            let stage = this.stage.get('stageLevel').value;
            this.lifeCycleDataService
              .getList(
                selectedRow.lcnum,
                +stage,
                0,
                50,
                startDate,
                endDate
              )
              .pipe(takeUntil(this.$destroy))
              .subscribe(({ data }: any) => {
                this.lifeCycleDataService.storeData(data.content);
                this.router.navigate(['/rqpquailtyui/dms/urs-completed'], {
                  queryParams: { navigate: true },
                });
              });
          },
        },
      },
      labels: lcroles,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  private createDonutchartDD(lcroles: any, counts: any, dates: string[]) {
    this.isPieChartDataAvailable = true;
  this.donutchartOptions = {
    series: counts,
    chart: {
      type: 'donut',
      events: {
        click: (event, chartContext, config) => {
          const selectedSliceIndex = config.dataPointIndex;
           if (
    selectedSliceIndex < 0 || 
    !Array.isArray(dates) || 
    selectedSliceIndex >= dates.length
  ) {
    console.error('Invalid selected index or dates array:', selectedSliceIndex, dates);
    return;
  }
          const selectedDateStr = dates[selectedSliceIndex];

          if (!selectedDateStr) {
            console.error('Invalid selected date for donut chart');
            return;
          }

          const startDate = new Date(selectedDateStr).toISOString();
          const endDate = new Date(selectedDateStr).toISOString();

          const selectedRow = this.shareHostDataService.selectedRowInterfaceData;
          const stage = this.stage.get('stageLevel').value;

          this.lifeCycleDataService
            .getList(selectedRow.lcnum, +stage, 0, 50, startDate, endDate)
            .pipe(takeUntil(this.$destroy))
            .subscribe(({ data }: any) => {
              this.lifeCycleDataService.storeData(data.content);
              this.router.navigate(['/rqpquailtyui/dms/urs-completed'], {
                queryParams: { navigate: true },
              });
            });
        },
      },
    },
    labels: lcroles,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' },
        },
      },
    ],
  };
}

  private createpieChart(lcroles: any, counts: any, data?: any) {
  this.isPieChartDataAvailable = true;
  this.piechartOptions = {
      // series: [44, 55, 13, 43, 22],
    series: counts,
    chart: {
        // width: 380,
      type: 'pie',
        events: {},
      },
      //  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    labels: lcroles,
      responsive: [
        {
      breakpoint: 480,
      options: {
    chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  private createpieChartYM(lcroles: any, counts: any) {
    this.isPieChartDataAvailable = true;
    this.piechartOptions = {
      // series: [44, 55, 13, 43, 22],
      series: counts,
      chart: {
        // width: 380,
        type: 'pie',
        events: {
          click: (event, chartContext, config) => {
            const selectedSliceIndex = config.dataPointIndex;
            const selectedSliceValue = config.config.labels[selectedSliceIndex];
            let monthName = selectedSliceValue
              .split('-')
              .slice(0, 1)
              .toString()
              .replace('M1(', '')
              .replace('M2(', '')
              .replace('M3(', '')
              .replace('M4(', '');

            let year =
              '20' +
              selectedSliceValue
                .split('-')
                .slice(1)
                .toString()
                .replace(')', '');
            let month = this.getMonth(monthName);

            this.stage.get('type').setValue('Month - Week');
            const selectedRow = this.shareHostDataService.selectedRowInterfaceData;
            const startDate = new Date(Number(year), month, 1).toISOString();
            const endDate = new Date(
              Number(year),
              month,
              new Date(Number(year), month + 1, 0).getDate()
            ).toISOString();
            this.apiMonthWeek('1', selectedRow, startDate, endDate);
          },
        },
      },
      //  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      labels: lcroles,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  private createpieChartYY(lcroles: any, counts: any, data?: any) {
    this.isPieChartDataAvailable = true;
    this.piechartOptions = {
      // series: [44, 55, 13, 43, 22],
      series: counts,
      chart: {
        // width: 380,
        type: 'pie',
        events: {
          click: (event, chartContext, config) => {
            const selectedSliceIndex = config.dataPointIndex;
            const selectedSliceValue = config.config.labels[selectedSliceIndex];
            let year = selectedSliceValue
              .trim()
              .slice(2)
              .replace('(', '')
              .replace(')', '');
            this.stage.get('type').setValue('Year - Month');
            const selectedRow = this.shareHostDataService.selectedRowInterfaceData;
            const startDate = new Date(year, 0, 1).toISOString();
            const endDate = new Date(year, 11, 31).toISOString();
            this.apiYear('1', selectedRow, startDate, endDate);
          },
        },
      },
      //  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      labels: lcroles,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  private createpieChartMW(lcroles: any, counts: any, data?: any) {

    this.isPieChartDataAvailable = true;
    this.piechartOptions = {
      // series: [44, 55, 13, 43, 22],
      series: counts,
      chart: {
        // width: 380,
        type: 'pie',
        events: {
          click: (event, chartContext, config) => {
            const selectedSliceIndex = config.dataPointIndex;
            const selectedSliceValue = config.config.labels[selectedSliceIndex];
            if (selectedSliceIndex == 0 || selectedSliceIndex) {
              let date = selectedSliceValue
                .trim()
                .slice(2)
                .replace('(', '')
                .replace(')', '')
                .split(' ');
              let startDate = new Date(date.slice(2)).toISOString();
              let endDate = new Date(date.slice(0, 1)).toISOString();
              this.stage.get('type').setValue('Week - Day');
              const selectedRow = this.shareHostDataService.selectedRowInterfaceData;
              this.apiMonthDay('1', selectedRow, startDate, endDate);
            }
          },
        },
      },
      //  labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      labels: lcroles,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  private getMonth(month:string): number {
    const monthName: { [name: string]: number } = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    return monthName[month.trim()] ?? NaN;
  }


  ngOnDestroy(): void {
    this.$destroy.next(undefined);
    this.$destroy.complete();
  }
}
