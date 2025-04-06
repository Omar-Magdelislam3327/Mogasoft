import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import Chart from 'chart.js/auto';
import { BlogsService } from '../../core/services/blogs.service';
import { ProjectsService } from '../../core/services/projects.service';
import { TeamService } from '../../core/services/team.service';
import { QuotationsService } from '../../core/services/quotations.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  projects: any;
  blogs: any;
  team: any;
  quotes!: any;
  // 
  lineChartData: any;
  lineChartOptions: any;
  pieChartData: any;
  pieChartOptions: any;
  // 
  primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim();
  secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondaryColor').trim();
  constructor(private proejctAPI: ProjectsService, private blogAPI: BlogsService, private teamAPI: TeamService , private qouteAPI : QuotationsService) { }

  ngOnInit() {
  this.lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Clients',
        data: [30, 40, 50, 55, 55],
        borderColor: this.primaryColor,
        tension: 0.4,
        fill: true,
        backgroundColor: '#a70a9a4d'
      }
    ]
  };

  this.lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display:false,
        labels: {
          color: '#fff'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: this.primaryColor }
      },
      y: {
        ticks: { color: this.primaryColor }
      }
    }
  };

  this.pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#fff'
        },
        tooltip: {
          enabled: true
        }
      }
    }
  };
  
  this.getProjects();
  this.getBlogs();
  this.getTeam();
  this.getQuotes();
  }

  getProjects() {
    this.proejctAPI.getProjects().subscribe((res:any) => {
      this.projects = Array.isArray(res) ? res : res.Category;
  
      if (!Array.isArray(this.projects)) {
        console.error("Expected an array but received:", res);
        return;
      }
  
      const categoryCounts: { [key: string]: number } = {};
  
      this.projects.forEach((project: any) => {
        const category = project.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
  
      const categoryColors: { [key: string]: string } = {
        'WebDevelopment': this.primaryColor,
        'MobileDevelopment': this.secondaryColor,
        'DigitalMarketing': '#33FF57',
        'Computers': '#FFD700',
        'SurveillanceSystems': '#3366FF',
        'Copiers': '#8A2BE2',
        'Network': '#FF5733',
        'FireFighting': '#DC143C',
        'QueueManagement': '#FF4500'
      };
  
      const labels = Object.keys(categoryCounts);
      const data = labels.map(label => categoryCounts[label]);
      const backgroundColors = labels.map(label => categoryColors[label] || '#CCCCCC');
  
      this.pieChartData = {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors
        }]
      };
  
      this.pieChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: '#fff'
            }
          }
        }
      };
    });
  }

  getTeam() {
    this.teamAPI.getTeam().subscribe(res => {
      this.team = res;
    });
  }

  getBlogs() {
    this.blogAPI.getBlogs().subscribe((res: any) => {
      this.blogs = res.data;
    })
  }

  getQuotes() {
    this.qouteAPI.getQuotes().subscribe(res => {
      this.quotes = res;
    });
  }
}
