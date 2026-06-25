import { ChartDataset, ChartOptions } from 'chart.js';
import { Component } from '@angular/core';
import { MatCard, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MemberService } from '../../service/member.service';
import { EvtService } from '../../service/evt.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard,MatCardTitle,MatCardSubtitle, BaseChartDirective],
  providers: [ provideCharts(withDefaultRegisterables()) ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
NbMembers:number=0;
NbEvents:number=0
nbTeachers:number=0;
nbStudents:number=0;
  chartData: ChartDataset<'line', number[]>[] = [
    {
      label: '',
      data: [],
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79,70,229,0.08)',
      pointBackgroundColor: '#4f46e5'
    }
  ];
  chartLabels: string[] = [];

   chartDataPie: ChartDataset<'pie', number[]>[] = [
    {
      label: 'Members',
      data: [],
      backgroundColor: ['#10b981', '#3b82f6'],
      hoverOffset: 8
    }
  ];
  chartLabelsPie: string[] = [ 'Teachers', 'Students' ];
  chartLabelsD: string[] = [];
  chartDataD: ChartDataset<'doughnut', number[]>[] = [
    {
      label: 'Events',
      data: [],
      backgroundColor: ['#f97316', '#f43f5e', '#a78bfa', '#60a5fa']
    }
  ];

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };
  chartOptionsPie: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };
  chartOptionsD: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  constructor(private MS:MemberService, private Es:EvtService)   {
    this.MS.getAllMembers().subscribe((response)=>
      {
        this.NbMembers=response.length
        this.nbTeachers=response.filter(m=>m.type=="teacher").length

        this.nbStudents=response.filter(m=>m.type=="student").length
        this.chartDataPie=[{data:[this.nbTeachers,this.nbStudents],label:"members"}]
        const names = response.map(m => m.nom) 
        this.chartLabels=names
        const eventsCount = response.map(m => m.tab_events ? m.tab_events.length : 0) 
        this.chartData=[{data:eventsCount,label:"Events"}]
      })
       this.Es.GetAllEvents().subscribe((response)=>
      {
        this.NbEvents=response.length
        const lieux = [...new Set(response.map(e => e.lieu))]
        this.chartLabelsD=lieux
       const count = lieux.map(e => response.filter(ev => ev.lieu == e).length)
       this.chartDataD=[{data:count,label:"Events"}]
      })
  }



}
