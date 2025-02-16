import { Component } from '@angular/core';
import { BlogsService } from 'src/app/core/services/blogs.service';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { QuatationsService } from 'src/app/core/services/quatations.service';
import { TeamService } from 'src/app/core/services/team.service';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  projects: any;
  blogs: any;
  team: any;
  quotes!: any;
  //
  clientGrowthChart!: Chart;
  projectCategoriesChart!: Chart;
  primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primaryColor').trim();
  secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondaryColor').trim();
  constructor(private proejctAPI: ProjectsService, private blogAPI: BlogsService, private teamAPI: TeamService, private quotesAPI: QuatationsService) {
    this.clientGrowthChart = new Chart({
      chart: {
        type: 'line',
        backgroundColor: "transparent"

      },
      title: {
        text: 'Client Growth Per Month',
        style: {
          color: 'white'
        }
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            color: '#A5A5A5',
            fontWeight: '600',
          }
        }
      },
      yAxis: {
        title: {
          text: '',
        },
        labels: {
          style: {
            color: '#A5A5A5',
            fontWeight: '600',
          }
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' Client'
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false,
            format: '{y Client }'
          },
          enableMouseTracking: true
        }
      },
      series: [
        {
          name: 'Clients',
          type: 'line',
          color: this.primaryColor,
          data: [50, 80, 120, 150, 200, 250, 300, 400, 500, 600, 750, 900],
          lineWidth: 4
        }
      ],
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      }
    });
    this.projectCategoriesChart = new Chart({
      chart: {
        type: 'pie',
        backgroundColor: "transparent",
        width: 400,
        height: 400
      },
      title: {
        text: 'Project Categories',
        style: {
          color: 'white'
        }
      },
      plotOptions: {
        pie: {
          size: '100%',
          dataLabels: {
            enabled: false,
          }
        }
      },
      series: [
        {
          name: 'Projects',
          type: 'pie',
          data: [
            { name: 'E-commerce', y: 40, color: this.primaryColor },
            { name: 'Real Estate', y: 30, color: this.secondaryColor },
            { name: 'Social Media', y: 20, color: '#FF5733' },
            { name: 'Other', y: 10, color: '#33FF57' }
          ]
        }
      ],
      credits: {
        enabled: false
      }
    });
  }
  ngOnInit() {
    this.getProjects();
    this.getTeam();
    this.getBlogs();
    this.getQuotes();
  }
  getProjects() {
    this.proejctAPI.getProjects().subscribe(res => {
      this.projects = res;
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
    this.quotesAPI.getQuotes().subscribe((res: any) => {
      this.quotes = res;
    })
  }
}
