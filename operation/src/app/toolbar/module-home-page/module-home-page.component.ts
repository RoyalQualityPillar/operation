import { Component,OnInit,AfterViewInit  } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
    selector: 'app-module-home-page',
    templateUrl: './module-home-page.component.html',
    styleUrls: ['./module-home-page.component.scss'],
    standalone: false
})
export class ModuleHomePageComponent implements OnInit,AfterViewInit  {

  BusinessUnit: FormGroup;
  constructor(public fb: FormBuilder,
              private route:Router){
   
  }
  public chart: any;
  data: [
    {
      label: 'Category 1',
      subcategories: [
        { label: 'Subcategory 1', value: 10 },
        { label: 'Subcategory 2', value: 20 },
        { label: 'Subcategory 3', value: 30 }
      ]
    },
  ]
  ngOnInit(): void {
   // this.createChart();
  }
  ngAfterViewInit(){}
  ngAfterViewInit123() {
    const canvas = document.getElementById('marimekkoChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
    const data = {
      labels: ['Category 1'],
      datasets: [
        {
          label: 'Subcategory 1',
          data: [10],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderWidth: 1
        },
        {
          label: 'Subcategory 2',
          data: [50],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderWidth: 1
        },
        {
          label: 'Subcategory 3',
          data: [60],
          backgroundColor: 'rgba(255, 206, 86, 0.7)',
          borderWidth: 1
        },
        {
          label: 'Subcategory 4',
          data: [40],
          backgroundColor: 'green',
          borderWidth: 1
        },
        {
          label: 'Subcategory 5',
          data: [20],
          backgroundColor: 'red',
          borderWidth: 1
        },
        {
          label: 'Subcategory 6',
          data: [40],
          backgroundColor: 'yellow',
          borderWidth: 1
        },
        {
          label: 'Subcategory 6',
          data: [10],
          backgroundColor: 'blue',
          borderWidth: 1
        }
      ]
    };
  
    const options = {
      indexAxis: 'y',
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  
    // const marimekkoChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: data,
    // });
  }




  createChart(){

  //   this.chart = new Chart("MyChart", {
  //     type: 'pie', //this denotes tha type of chart

  //     data: {// values on X-Axis
  //       labels: ['Red', 'Pink','Green','Yellow','Orange','Blue', ],
	//        datasets: [{
  //   label: 'My First Dataset',
  //   data: [300, 240, 100, 332, 253, 134],
  //   backgroundColor: [
  //     'red',
  //     'pink',
  //     'green',
	// 		'yellow',
  //     'orange',
  //     'blue',			
  //   ],
  //   hoverOffset: 4
  // }],
  //     },
  //     options: {
  //       aspectRatio:2.5
  //     }

  //   });
  }
  onBusinessUnit(){
    this.route.navigate(['./business-unit'])
  }
}
