import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  searchTerm;

  albumList;
  displayedColumns: string[] = ['id', 'albumid', 'title', 'imageUrl'];
  dataSource;
  cols;
  showLayout;
  isLoading: boolean = false;

  gridByBreakpoint = {
    xl: 6,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1,
  };
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private service: DashboardService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
          }
        }
      });
  }

  ngOnInit(): void {
    this.service.getAlbumData().subscribe((data) => {
      this.albumList = data;
    });
  }

  searchData() {
    this.dataSource.filter = this.searchTerm.toString().trim().toLowerCase();
  }
  displayLayout(val) {
    this.showLayout = '';
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.showLayout = val;
      if (this.showLayout === 'table') {
        this.dataSource = new MatTableDataSource(this.albumList);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          console.log(this.dataSource.paginator);
        }, 0);
      }
    }, 10);
  }
}
